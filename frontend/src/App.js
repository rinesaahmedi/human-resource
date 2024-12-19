import { Route, Routes, Navigate } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import useUserStore from "./Stores/userStore";

import Users from "./pages/Users";
import User from "./pages/User";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Employees from "./pages/Employees";

import MainLayout from "./components/MainLayout";
import EmployeeView from "./pages/Employees/Employee";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUserStore();
  return isSignedIn() ? children : <Navigate to="/signin" />;
}

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
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
        </Route>
      </Routes>
    </MantineProvider>
  );
};

export default App;
