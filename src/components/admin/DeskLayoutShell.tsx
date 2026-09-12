"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function DeskLayoutInner({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <AdminSidebar />
      <div
        className={`transition-all duration-300 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-60"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function DeskLayoutShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DeskLayoutInner>{children}</DeskLayoutInner>
    </SidebarProvider>
  );
}
