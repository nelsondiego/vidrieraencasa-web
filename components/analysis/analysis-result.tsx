"use client";

import { useState } from "react";
import { IconDownload, IconPhoto } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { SummarySection } from "./summary-section";
import { PriorityFixesSection } from "./priority-fixes-section";
import { StrengthsSection } from "./strengths-section";
import { IssuesSection } from "./issues-section";
import { RecommendationsSection } from "./recommendations-section";
import { SignageSection } from "./signage-section";

interface AnalysisData {
  id: string;
  imageUrl?: string;
  createdAt: Date;
  diagnosis: {
    overallAssessment: string;
    strengths: string[];
    issues: string[];
    priorityFixes: string[];
    recommendations: string[];
    suggestedSignageText: string;
  };
  pdfR2Key?: string | null;
}

interface AnalysisResultProps {
  analysis: AnalysisData;
  onDownloadPdf?: (analysisId: string) => Promise<void>;
  className?: string;
}

export function AnalysisResult({
  analysis,
  onDownloadPdf,
  className = "",
}: AnalysisResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!onDownloadPdf) {
      toast.error("La función de descarga no está disponible");
      return;
    }

    setIsDownloading(true);

    try {
      await onDownloadPdf(analysis.id);
      toast.success("¡Reporte descargado!");
    } catch {
      toast.error("Hubo un error al descargar. Por favor, intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Image and metadata */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {analysis.imageUrl ? (
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={analysis.imageUrl}
                  alt="Vidriera analizada"
                  className="w-full md:w-64 h-auto rounded-lg border border-border object-cover"
                />
              </div>
            ) : (
              <div className="shrink-0 w-full md:w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
                <IconPhoto size={48} className="text-muted-foreground" />
              </div>
            )}

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Resultados del Análisis
                </h2>
                <p className="text-sm text-muted-foreground">
                  Generado el {formatDate(analysis.createdAt)}
                </p>
              </div>

              {onDownloadPdf && (
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  {isDownloading ? (
                    <Spinner className="mr-2" />
                  ) : (
                    <IconDownload className="mr-2" size={20} />
                  )}
                  Descargar reporte PDF
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis sections */}
      <SummarySection
        overallAssessment={analysis.diagnosis.overallAssessment}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <IssuesSection issues={analysis.diagnosis.issues} className="h-full" />
        <StrengthsSection
          strengths={analysis.diagnosis.strengths}
          className="h-full"
        />
      </div>

      <PriorityFixesSection priorityFixes={analysis.diagnosis.priorityFixes} />

      <RecommendationsSection
        recommendations={analysis.diagnosis.recommendations}
      />

      <SignageSection
        suggestedSignageText={analysis.diagnosis.suggestedSignageText}
      />
    </div>
  );
}
