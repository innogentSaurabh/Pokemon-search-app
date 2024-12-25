import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      data-testid="loading-screen"
    >
      <div
        className="w-12 h-12 border-4 border-t-white border-gray-300 rounded-full animate-spin"
        data-testid="loading-spinner"
      ></div>
    </div>
  );
};

export default LoadingScreen;
