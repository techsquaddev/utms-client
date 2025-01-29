import { loading } from "@/assets";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src={loading} alt="loading..." className="px-10 sm:max-w-md" />
    </div>
  );
};

export default Loading;
