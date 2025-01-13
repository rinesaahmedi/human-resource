import { Route, Routes } from "react-router-dom";
import React from "react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import Users from "./pages/Users";
import User from "./pages/User";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Password from "./pages/auth/password";
import DigitCode from "./pages/auth/password/digit-code";
import "./App.css";
import Employees from "./pages/Employees";

import MainLayout from "./components/MainLayout";
import EmployeeView from "./pages/Employees/Employee";
import Department from "./pages/Department";
import Reviews from "./pages/Reviews";
import ContactUs from "./pages/contact-us";
import AboutUs from "./pages/about-us";
import DashboardRoutes from "./DashboardRoutes"; // Import DashboardRoutes

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/password" element={<Password />} />
                <Route path="/digit-code" element={<DigitCode />} />
                <Route path="/dashboard/*" element={<DashboardRoutes />} /> {/* Use DashboardRoutes here */}

                {/* Protected Routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route path="employees" element={<Employees />} />
                    <Route path="users" element={<Users />} />
                    <Route path="reports" element={<Employees />} />
                    <Route path="my-profile/:id" element={<User />} />
                    <Route path="employee/:id" element={<EmployeeView />} />
                    <Route path="department" element={<Department />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="about-us" element={<AboutUs />} />
                </Route>
            </Routes>
        </MantineProvider>
    );
}

export default App;
