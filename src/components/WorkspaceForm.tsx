"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Plus, Users, Building2, Trash2, ArrowRight} from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
}

const WorkspaceCreationForm = () => {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate 11-digit alphanumeric workspace ID
  const generateWorkspaceId = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 11; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Member management
  const addMember = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: "",
      email: "",
      role: "member",
    };
    setMembers([...members, newMember]);
  };

  const updateMember = (id: string, field: keyof Member, value: string) => {
    setMembers(
      members.map((member) =>
        member.id === id ? {...member, [field]: value} : member
      )
    );
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      alert("Please enter a workspace name");
      return;
    }

    setIsSubmitting(true);

    // Generate workspace ID
    const workspaceId = generateWorkspaceId();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const workspaceData = {
      id: workspaceId,
      name: workspaceName,
      description: workspaceDescription,
      members,
      createdAt: new Date().toISOString(),
    };

    console.log("Created workspace:", workspaceData);

    // Redirect to workspace
    router.push(`/workspace/${workspaceId}`);
  };

  const stepTitles = ["Workspace Details", "Add Team Members"];

  return (
    <div className="min-h-screen bg-[#1B1615] text-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-virgil text-5xl text-yellow-300 mb-4">
            Create Your Workspace
          </h1>
          <p className="font-patrick-hand text-xl text-foreground/80">
            Let&apos;s set up your collaborative space for amazing productivity
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center font-patrick-hand font-bold text-lg
                  transition-all duration-300
                  ${
                    currentStep > index + 1
                      ? "bg-yellow-300 border-yellow-300 text-[#1B1615]"
                      : currentStep === index + 1
                      ? "border-yellow-300 text-yellow-300"
                      : "border-gray-700 text-gray-700"
                  }
                `}
                >
                  {currentStep > index + 1 ? "✓" : index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`
                    w-20 h-0.5 mx-3 transition-all duration-300
                    ${currentStep > index + 1 ? "bg-yellow-300" : "bg-gray-700"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Step 1: Workspace Details */}
          {currentStep === 1 && (
            <div className="bg-secondary/50 backdrop-blur-md rounded-3xl border border-gray-700/30 p-8 hover:bg-secondary/60 transition-all duration-300">
              <h2 className="font-virgil text-3xl text-yellow-300 mb-8 flex items-center">
                <Building2 className="mr-3" />
                Workspace Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="font-patrick-hand text-lg text-foreground/90 block mb-3">
                    Workspace Name *
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-5 py-4 font-patrick-hand text-lg text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                    placeholder="Enter your workspace name..."
                    required
                  />
                </div>

                <div>
                  <label className="font-patrick-hand text-lg text-foreground/90 block mb-3">
                    Description
                  </label>
                  <textarea
                    value={workspaceDescription}
                    onChange={(e) => setWorkspaceDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-[#1B1615]/80 border border-gray-700/50 rounded-xl px-5 py-4 font-patrick-hand text-lg text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300 resize-none"
                    placeholder="What's this workspace for? (optional)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Add Members */}
          {currentStep === 2 && (
            <div className="bg-secondary/50 backdrop-blur-md rounded-3xl border border-gray-700/30 p-8 hover:bg-secondary/60 transition-all duration-300">
              <h2 className="font-virgil text-3xl text-yellow-300 mb-8 flex items-center">
                <Users className="mr-3" />
                Team Members
              </h2>

              <div className="space-y-4 mb-6">
                {members.map((member, index) => (
                  <div
                    key={member.id}
                    className="bg-[#1B1615]/60 rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-patrick-hand text-lg text-yellow-300">
                        Member {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="font-patrick-hand text-sm text-foreground/70 block mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            updateMember(member.id, "name", e.target.value)
                          }
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="font-patrick-hand text-sm text-foreground/70 block mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) =>
                            updateMember(member.id, "email", e.target.value)
                          }
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white placeholder:text-foreground/50 focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="font-patrick-hand text-sm text-foreground/70 block mb-2">
                          Role
                        </label>
                        <select
                          value={member.role}
                          onChange={(e) =>
                            updateMember(member.id, "role", e.target.value)
                          }
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 font-patrick-hand text-white focus:outline-none focus:border-yellow-300/80 focus:ring-2 focus:ring-yellow-300/20 transition-all duration-300"
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMember}
                className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-[#1B1615] font-patrick-hand font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/20 flex items-center"
              >
                <Plus className="mr-2" size={20} />
                Add Team Member
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`
                font-patrick-hand font-bold py-3 px-8 rounded-xl transition-all duration-300
                ${
                  currentStep === 1
                    ? "bg-gray-700/50 text-foreground/50 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-600 text-white hover:scale-105"
                }
              `}
            >
              Previous
            </button>

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
                disabled={!workspaceName.trim()}
                className={`
                  font-patrick-hand font-bold py-3 px-8 rounded-xl transition-all duration-300 transform flex items-center
                  ${
                    !workspaceName.trim()
                      ? "bg-gray-700/50 text-foreground/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-[#1B1615] hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/20"
                  }
                `}
              >
                Next Step
                <ArrowRight className="ml-2" size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCreateWorkspace}
                disabled={!workspaceName.trim() || isSubmitting}
                className={`
                  font-patrick-hand font-bold py-3 px-8 rounded-xl transition-all duration-300 transform flex items-center
                  ${
                    !workspaceName.trim() || isSubmitting
                      ? "bg-gray-700/50 text-foreground/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-green-400/20"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Workspace
                    <Building2 className="ml-2" size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCreationForm;
