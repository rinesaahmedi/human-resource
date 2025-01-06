import React from "react";

import { Outlet } from "react-router-dom";

import SideBar from "../SideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 p-10 overflow-hidden bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
