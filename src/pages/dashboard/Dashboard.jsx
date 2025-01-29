import { developing } from "@/assets";
import React from "react";

// TODO: Implement some welcome screen here
const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-full">
      <img src={developing} alt="loading..." className="sm:max-w-sm" />
    </div>
  );
};

export default Dashboard;
