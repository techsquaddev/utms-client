import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/logo.png";
import { Wrapper } from ".";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <nav className="my-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <img className="w-16 md:w-20" src={Logo} alt="logo" />
            </div>
          </Link>
          <button
            className="text-text bg-soft-gray p-2 rounded-lg shadow-lg focus:outline-none"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Menu */}
        {isOpen && (
          <div className="mt-4">
            <a href="#about" className="block text-white text-lg py-2">
              About
            </a>
            <a href="#contact" className="block text-white text-lg py-2">
              Contact
            </a>
          </div>
        )}
      </nav>
    </Wrapper>
  );
};

export default Navbar;
