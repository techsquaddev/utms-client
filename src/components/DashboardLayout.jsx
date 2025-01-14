import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
