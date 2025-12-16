"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AnalysisHistoryList } from "@/components/analysis/analysis-history-list";
import { NoHistoryState } from "@/components/dashboard/no-history-state";

interface HistoryPageClientProps {
  analyses: Array<{
    id: number;
    imageUrl: string;
    createdAt: Date;
    status: "pending" | "processing" | "completed" | "failed";
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function HistoryPageClient({
  analyses,
  pagination,
}: HistoryPageClientProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/historial?page=${page}`);
  };

  const handleUploadAction = () => {
    router.push("/dashboard/subir");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <IconArrowLeft className="mr-2" size={16} />
            Volver al Panel
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Historial de Análisis</h1>
            <p className="text-muted-foreground mt-2">
              {pagination.totalItems === 0
                ? "Aún no has analizado ninguna vidriera."
                : `${pagination.totalItems} ${
                    pagination.totalItems === 1 ? "análisis" : "análisis"
                  } en total`}
            </p>
          </div>
          <Link href="/dashboard/subir">
            <Button>
              <IconUpload className="mr-2" size={20} />
              Analizar nueva vidriera
            </Button>
          </Link>
        </div>
      </div>

      {/* History List or Empty State */}
      {analyses.length === 0 ? (
        <NoHistoryState onAction={handleUploadAction} />
      ) : (
        <AnalysisHistoryList
          analyses={analyses}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
