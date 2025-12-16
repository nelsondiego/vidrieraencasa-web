import { IconCheck, IconCoins } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentSuccessProps {
  creditsAllocated?: number;
  planName?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function PaymentSuccess({
  creditsAllocated,
  planName,
  onAction,
  actionLabel = "Ir al dashboard",
  className,
}: PaymentSuccessProps) {
  return (
    <Card className={cn("p-8 max-w-md mx-auto", className)}>
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-4">
            <IconCheck
              size={48}
              className="text-green-600 dark:text-green-400"
            />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            ¡Todo listo! Tu inversión está confirmada.
          </h2>
          <p className="text-muted-foreground">
            Ya puedes empezar a disfrutar de los beneficios.
          </p>
        </div>

        {/* Credits Info */}
        {creditsAllocated !== undefined && (
          <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <IconCoins size={24} className="text-primary" />
              <span className="text-3xl font-bold">{creditsAllocated}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {creditsAllocated === 1
                ? "crédito agregado"
                : "créditos agregados"}{" "}
              a tu cuenta
            </p>
          </div>
        )}

        {/* Plan Name */}
        {planName && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Plan activado</p>
            <p className="font-semibold">{planName}</p>
          </div>
        )}

        {/* CTA */}
        {onAction && (
          <Button onClick={onAction} className="w-full">
            {actionLabel}
          </Button>
        )}

        {/* Additional Info */}
        <p className="text-xs text-muted-foreground">
          Tus créditos están listos. ¡Es hora de potenciar tu negocio!
        </p>
      </div>
    </Card>
  );
}
