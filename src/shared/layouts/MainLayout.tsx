import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../ui/AppSidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1">
          <div className="flex items-center gap-2 px-7 py-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
