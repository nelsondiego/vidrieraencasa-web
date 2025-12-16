"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnalysisLoading } from "@/components/analysis/analysis-loading";
import { NoCreditsState } from "@/components/dashboard/no-credits-state";
import { uploadImage } from "@/actions/analysis/upload-image";
import { analyzeImage } from "@/actions/analysis/analyze-image";
import { getAvailableCredits } from "@/actions/credits/get-available-credits";
import { ImageUploadForm } from "./image-upload-form";

export function UploadPageClient() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [hasCredits, setHasCredits] = useState(true);

  // Check credits on mount
  useEffect(() => {
    const checkCredits = async () => {
      setIsLoadingCredits(true);
      const result = await getAvailableCredits();

      if (result.success) {
        const totalCredits = result.credits.total;
        setHasCredits(totalCredits > 0);

        if (totalCredits === 0) {
          toast.error("No tienes créditos disponibles");
        }
      } else {
        toast.error(result.error);
      }

      setIsLoadingCredits(false);
    };

    checkCredits();
  }, []);

  const handleUploadComplete = async (formData: FormData) => {
    // Double-check credits before upload
    const creditsCheck = await getAvailableCredits();
    if (!creditsCheck.success) {
      toast.error(creditsCheck.error);
      return;
    }

    if (creditsCheck.credits.total === 0) {
      toast.error("No tienes créditos suficientes para realizar este análisis");
      setHasCredits(false);
      return;
    }

    setIsProcessing(true);

    try {
      // Upload image
      const uploadResult = await uploadImage(formData);

      if (!uploadResult.success) {
        toast.error(uploadResult.error);
        setIsProcessing(false);
        return;
      }

      toast.success("¡Imagen subida! Iniciando análisis...");

      // Analyze image
      const analysisResult = await analyzeImage(uploadResult.imageId);

      if (!analysisResult.success) {
        toast.error(analysisResult.error);
        setIsProcessing(false);
        return;
      }

      // Redirect to analysis result page
      toast.success("¡Tu vidriera ha sido analizada!");
      router.push(`/dashboard/analisis/${analysisResult.analysisId}`);
    } catch (error) {
      console.error("Upload and analysis error:", error);
      toast.error("Ups, algo salió mal. Por favor, inténtalo de nuevo.");
      setIsProcessing(false);
    }
  };

  const handleGoToPlans = () => {
    router.push("/planes");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <IconArrowLeft className="mr-2" size={16} />
            Volver al Panel
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nuevo Análisis</h1>
        <p className="text-muted-foreground mt-2">
          Sube una foto de tu vidriera y obtén un diagnóstico profesional
          instantáneo para atraer más clientes.
        </p>
      </div>

      {/* Upload Form, Loading State, or No Credits State */}
      <Card className="p-6">
        {isLoadingCredits ? (
          <AnalysisLoading message="Verificando créditos disponibles..." />
        ) : !hasCredits ? (
          <NoCreditsState onAction={handleGoToPlans} />
        ) : isProcessing ? (
          <AnalysisLoading message="Procesando tu imagen con tecnología avanzada..." />
        ) : (
          <ImageUploadForm onUploadComplete={handleUploadComplete} />
        )}
      </Card>
    </div>
  );
}
