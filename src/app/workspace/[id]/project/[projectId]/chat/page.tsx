"use client";

import React, {useState} from "react";
import {
  Send,
  Paperclip,
  Smile,
  Search,
  Phone,
  Video,
  Settings,
  User,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image" | "system";
  fileName?: string;
  fileSize?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "online" | "away" | "offline";
  lastSeen?: string;
}

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState("");

  // Mock team members
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Frontend Developer",
      status: "online",
    },
    {id: "2", name: "Sam Wilson", role: "Backend Developer", status: "online"},
    {
      id: "3",
      name: "Jordan Kim",
      role: "Designer",
      status: "away",
      lastSeen: "5 minutes ago",
    },
    {
      id: "4",
      name: "Casey Brown",
      role: "QA Engineer",
      status: "offline",
      lastSeen: "2 hours ago",
    },
  ];

  // Mock messages
  const [messages] = useState<Message[]>([
    {
      id: "1",
      senderId: "2",
      content:
        "Hey team! I've finished implementing the authentication system. Ready for review.",
      timestamp: "2024-01-26T09:30:00Z",
      type: "text",
    },
    {
      id: "2",
      senderId: "3",
      content: "Great work Sam! I'll review it after I finish the UI mockups.",
      timestamp: "2024-01-26T09:35:00Z",
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      content: "I can help with the frontend integration once it's approved.",
      timestamp: "2024-01-26T09:40:00Z",
      type: "text",
    },
    {
      id: "4",
      senderId: "3",
      content: "dashboard-mockup-v2.png",
      timestamp: "2024-01-26T10:15:00Z",
      type: "file",
      fileName: "dashboard-mockup-v2.png",
      fileSize: "2.4 MB",
    },
    {
      id: "5",
      senderId: "4",
      content:
        "The mockups look great! I'll start working on test cases for the auth flow.",
      timestamp: "2024-01-26T10:30:00Z",
      type: "text",
    },
    {
      id: "6",
      senderId: "system",
      content: "Alex Johnson joined the project",
      timestamp: "2024-01-26T11:00:00Z",
      type: "system",
    },
    {
      id: "7",
      senderId: "1",
      content:
        "Thanks for adding me to the project! Excited to work with everyone.",
      timestamp: "2024-01-26T11:05:00Z",
      type: "text",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getMemberName = (memberId: string) => {
    if (memberId === "system") return "System";
    const member = teamMembers.find((m) => m.id === memberId);
    return member ? member.name : "Unknown";
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400";
      case "away":
        return "bg-yellow-400";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex">
      {/* Sidebar - Team Members */}
      <div className="w-80 bg-secondary/50 backdrop-blur-sm border-r border-gray-700/50 hidden lg:flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-virgil text-yellow-300 font-bold mb-2">
            Team Chat
          </h2>
          <p className="text-sm font-patrick-hand text-foreground/70">
            {teamMembers.filter((m) => m.status === "online").length} online
          </p>
        </div>

        {/* Team Members List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/20 cursor-pointer transition-all duration-200"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <User size={20} className="text-gray-900" />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-secondary ${getStatusColor(
                      member.status
                    )}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-patrick-hand text-foreground font-medium truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs font-patrick-hand text-foreground/60">
                    {member.status === "online"
                      ? "Online"
                      : member.status === "away"
                      ? "Away"
                      : `Last seen ${member.lastSeen}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-secondary/50 backdrop-blur-sm border-b border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-virgil text-yellow-300 font-bold">
                Project Discussion
              </h1>
              <span className="text-sm font-patrick-hand text-foreground/70">
                {teamMembers.filter((m) => m.status === "online").length}{" "}
                members online
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                <Search size={20} />
              </button>
              <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                <Phone size={20} />
              </button>
              <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                <Video size={20} />
              </button>
              <button className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            const showDate =
              index === 0 ||
              formatDate(messages[index - 1].timestamp) !==
                formatDate(message.timestamp);

            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="flex items-center justify-center my-6">
                    <div className="bg-gray-700/30 px-4 py-2 rounded-full">
                      <span className="text-sm font-patrick-hand text-foreground/70">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Message */}
                {message.type === "system" ? (
                  <div className="flex justify-center">
                    <div className="bg-gray-700/20 px-4 py-2 rounded-full">
                      <span className="text-sm font-patrick-hand text-foreground/60">
                        {message.content}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex ${
                      message.senderId === "1" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md ${
                        message.senderId === "1" ? "order-2" : "order-1"
                      }`}
                    >
                      {/* Message Header */}
                      <div
                        className={`flex items-center gap-2 mb-1 ${
                          message.senderId === "1"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-sm font-patrick-hand text-foreground/70">
                          {getMemberName(message.senderId)}
                        </span>
                        <span className="text-xs font-patrick-hand text-foreground/50">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div
                        className={`p-3 rounded-lg ${
                          message.senderId === "1"
                            ? "bg-yellow-400/20 border border-yellow-400/30 text-yellow-100"
                            : "bg-gray-700/30 border border-gray-600/50 text-foreground"
                        }`}
                      >
                        {message.type === "file" ? (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-600/50 rounded-lg flex items-center justify-center">
                              <Paperclip
                                size={20}
                                className="text-foreground/70"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-patrick-hand font-medium">
                                {message.fileName}
                              </p>
                              <p className="text-xs font-patrick-hand text-foreground/60">
                                {message.fileSize}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="font-patrick-hand">{message.content}</p>
                        )}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center ${
                        message.senderId === "1"
                          ? "order-1 ml-3"
                          : "order-2 mr-3"
                      }`}
                    >
                      <User size={16} className="text-gray-900" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="bg-secondary/50 backdrop-blur-sm border-t border-gray-700/50 p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              className="p-2 text-foreground/70 hover:text-yellow-300 hover:bg-gray-700/20 rounded-lg transition-all duration-200"
            >
              <Paperclip size={20} />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-gray-700/30 border border-gray-600/50 rounded-lg px-4 py-3 pr-12 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                placeholder="Type your message..."
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/70 hover:text-yellow-300 transition-colors"
              >
                <Smile size={20} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
