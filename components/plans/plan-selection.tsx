import { PlanCard } from "./plan-card";
import { cn } from "@/lib/utils";

interface PlanSelectionProps {
  hasActivePlan: boolean;
  onSelectPlan: (
    planType: "single" | "monthly_3" | "monthly_10" | "addon"
  ) => void;
  loadingPlan?: "single" | "monthly_3" | "monthly_10" | "addon" | null;
  className?: string;
}

const PLAN_DATA = {
  single: {
    price: 6000,
    credits: 1,
  },
  monthly_3: {
    price: 9000,
    credits: 3,
  },
  monthly_10: {
    price: 15000,
    credits: 10,
  },
  addon: {
    price: 3000,
    credits: 1,
  },
};

export function PlanSelection({
  hasActivePlan,
  onSelectPlan,
  loadingPlan = null,
  className,
}: PlanSelectionProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Single Analysis */}
        <PlanCard
          planType="single"
          price={PLAN_DATA.single.price}
          credits={PLAN_DATA.single.credits}
          onSelect={() => onSelectPlan("single")}
          isDisabled={hasActivePlan}
          isLoading={loadingPlan === "single"}
        />

        {/* Monthly 3 */}
        <PlanCard
          planType="monthly_3"
          price={PLAN_DATA.monthly_3.price}
          credits={PLAN_DATA.monthly_3.credits}
          isRecommended={!hasActivePlan}
          isDisabled={hasActivePlan}
          onSelect={() => onSelectPlan("monthly_3")}
          isLoading={loadingPlan === "monthly_3"}
        />

        {/* Monthly 10 */}
        <PlanCard
          planType="monthly_10"
          price={PLAN_DATA.monthly_10.price}
          credits={PLAN_DATA.monthly_10.credits}
          isDisabled={hasActivePlan}
          onSelect={() => onSelectPlan("monthly_10")}
          isLoading={loadingPlan === "monthly_10"}
        />

        {/* Add-on */}
        <PlanCard
          planType="addon"
          price={PLAN_DATA.addon.price}
          credits={PLAN_DATA.addon.credits}
          onSelect={() => onSelectPlan("addon")}
          isLoading={loadingPlan === "addon"}
        />
      </div>

      {/* Info Message */}
      {hasActivePlan && (
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground bg-muted/50 inline-block px-4 py-2 rounded-lg">
            ¡Ya tienes un plan activo! Si necesitas más análisis, puedes agregar
            créditos extra en cualquier momento.
          </p>
        </div>
      )}
    </div>
  );
}
