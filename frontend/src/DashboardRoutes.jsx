import React from "react";
import {Route, Routes} from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import UserDashboard from "./components/dashboard/routes/UserDashboard"; // Replace with actual path

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route
                path="/*" // Changed from "/dashboard/*"
                element={
                    <DashboardLayout>
                        <Routes>
                            <Route path="user-dashboard" element={<UserDashboard />} />
                            {/* Add other dashboard routes */}
                        </Routes>
                    </DashboardLayout>
                }
            />
        </Routes>
    );
};

export default DashboardRoutes;
