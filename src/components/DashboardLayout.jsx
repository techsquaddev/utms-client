import React, { useState } from "react";
import Logo from "../assets/sliit360.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Footer } from ".";
import { useAuth } from "@/api/authContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const sideNavigation = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "timetables", label: "Timetables", path: "/dashboard/timetables" },
    // { key: "notices", label: "Notices", path: "/dashboard/notices" },
    { key: "users", label: "Users", path: "/dashboard/users" },
    // { key: "profile", label: "Profile", path: "/dashboard/profile" },
    { key: "home", label: "Home", path: "/" },
  ];

  return (
    <div className="h-screen p-4 bg-[#f4f7fb]">
      <div className="grid grid-cols-12 gap-4 xl:h-[91%]">
        <div className="col-span-2 bg-gray-100 rounded-lg shadow-md">
          <div className="p-4 mb-10">
            <Link to="/">
              <div className="p-3 bg-primary rounded-xl shadow-lg max-w-fit">
                <img
                  className="w-16 object-contain md:w-20"
                  src={Logo}
                  alt="logo"
                />
              </div>
            </Link>
          </div>
          <div className="w-full h-fit">
            {sideNavigation
              .filter((item) => item.key !== "users" || user.role === "admin")
              .map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex border py-4 px-8 items-center cursor-pointer hover:bg-gray-300 transition duration-200 ${
                    location.pathname === item.path ? "bg-gray-300" : ""
                  } rounded-lg`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            {user && (
              <button
                onClick={logout}
                className="py-4 px-8 border justify-start flex cursor-pointer hover:bg-gray-300 transition duration-200 rounded-lg w-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="col-span-10 p-4 ml-4 rounded-xl bg-gray-100 shadow-md max-h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
