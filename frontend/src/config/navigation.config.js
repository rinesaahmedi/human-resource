import { HiOutlineUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";

export const configRoutes = [
  { path: "/users", icon: <HiOutlineUsers />, name: "Users" },
  { path: "/employees", icon: <FaUsers />, name: "Employees" },
  { path: "/reports", icon: <TbReportSearch />, name: "Reports" },
  { path: "/my-profile", icon: <FaRegUserCircle />, name: "My Profile" },
];
