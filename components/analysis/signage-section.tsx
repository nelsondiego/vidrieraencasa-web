import { IconMessageCircle } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SignageSectionProps {
  suggestedSignageText: string;
  className?: string;
}

export function SignageSection({
  suggestedSignageText,
  className = "",
}: SignageSectionProps) {
  if (!suggestedSignageText) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconMessageCircle
            size={24}
            className="text-blue-600 dark:text-blue-500"
          />
          Texto Recomendado para Cartelería
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Listo para imprimir o escribir en tu pizarra
        </p>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-lg font-semibold text-blue-900 dark:text-blue-100 text-center">
            &ldquo;{suggestedSignageText}&rdquo;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
