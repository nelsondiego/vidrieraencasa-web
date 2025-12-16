import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getActivePlan } from "@/actions/credits/get-active-plan";
import { PlansPageClient } from "./plans-page-client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCalendar, IconCreditCard } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Planes y Créditos - Vidriera en Casa",
  description: "Gestiona tu plan y adquiere créditos para análisis.",
};

/**
 * Plans page - Server Component
 * Displays available plans and handles plan selection within the dashboard layout
 */
export default async function PlansPage() {
  // User is guaranteed to exist because layout handles auth check
  const user = await getCurrentUser();

  // Get active plan
  let hasActivePlan = false;
  let activePlanInfo = null;

  if (user) {
    const planResult = await getActivePlan();
    if (planResult.success && planResult.plan) {
      hasActivePlan = true;
      activePlanInfo = planResult.plan;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planes y Créditos</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tu suscripción y adquiere más créditos para analizar tus
          vidrieras.
        </p>
      </div>

      {/* Current Plan Status */}
      {activePlanInfo && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <IconCreditCard className="h-5 w-5 text-primary" />
              Tu Plan Actual
            </CardTitle>
            <CardDescription>
              Detalles de tu suscripción activa y balance de créditos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">
                    {activePlanInfo.type === "monthly_3"
                      ? "Plan Mensual 3"
                      : activePlanInfo.type === "monthly_10"
                      ? "Plan Mensual 10"
                      : "Análisis único"}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Activo
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Créditos disponibles:{" "}
                  <span className="font-medium text-foreground">
                    {activePlanInfo.creditsRemaining}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-3 py-1.5 rounded-md border">
                <IconCalendar className="h-4 w-4" />
                <span>
                  Vence el{" "}
                  {new Date(activePlanInfo.endDate).toLocaleDateString(
                    "es-AR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Planes Disponibles</h2>
        <PlansPageClient
          hasActivePlan={hasActivePlan}
          isAuthenticated={!!user}
        />
      </div>
    </div>
  );
}
