import { IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NoCreditsStateProps {
  onAction?: () => void;
  className?: string;
}

export function NoCreditsState({ onAction, className }: NoCreditsStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-4 py-12",
        className
      )}
    >
      <div className="rounded-full bg-destructive/10 p-4">
        <IconAlertCircle size={48} className="text-destructive" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">¡Necesitas más créditos!</h3>
        <p className="text-muted-foreground max-w-md">
          No detengas tu crecimiento. Recarga ahora para seguir recibiendo
          consejos expertos.
        </p>
      </div>

      {onAction && (
        <Button onClick={onAction} size="lg" className="mt-4">
          Recargar créditos
        </Button>
      )}
    </div>
  );
}
