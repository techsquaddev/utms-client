import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Footer } from ".";

const DashboardLayout = () => {
  const location = useLocation();

  const sideNavigation = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "timetables", label: "Timetables", path: "/dashboard/timetables" },
    { key: "notices", label: "Notices", path: "/dashboard/notices" },
    { key: "users", label: "Users", path: "/dashboard/users" },
    { key: "profile", label: "Profile", path: "/dashboard/profile" },
    { key: "home", label: "Home", path: "/" },
  ];

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex-1">
          <div className="mt-8 p-4 flex w-full h-full">
            <div className="rounded-xl p-4 w-1/5 h-full bg-gray-200 shadow-md">
              <div className="grid grid-cols-1 w-full h-fit">
                {sideNavigation.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`flex py-4 px-8 items-center cursor-pointer hover:bg-gray-300 transition duration-200 ${
                      location.pathname === item.path ? "bg-gray-300" : ""
                    } rounded-lg`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 ml-4 rounded-xl w-4/5 h-full bg-gray-100 shadow-md">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;
