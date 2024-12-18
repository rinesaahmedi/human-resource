import { Route, Routes, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import Employees from "./pages/Employees";
import useUserStore from "./Stores/userStore";

function ProtectedRoute({ children }) {
  const { accessToken } = useUserStore();
  return accessToken ? children : <Navigate to="/signin" />;
}

const App = () => {
  return (
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
        <Route path="/users" element={<h1>Kuje o user</h1>} />
        <Route path="/reports" element={<Employees />} />
        <Route path="/my-profile" element={<h1>Kuje o user</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
