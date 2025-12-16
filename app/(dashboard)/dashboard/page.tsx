import { redirect } from "next/navigation";
import Link from "next/link";
import { IconUpload, IconHistory } from "@tabler/icons-react";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getAvailableCredits } from "@/actions/credits/get-available-credits";
import { getActivePlan } from "@/actions/credits/get-active-plan";
import { getAnalysisHistory } from "@/actions/analysis/get-analysis-history";
import { CreditBalance } from "@/components/dashboard/credit-balance";
import { PlanInfoCard } from "@/components/dashboard/plan-info-card";
import { NoCreditsState } from "@/components/dashboard/no-credits-state";
import { AnalysisCard } from "@/components/analysis/analysis-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Get current user (protected by proxy, but still need to fetch user data)
  const user = await getCurrentUser();

  // If no user (shouldn't happen due to proxy, but handle gracefully)
  if (!user) {
    redirect("/login");
  }

  // Fetch dashboard data
  const [creditsResult, planResult, historyResult] = await Promise.all([
    getAvailableCredits(),
    getActivePlan(),
    getAnalysisHistory(1),
  ]);

  const credits = creditsResult.success
    ? creditsResult.credits
    : { planCredits: 0, addonCredits: 0, total: 0 };
  const activePlan = planResult.success ? planResult.plan : null;
  const recentAnalyses = historyResult.success
    ? historyResult.history.slice(0, 3).map((item) => ({
        ...item,
        imageUrl: item.imageUrl,
      }))
    : [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-muted-foreground mt-1">
            Aquí tienes un resumen de tu actividad y tus análisis más recientes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {credits.total > 0 ? (
            <Link href="/dashboard/subir">
              <Button>
                <IconUpload className="mr-2" size={20} />
                Analizar nueva vidriera
              </Button>
            </Link>
          ) : (
            <Link href="/planes">
              <Button>Recargar créditos</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Stats & Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center h-9">
            <h2 className="text-xl font-semibold">Tu Estado Actual</h2>
          </div>

          <div className="space-y-6">
            {/* Credit Balance Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Créditos Disponibles
              </h3>
              <CreditBalance
                planCredits={credits.planCredits}
                addonCredits={credits.addonCredits}
              />
            </Card>

            {/* Plan Info Card */}
            {activePlan ? (
              <PlanInfoCard
                planType={activePlan.type}
                status={activePlan.status}
                resetDate={activePlan.resetDate}
                expirationDate={activePlan.endDate}
              />
            ) : (
              <Card className="p-6 shadow-sm border-sidebar-border bg-muted/50">
                <h3 className="font-semibold text-lg mb-2">
                  Aún no tienes un plan activo
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Suscríbete para obtener créditos mensuales y beneficios
                  exclusivos.
                </p>
                <Link href="/planes">
                  <Button variant="outline" className="w-full">
                    Ver Planes
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Recent Analyses */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between h-9">
            <h2 className="text-xl font-semibold">Tus Últimos Análisis</h2>
            <Link href="/dashboard/historial">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <IconHistory className="mr-2" size={16} />
                Ver historial completo
              </Button>
            </Link>
          </div>

          {recentAnalyses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAnalyses.map((analysis) => (
                <AnalysisCard
                  key={analysis.id}
                  id={analysis.id}
                  imageUrl={analysis.imageUrl || ""}
                  createdAt={analysis.createdAt}
                  status={analysis.status}
                  className="h-full"
                />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-12 px-4 text-center border-dashed shadow-sm">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <IconUpload size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                ¡Hora de tu primer análisis!
              </h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Sube una foto de tu vidriera y recibe recomendaciones expertas
                para atraer más clientes.
              </p>
              <Link href="/dashboard/subir">
                <Button>Comenzar mi primer análisis</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
