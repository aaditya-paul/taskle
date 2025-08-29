"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  XIcon,
} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

interface Workspace {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

function Sidebar({isMobileOpen = false, onMobileClose}: SidebarProps) {
  const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    console.log(path);

    setActiveRoute(path);
  }, [router, path]);

  // Sample workspaces data
  const workspaces: Workspace[] = [
    {id: "1", name: "Personal Tasks", color: "bg-yellow-400"},
    {id: "2", name: "Work Projects", color: "bg-blue-400"},
    {id: "3", name: "Side Hustle", color: "bg-green-400"},
    {id: "4", name: "Learning Goals", color: "bg-purple-400"},
  ];

  const mainRoutes = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      label: "Create Workspace",
      path: "/dashboard/create-workspace",
      icon: PlusIcon,
    },
  ];

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
        <div
          className={`${
            isMobileOpen ? "flex-row-reverse items-center" : "flex"
          } flex `}
        >
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={onMobileClose}
              className="p-2 text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-colors duration-200"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Logo Section */}
          <div className="p-6 border-b border-gray-700/50  ">
            <h1 className="text-2xl font-virgil text-yellow-300 font-bold tracking-wide">
              Taskle
            </h1>
            <p className="text-sm font-patrick-hand text-foreground/60 mt-1">
              Handcrafted Productivity
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto min-h-0">
          {mainRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setActiveRoute(route.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-patrick-hand text-lg transition-all duration-200 ${
                activeRoute === route.path
                  ? "bg-yellow-300/20 text-yellow-300 border border-yellow-300/30"
                  : "text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20"
              }`}
            >
              <route.icon size={20} />
              {route.label}
            </Link>
          ))}

          {/* Workspaces Section */}
          <div className="pt-4">
            <button
              onClick={() => setIsWorkspacesOpen(!isWorkspacesOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-foreground/80 hover:text-yellow-300 font-patrick-hand text-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <FolderIcon size={20} />
                Workspaces
              </div>
              {isWorkspacesOpen ? (
                <ChevronDownIcon size={16} />
              ) : (
                <ChevronRightIcon size={16} />
              )}
            </button>

            {/* Workspaces List */}
            {isWorkspacesOpen && (
              <div className="ml-4 mt-2 space-y-1 max-h-[20vh] lg:max-h-[30vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-700/20 scrollbar-thumb-yellow-300/40 hover:scrollbar-thumb-yellow-300/60">
                {workspaces.map((workspace) => (
                  <Link
                    key={workspace.id}
                    href={`/workspace/${workspace.id}`}
                    onClick={() => setActiveRoute(`/workspace/${workspace.id}`)}
                    className={` flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand transition-all duration-200 ${
                      activeRoute === `/workspace/${workspace.id}`
                        ? "bg-yellow-300/20 text-yellow-300"
                        : "text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${workspace.color}`}
                    ></div>
                    <span className="truncate">{workspace.name}</span>
                  </Link>
                ))}

                {/* Add New Workspace */}
                <Link
                  href="/create-workspace"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-foreground/50 hover:text-yellow-300 hover:bg-gray-700/10 transition-all duration-200"
                >
                  <PlusIcon size={16} />
                  <span className="text-sm">Add workspace</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="border-t border-gray-700/50 p-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700/20 transition-colors duration-200 mb-2">
            <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
              <UserIcon size={16} className="text-black" />
            </div>
            <div className="flex-1">
              <p className="font-patrick-hand text-foreground font-medium">
                John Doe
              </p>
              <p className="text-sm text-foreground/60">john@example.com</p>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="space-y-1">
            <Link
              href="/settings"
              onClick={() => setActiveRoute("/settings")}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-sm transition-all duration-200 ${
                activeRoute === "/settings"
                  ? "bg-yellow-300/20 text-yellow-300"
                  : "text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10"
              }`}
            >
              <SettingsIcon size={16} />
              Settings
            </Link>

            <button className="flex items-center gap-3 px-4 py-2 rounded-lg font-patrick-hand text-sm text-foreground/70 hover:text-red-400 hover:bg-gray-700/10 transition-all duration-200 w-full">
              <LogOutIcon size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
