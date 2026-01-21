import { DarkModeToggle } from "@/components/common/darkmode-toggle";
import AppSidebar from "@/components/common/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AuthHydrator from "@/providers/auth-store-provider";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

  return (
    <AuthHydrator token={token}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-x-hidden">
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="cursor-pointer" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              {/* <DashboardBreadcrumb /> */}
            </div>
            <div className="px-4">
              <DarkModeToggle />
            </div>
          </header>
          <main className="flex flex-1 flex-col items-start gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthHydrator>
  );
}
