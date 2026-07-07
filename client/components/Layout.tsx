import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Breadcrumb } from "./Breadcrumb";
import { SidebarProvider } from "./ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-[#0a0f19] via-[#0f1520] to-[#070b14]">
        <Sidebar />
        <main className="flex-1 w-full overflow-x-hidden">
          <Breadcrumb />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
