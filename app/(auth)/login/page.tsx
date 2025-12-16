import { Suspense } from "react";
import { LoginPageClient } from "./login-page-client";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner className="w-12 h-12" />
        </div>
      }
    >
      <LoginPageClient />
    </Suspense>
  );
}
