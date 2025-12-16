import { redirect } from "next/navigation";
import { getAnalysisById } from "@/actions/analysis/get-analysis-by-id";
import { AnalysisResultClient } from "./analysis-result-client";

interface AnalysisPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  // Get analysis ID from params (params is now async in Next.js 15)
  const { id } = await params;
  const analysisId = parseInt(id, 10);

  if (isNaN(analysisId)) {
    redirect("/dashboard");
  }

  // Fetch analysis data
  const result = await getAnalysisById(analysisId);

  if (!result.success) {
    // Show error page or redirect
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-muted-foreground">{result.error}</p>
          <a
            href="/dashboard"
            className="inline-block text-primary hover:underline"
          >
            Volver al dashboard
          </a>
        </div>
      </div>
    );
  }

  const analysis = result.analysis;

  // Check if analysis is completed
  if (analysis.status !== "completed") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Análisis en proceso</h1>
          <p className="text-muted-foreground">
            Tu análisis aún está siendo procesado. Por favor, vuelve en unos
            momentos.
          </p>
          <a
            href="/dashboard"
            className="inline-block text-primary hover:underline"
          >
            Volver al dashboard
          </a>
        </div>
      </div>
    );
  }

  // Check if diagnosis exists
  if (!analysis.diagnosis) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-muted-foreground">
            No se pudo cargar el diagnóstico del análisis
          </p>
          <a
            href="/dashboard"
            className="inline-block text-primary hover:underline"
          >
            Volver al dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <AnalysisResultClient
      analysis={{
        id: analysis.id.toString(),
        imageUrl: analysis.imageUrl,
        createdAt: analysis.createdAt,
        diagnosis: analysis.diagnosis,
        pdfR2Key: analysis.pdfR2Key,
      }}
    />
  );
}
