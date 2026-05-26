import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </AuthGuard>
  );
}
