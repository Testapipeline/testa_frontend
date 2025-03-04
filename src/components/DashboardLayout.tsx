import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Menu } from "lucide-react";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <button
                className="md:hidden p-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu className="h-8 w-8 text-gray-600" />
            </button>
            <div
                className={`fixed inset-0 z-40 flex md:hidden transform transition-transform duration-700 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div
                    className="fixed inset-0 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <DashboardSidebar />
                </div>
            </div>
            <div className="hidden md:flex">
                <DashboardSidebar />
            </div>
            <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
    );
};