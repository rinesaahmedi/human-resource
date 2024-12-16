import React from "react";

import { Link } from "react-router-dom";

const SideBar = (username) => {
  return (
    <div className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-purple-800">
        <div>
          <p className="px-2 text-gray-200 uppercase">menu</p>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                to={`/`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                to={`/users`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                to={`/employees`}
              >
                Employees
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                to={`/`}
              >
                Reports
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="px-2 text-gray-200 uppercase"></p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
