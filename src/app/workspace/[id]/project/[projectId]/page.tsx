"use client";
import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  Plus,
  MoreVertical,
  Tag,
  DollarSign,
  Settings,
  Edit,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "active" | "on-hold" | "completed";
  teamIds: string[];
  memberIds: string[];
  taskCount: number;
  progress: number;
  dueDate?: string;
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
  budget?: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const ProjectPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // Mock project data - in a real app, this would come from an API
  const [project] = useState<Project>({
    id: projectId,
    name: "Mobile App Redesign",
    description:
      "Complete overhaul of the mobile application UI/UX with modern design principles and enhanced user experience.",
    status: "active",
    teamIds: ["1", "3"],
    memberIds: ["1", "2", "4"],
    taskCount: 23,
    progress: 65,
    dueDate: "2025-09-15",
    priority: "high",
    tags: ["mobile", "ui-ux", "redesign", "frontend"],
    budget: "$25,000",
    createdAt: "2025-08-20",
  });

  // Mock tasks data
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design System Setup",
      description:
        "Create a comprehensive design system with components, colors, and typography",
      status: "completed",
      priority: "high",
      assignedTo: "1",
      dueDate: "2025-09-01",
      createdAt: "2025-08-20",
      updatedAt: "2025-08-25",
    },
    {
      id: "2",
      title: "User Flow Mapping",
      description:
        "Map out all user flows and create wireframes for key screens",
      status: "in-progress",
      priority: "high",
      assignedTo: "2",
      dueDate: "2025-09-05",
      createdAt: "2025-08-22",
      updatedAt: "2025-08-28",
    },
    {
      id: "3",
      title: "Prototype Development",
      description: "Build interactive prototypes for user testing",
      status: "todo",
      priority: "medium",
      assignedTo: "1",
      dueDate: "2025-09-10",
      createdAt: "2025-08-23",
      updatedAt: "2025-08-23",
    },
    {
      id: "4",
      title: "Component Library",
      description: "Develop reusable React components based on design system",
      status: "todo",
      priority: "high",
      assignedTo: "4",
      dueDate: "2025-09-12",
      createdAt: "2025-08-24",
      updatedAt: "2025-08-24",
    },
  ]);

  // Mock team members
  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@company.com",
      role: "UI/UX Designer",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "Product Designer",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "Frontend Developer",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "on-hold":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "completed":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "high":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "urgent":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    review: tasks.filter((task) => task.status === "review"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-secondary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-2 text-sm font-patrick-hand text-foreground/60">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-yellow-300">Project</span>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-virgil text-yellow-300 font-bold">
                    {project.name}
                  </h1>
                  <span className="text-sm font-patrick-hand text-foreground/60 bg-gray-700/30 px-2 py-1 rounded-lg">
                    {projectId}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getPriorityColor(
                      project.priority
                    )}`}
                  >
                    {project.priority} priority
                  </span>
                </div>
                <p className="font-patrick-hand text-foreground/80 text-base md:text-lg mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {project.dueDate && (
                    <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                      <Calendar size={16} />
                      Due {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                    <Users size={16} />
                    {members.length} members
                  </span>
                  <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                    <CheckCircle size={16} />
                    {tasks.length} tasks
                  </span>
                  {project.budget && (
                    <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                      <DollarSign size={16} />
                      {project.budget}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                  <Edit size={20} />
                </button>
                <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                  <Settings size={20} />
                </button>
                <button className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-yellow-300/25 flex items-center gap-2">
                  <Plus size={18} />
                  Add Task
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-patrick-hand text-foreground/70">
                <span>Project Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-3 rounded-full transition-all duration-300"
                  style={{width: `${project.progress}%`}}
                ></div>
              </div>
            </div>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-yellow-300/10 text-yellow-300 border border-yellow-300/20 px-2 py-1 rounded-lg text-xs font-patrick-hand"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Task Board */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-virgil text-foreground font-bold mb-6">
              Task Board
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div
                  key={status}
                  className="bg-secondary/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-virgil text-foreground font-bold capitalize">
                      {status.replace("-", " ")}
                    </h3>
                    <span className="bg-gray-700/50 text-foreground/70 px-2 py-1 rounded-lg text-xs font-patrick-hand">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-secondary/50 border border-gray-700/30 rounded-lg p-3 hover:bg-secondary/70 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-patrick-hand font-medium text-foreground text-sm group-hover:text-yellow-300 transition-colors duration-200">
                            {task.title}
                          </h4>
                          <button className="opacity-0 group-hover:opacity-100 p-1 text-foreground/50 hover:text-foreground/80 transition-all duration-200">
                            <MoreVertical size={14} />
                          </button>
                        </div>

                        <p className="font-patrick-hand text-foreground/70 text-xs mb-3 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-patrick-hand ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                          {task.assignedTo && (
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center text-black font-patrick-hand font-bold text-xs">
                              {members
                                .find((m) => m.id === task.assignedTo)
                                ?.name.split(" ")
                                .map((n) => n[0])
                                .join("") || "?"}
                            </div>
                          )}
                        </div>

                        {task.dueDate && (
                          <div className="mt-2 pt-2 border-t border-gray-700/30">
                            <span className="text-xs font-patrick-hand text-foreground/60 flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    <button className="w-full border-2 border-dashed border-gray-700/50 rounded-lg p-3 text-gray-600 hover:border-yellow-300/50 hover:text-yellow-300 transition-all duration-200 flex items-center justify-center gap-2 font-patrick-hand text-sm">
                      <Plus size={16} />
                      Add Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4">
              <h3 className="font-virgil text-foreground font-bold mb-4">
                Team Members
              </h3>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center text-black font-patrick-hand font-bold text-sm">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-patrick-hand font-medium text-foreground text-sm truncate">
                        {member.name}
                      </h4>
                      <p className="font-patrick-hand text-foreground/60 text-xs truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
                <button className="w-full border border-gray-700/50 rounded-lg p-2 text-gray-600 hover:border-yellow-300/50 hover:text-yellow-300 transition-all duration-200 flex items-center justify-center gap-2 font-patrick-hand text-sm">
                  <Plus size={14} />
                  Add Member
                </button>
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-secondary/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4">
              <h3 className="font-virgil text-foreground font-bold mb-4">
                Project Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-patrick-hand text-foreground/70 text-sm">
                    Total Tasks
                  </span>
                  <span className="font-patrick-hand text-foreground font-medium">
                    {tasks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-patrick-hand text-foreground/70 text-sm">
                    Completed
                  </span>
                  <span className="font-patrick-hand text-green-400 font-medium">
                    {tasksByStatus.completed.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-patrick-hand text-foreground/70 text-sm">
                    In Progress
                  </span>
                  <span className="font-patrick-hand text-blue-400 font-medium">
                    {tasksByStatus["in-progress"].length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-patrick-hand text-foreground/70 text-sm">
                    Remaining
                  </span>
                  <span className="font-patrick-hand text-yellow-400 font-medium">
                    {tasksByStatus.todo.length}
                  </span>
                </div>
                <hr className="border-gray-700/50" />
                <div className="flex items-center justify-between">
                  <span className="font-patrick-hand text-foreground/70 text-sm">
                    Progress
                  </span>
                  <span className="font-patrick-hand text-yellow-300 font-medium">
                    {project.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
