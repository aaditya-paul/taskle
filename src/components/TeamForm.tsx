"use client";
import React, {useState} from "react";
import {Users, AlertCircle, CheckCircle, Crown, Palette} from "lucide-react";
import Modal from "./Modal";

interface TeamFormData {
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

interface TeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: TeamFormData) => void;
  workspaceMembers: TeamMember[];
  isSubmitting?: boolean;
}

const TeamForm: React.FC<TeamFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  workspaceMembers,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    description: "",
    color: "#3B82F6",
    memberIds: [],
    leaderId: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const teamColors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#EC4899", // Pink
    "#6B7280", // Gray
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Team name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Team description is required";
    }

    if (formData.memberIds.length === 0) {
      newErrors.memberIds = "At least one team member is required";
    }

    if (formData.leaderId && !formData.memberIds.includes(formData.leaderId)) {
      newErrors.leaderId = "Team leader must be a member of the team";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        description: "",
        color: "#3B82F6",
        memberIds: [],
        leaderId: undefined,
      });
      setErrors({});
    }
  };

  const handleInputChange = (
    field: keyof TeamFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleMemberSelection = (memberId: string) => {
    const isSelected = formData.memberIds.includes(memberId);
    if (isSelected) {
      const newMemberIds = formData.memberIds.filter((id) => id !== memberId);
      handleInputChange("memberIds", newMemberIds);

      // If the removed member was the leader, clear the leader
      if (formData.leaderId === memberId) {
        handleInputChange("leaderId", "");
      }
    } else {
      handleInputChange("memberIds", [...formData.memberIds, memberId]);
    }
  };

  const setTeamLeader = (memberId: string) => {
    if (formData.memberIds.includes(memberId)) {
      handleInputChange(
        "leaderId",
        formData.leaderId === memberId ? "" : memberId
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Team"
      subtitle="Set up a team for better project collaboration"
      icon={<Users className="w-5 h-5 text-black" />}
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-300" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="font-patrick-hand text-foreground/90 block mb-2">
                Team Name *
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
                placeholder="Enter team name..."
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
                rows={3}
                className={`w-full bg-[#1B1615]/80 border rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                  errors.description
                    ? "border-red-500/50 focus:border-red-500/80 focus:ring-red-500/20"
                    : "border-gray-700/50 focus:border-yellow-300/80 focus:ring-yellow-300/20"
                }`}
                placeholder="What does this team do?"
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

        {/* Team Color */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-yellow-300" />
            Team Color
          </h3>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
            {teamColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleInputChange("color", color)}
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  formData.color === color
                    ? "ring-2 ring-yellow-300 ring-offset-2 ring-offset-[#1B1615] scale-110"
                    : "hover:scale-105"
                }`}
                style={{backgroundColor: color}}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full"
              style={{backgroundColor: formData.color}}
            />
            <span className="font-patrick-hand text-foreground/80 text-sm">
              Selected team color
            </span>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-4">
          <h3 className="font-virgil text-lg text-foreground font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-300" />
            Team Members
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workspaceMembers.map((member) => (
              <div
                key={member.id}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  formData.memberIds.includes(member.id)
                    ? "bg-yellow-300/10 border-yellow-300/30 text-yellow-300"
                    : "bg-gray-700/20 border-gray-700/30 text-foreground/80 hover:border-gray-600/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-3 flex-1"
                    onClick={() => toggleMemberSelection(member.id)}
                  >
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
                    {formData.memberIds.includes(member.id) && (
                      <CheckCircle size={16} className="text-yellow-300" />
                    )}
                  </div>

                  {formData.memberIds.includes(member.id) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTeamLeader(member.id);
                      }}
                      className={`ml-2 p-1.5 rounded-lg transition-all duration-200 ${
                        formData.leaderId === member.id
                          ? "bg-yellow-300/20 text-yellow-300"
                          : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                      }`}
                      title={
                        formData.leaderId === member.id
                          ? "Team Leader"
                          : "Set as Leader"
                      }
                    >
                      <Crown size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors.memberIds && (
            <p className="font-patrick-hand text-red-400 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.memberIds}
            </p>
          )}

          {formData.memberIds.length > 0 && (
            <div className="bg-yellow-300/5 border border-yellow-300/20 rounded-xl p-4">
              <h4 className="font-virgil text-foreground font-medium mb-2">
                Team Summary
              </h4>
              <div className="space-y-1 text-sm font-patrick-hand text-foreground/80">
                <p>• {formData.memberIds.length} member(s) selected</p>
                {formData.leaderId && (
                  <p>
                    •{" "}
                    {
                      workspaceMembers.find((m) => m.id === formData.leaderId)
                        ?.name
                    }{" "}
                    set as team leader
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

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
                Creating Team...
              </>
            ) : (
              <>
                <Users size={16} />
                Create Team
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TeamForm;
