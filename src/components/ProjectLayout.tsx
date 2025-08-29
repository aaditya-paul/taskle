"use client";
import React, {useState} from "react";
import {MenuIcon} from "lucide-react";
import ProjectSidebar from "@/components/ProjectSidebar";

interface ProjectLayoutProps {
  children: React.ReactNode;
  projectName?: string;
}

function ProjectLayout({children, projectName}: ProjectLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#1B1615]">
      {/* Sidebar */}
      <ProjectSidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        projectName={projectName}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-secondary/50 backdrop-blur-sm border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-colors duration-200"
            >
              <MenuIcon size={20} />
            </button>
            <h1 className="font-patrick-hand text-lg text-foreground/90 truncate">
              {projectName || "Project"}
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default ProjectLayout;
