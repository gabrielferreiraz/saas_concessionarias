"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/novo-veiculo"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha e-mail e senha.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Falha no login",
          description: "E-mail ou senha incorretos. Tente novamente.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login realizado",
        description: "Redirecionando para o painel.",
      })
      router.push(callbackUrl)
      router.refresh()
    } catch {
      toast({
        title: "Erro inesperado",
        description: "Não foi possível entrar. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Acesso administrativo
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com seu e-mail e senha para acessar o painel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Acesso restrito a usuários autorizados da concessionária.
        </p>
      </div>
    </main>
  )
}
