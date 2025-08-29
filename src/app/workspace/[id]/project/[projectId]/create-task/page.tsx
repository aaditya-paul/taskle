"use client";

import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {
  Calendar,
  Clock,
  Users,
  Tag,
  AlertCircle,
  CheckCircle,
  Flag,
  Plus,
  X,
  User,
} from "lucide-react";

interface Task {
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "done";
  assignedTo: string[];
  dueDate: string;
  tags: string[];
  estimatedHours: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

const CreateTaskPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignedTo: [],
    dueDate: "",
    tags: [],
    estimatedHours: 1,
  });

  const [newTag, setNewTag] = useState("");

  // Mock team members - in a real app, this would come from the project data
  const teamMembers: TeamMember[] = [
    {id: "1", name: "Alex Johnson", role: "Frontend Developer"},
    {id: "2", name: "Sam Wilson", role: "Backend Developer"},
    {id: "3", name: "Jordan Kim", role: "Designer"},
    {id: "4", name: "Casey Brown", role: "QA Engineer"},
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the task data to an API
    console.log("Creating task:", task);
    // Redirect back to project dashboard
    router.push(`/workspace/${params.id}/project/${projectId}`);
  };

  const addTag = () => {
    if (newTag.trim() && !task.tags.includes(newTag.trim())) {
      setTask({
        ...task,
        tags: [...task.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTask({
      ...task,
      tags: task.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const toggleAssignee = (memberId: string) => {
    setTask({
      ...task,
      assignedTo: task.assignedTo.includes(memberId)
        ? task.assignedTo.filter((id) => id !== memberId)
        : [...task.assignedTo, memberId],
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-virgil text-yellow-300 font-bold mb-2">
            Create New Task
          </h1>
          <p className="font-patrick-hand text-foreground/70 text-lg">
            Add a new task to your project and assign it to team members
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            {/* Task Title */}
            <div className="mb-6">
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({...task, title: e.target.value})}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="Enter task title..."
                required
              />
            </div>

            {/* Task Description */}
            <div className="mb-6">
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Description
              </label>
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask({...task, description: e.target.value})
                }
                rows={4}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
                placeholder="Describe the task in detail..."
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  Priority
                </label>
                <select
                  value={task.priority}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  Status
                </label>
                <select
                  value={task.status}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      status: e.target.value as Task["status"],
                    })
                  }
                  className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            {/* Due Date and Estimated Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={task.dueDate}
                  onChange={(e) => setTask({...task, dueDate: e.target.value})}
                  className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={task.estimatedHours}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      estimatedHours: parseFloat(e.target.value),
                    })
                  }
                  className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                />
              </div>
            </div>

            {/* Assign to Team Members */}
            <div className="mb-6">
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-3">
                Assign to Team Members
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => toggleAssignee(member.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      task.assignedTo.includes(member.id)
                        ? "border-yellow-400/50 bg-yellow-400/10"
                        : "border-gray-600/50 bg-gray-700/20 hover:border-gray-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <User size={16} className="text-gray-900" />
                      </div>
                      <div className="flex-1">
                        <p className="font-patrick-hand text-foreground font-medium">
                          {member.name}
                        </p>
                        <p className="text-xs font-patrick-hand text-foreground/60">
                          {member.role}
                        </p>
                      </div>
                      {task.assignedTo.includes(member.id) && (
                        <CheckCircle size={20} className="text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-lg text-sm font-patrick-hand text-yellow-300"
                  >
                    <Tag size={14} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-yellow-300/70 hover:text-yellow-300 ml-1"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  className="flex-1 bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-2 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-lg text-yellow-300 hover:bg-yellow-400/30 transition-all duration-200"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 bg-gray-700/20 rounded-lg">
              <h3 className="font-patrick-hand text-foreground/80 mb-3">
                Preview
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <Flag size={12} />
                  {task.priority} priority
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status === "todo" && <Clock size={12} />}
                  {task.status === "in-progress" && <AlertCircle size={12} />}
                  {task.status === "review" && <Clock size={12} />}
                  {task.status === "done" && <CheckCircle size={12} />}
                  {task.status.replace("-", " ")}
                </span>
                {task.assignedTo.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border border-blue-400/50 bg-blue-400/10 text-blue-300">
                    <Users size={12} />
                    {task.assignedTo.length} assigned
                  </span>
                )}
                {task.dueDate && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand border border-purple-400/50 bg-purple-400/10 text-purple-300">
                    <Calendar size={12} />
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col md:flex-row gap-3 pt-6 border-t border-gray-700/50">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!task.title.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-patrick-hand font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
