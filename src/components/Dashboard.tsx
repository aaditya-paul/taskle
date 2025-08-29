import React from "react";
import AppLayout from "./AppLayout";
import {
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  PlusIcon,
  CalendarIcon,
} from "lucide-react";

function Dashboard() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-secondary/50 backdrop-blur-sm px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-virgil text-yellow-300 font-bold">
              Good morning! 👋
            </h1>
            <p className="font-patrick-hand text-foreground/80 text-lg mt-1">
              Let&apos;s make today productive
            </p>
          </div>
          <button className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-yellow-300/25">
            <div className="flex items-center gap-2">
              <PlusIcon size={18} />
              New Task
            </div>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Tasks Completed",
              value: "12",
              subtitle: "Today",
              icon: CheckCircleIcon,
              color: "text-green-400",
              bg: "bg-green-400/10",
            },
            {
              title: "In Progress",
              value: "8",
              subtitle: "Active tasks",
              icon: ClockIcon,
              color: "text-yellow-300",
              bg: "bg-yellow-300/10",
            },
            {
              title: "Productivity",
              value: "85%",
              subtitle: "This week",
              icon: TrendingUpIcon,
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:bg-secondary/70 transition-all duration-300 hover:border-yellow-300/30"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-2xl font-virgil text-foreground font-bold mb-1">
                {stat.value}
              </h3>
              <p className="font-patrick-hand text-foreground/80 text-lg">
                {stat.title}
              </p>
              <p className="font-patrick-hand text-foreground/60 text-sm">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-virgil text-foreground font-bold">
                Today&apos;s Tasks
              </h2>
              <CalendarIcon className="w-5 h-5 text-yellow-300" />
            </div>

            <div className="space-y-4">
              {[
                {task: "Review project proposal", completed: true},
                {task: "Design dashboard mockups", completed: true},
                {task: "Team standup meeting", completed: false},
                {task: "Update documentation", completed: false},
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/20 transition-colors duration-200"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      item.completed
                        ? "bg-green-400 border-green-400"
                        : "border-gray-600"
                    }`}
                  ></div>
                  <span
                    className={`font-patrick-hand ${
                      item.completed
                        ? "text-foreground/60 line-through"
                        : "text-foreground/90"
                    }`}
                  >
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
            <h2 className="text-xl font-virgil text-foreground font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {[
                {action: "Completed 'Design review'", time: "2 hours ago"},
                {
                  action: "Created new workspace 'Q1 Goals'",
                  time: "4 hours ago",
                },
                {action: "Updated task priorities", time: "Yesterday"},
                {action: "Archived old project", time: "2 days ago"},
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2"></div>
                  <div>
                    <p className="font-patrick-hand text-foreground/90">
                      {item.action}
                    </p>
                    <p className="font-patrick-hand text-foreground/60 text-sm">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
