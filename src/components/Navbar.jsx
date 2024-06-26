import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">Logo</a>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:space-x-4">
            <li>
              <a
                href="/"
                className="block text-white hover:text-secondary lg:inline-block lg:mt-0"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block text-white hover:text-secondary lg:inline-block lg:mt-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="block text-white hover:text-secondary lg:inline-block lg:mt-0"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block text-white hover:text-secondary lg:inline-block lg:mt-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
