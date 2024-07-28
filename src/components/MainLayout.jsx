import React from "react";
import { Footer, Navbar } from ".";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-dvh">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
