import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
