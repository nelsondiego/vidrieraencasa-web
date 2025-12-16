"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentSuccess } from "@/components/payments/payment-success";
import { Spinner } from "@/components/ui/spinner";

/**
 * Payment success page content
 * Wrapped in Suspense boundary for useSearchParams
 */
function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get payment info from URL params (optional)
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const planType = searchParams.get("external_reference");

  // Map plan type to credits and name
  const getPlanInfo = (type: string | null) => {
    switch (type) {
      case "single":
        return { credits: 1, name: "Diagnóstico Express" };
      case "monthly_3":
        return { credits: 3, name: "Pack Impulso Mensual" };
      case "monthly_10":
        return { credits: 10, name: "Pack Profesional" };
      case "addon":
        return { credits: 1, name: "Análisis Adicional" };
      default:
        return { credits: undefined, name: undefined };
    }
  };

  const planInfo = getPlanInfo(planType);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <PaymentSuccess
          creditsAllocated={planInfo.credits}
          planName={planInfo.name}
          onAction={handleGoToDashboard}
          actionLabel="Ir al Panel de Control"
        />

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === "development" && paymentId && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-xs">
            <p className="font-mono">Payment ID: {paymentId}</p>
            <p className="font-mono">Status: {status}</p>
            <p className="font-mono">Plan Type: {planType}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Payment success page
 * Displays success message after successful payment
 * Shows allocated credits information
 */
export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
