import { Navbar } from "@/components/user/layout/navbar";
import Footer from "@/components/user/layout/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow pt-6 px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
