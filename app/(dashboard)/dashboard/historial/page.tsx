import { getAnalysisHistory } from "@/actions/analysis/get-analysis-history";
import { HistoryPageClient } from "./history-page-client";

export const dynamic = "force-dynamic";

interface HistoryPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  // Get page from search params (searchParams is now async in Next.js 15)
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10);
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  // Fetch analysis history
  const result = await getAnalysisHistory(currentPage);

  // If error fetching history, show empty state
  if (!result.success) {
    return (
      <HistoryPageClient
        analyses={[]}
        pagination={{
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
        }}
      />
    );
  }

  return (
    <HistoryPageClient
      analyses={result.history.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt,
        status: item.status,
      }))}
      pagination={{
        currentPage: result.pagination.page,
        totalPages: result.pagination.hasMore
          ? result.pagination.page + 1
          : result.pagination.page,
        totalItems: 0, // Unknown without API count
        itemsPerPage: result.pagination.limit,
      }}
    />
  );
}
