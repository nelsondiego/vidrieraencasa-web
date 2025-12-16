import { IconLoader2 } from "@tabler/icons-react";

interface AnalysisLoadingProps {
  message?: string;
  className?: string;
}

export function AnalysisLoading({
  message = "Analizando tu vidriera...",
  className = "",
}: AnalysisLoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-8 ${className}`}
    >
      <IconLoader2
        size={48}
        className="animate-spin text-primary"
        aria-hidden="true"
      />
      <div className="text-center space-y-2">
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm text-muted-foreground">
          Esto puede tomar unos segundos...
        </p>
      </div>
    </div>
  );
}
