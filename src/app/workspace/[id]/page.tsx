"use client";
import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {
  FolderPlus,
  Users,
  Settings,
  MoreVertical,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Folder,
  FileText,
} from "lucide-react";
import ProjectForm from "@/components/ProjectForm";
import TeamForm from "@/components/TeamForm";

interface TeamFormData {
  name: string;
  description: string;
  color: string;
  memberIds: string[];
  leaderId?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  memberIds: string[];
  leaderId?: string;
  createdAt: string;
}

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
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const WorkspacePage = () => {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.id as string;

  // Mock data - in a real app, this would come from an API
  const [workspace] = useState({
    id: workspaceId,
    name: "Product Development Hub",
    description: "Central workspace for all product development activities",
    memberCount: 12,
    projectCount: 4,
  });

  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Frontend Team",
      description: "UI/UX and frontend development",
      color: "#3B82F6",
      memberIds: ["1", "2", "3"],
      leaderId: "1",
      createdAt: "2025-08-01",
    },
    {
      id: "2",
      name: "Backend Team",
      description: "API and server development",
      color: "#10B981",
      memberIds: ["3", "4", "5"],
      leaderId: "5",
      createdAt: "2025-08-01",
    },
    {
      id: "3",
      name: "QA Team",
      description: "Quality assurance and testing",
      color: "#F59E0B",
      memberIds: ["4", "6", "7"],
      leaderId: "4",
      createdAt: "2025-08-01",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Mobile App Redesign",
      description: "Complete overhaul of the mobile application UI/UX",
      status: "active",
      teamIds: ["1", "3"],
      memberIds: ["1", "2", "4"],
      taskCount: 23,
      progress: 65,
      dueDate: "2025-09-15",
      priority: "high",
      tags: ["mobile", "ui-ux", "redesign"],
      budget: "$25,000",
    },
    {
      id: "2",
      name: "Backend API v2",
      description: "Development of next generation REST API",
      status: "active",
      teamIds: ["2"],
      memberIds: ["3", "5"],
      taskCount: 18,
      progress: 40,
      dueDate: "2025-10-01",
      priority: "urgent",
      tags: ["backend", "api", "development"],
      budget: "$15,000",
    },
    {
      id: "3",
      name: "User Research Initiative",
      description: "Comprehensive user experience research program",
      status: "on-hold",
      teamIds: ["1"],
      memberIds: ["1", "2"],
      taskCount: 8,
      progress: 25,
      priority: "medium",
      tags: ["research", "ux"],
    },
  ]);

  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@company.com",
      role: "Project Manager",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "UI/UX Designer",
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@company.com",
      role: "Full Stack Developer",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "QA Engineer",
    },
    {
      id: "5",
      name: "David Kim",
      email: "david@company.com",
      role: "Backend Developer",
    },
  ]);

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // Generate team ID
  const generateTeamId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Handle team creation
  const handleCreateTeam = async (teamData: TeamFormData) => {
    setIsCreatingTeam(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newTeam: Team = {
      id: generateTeamId(),
      name: teamData.name,
      description: teamData.description,
      color: teamData.color,
      memberIds: teamData.memberIds,
      leaderId: teamData.leaderId,
      createdAt: new Date().toISOString(),
    };

    setTeams((prev) => [...prev, newTeam]);
    setShowCreateTeam(false);
    setIsCreatingTeam(false);
  };

  // Generate project ID (11-character alphanumeric)
  const generateProjectId = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 11; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Handle project creation
  const handleCreateProject = async (projectData: ProjectFormData) => {
    setIsCreatingProject(true);

    // Generate unique project ID
    const projectId = generateProjectId();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newProject: Project = {
      id: projectId,
      name: projectData.name,
      description: projectData.description,
      status: projectData.status || "active",
      teamIds: projectData.assignedTeams || [],
      memberIds: projectData.assignedMembers || [],
      taskCount: 0,
      progress: 0,
      dueDate: projectData.dueDate,
      priority: projectData.priority,
      tags: projectData.tags,
      budget: projectData.budget,
    };

    setProjects((prev) => [...prev, newProject]);
    setShowCreateProject(false);
    setIsCreatingProject(false);

    // Redirect to the newly created project
    router.push(`/workspace/${workspaceId}/project/${projectId}`);
  };

  const getProjectMemberCount = (project: Project): number => {
    const teamMemberIds = new Set<string>();

    // Add all members from assigned teams
    project.teamIds.forEach((teamId) => {
      const team = teams.find((t) => t.id === teamId);
      if (team) {
        team.memberIds.forEach((memberId) => teamMemberIds.add(memberId));
      }
    });

    // Add individually assigned members
    project.memberIds.forEach((memberId) => teamMemberIds.add(memberId));

    return teamMemberIds.size;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "text-gray-400 bg-gray-400/10";
      case "active":
        return "text-green-400 bg-green-400/10";
      case "on-hold":
        return "text-yellow-400 bg-yellow-400/10";
      case "completed":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "planning":
        return <FileText size={14} />;
      case "active":
        return <Clock size={14} />;
      case "on-hold":
        return <AlertCircle size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <div className="flex flex-col  h-screen">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-secondary/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-virgil text-yellow-300 font-bold">
                  {workspace.name}
                </h1>
                <span className="text-sm font-patrick-hand text-foreground/60 bg-gray-700/30 px-2 py-1 rounded-lg">
                  {workspaceId}
                </span>
              </div>
              <p className="font-patrick-hand text-foreground/80 text-base md:text-lg">
                {workspace.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                  <Users size={16} />
                  {workspace.memberCount} members
                </span>
                <span className="font-patrick-hand text-foreground/60 text-sm flex items-center gap-1">
                  <Folder size={16} />
                  {workspace.projectCount} projects
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                <Settings size={20} />
              </button>
              <button
                onClick={() => setShowCreateTeam(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-patrick-hand font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
              >
                <Users size={18} />
                New Team
              </button>
              <button
                onClick={() => setShowCreateProject(true)}
                className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-yellow-300/25 flex items-center gap-2"
              >
                <FolderPlus size={18} />
                New Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full mx-auto px-4 md:px-8 py-8 overflow-y-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              icon: Folder,
              color: "text-blue-400",
            },
            {
              label: "Active Projects",
              value: projects.filter((p) => p.status === "active").length,
              icon: Clock,
              color: "text-green-400",
            },
            {
              label: "Team Members",
              value: workspace.memberCount,
              icon: Users,
              color: "text-yellow-400",
            },
            {
              label: "Completion Rate",
              value: "73%",
              icon: CheckCircle,
              color: "text-purple-400",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 hover:bg-secondary/70 transition-all duration-300 hover:border-yellow-300/30"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h3 className="text-xl font-virgil text-foreground font-bold mb-1">
                {stat.value}
              </h3>
              <p className="font-patrick-hand text-foreground/70 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-virgil text-foreground font-bold">
              Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() =>
                  router.push(`/workspace/${workspaceId}/project/${project.id}`)
                }
                className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:bg-secondary/60 transition-all duration-300 hover:border-yellow-300/20 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-virgil text-lg text-foreground font-bold mb-1 group-hover:text-yellow-300 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="font-patrick-hand text-foreground/70 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <button className="p-1 text-foreground/50 hover:text-foreground/80 transition-colors duration-200">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-patrick-hand ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status.replace("-", " ")}
                    </span>
                    {project.dueDate && (
                      <span className="text-xs font-patrick-hand text-foreground/60 flex items-center gap-1">
                        <Calendar size={12} />
                        {/* Due {new Date(project.dueDate).toLocaleDateString()} */}
                        Due {project.dueDate}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-patrick-hand text-foreground/70">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{width: `${project.progress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm font-patrick-hand text-foreground/70">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {getProjectMemberCount(project)} members
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={14} />
                      {project.taskCount} tasks
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Project Card */}
            <div
              onClick={() => setShowCreateProject(true)}
              className="bg-secondary/30 backdrop-blur-sm border-2 border-dashed border-gray-700/50 rounded-xl p-6 hover:border-yellow-300/50 hover:bg-secondary/40 transition-all duration-300 cursor-pointer group flex items-center justify-center"
            >
              <div className="text-center">
                <FolderPlus className="w-8 h-8 text-gray-600 group-hover:text-yellow-300 mx-auto mb-2 transition-colors duration-200" />
                <p className="font-patrick-hand text-gray-600 group-hover:text-yellow-300 transition-colors duration-200">
                  Create New Project
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <h2 className="text-2xl font-virgil text-foreground font-bold mb-6">
            Team Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 hover:bg-secondary/60 transition-all duration-300 hover:border-yellow-300/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center text-black font-patrick-hand font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-patrick-hand font-medium text-foreground truncate">
                      {member.name}
                    </h3>
                    <p className="font-patrick-hand text-foreground/60 text-sm truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Project Form */}
      <ProjectForm
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onSubmit={handleCreateProject}
        workspaceMembers={members}
        workspaceTeams={teams}
        isSubmitting={isCreatingProject}
      />

      {/* Create Team Form */}
      <TeamForm
        isOpen={showCreateTeam}
        onClose={() => setShowCreateTeam(false)}
        onSubmit={handleCreateTeam}
        workspaceMembers={members}
        isSubmitting={isCreatingTeam}
      />
    </div>
  );
};

export default WorkspacePage;
