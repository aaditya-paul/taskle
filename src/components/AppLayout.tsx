import React from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({children}: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default AppLayout;
