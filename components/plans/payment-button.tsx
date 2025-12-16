"use client";

import { useState } from "react";
import { IconCreditCard } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { createPaymentPreference } from "@/actions/payments/create-payment-preference";
import { cn } from "@/lib/utils";

type PlanType = "single" | "monthly_3" | "monthly_10" | "addon";

interface PaymentButtonProps {
  planType: PlanType;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BUTTON_TEXT: Record<PlanType, string> = {
  single: "Comprar ahora",
  monthly_3: "Suscribirme",
  monthly_10: "Suscribirme",
  addon: "Agregar crédito",
};

export function PaymentButton({
  planType,
  disabled = false,
  className,
  children,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const result = await createPaymentPreference(planType);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // Redirect to MercadoPago checkout
      window.location.href = result.initPoint;
    } catch (error) {
      console.error("Payment button error:", error);
      toast.error("Ocurrió un error inesperado. Por favor, intenta nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={cn("gap-2", className)}
    >
      {isLoading ? <Spinner /> : <IconCreditCard size={20} />}
      {children || BUTTON_TEXT[planType]}
    </Button>
  );
}
