"use client";
import React, {useState} from "react";
import {MoveRightIcon, MenuIcon, XIcon} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";

function Navbar({children}: {children: React.ReactNode}) {
  const navbarHeight = 64;
  const topMargin = 24; // 6 * 4px (top-6 in Tailwind)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const routes = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];
  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <nav
        style={{height: `${navbarHeight}px`}}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl mx-auto px-8 bg-secondary/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl z-50 flex items-center justify-between"
      >
        <div className="flex items-center">
          <div className="relative">
            <h1 className="text-2xl font-virgil text-yellow-300 font-bold tracking-wide drop-shadow-lg">
              Taskle
            </h1>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex font-patrick-hand items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="relative text-lg text-foreground/90 cursor-pointer hover:text-yellow-300 transition-all duration-300 ease-out group"
            >
              {route.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground/90 hover:text-yellow-300 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Get Started Button */}
        <Link
          href="/redirect"
          className="hidden lg:flex bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-lg items-center gap-3 font-patrick-hand text-black font-medium py-2.5 px-6 rounded-xl cursor-pointer active:scale-95 transition-all duration-200 ease-out shadow-lg hover:shadow-yellow-300/25"
        >
          Get Started
          <MoveRightIcon
            className="text-black transition-transform duration-200 group-hover:translate-x-1"
            size={16}
          />
        </Link>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[calc(64px+2rem)] left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl bg-secondary/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl z-40 px-6 py-6">
          <div className="flex flex-col space-y-6 font-patrick-hand">
            {routes.map((route, index) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-lg text-foreground/90 cursor-pointer hover:text-yellow-300 transition-all duration-300 ease-out py-2 px-4 rounded-lg hover:bg-gray-700/20 border-l-2 border-transparent hover:border-yellow-300"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {route.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700/50">
              <button className="w-full flex bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-lg items-center justify-center gap-3 font-patrick-hand text-black font-medium py-3 px-6 rounded-xl cursor-pointer active:scale-95 transition-all duration-200 ease-out shadow-lg">
                Get Started
                <MoveRightIcon className="text-black" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className="w-full h-full"
        style={{paddingTop: `${navbarHeight + topMargin + 24}px`}} // navbar height + top margin + extra spacing
      >
        {children}
      </main>
    </div>
  );
}

export default Navbar;
