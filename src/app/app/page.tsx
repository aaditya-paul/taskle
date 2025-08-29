import React from "react";

export default function AppSubdomainPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-virgil text-yellow-300 font-bold mb-6">Welcome to Taskle App Subdomain</h1>
      <p className="font-patrick-hand text-xl text-foreground/80 mb-4">This is the /app route, served when you visit the app subdomain.</p>
      <p className="text-gray-400">Try visiting <span className="font-mono bg-gray-800 px-2 py-1 rounded">http://app.localhost:3000</span> in your browser.</p>
    </div>
  );
}
