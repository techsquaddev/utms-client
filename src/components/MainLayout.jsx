import React from "react";
import { Footer, Navbar } from ".";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-dvh">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
