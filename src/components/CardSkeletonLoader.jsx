import React from "react";

const CardSkeletonLoader = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg animate-pulse">
      <div className="bg-gray-200 rounded-t-lg w-full h-40 md:h-56"></div>
      <div className="px-4 py-3 bg-neutralBgGrey">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CardSkeletonLoader;
