import React from "react";

import { FaUserAstronaut } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import useUserStore from "../../Stores/userStore";
import { configRoutes } from "../../config/navigation.config";

const SideBar = () => {
  const { username } = useUserStore();

  const { pathname } = useLocation();

  return (
    <div className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-purple-600">
        <div className="px-2 py-5">
          <p className="pb-5 text-2xl text-gray-200 uppercase">Menu</p>
          <ul className="font-medium">
            {configRoutes.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li
                  key={item.path}
                  className={`flex items-center gap-2 px-2 py-4 ${
                    isActive ? " bg-amber-100 rounded-lg" : ""
                  }`}
                >
                  {item.icon}
                  <Link
                    className={`flex ${isActive ? "text-black" : "text-white"}`}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-4 px-2 pt-2 border-t">
          <FaUserAstronaut />
          <p className="font-bold text-gray-200">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
