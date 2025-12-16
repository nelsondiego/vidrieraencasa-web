"use client";

import { AnalysisCard } from "./analysis-card";
import { PaginationControls } from "./pagination-controls";

interface AnalysisHistoryItem {
  id: number;
  imageUrl: string;
  createdAt: Date;
  status: "pending" | "processing" | "completed" | "failed";
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface AnalysisHistoryListProps {
  analyses: AnalysisHistoryItem[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  className?: string;
}

export function AnalysisHistoryList({
  analyses,
  pagination,
  onPageChange,
  className = "",
}: AnalysisHistoryListProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Analysis grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyses.map((analysis) => (
          <AnalysisCard
            key={analysis.id}
            id={analysis.id}
            imageUrl={analysis.imageUrl}
            createdAt={analysis.createdAt}
            status={analysis.status}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
