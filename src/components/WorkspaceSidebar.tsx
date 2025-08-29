"use client";
import React, {useState} from "react";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {
  LayoutDashboardIcon,
  PlusIcon,
  FolderIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SettingsIcon,
  UsersIcon,
  XIcon,
  ArrowLeftIcon,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: "active" | "on-hold" | "completed";
}

interface WorkspaceSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  workspaceName?: string;
}

function WorkspaceSidebar({
  isMobileOpen = false,
  onMobileClose,
  workspaceName = "Workspace",
}: WorkspaceSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const workspaceId = params.id as string;

  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  // Mock projects data - in a real app, this would come from an API
  const projects: Project[] = [
    {id: "1", name: "Mobile App Redesign", status: "active"},
    {id: "2", name: "Backend API v2", status: "active"},
    {id: "3", name: "User Research Initiative", status: "on-hold"},
    {id: "4", name: "Marketing Campaign", status: "completed"},
  ];

  const mainRoutes = [
    {
      label: "Dashboard",
      path: `/workspace/${workspaceId}`,
      icon: LayoutDashboardIcon,
    },
    {
      label: "Create Project",
      path: `/workspace/${workspaceId}/create-project`,
      icon: PlusIcon,
    },
    {
      label: "Team Members",
      path: `/workspace/${workspaceId}/members`,
      icon: UsersIcon,
    },
    {
      label: "Settings",
      path: `/workspace/${workspaceId}/settings`,
      icon: SettingsIcon,
    },
  ];

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-400";
      case "on-hold":
        return "bg-yellow-400";
      case "completed":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative h-screen w-64 bg-secondary/95 backdrop-blur-md border-r border-gray-700/50 flex flex-col z-50 transition-transform duration-300 ease-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            {/* Mobile Close Button */}
            <button
              onClick={onMobileClose}
              className="lg:hidden p-2 text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-colors duration-200"
            >
              <XIcon size={20} />
            </button>

            {/* Back to Main Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-foreground/70 hover:text-yellow-300 transition-colors duration-200"
            >
              <ArrowLeftIcon size={16} />
              <span className="font-patrick-hand text-sm">Back to Main</span>
            </Link>
          </div>

          {/* Workspace Info */}
          <div>
            <h1 className="text-xl lg:text-2xl font-virgil text-yellow-300 font-bold tracking-wide truncate">
              {workspaceName}
            </h1>
            <p className="text-xs font-patrick-hand text-foreground/60 mt-1">
              Workspace ID: {workspaceId}
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto min-h-0">
          {mainRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-patrick-hand text-lg transition-all duration-200 ${
                pathname === route.path
                  ? "bg-yellow-300/20 text-yellow-300 border border-yellow-300/30"
                  : "text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20"
              }`}
            >
              <route.icon size={20} />
              {route.label}
            </Link>
          ))}

          {/* Projects Section */}
          <div className="pt-4">
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-foreground/80 hover:text-yellow-300 font-patrick-hand text-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <FolderIcon size={20} />
                Projects
              </div>
              {isProjectsOpen ? (
                <ChevronDownIcon size={16} />
              ) : (
                <ChevronRightIcon size={16} />
              )}
            </button>

            {/* Projects List */}
            {isProjectsOpen && (
              <div className="ml-4 mt-2 space-y-1 max-h-[25vh] lg:max-h-[35vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-700/20 scrollbar-thumb-yellow-300/40 hover:scrollbar-thumb-yellow-300/60">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/workspace/${workspaceId}/project/${project.id}`}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand transition-all duration-200 ${
                      pathname ===
                      `/workspace/${workspaceId}/project/${project.id}`
                        ? "bg-yellow-300/20 text-yellow-300"
                        : "text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${getProjectStatusColor(
                        project.status
                      )}`}
                      title={`Status: ${project.status}`}
                    ></div>
                    <span className="truncate flex-1">{project.name}</span>
                  </Link>
                ))}

                {/* Add New Project Quick Link */}
                <Link
                  href={`/workspace/${workspaceId}/create-project`}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-foreground/50 hover:text-yellow-300 hover:bg-gray-700/10 transition-all duration-200"
                >
                  <PlusIcon size={16} />
                  <span className="text-sm">Add new project</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Actions */}
        <div className="border-t border-gray-700/50 p-4">
          <div className="space-y-2">
            <Link
              href={`/workspace/${workspaceId}/invite`}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-sm text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10 transition-all duration-200 w-full"
            >
              <UsersIcon size={16} />
              Invite Members
            </Link>

            <Link
              href={`/workspace/${workspaceId}/analytics`}
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-sm text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10 transition-all duration-200 w-full"
            >
              <LayoutDashboardIcon size={16} />
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkspaceSidebar;
