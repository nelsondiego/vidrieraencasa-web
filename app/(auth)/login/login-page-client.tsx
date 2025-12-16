"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export function LoginPageClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user was redirected due to session expiration
    const expired = searchParams.get("expired");
    if (expired === "true") {
      toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">¡Hola de nuevo!</h1>
          <p className="text-muted-foreground">
            Ingresa a tu cuenta y sigue optimizando la imagen de tu negocio con
            tecnología avanzada.
          </p>
        </div>

        <Card className="p-6">
          <LoginForm />
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/registro"
            className="font-medium text-primary hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
