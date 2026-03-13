"use client";

import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Store, Palette, Phone, ImageIcon, Upload, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/color-picker";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { updateStoreAction } from "@/src/actions/store";
import { uploadStoreLogo } from "@/src/actions/store-upload";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface StoreSettingsFormProps {
  initialValues: {
    name: string;
    whatsapp: string;
    primaryColor: string;
    logoUrl: string;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : "Salvar alterações"}
    </Button>
  );
}

const ALLOWED_LOGO_TYPES = "image/png,image/jpeg,image/webp,image/svg+xml";
const MAX_LOGO_MB = 2;

export function StoreSettingsForm({ initialValues }: StoreSettingsFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialValues.name);
  const [whatsapp, setWhatsapp] = useState(initialValues.whatsapp);
  const [primaryColor, setPrimaryColor] = useState(initialValues.primaryColor);
  const [logoUrl, setLogoUrl] = useState(initialValues.logoUrl);
  const [logoUploading, setLogoUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await updateStoreAction({
      name,
      whatsapp,
      primaryColor: primaryColor || "#000000",
      logoUrl: logoUrl || "",
    });
    if (result.success) {
      toast({ title: "Configurações salvas com sucesso." });
    } else {
      toast({ title: "Erro", description: result.error, variant: "destructive" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Store className="size-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Dados da loja</CardTitle>
              <CardDescription>
                Nome da loja e contato WhatsApp
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="store-name">Nome da loja</FieldLabel>
              <Input
                id="store-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Reobote"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="whatsapp">
                <Phone className="size-4" />
                WhatsApp de contato
              </FieldLabel>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="5541999999999"
              />
              <FieldDescription>
                Número com código do país (sem + ou espaços)
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Palette className="size-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Cor primária</CardTitle>
              <CardDescription>
                Cor em hexadecimal (botões, links, destaque)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ColorPicker
            label="Cor primária (hex)"
            value={primaryColor}
            onChange={setPrimaryColor}
            description="Ex: #000000"
          />
          <div className="mt-4 rounded-lg border bg-muted/30 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Pré-visualização
            </p>
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: primaryColor || "#000000" }}
            >
              Botão primário
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <ImageIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Logo</CardTitle>
              <CardDescription>
                Forneça um link ou faça upload de um arquivo para o R2
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-xs">
              <TabsTrigger value="link" className="gap-2">
                <Link2 className="size-4" />
                Fornecer link
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="size-4" />
                Upload de arquivo
              </TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="mt-4">
              <Field>
                <FieldLabel htmlFor="logo-url">Link do logo</FieldLabel>
                <Input
                  id="logo-url"
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </Field>
            </TabsContent>
            <TabsContent value="upload" className="mt-4 space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_LOGO_TYPES}
                className="sr-only"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > MAX_LOGO_MB * 1024 * 1024) {
                    toast({
                      title: "Arquivo grande",
                      description: `Máximo ${MAX_LOGO_MB} MB.`,
                      variant: "destructive",
                    });
                    e.target.value = "";
                    return;
                  }
                  setLogoUploading(true);
                  const formData = new FormData();
                  formData.set("file", file);
                  const result = await uploadStoreLogo(formData);
                  setLogoUploading(false);
                  e.target.value = "";
                  if (result.success) {
                    setLogoUrl(result.url);
                    toast({ title: "Logo enviado. Clique em Salvar para aplicar." });
                  } else {
                    toast({ title: "Erro no upload", description: result.error, variant: "destructive" });
                  }
                }}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                className={cn(
                  "flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                  logoUploading
                    ? "border-primary/50 bg-muted/50"
                    : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                )}
              >
                {logoUploading ? (
                  <>
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Enviando para o R2...</p>
                  </>
                ) : (
                  <>
                    <Upload className="size-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium text-foreground">Clique para selecionar</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP ou SVG — máx. {MAX_LOGO_MB} MB
                    </p>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {(logoUrl || initialValues.logoUrl) && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">Pré-visualização do logo</p>
              <div className="flex flex-wrap items-center gap-4">
                {logoUrl ? (
                  <div className="relative h-16 w-48 overflow-hidden rounded bg-background/80 object-contain object-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Logo atual"
                      className="h-full w-full object-contain object-left"
                    />
                  </div>
                ) : initialValues.logoUrl ? (
                  <div className="relative h-16 w-48 overflow-hidden rounded bg-background/80 object-contain object-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={initialValues.logoUrl}
                      alt="Logo salvo"
                      className="h-full w-full object-contain object-left"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
