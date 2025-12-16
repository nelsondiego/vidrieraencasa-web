"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlanSelection } from "@/components/plans/plan-selection";
import { createPaymentPreference } from "@/actions/payments/create-payment-preference";
import { toast } from "sonner";

type PlanType = "single" | "monthly_3" | "monthly_10" | "addon";

interface PlansPageClientProps {
  hasActivePlan: boolean;
  isAuthenticated: boolean;
}

/**
 * Plans page client component
 * Handles plan selection and payment initiation
 */
export function PlansPageClient({
  hasActivePlan,
  isAuthenticated,
}: PlansPageClientProps) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = async (planType: PlanType) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para comprar un plan");
      router.push("/login");
      return;
    }

    setLoadingPlan(planType);

    try {
      const result = await createPaymentPreference(planType);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // Redirect to MercadoPago checkout
      window.location.href = result.initPoint;
    } catch (error) {
      console.error("Plan selection error:", error);
      toast.error("Ocurrió un error inesperado. Por favor, intenta nuevamente");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <PlanSelection
      hasActivePlan={hasActivePlan}
      onSelectPlan={handleSelectPlan}
      loadingPlan={loadingPlan}
    />
  );
}
