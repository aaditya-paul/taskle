"use client";
import React, {useState} from "react";
import {
  X,
  Calendar,
  Users,
  Target,
  FileText,
  AlertCircle,
  Plus,
  CheckCircle,
} from "lucide-react";
import Modal from "./Modal";

interface ProjectFormData {
  name: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "planning" | "active" | "on-hold" | "completed";
  startDate: string;
  dueDate: string;
  budget: string;
  tags: string[];
  assignedTeams: string[];
  assignedMembers: string[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  memberIds: string[];
  leaderId?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: ProjectFormData) => void;
  workspaceMembers: TeamMember[];
  workspaceTeams: Team[];
  isSubmitting?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  workspaceMembers,
  workspaceTeams,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    priority: "medium",
    status: "planning",
    startDate: "",
    dueDate: "",
    budget: "",
    tags: [],
    assignedTeams: [],
    assignedMembers: [],
  });

  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const statusColors = {
    planning: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    "on-hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (
      formData.startDate &&
      formData.dueDate &&
      formData.startDate > formData.dueDate
    ) {
      newErrors.dueDate = "Due date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof ProjectFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const toggleTeamAssignment = (teamId: string) => {
    const isAssigned = formData.assignedTeams.includes(teamId);
    if (isAssigned) {
      handleInputChange(
        "assignedTeams",
        formData.assignedTeams.filter((id) => id !== teamId)
      );
    } else {
      handleInputChange("assignedTeams", [...formData.assignedTeams, teamId]);
    }
  };

  const toggleMemberAssignment = (memberId: string) => {
    const isAssigned = formData.assignedMembers.includes(memberId);
    if (isAssigned) {
      handleInputChange(
        "assignedMembers",
        formData.assignedMembers.filter((id) => id !== memberId)
      );
    } else {
      handleInputChange("assignedMembers", [
        ...formData.assignedMembers,
        memberId,
      ]);
    }
  };

  // Check if a member is part of assigned teams
  const isMemberInAssignedTeams = (memberId: string): boolean => {
    return formData.assignedTeams.some((teamId) => {
      const team = workspaceTeams.find((t) => t.id === teamId);
      return team?.memberIds.includes(memberId);
    });
  };

  // Filter members to show only those not in assigned teams for individual assignment
  const availableIndividualMembers = workspaceMembers.filter(
    (member) => !isMemberInAssignedTeams(member.id)
  );

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      subtitle="Set up your project with all the details"
      icon={<Target className="w-5 h-5 text-black" />}
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-yellow-300" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full bg-[#1B1615]/80 border rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.name
                    ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                    : "border-gray-700/50 focus:border-yellow-300/80 focus:ring-yellow-300/20"
                }`}
                placeholder="Enter project name..."
              />
              {errors.name && (
                <p className="font-patrick-hand text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full bg-[#1B1615]/80 border rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                  errors.description
                    ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                    : "border-gray-700/50 focus:border-yellow-300/80 focus:ring-yellow-300/20"
                }`}
                placeholder="Describe what this project is about..."
              />
              {errors.description && (
                <p className="font-patrick-hand text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Project Settings */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-300" />
            Project Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className="w-full bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand mt-2 border ${
                  priorityColors[formData.priority]
                }`}
              >
                {formData.priority.charAt(0).toUpperCase() +
                  formData.priority.slice(1)}
              </div>
            </div>

            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="on-hold">On Hold</option>
              </select>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand mt-2 border ${
                  statusColors[formData.status]
                }`}
              >
                {formData.status
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Budget */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-300" />
            Timeline & Budget
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={`w-full bg-[#1B1615]/80 border rounded-xl px-4 py-3 font-patrick-hand text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.startDate
                    ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                    : "border-gray-700/50 focus:border-yellow-300/80 focus:ring-yellow-300/20"
                }`}
              />
              {errors.startDate && (
                <p className="font-patrick-hand text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className={`w-full bg-[#1B1615]/80 border rounded-xl px-4 py-3 font-patrick-hand text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.dueDate
                    ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                    : "border-gray-700/50 focus:border-yellow-300/80 focus:ring-yellow-300/20"
                }`}
              />
              {errors.dueDate && (
                <p className="font-patrick-hand text-red-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Budget (Optional)
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className="w-full bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                placeholder="e.g. $10,000"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold">
            Tags
          </h3>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="flex-1 bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-4 py-2 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-yellow-300/20 hover:bg-yellow-300/30 text-yellow-300 border border-yellow-300/30 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-yellow-300/10 text-yellow-300 border border-yellow-300/20 px-3 py-1 rounded-lg text-sm font-patrick-hand"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-yellow-300/70 hover:text-yellow-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Assignment */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-300" />
            Team Assignment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {workspaceTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => toggleTeamAssignment(team.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  formData.assignedTeams.includes(team.id)
                    ? "bg-yellow-300/10 border-yellow-300/30 text-yellow-300"
                    : "bg-gray-700/20 border-gray-700/30 text-foreground/80 hover:border-gray-600/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-patrick-hand font-bold text-sm"
                    style={{backgroundColor: team.color}}
                  >
                    {team.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-patrick-hand font-medium truncate">
                      {team.name}
                    </h4>
                    <p className="font-patrick-hand text-xs opacity-70 truncate">
                      {team.memberIds.length} members
                    </p>
                  </div>
                  {formData.assignedTeams.includes(team.id) && (
                    <CheckCircle size={16} className="text-yellow-300" />
                  )}
                </div>
                <p className="font-patrick-hand text-xs opacity-60 mt-2">
                  {team.description}
                </p>
              </div>
            ))}
          </div>

          {formData.assignedTeams.length > 0 && (
            <p className="font-patrick-hand text-foreground/70 text-sm">
              {formData.assignedTeams.length} team(s) assigned to this project
            </p>
          )}
        </div>

        {/* Individual Member Assignment */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-300" />
            Individual Member Assignment
          </h3>

          <div className="text-sm font-patrick-hand text-foreground/70 mb-3">
            Assign individual members in addition to teams, or members not part
            of any assigned team.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableIndividualMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => toggleMemberAssignment(member.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  formData.assignedMembers.includes(member.id)
                    ? "bg-yellow-300/10 border-yellow-300/30 text-yellow-300"
                    : "bg-gray-700/20 border-gray-700/30 text-foreground/80 hover:border-gray-600/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center text-black font-patrick-hand font-bold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-patrick-hand font-medium truncate">
                      {member.name}
                    </h4>
                    <p className="font-patrick-hand text-xs opacity-70 truncate">
                      {member.role}
                    </p>
                  </div>
                  {formData.assignedMembers.includes(member.id) && (
                    <CheckCircle size={16} className="text-yellow-300" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {formData.assignedMembers.length > 0 && (
            <p className="font-patrick-hand text-foreground/70 text-sm">
              {formData.assignedMembers.length} individual member(s) assigned
            </p>
          )}

          {availableIndividualMembers.length === 0 &&
            formData.assignedTeams.length > 0 && (
              <p className="font-patrick-hand text-foreground/60 text-sm italic">
                All workspace members are included in the assigned teams.
              </p>
            )}
        </div>

        {/* Assignment Summary */}
        {(formData.assignedTeams.length > 0 ||
          formData.assignedMembers.length > 0) && (
          <div className="bg-yellow-300/5 border border-yellow-300/20 rounded-xl p-4">
            <h4 className="font-virgil text-foreground font-medium mb-2">
              Assignment Summary
            </h4>
            <div className="space-y-1 text-sm font-patrick-hand text-foreground/80">
              {formData.assignedTeams.length > 0 && (
                <p>• {formData.assignedTeams.length} team(s) assigned</p>
              )}
              {formData.assignedMembers.length > 0 && (
                <p>
                  • {formData.assignedMembers.length} individual member(s)
                  assigned
                </p>
              )}
              <p className="text-yellow-300 font-medium">
                Total estimated team size:{" "}
                {formData.assignedTeams.reduce((total, teamId) => {
                  const team = workspaceTeams.find((t) => t.id === teamId);
                  return total + (team?.memberIds.length || 0);
                }, 0) + formData.assignedMembers.length}{" "}
                member(s)
              </p>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700/30">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-patrick-hand rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                Creating Project...
              </>
            ) : (
              <>
                <Target size={16} />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectForm;
