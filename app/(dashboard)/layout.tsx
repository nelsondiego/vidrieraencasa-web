import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const user = await getCurrentUser();

  // If no user (session expired or not logged in), redirect to login
  if (!user) {
    redirect("/login?expired=true");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      <Sidebar userEmail={user.email} userName={user.fullName} />
      <div className="flex-1 flex flex-col min-h-screen relative">
        <MobileNav userEmail={user.email} userName={user.fullName} />
        <div className="hidden md:block absolute top-6 right-8 z-10">
          <ThemeToggle />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
