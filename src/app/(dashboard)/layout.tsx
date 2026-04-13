import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { SessionRefresher } from "@/components/dashboard/session-refresher";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Redirect OAuth new users to complete their onboarding
  if (session.user.onboardingCompleted === false) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SessionRefresher />
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="lg:pt-0 pt-14">
          {children}
        </div>
      </main>
    </div>
  );
}
