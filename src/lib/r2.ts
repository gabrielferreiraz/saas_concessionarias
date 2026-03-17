import { S3Client } from "@aws-sdk/client-s3";

/**
 * Endpoint obrigatório para Cloudflare R2:
 * https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com
 * Região deve ser "auto".
 */
function getR2Endpoint(): string {
  const accountId = process.env.R2_ACCOUNT_ID;
  if (accountId) {
    return `https://${accountId}.r2.cloudflarestorage.com`;
  }
  const fallback = process.env.R2_ENDPOINT;
  if (fallback) {
    return fallback;
  }
  throw new Error(
    "R2: defina R2_ACCOUNT_ID (ex: no EasyPanel) ou R2_ENDPOINT. Ex.: R2_ACCOUNT_ID=0239cfaf4a2f3ffd6bea92122e7a31a3"
  );
}

const endpoint = getR2Endpoint();

export const r2Client = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

if (typeof console !== "undefined" && console.log) {
  console.log("[R2] Cliente inicializado com endpoint:", endpoint);
}
