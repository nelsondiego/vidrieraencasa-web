import { IconListCheck } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecommendationsSectionProps {
  recommendations: string[];
  className?: string;
}

export function RecommendationsSection({
  recommendations,
  className = "",
}: RecommendationsSectionProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconListCheck
            size={24}
            className="text-blue-600 dark:text-blue-500"
          />
          Plan de Acción Semanal
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Lista de tareas concretas para ejecutar esta semana
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-base text-foreground leading-relaxed"
            >
              <span className="text-amber-600 dark:text-amber-500 font-bold mt-1 shrink-0">
                •
              </span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
