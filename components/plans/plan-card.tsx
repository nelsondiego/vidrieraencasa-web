import { IconCoins, IconCheck, IconStar } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlanType = "single" | "monthly_3" | "monthly_10" | "addon";

interface PlanCardProps {
  planType: PlanType;
  price: number;
  credits: number;
  isRecommended?: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
  isLoading?: boolean;
  className?: string;
}

const PLAN_TITLES: Record<PlanType, string> = {
  single: "Diagnóstico Express",
  monthly_3: "Pack Impulso Mensual",
  monthly_10: "Pack Profesional",
  addon: "Análisis Adicional",
};

const PLAN_DESCRIPTIONS: Record<PlanType, string> = {
  single: "Ideal para conocer el estado actual de tu vidriera.",
  monthly_3: "Mejora continua para captar clientes todo el mes.",
  monthly_10: "Máxima optimización para negocios exigentes.",
  addon: "¿Necesitas más? Suma análisis extra cuando quieras.",
};

const PLAN_NOTES: Record<PlanType, string | null> = {
  single: null,
  monthly_3: null,
  monthly_10: null,
  addon: null,
};

export function PlanCard({
  planType,
  price,
  credits,
  isRecommended = false,
  isDisabled = false,
  onSelect,
  isLoading = false,
  className,
}: PlanCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col p-6 transition-all hover:shadow-lg h-full overflow-visible",
        isRecommended && "border-primary border-2 shadow-md",
        isDisabled && "opacity-60",
        className
      )}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="gap-1 px-3 py-1">
            <IconStar size={14} className="fill-current" />
            Más Popular
          </Badge>
        </div>
      )}

      {/* Plan Header */}
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold">{PLAN_TITLES[planType]}</h3>
        <p className="text-sm text-muted-foreground h-10">
          {PLAN_DESCRIPTIONS[planType]}
        </p>
      </div>

      {/* Price */}
      <div className="space-y-1 mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">
            ${price.toLocaleString("es-AR")}
          </span>
          <span className="text-muted-foreground">ARS</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <IconCoins size={16} />
          <span>
            {credits} {credits === 1 ? "crédito" : "créditos"}
          </span>
        </div>
      </div>

      {/* Note */}
      {PLAN_NOTES[planType] && (
        <p className="text-xs text-muted-foreground italic mb-4 text-center">
          {PLAN_NOTES[planType]}
        </p>
      )}

      {/* CTA Button */}
      <div className="mt-auto">
        <Button
          onClick={onSelect}
          disabled={isDisabled || isLoading}
          className="w-full"
          variant={isRecommended ? "default" : "outline"}
        >
          {isDisabled ? "No disponible" : "Comprar ahora"}
        </Button>
      </div>
    </Card>
  );
}
