"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentFailure } from "@/components/payments/payment-failure";
import { Spinner } from "@/components/ui/spinner";

/**
 * Payment failure page content
 * Wrapped in Suspense boundary for useSearchParams
 */
function PaymentFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get error info from URL params (optional)
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const statusDetail = searchParams.get("status_detail");

  // Map status detail to user-friendly error message
  const getErrorMessage = (detail: string | null) => {
    switch (detail) {
      case "cc_rejected_insufficient_amount":
        return "Fondos insuficientes en tu tarjeta";
      case "cc_rejected_bad_filled_card_number":
        return "Número de tarjeta incorrecto";
      case "cc_rejected_bad_filled_date":
        return "Fecha de vencimiento incorrecta";
      case "cc_rejected_bad_filled_security_code":
        return "Código de seguridad incorrecto";
      case "cc_rejected_call_for_authorize":
        return "Debes autorizar el pago con tu banco";
      case "cc_rejected_card_disabled":
        return "Tu tarjeta está deshabilitada";
      case "cc_rejected_duplicated_payment":
        return "Ya realizaste un pago similar recientemente";
      case "cc_rejected_high_risk":
        return "El pago fue rechazado por seguridad";
      case "cc_rejected_max_attempts":
        return "Superaste el número máximo de intentos";
      default:
        return "No pudimos procesar tu pago. Por favor, verifica tus datos o intenta con otro medio de pago.";
    }
  };

  const errorMessage = getErrorMessage(statusDetail);

  const handleGoToPlans = () => {
    router.push("/planes");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <PaymentFailure
          errorMessage={errorMessage}
          onAction={handleGoToPlans}
          actionLabel="Volver a los planes"
        />

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === "development" && paymentId && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-xs">
            <p className="font-mono">Payment ID: {paymentId}</p>
            <p className="font-mono">Status: {status}</p>
            <p className="font-mono">Status Detail: {statusDetail}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Payment failure page
 * Displays error message when payment fails
 * Provides retry option and support contact information
 */
export default function PaymentFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <PaymentFailureContent />
    </Suspense>
  );
}
