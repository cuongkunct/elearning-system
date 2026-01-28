// app/admin/layout.tsx
import { Navbar } from "@/components/admin/navbar";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F9F9F9] pb-12 px-4 py-6">
      <Navbar />
      <div className="flex flex-1 pt-6">
        <AdminSidebar />
        <main className="flex-1 px-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
