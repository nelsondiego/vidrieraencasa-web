"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AnalysisResult } from "@/components/analysis/analysis-result";
import { generatePDFReport } from "@/actions/analysis/generate-pdf-report";
import { api } from "@/lib/api";

interface AnalysisResultClientProps {
  analysis: {
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
  };
}

export function AnalysisResultClient({ analysis }: AnalysisResultClientProps) {
  const handleDownloadPdf = async (analysisId: string) => {
    try {
      const numericId = parseInt(analysisId, 10);

      // Generate PDF if it doesn't exist
      if (!analysis.pdfR2Key) {
        const generateResult = await generatePDFReport(numericId);

        if (!generateResult.success) {
          throw new Error(generateResult.error);
        }
      }

      // Download PDF directly from backend using client-side API
      const response = await api.get(`/analysis/${numericId}/pdf`, {
        responseType: "blob",
      });

      // Create temporary link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `analisis-${numericId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <IconArrowLeft className="mr-2" size={16} />
            Volver al dashboard
          </Button>
        </Link>
      </div>

      {/* Analysis Result */}
      <AnalysisResult analysis={analysis} onDownloadPdf={handleDownloadPdf} />
    </div>
  );
}
