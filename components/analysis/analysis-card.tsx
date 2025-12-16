"use client";

import { IconPhoto, IconCalendar } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface AnalysisCardProps {
  id: number;
  imageUrl: string;
  createdAt: Date;
  status: "pending" | "processing" | "completed" | "failed";
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

export function AnalysisCard({
  id,
  imageUrl,
  createdAt,
  status,
  className = "",
}: AnalysisCardProps) {
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
    <Link href={`/dashboard/analisis/${id}`} className={className}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Image thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageUrl}
                  alt="Vidriera analizada"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconPhoto size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar size={16} />
                  <span>{formatDate(createdAt)}</span>
                </div>
                <Badge variant={STATUS_VARIANT[status]}>
                  {STATUS_TEXT[status]}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
