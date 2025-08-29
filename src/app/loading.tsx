import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1B1615] text-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-yellow-300 border-solid"></div>
        <h1 className="mt-6 text-3xl font-virgil">Loading...</h1>
        <p className="mt-2 text-yellow-400 font-patrick-hand">
          Handcrafting your productivity experience
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
