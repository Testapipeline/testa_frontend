import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
type DashboardLayoutProps = {
  children: React.ReactNode;
};
export const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  return <div className="flex h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>;
};