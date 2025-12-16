import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentFailureProps {
  errorMessage?: string;
  onRetry?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function PaymentFailure({
  errorMessage = "No se pudo procesar el pago",
  onRetry,
  onAction,
  actionLabel = "Ver planes",
  className,
}: PaymentFailureProps) {
  return (
    <Card className={cn("p-8 max-w-md mx-auto", className)}>
      <div className="space-y-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 dark:bg-destructive/20 p-4">
            <IconAlertCircle
              size={48}
              className="text-destructive dark:text-destructive"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Ups, hubo un problema con el pago
          </h2>
          <p className="text-muted-foreground">
            {errorMessage === "No se pudo procesar el pago"
              ? "No te preocupes, no se realizó ningún cargo. Vamos a solucionarlo."
              : errorMessage}
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4 text-left">
          <p className="text-sm font-medium mb-2">Posibles soluciones:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Verifica que tus datos de pago sean correctos</li>
            <li>Asegúrate de tener fondos suficientes</li>
            <li>Intenta con otro método de pago</li>
            <li>Contacta a tu banco si el problema persiste</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {onAction && (
            <Button onClick={onAction} variant="outline" className="w-full">
              {actionLabel}
            </Button>
          )}
        </div>

        {/* Support Info */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            ¿Necesitas ayuda? Contacta a nuestro soporte en{" "}
            <a
              href="mailto:soporte@vidrierapro.com"
              className="text-primary hover:underline"
            >
              soporte@vidrierapro.com
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
}
