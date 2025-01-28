import { error404 } from "@/assets";
import React from "react";

const Error404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={error404}
        alt="error404"
        className="px-5 max-w-64 sm:max-w-md"
      />
    </div>
  );
};

export default Error404;
