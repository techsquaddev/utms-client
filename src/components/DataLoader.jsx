import { loading } from "@/assets";
import React from "react";

const DataLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <img src={loading} alt="loading..." className="sm:max-w-md" />
    </div>
  );
};

export default DataLoader;
