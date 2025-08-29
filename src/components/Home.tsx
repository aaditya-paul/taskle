import React from "react";
import Navbar from "./Navbar";
import {CheckCircleIcon, PlusIcon, StarIcon} from "lucide-react";

function Home() {
  return (
    <Navbar>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-virgil text-yellow-300 font-bold tracking-wide">
                Organize Your
                <span className="block text-foreground">Tasks Beautifully</span>
              </h1>
              <p className="text-xl md:text-2xl font-patrick-hand text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                A handcrafted task management experience that feels personal and
                intuitive. Built for creators, dreamers, and doers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="group bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black font-patrick-hand font-medium text-lg px-8 py-4 rounded-2xl transition-all duration-300 ease-out shadow-lg hover:shadow-yellow-300/25 active:scale-95">
                <span className="flex items-center gap-3">
                  Start Creating
                  <PlusIcon
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                </span>
              </button>
              <button className="font-patrick-hand text-lg text-foreground/90 hover:text-yellow-300 px-8 py-4 border border-gray-700/50 rounded-2xl transition-all duration-300 hover:border-yellow-300/50 hover:bg-gray-700/10">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              {
                icon: CheckCircleIcon,
                title: "Handcrafted Design",
                description:
                  "Every element is thoughtfully designed with a personal, handwritten aesthetic that feels warm and inviting.",
              },
              {
                icon: StarIcon,
                title: "Intuitive Experience",
                description:
                  "Simple, distraction-free interface that adapts to your workflow and helps you stay focused on what matters.",
              },
              {
                icon: PlusIcon,
                title: "Creative Freedom",
                description:
                  "Express yourself through customizable layouts and a design system that celebrates creativity and individuality.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-secondary/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:bg-secondary/70 transition-all duration-300 hover:border-yellow-300/30 hover:shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-yellow-300 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-virgil text-foreground font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="font-patrick-hand text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Home;
