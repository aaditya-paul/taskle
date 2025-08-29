"use client";
import React, {useState} from "react";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {
  LayoutDashboardIcon,
  PlusIcon,
  ListTodoIcon,
  MessageSquareIcon,
  PresentationIcon,
  ArrowLeftIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  FileTextIcon,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
}

interface ProjectSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  projectName?: string;
}

function ProjectSidebar({
  isMobileOpen = false,
  onMobileClose,
  projectName = "Project",
}: ProjectSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const workspaceId = params.id as string;
  const projectId = params.projectId as string;

  const [isTasksOpen, setIsTasksOpen] = useState(true);

  // Mock tasks data - in a real app, this would come from an API
  const tasks: Task[] = [
    {
      id: "1",
      title: "Design System Setup",
      status: "completed",
      priority: "high",
    },
    {
      id: "2",
      title: "User Flow Mapping",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "3",
      title: "Prototype Development",
      status: "todo",
      priority: "medium",
    },
    {id: "4", title: "Component Library", status: "todo", priority: "high"},
    {id: "5", title: "User Testing", status: "review", priority: "medium"},
  ];

  const mainRoutes = [
    {
      label: "Dashboard",
      path: `/workspace/${workspaceId}/project/${projectId}`,
      icon: LayoutDashboardIcon,
    },
    {
      label: "Create Task",
      path: `/workspace/${workspaceId}/project/${projectId}/create-task`,
      icon: PlusIcon,
    },
    {
      label: "View Tasks",
      path: `/workspace/${workspaceId}/project/${projectId}/tasks`,
      icon: ListTodoIcon,
    },
    {
      label: "Chat",
      path: `/workspace/${workspaceId}/project/${projectId}/chat`,
      icon: MessageSquareIcon,
    },
    {
      label: "Whiteboard",
      path: `/workspace/${workspaceId}/project/${projectId}/whiteboard`,
      icon: PresentationIcon,
    },
  ];

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon size={12} className="text-green-400" />;
      case "in-progress":
        return <ClockIcon size={12} className="text-blue-400" />;
      case "review":
        return <AlertCircleIcon size={12} className="text-yellow-400" />;
      case "todo":
        return <FileTextIcon size={12} className="text-gray-400" />;
      default:
        return <FileTextIcon size={12} className="text-gray-400" />;
    }
  };

  const getPriorityDot = (priority: string) => {
    const colors = {
      low: "bg-blue-400",
      medium: "bg-yellow-400",
      high: "bg-orange-400",
      urgent: "bg-red-400",
    };
    return colors[priority as keyof typeof colors] || "bg-gray-400";
  };

  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-secondary/80 backdrop-blur-xl border-r border-gray-700/50
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href={`/workspace/${workspaceId}`}
                  className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200"
                >
                  <ArrowLeftIcon size={20} />
                </Link>
                <div>
                  <h2 className="font-virgil text-xl text-yellow-300 font-bold truncate">
                    {projectName}
                  </h2>
                  <p className="text-sm font-patrick-hand text-foreground/60">
                    Project Dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={onMobileClose}
                className="lg:hidden p-2 text-foreground/70 hover:text-foreground hover:bg-gray-700/20 rounded-lg transition-colors duration-200"
              >
                <XIcon size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-2">
              {mainRoutes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={onMobileClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl font-patrick-hand font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-yellow-300/10 text-yellow-300 border border-yellow-300/20"
                          : "text-foreground/80 hover:text-yellow-300 hover:bg-gray-700/20"
                      }
                    `}
                  >
                    <route.icon size={20} />
                    {route.label}
                  </Link>
                );
              })}
            </nav>

            {/* Tasks Section */}
            <div className="mt-6 px-4">
              <button
                onClick={() => setIsTasksOpen(!isTasksOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-foreground/80 hover:text-yellow-300 font-patrick-hand font-medium transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <ListTodoIcon size={20} />
                  <span>Quick Tasks</span>
                </div>
                {isTasksOpen ? (
                  <ChevronDownIcon size={16} />
                ) : (
                  <ChevronRightIcon size={16} />
                )}
              </button>

              {isTasksOpen && (
                <div className="mt-2 space-y-1">
                  {/* Task Status Summary */}
                  <div className="px-4 py-2 bg-gray-700/20 rounded-lg mb-3">
                    <div className="grid grid-cols-2 gap-2 text-xs font-patrick-hand">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">Completed</span>
                        <span className="text-green-400 font-medium">
                          {tasksByStatus.completed || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">In Progress</span>
                        <span className="text-blue-400 font-medium">
                          {tasksByStatus["in-progress"] || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">Review</span>
                        <span className="text-yellow-400 font-medium">
                          {tasksByStatus.review || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/60">Todo</span>
                        <span className="text-gray-400 font-medium">
                          {tasksByStatus.todo || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Tasks */}
                  <div className="space-y-1">
                    {tasks.slice(0, 5).map((task) => (
                      <Link
                        key={task.id}
                        href={`/workspace/${workspaceId}/project/${projectId}/task/${task.id}`}
                        onClick={onMobileClose}
                        className="flex items-center gap-3 px-4 py-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/10 rounded-lg transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2">
                          {getTaskStatusIcon(task.status)}
                          <div
                            className={`w-2 h-2 rounded-full ${getPriorityDot(
                              task.priority
                            )}`}
                          />
                        </div>
                        <span className="text-sm font-patrick-hand truncate flex-1 group-hover:text-yellow-300 transition-colors duration-200">
                          {task.title}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* View All Tasks Link */}
                  <Link
                    href={`/workspace/${workspaceId}/project/${projectId}/tasks`}
                    onClick={onMobileClose}
                    className="flex items-center justify-center gap-2 px-4 py-2 mt-3 text-yellow-300/80 hover:text-yellow-300 hover:bg-yellow-300/5 rounded-lg transition-all duration-200 font-patrick-hand text-sm"
                  >
                    <ListTodoIcon size={14} />
                    View All Tasks
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="bg-gray-700/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-patrick-hand text-foreground/80">
                  Project Active
                </span>
              </div>
              <p className="text-xs font-patrick-hand text-foreground/60">
                {tasks.length} total tasks • {tasksByStatus.completed || 0}{" "}
                completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSidebar;
