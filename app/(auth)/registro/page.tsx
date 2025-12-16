import Link from "next/link";
import { RegistrationForm } from "@/components/auth/registration-form";
import { Card } from "@/components/ui/card";

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Únete a Vidriera en Casa</h1>
          <p className="text-muted-foreground">
            Descubre todo el potencial de tu negocio. Regístrate y empieza a analizar tus vidrieras hoy mismo.
          </p>
        </div>

        <Card className="p-6">
          <RegistrationForm />
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
