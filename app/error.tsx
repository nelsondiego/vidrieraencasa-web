"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console with context
    console.error("Global error boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="rounded-full bg-destructive/10 p-4">
            <IconAlertCircle size={48} className="text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Algo salió mal</h1>
            <p className="text-muted-foreground">
              Ocurrió un error inesperado. Por favor, intenta nuevamente.
            </p>
          </div>

          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button onClick={reset} className="flex-1 gap-2">
              <IconRefresh size={20} />
              Intentar nuevamente
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="flex-1"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
