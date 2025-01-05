import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/sliit360.svg";
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
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
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
                  <Link to="/about">
                    <DropdownMenuItem className="text-text mb-0.5 text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>About</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/contact">
                    <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>Contact</span>
                    </DropdownMenuItem>
                  </Link>
                  {/* {userInfo && (
                    <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <button onClick={handleLogout}>Logout</button>
                    </DropdownMenuItem>
                  )} */}
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
