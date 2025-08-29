"use client";
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import {MenuIcon} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({children}: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-4 right-4 lg:hidden z-30 p-2 bg-secondary/90 backdrop-blur-md border border-gray-700/50 rounded-lg text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20 transition-colors duration-200"
      >
        <MenuIcon size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-0">
        <div className="lg:hidden "></div> {/* Spacer for mobile menu button */}
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
