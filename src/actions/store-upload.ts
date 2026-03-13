"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const LOGO_MAX_WIDTH = 300;

const r2Client = new S3Client({
  region: process.env.R2_REGION ?? "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

export type UploadStoreLogoResult =
  | { success: true; url: string }
  | { success: false; error: string };

export async function uploadStoreLogo(
  formData: FormData
): Promise<UploadStoreLogoResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "Não autorizado. Faça login para continuar." };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user?.storeId) {
    return { success: false, error: "Usuário não vinculado a uma loja." };
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return { success: false, error: "Nenhum arquivo enviado." };
  }

  if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(png|jpe?g|webp|svg)$/i)) {
    return { success: false, error: "Tipo inválido. Use PNG, JPG, WEBP ou SVG." };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { success: false, error: "Arquivo muito grande. Máximo 2 MB." };
  }

  const bucket = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;
  if (!bucket || !publicBaseUrl) {
    return { success: false, error: "Configuração do R2 incompleta." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const isSvg = file.type === "image/svg+xml" || /\.svg$/i.test(file.name);

    let body: Buffer;
    let contentType: string;
    let ext: string;

    if (isSvg) {
      // SVG: store as-is (no Sharp), optional size limit already checked
      body = buffer;
      contentType = "image/svg+xml";
      ext = "svg";
    } else {
      const image = sharp(buffer);
      const meta = await image.metadata();
      const width = meta.width ?? LOGO_MAX_WIDTH;
      const targetWidth = Math.min(width, LOGO_MAX_WIDTH);

      const processed = await image
        .resize(targetWidth, undefined, { withoutEnlargement: true })
        .webp({ quality: 90, alphaQuality: 100 })
        .toBuffer();

      body = processed;
      contentType = "image/webp";
      ext = "webp";
    }

    const objectKey = `stores/${user.storeId}/logo.${ext}`;
    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: objectKey,
        Body: body,
        ContentType: contentType,
      })
    );

    const url = `${publicBaseUrl.replace(/\/$/, "")}/${objectKey}`;
    return { success: true, url };
  } catch (err) {
    console.error("Erro ao processar ou enviar logo para o R2:", err);
    return { success: false, error: "Falha ao processar ou enviar o logo." };
  }
}
