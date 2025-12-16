import { IconChartBar } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummarySectionProps {
  overallAssessment: string;
  className?: string;
}

export function SummarySection({
  overallAssessment,
  className = "",
}: SummarySectionProps) {
  if (!overallAssessment) return null;

  return (
    <Card className={`border-primary/20 bg-primary/5 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <IconChartBar size={24} />
          Diagnóstico General
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Resumen ejecutivo del estado actual de tu vidriera
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed font-medium">
          {overallAssessment}
        </p>
      </CardContent>
    </Card>
  );
}
