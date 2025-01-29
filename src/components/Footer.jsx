import React from "react";
import { Wrapper } from ".";
import { ts_logo } from "@/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <Link target="_blank" rel="noopener noreferrer" to="#">
        <div className="flex items-end justify-center p-5 gap-1 mt-10 transform transition ">
          <span className="text-sm text-soft-text">Developed by</span>
          <img
            src={ts_logo}
            alt="TS_Logo"
            className="w-6 hover:shadow-lg hover:scale-110 hover:shadow-secondary/50 transition-all duration-300"
          />
        </div>
      </Link>
    </Wrapper>
  );
};

export default Footer;
