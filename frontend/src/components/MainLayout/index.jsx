import React from "react";

import { Outlet } from "react-router-dom";

// import SideBar from "../SideBar";
import Header from "../layout/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex-1 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
