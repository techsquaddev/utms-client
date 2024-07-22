import React from "react";
import { Wrapper } from ".";
import TS_Logo from "../assets/ts_logo.svg";

const Footer = () => {
  return (
    <Wrapper>
      <div className="flex items-end justify-center p-5 gap-1 mt-10">
        <span className="text-sm text-soft-text">Developed by</span>
        <img src={TS_Logo} alt="TS_Logo" className="w-6" />
      </div>
    </Wrapper>
  );
};

export default Footer;
