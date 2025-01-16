import React from "react";
import Sidebar from "../dashboard/partials/Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
                {children} {/* Render the child content here */}
            </main>
        </div>
    );
};

export default DashboardLayout;
