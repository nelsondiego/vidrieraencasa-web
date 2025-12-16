import { IconCheck } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrengthsSectionProps {
  strengths: string[];
  className?: string;
}

export function StrengthsSection({
  strengths,
  className = "",
}: StrengthsSectionProps) {
  if (!strengths || strengths.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconCheck size={24} className="text-green-600 dark:text-green-500" />
          Fortalezas Detectadas
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Elementos que ya funcionan y deberías mantener
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {strengths.map((strength, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="text-green-500 font-bold mt-1.5 shrink-0 text-xs">
                ●
              </span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
