import { UploadPageClient } from "./upload-page-client";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  // Protected by proxy - no need to check session here
  return <UploadPageClient />;
}
