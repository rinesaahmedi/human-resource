import { Route, Routes, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import useUserStore from "./Stores/userStore";

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

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUserStore();
  return isSignedIn ? children : <Navigate to="/signin" />;
};

function App() {
  const { isSignedIn } = useUserStore();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        {/* Public Routes */}
        {!isSignedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password" element={<Password />} />
            <Route path="/digit-code" element={<DigitCode />} />
          </>
        )}

        {/* Protected Routes */}
        {isSignedIn && (
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Employees />} />
            <Route path="/my-profile/:id" element={<User />} />
            <Route path="/employee/:id" element={<EmployeeView />} />
            <Route path="/department" element={<Department />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        )}
      </Routes>
    </MantineProvider>
  );
}

export default App;