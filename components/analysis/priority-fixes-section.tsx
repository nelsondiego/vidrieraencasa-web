import { IconBolt } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriorityFixesSectionProps {
  priorityFixes: string[];
  className?: string;
}

export function PriorityFixesSection({
  priorityFixes,
  className = "",
}: PriorityFixesSectionProps) {
  if (!priorityFixes || priorityFixes.length === 0) return null;

  return (
    <Card className={`border-amber-500/50 bg-amber-500/10 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl text-amber-600 dark:text-amber-500">
          <IconBolt size={24} className="fill-current" />
          Lo primero que deberías cambiar
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Acciones de alto impacto, bajo costo y ejecución inmediata
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 list-decimal pl-5">
          {priorityFixes.map((fix, index) => (
            <li
              key={index}
              className="text-lg font-medium leading-relaxed pl-2 marker:text-amber-600 dark:marker:text-amber-500"
            >
              {fix}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
