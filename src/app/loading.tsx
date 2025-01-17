import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center z-50">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
};

export default Loading;
