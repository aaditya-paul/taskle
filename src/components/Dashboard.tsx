import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  PlusIcon,
  CalendarIcon,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-secondary/50 backdrop-blur-sm px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-virgil text-yellow-300 font-bold">
              Good morning! 👋
            </h1>
            <p className="font-patrick-hand text-foreground/80 text-base md:text-lg mt-1">
              Let&apos;s make today productive
            </p>
          </div>
          <button className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium px-4 md:px-6 py-2.5 md:py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-yellow-300/25 hover:shadow-lg transform hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-2">
              <PlusIcon size={18} />
              New Task
            </div>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
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
              className="p-4 md:p-6 bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl hover:bg-secondary/70 transition-all duration-300 hover:border-yellow-300/30 hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div
                  className={`p-2 md:p-3 rounded-lg md:rounded-xl ${stat.bg}`}
                >
                  <stat.icon
                    className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`}
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-virgil text-foreground font-bold mb-1">
                {stat.value}
              </h3>
              <p className="font-patrick-hand text-foreground/80 text-base md:text-lg leading-tight">
                {stat.title}
              </p>
              <p className="font-patrick-hand text-foreground/60 text-xs md:text-sm">
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          {/* Today's Tasks */}
          <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-secondary/60 transition-all duration-300 hover:border-yellow-300/20">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-virgil text-foreground font-bold">
                Today&apos;s Tasks
              </h2>
              <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
            </div>

            <div className="space-y-2 md:space-y-3">
              {[
                {task: "Review project proposal", completed: true},
                {task: "Design dashboard mockups", completed: true},
                {task: "Team standup meeting", completed: false},
                {task: "Update documentation", completed: false},
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-gray-700/20 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <div
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 flex-shrink-0 ${
                      item.completed
                        ? "bg-green-400 border-green-400"
                        : "border-gray-600 hover:border-yellow-300"
                    } transition-colors duration-200`}
                  ></div>
                  <span
                    className={`font-patrick-hand text-sm md:text-base ${
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
          <div className="bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-secondary/60 transition-all duration-300 hover:border-yellow-300/20">
            <h2 className="text-lg md:text-xl font-virgil text-foreground font-bold mb-4 md:mb-6">
              Recent Activity
            </h2>

            <div className="space-y-3 md:space-y-4">
              {[
                {action: "Completed 'Design review'", time: "2 hours ago"},
                {
                  action: "Created new workspace 'Q1 Goals'",
                  time: "4 hours ago",
                },
                {action: "Updated task priorities", time: "Yesterday"},
                {action: "Archived old project", time: "2 days ago"},
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/10 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mt-1.5 md:mt-2 flex-shrink-0 animate-pulse"></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-patrick-hand text-foreground/90 text-sm md:text-base leading-tight">
                      {item.action}
                    </p>
                    <p className="font-patrick-hand text-foreground/60 text-xs md:text-sm">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
