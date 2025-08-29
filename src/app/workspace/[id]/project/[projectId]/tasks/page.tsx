"use client";

import React, {useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";
import {
  Search,
  Grid3X3,
  List,
  Calendar,
  Clock,
  Users,
  Tag,
  AlertCircle,
  CheckCircle,
  Circle,
  User,
  MoreHorizontal,
  Plus,
  Flag,
  Eye,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "done";
  assignedTo: string[];
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

const TasksPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");

  // Mock team members
  const teamMembers: TeamMember[] = [
    {id: "1", name: "Alex Johnson", role: "Frontend Developer"},
    {id: "2", name: "Sam Wilson", role: "Backend Developer"},
    {id: "3", name: "Jordan Kim", role: "Designer"},
    {id: "4", name: "Casey Brown", role: "QA Engineer"},
  ];

  // Mock tasks data
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new user interface",
      description: "Create mockups and wireframes for the new dashboard",
      priority: "high",
      status: "in-progress",
      assignedTo: ["3"],
      dueDate: "2024-02-15",
      tags: ["design", "ui", "mockups"],
      estimatedHours: 8,
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      title: "Implement authentication system",
      description: "Set up JWT authentication with refresh tokens",
      priority: "urgent",
      status: "todo",
      assignedTo: ["2"],
      dueDate: "2024-02-10",
      tags: ["backend", "auth", "security"],
      estimatedHours: 12,
      createdAt: "2024-01-18",
    },
    {
      id: "3",
      title: "Write unit tests",
      description: "Add comprehensive test coverage for core components",
      priority: "medium",
      status: "review",
      assignedTo: ["4"],
      dueDate: "2024-02-20",
      tags: ["testing", "quality"],
      estimatedHours: 6,
      createdAt: "2024-01-22",
    },
    {
      id: "4",
      title: "Optimize database queries",
      description: "Improve performance of user data retrieval",
      priority: "low",
      status: "done",
      assignedTo: ["2"],
      dueDate: "2024-01-30",
      tags: ["backend", "performance", "database"],
      estimatedHours: 4,
      createdAt: "2024-01-15",
    },
    {
      id: "5",
      title: "Create responsive layouts",
      description: "Ensure all pages work well on mobile devices",
      priority: "medium",
      status: "todo",
      assignedTo: ["1", "3"],
      dueDate: "2024-02-25",
      tags: ["frontend", "responsive", "mobile"],
      estimatedHours: 10,
      createdAt: "2024-01-25",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <Circle size={16} className="text-gray-400" />;
      case "in-progress":
        return <AlertCircle size={16} className="text-blue-400" />;
      case "review":
        return <Eye size={16} className="text-purple-400" />;
      case "done":
        return <CheckCircle size={16} className="text-green-400" />;
      default:
        return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "border-green-400/50 bg-green-400/10 text-green-300",
      medium: "border-yellow-400/50 bg-yellow-400/10 text-yellow-300",
      high: "border-orange-400/50 bg-orange-400/10 text-orange-300",
      urgent: "border-red-400/50 bg-red-400/10 text-red-300",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      todo: "border-gray-400/50 bg-gray-400/10 text-gray-300",
      "in-progress": "border-blue-400/50 bg-blue-400/10 text-blue-300",
      review: "border-purple-400/50 bg-purple-400/10 text-purple-300",
      done: "border-green-400/50 bg-green-400/10 text-green-300",
    };
    return colors[status as keyof typeof colors] || colors.todo;
  };

  const getAssigneeName = (assigneeId: string) => {
    const member = teamMembers.find((m) => m.id === assigneeId);
    return member ? member.name : "Unknown";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    const matchesAssignee =
      filterAssignee === "all" || task.assignedTo.includes(filterAssignee);

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-virgil text-yellow-300 font-bold mb-2">
                Tasks
              </h1>
              <p className="font-patrick-hand text-foreground/70 text-lg">
                Manage and track all project tasks
              </p>
            </div>
            <Link
              href={`/workspace/${params.id}/project/${params.projectId}/create-task`}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-patrick-hand font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              New Task
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="text-2xl font-virgil text-yellow-300 font-bold">
                {taskStats.total}
              </div>
              <div className="text-sm font-patrick-hand text-foreground/70">
                Total Tasks
              </div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="text-2xl font-virgil text-gray-300 font-bold">
                {taskStats.todo}
              </div>
              <div className="text-sm font-patrick-hand text-foreground/70">
                To Do
              </div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="text-2xl font-virgil text-blue-300 font-bold">
                {taskStats.inProgress}
              </div>
              <div className="text-sm font-patrick-hand text-foreground/70">
                In Progress
              </div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="text-2xl font-virgil text-purple-300 font-bold">
                {taskStats.review}
              </div>
              <div className="text-sm font-patrick-hand text-foreground/70">
                In Review
              </div>
            </div>
            <div className="bg-secondary/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="text-2xl font-virgil text-green-300 font-bold">
                {taskStats.done}
              </div>
              <div className="text-sm font-patrick-hand text-foreground/70">
                Done
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg pl-10 pr-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    placeholder="Search tasks..."
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="all">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="done">Done</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>

                <select
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                  className="bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="all">All Assignees</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-600/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 ${
                      viewMode === "grid"
                        ? "bg-yellow-400/20 text-yellow-300"
                        : "bg-gray-700/30 text-foreground/60 hover:bg-gray-700/50"
                    } transition-all duration-200`}
                  >
                    <Grid3X3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 ${
                      viewMode === "list"
                        ? "bg-yellow-400/20 text-yellow-300"
                        : "bg-gray-700/30 text-foreground/60 hover:bg-gray-700/50"
                    } transition-all duration-200`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-yellow-400/30 transition-all duration-200"
              >
                {/* Task Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h3 className="font-patrick-hand text-foreground font-bold text-lg">
                      {task.title}
                    </h3>
                  </div>
                  <button className="text-foreground/50 hover:text-foreground transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Description */}
                <p className="font-patrick-hand text-foreground/70 text-sm mb-4 line-clamp-2">
                  {task.description}
                </p>

                {/* Priority and Status */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    <Flag size={12} />
                    {task.priority}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </div>

                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {task.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700/30 rounded text-xs font-patrick-hand text-foreground/60"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 3 && (
                      <span className="text-xs font-patrick-hand text-foreground/50">
                        +{task.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Assignees */}
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-foreground/50" />
                  <div className="flex -space-x-2">
                    {task.assignedTo.slice(0, 3).map((assigneeId) => (
                      <div
                        key={assigneeId}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-secondary"
                        title={getAssigneeName(assigneeId)}
                      >
                        <User size={12} className="text-gray-900" />
                      </div>
                    ))}
                    {task.assignedTo.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center border-2 border-secondary text-xs font-patrick-hand text-foreground/70">
                        +{task.assignedTo.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Date and Estimated Hours */}
                <div className="flex items-center justify-between text-xs font-patrick-hand text-foreground/60">
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {task.estimatedHours}h
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/30">
                  <tr>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Task
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Status
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Priority
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Assignees
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Due Date
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Hours
                    </th>
                    <th className="text-left p-4 font-patrick-hand text-foreground/80">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-t border-gray-700/30 hover:bg-gray-700/20"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(task.status)}
                          <div>
                            <h3 className="font-patrick-hand text-foreground font-medium">
                              {task.title}
                            </h3>
                            <p className="text-sm font-patrick-hand text-foreground/60 line-clamp-1">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          <Flag size={12} />
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex -space-x-2">
                          {task.assignedTo.slice(0, 3).map((assigneeId) => (
                            <div
                              key={assigneeId}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-secondary"
                              title={getAssigneeName(assigneeId)}
                            >
                              <User size={12} className="text-gray-900" />
                            </div>
                          ))}
                          {task.assignedTo.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center border-2 border-secondary text-xs font-patrick-hand text-foreground/70">
                              +{task.assignedTo.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-sm font-patrick-hand text-foreground/70">
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm font-patrick-hand text-foreground/70">
                          <Clock size={12} />
                          {task.estimatedHours}h
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-foreground/50 hover:text-foreground transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/30 flex items-center justify-center">
              <List size={32} className="text-foreground/50" />
            </div>
            <h3 className="text-xl font-virgil text-foreground/70 mb-2">
              No tasks found
            </h3>
            <p className="font-patrick-hand text-foreground/50">
              {searchTerm ||
              filterStatus !== "all" ||
              filterPriority !== "all" ||
              filterAssignee !== "all"
                ? "Try adjusting your filters or search terms"
                : "Create your first task to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
