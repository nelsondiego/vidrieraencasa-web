import { IconCalendar } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PlanType = "single" | "monthly_3" | "monthly_10";
type PlanStatus = "active" | "expired";

interface PlanInfoCardProps {
  planType: PlanType;
  status: PlanStatus;
  resetDate?: Date | null;
  expirationDate: Date;
  className?: string;
}

const PLAN_NAMES: Record<PlanType, string> = {
  single: "Diagnóstico Express",
  monthly_3: "Pack Impulso Mensual",
  monthly_10: "Pack Profesional",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function PlanInfoCard({
  planType,
  status,
  resetDate,
  expirationDate,
  className,
}: PlanInfoCardProps) {
  const isActive = status === "active";

  return (
    <Card className={cn("p-6 space-y-4", className)}>
      {/* Plan Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{PLAN_NAMES[planType]}</h3>
          <p className="text-sm text-muted-foreground">Plan Vigente</p>
        </div>
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Activo" : "Expirado"}
        </Badge>
      </div>

      {/* Plan Details */}
      <div className="space-y-3">
        {/* Expiration Date */}
        <div className="flex items-center gap-3">
          <IconCalendar size={20} className="text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              {isActive ? "Vence el" : "Expiró el"}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(expirationDate)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
