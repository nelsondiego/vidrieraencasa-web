import { IconCoins } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CreditBalanceProps {
  planCredits: number;
  addonCredits: number;
  className?: string;
}

export function CreditBalance({
  planCredits,
  addonCredits,
  className,
}: CreditBalanceProps) {
  const totalCredits = planCredits + addonCredits;
  const isLowCredits = totalCredits < 3;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Total Credits Display */}
      <div className="flex items-center gap-3">
        <IconCoins size={32} className="text-primary" />
        <div>
          <p className="text-4xl font-bold">{totalCredits}</p>
          <p className="text-sm text-muted-foreground">
            {totalCredits === 1 ? "crédito para usar" : "créditos para usar"}
          </p>
        </div>
      </div>

      {/* Low Credits Warning */}
      {isLowCredits && totalCredits > 0 && (
        <Badge variant="destructive" className="w-fit">
          ¡Quedan pocos!
        </Badge>
      )}

      {/* Credits Breakdown */}
      {(planCredits > 0 || addonCredits > 0) && (
        <div className="space-y-2 text-sm">
          <p className="font-medium text-muted-foreground">Desglose:</p>
          <div className="space-y-1">
            {planCredits > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">De tu Plan Mensual:</span>
                <span className="font-medium">{planCredits}</span>
              </div>
            )}
            {addonCredits > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Créditos Extra:
                </span>
                <span className="font-medium">{addonCredits}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
