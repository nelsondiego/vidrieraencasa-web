import { IconAlertCircle } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IssuesSectionProps {
  issues: string[];
  className?: string;
}

export function IssuesSection({ issues, className = "" }: IssuesSectionProps) {
  if (!issues || issues.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconAlertCircle
            size={24}
            className="text-red-600 dark:text-red-500"
          />
          Áreas de Oportunidad
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Puntos críticos que están frenando tus ventas hoy
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {issues.map((issue, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="text-red-500 font-bold mt-1.5 shrink-0 text-xs">
                ●
              </span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
