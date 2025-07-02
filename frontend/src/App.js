import { Route, Routes, Navigate } from "react-router-dom";
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
import useUserStore from "./Stores/userStore";
import AboutUs from "./pages/about-us";
import ContactUs from "./pages/contact-us";
// import AboutUs from "./pages/about-us";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useUserStore();
  return accessToken ? children : <Navigate to="/signin" />;
};

function App() {
  const { accessToken } = useUserStore();

  console.log("Access Token:", accessToken);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<Password />} />
        <Route path="/digit-code" element={<DigitCode />} />


        {/* Redirect unauthenticated users to /signin */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Protected Routes */}
          <Route index element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Employees />} />
          <Route path="/my-profile/:id" element={<User />} />
          <Route path="/employee/:id" element={<EmployeeView />} />
          <Route path="/department" element={<Department />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />


        </Route>

        {/* Catch all: Redirect to signin */}
        {!accessToken && <Route path="*" element={<Navigate to="/signin" />} />}
      </Routes>
    </MantineProvider>
  );
}

export default App;
