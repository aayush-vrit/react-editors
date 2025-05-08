import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    // <div className="bg-black h-screen   flex justify-center items-center text-white">
    //   <div className="max-w-5xl mx-auto">
    <Outlet />
    //   </div>
    // </div>
  );
};

export default Layout;
