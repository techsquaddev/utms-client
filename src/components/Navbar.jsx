import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/logo.png";
import { Wrapper } from ".";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <Wrapper>
      <nav className="my-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <img
                className="w-16 object-contain md:w-20"
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-text bg-white border border-border p-2 rounded-lg shadow-lg hover:bg-soft-gray transition-colors duration-300">
                  <MenuIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuGroup>
                  <Link to="/">
                    <DropdownMenuItem className="text-text mb-0.5 text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>Home</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="text-text mb-0.5 text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                    <span>About</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                    <span>Contact</span>
                  </DropdownMenuItem>
                  {user && (
                    <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <button onClick={handleLogout}>Logout</button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
