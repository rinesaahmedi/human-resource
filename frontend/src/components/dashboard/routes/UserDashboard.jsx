import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function UserDashboard() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const users = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: index % 2 === 0 ? "John Doe" : "Jane Smith",
        email: index % 2 === 0 ? "john.doe@example.com" : "jane.smith@example.com",
        role: index % 2 === 0 ? "Admin" : "User",
    }));
    const handleGetEmployees = async () => {
        const response = await fetch("/api/employee", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("accessToken")
                )}`,
            },
        });

        const responseToJson = await response.json();
        if (response.ok) {
            setEmployees(responseToJson.data);
        } else {
            toast.error(responseToJson.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        handleGetEmployees();
    }, []);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of users to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEditClick = (userId) => {
        // Navigate to the user edit page with the user ID as a query parameter
        navigate(`/dashboard/users?user_id=${userId}`);
    };

    return (
        <div className="min-h-screen flex flex-col p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">User Dashboard</h1>
                <p className="text-gray-600">Manage your users with ease</p>
            </header>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Role</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                    onClick={() => handleEditClick(user.id)}
                                >
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, users.length)} of {users.length} users
                </span>
                <div>
                    <button
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 ml-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
