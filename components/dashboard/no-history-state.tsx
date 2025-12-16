import { IconPhoto } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NoHistoryStateProps {
  onAction?: () => void;
  className?: string;
}

export function NoHistoryState({ onAction, className }: NoHistoryStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-4 py-12",
        className
      )}
    >
      <div className="rounded-full bg-muted p-4">
        <IconPhoto size={48} className="text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          ¡Comienza a transformar tu negocio!
        </h3>
        <p className="text-muted-foreground max-w-md">
          Sube una foto y descubre cómo atraer más clientes hoy mismo.
        </p>
      </div>

      {onAction && (
        <Button onClick={onAction} size="lg" className="mt-4">
          Analizar mi primera vidriera
        </Button>
      )}
    </div>
  );
}
