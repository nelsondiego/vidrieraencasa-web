"use client";

import { IconPhoto, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "./analysis-result";
import Link from "next/link";

interface DiagnosisData {
  overallAssessment?: string;
  strengths: string[];
  issues: string[];
  priorityFixes?: string[];
  recommendations: string[];
  suggestedSignageText: string;
}

interface AnalysisDetailData {
  id: number;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  completedAt: Date | null;
  diagnosis: DiagnosisData | null;
  imageUrl: string;
  pdfDownloadUrl: string | null;
}

interface AnalysisDetailProps {
  analysis: AnalysisDetailData;
  onDownloadPdf?: (analysisId: number) => Promise<void>;
  className?: string;
}

const STATUS_TEXT = {
  pending: "Pendiente",
  processing: "Procesando",
  completed: "Completado",
  failed: "Fallido",
} as const;

const STATUS_VARIANT = {
  pending: "secondary",
  processing: "default",
  completed: "default",
  failed: "destructive",
} as const;

export function AnalysisDetail({
  analysis,
  onDownloadPdf,
  className = "",
}: AnalysisDetailProps) {
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
      {/* Back button */}
      <Link href="/dashboard/historial">
        <Button variant="ghost" size="sm">
          <IconArrowLeft size={16} className="mr-2" />
          Volver al historial
        </Button>
      </Link>

      {/* Header with status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Detalle del Análisis</h1>
              <p className="text-sm text-muted-foreground">
                Analizado el {formatDate(analysis.createdAt)}
              </p>
              {analysis.completedAt && (
                <p className="text-sm text-muted-foreground">
                  Finalizado el {formatDate(analysis.completedAt)}
                </p>
              )}
            </div>
            <Badge variant={STATUS_VARIANT[analysis.status]} className="w-fit">
              {STATUS_TEXT[analysis.status]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Analysis content based on status */}
      {analysis.status === "completed" && analysis.diagnosis ? (
        <AnalysisResult
          analysis={{
            id: String(analysis.id),
            imageUrl: analysis.imageUrl,
            createdAt: analysis.createdAt,
            diagnosis: {
              ...analysis.diagnosis,
              overallAssessment:
                analysis.diagnosis.overallAssessment ||
                "Evaluación general no disponible.",
              priorityFixes: analysis.diagnosis.priorityFixes || [],
            },
            pdfR2Key: analysis.pdfDownloadUrl,
          }}
          onDownloadPdf={
            onDownloadPdf
              ? async (id) => await onDownloadPdf(Number(id))
              : undefined
          }
        />
      ) : analysis.status === "processing" ? (
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <Spinner />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Procesando tu imagen con tecnología avanzada...
                </h3>
                <p className="text-sm text-muted-foreground">
                  Estamos generando tu diagnóstico personalizado. Esto tomará
                  solo unos segundos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : analysis.status === "pending" ? (
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <IconPhoto size={48} className="text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Análisis en cola</h3>
                <p className="text-sm text-muted-foreground">
                  Tu vidriera está próxima a ser analizada. Te avisaremos en
                  breve.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <IconPhoto size={48} className="text-destructive" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  No pudimos completar el análisis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ocurrió un error al procesar tu imagen. Ya hemos reembolsado
                  tu crédito para que intentes nuevamente.
                </p>
              </div>
              <Link href="/dashboard/subir">
                <Button>Probar con otra foto</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
