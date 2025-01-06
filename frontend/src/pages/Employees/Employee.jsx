import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Group,
  Divider,
  Table,
  Loader,
  Badge,
  Stack,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await fetch(`/api/employee/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEmployee(data.data);
        setLoading(false);
      } else {
        toast.error(data.message || "Failed to load employee data!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching employee data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Text color="red" size="lg">
          Employee not found.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ width: "80%", maxWidth: 1000 }}
      >
        <Group position="apart" mb="md">
          <Text size="xl" weight={700}>
            Employee Details
          </Text>
        </Group>
        <Divider my="sm" />

        {/* Basic Information */}
        <Stack spacing="sm">
          <Text>
            <strong>Name:</strong> {employee.name || "N/A"}
          </Text>
          <Text>
            <strong>Contact:</strong> {employee.contact || "N/A"}
          </Text>
          <Text>
            <strong>Department:</strong> {employee.department?.name || "N/A"}
          </Text>
          <Text>
            <strong>Role:</strong> {employee.role?.name || "N/A"}
          </Text>
        </Stack>

        <Divider my="lg" />

        {/* Attendance */}
        <Text size="lg" weight={600} mb="sm">
          Attendance
        </Text>
        {employee.attendance?.length > 0 ? (
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.attendance.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>
                    <Badge color={entry.status === "Present" ? "green" : "red"}>
                      {entry.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Text>No attendance records found.</Text>
        )}

        <Divider my="lg" />

        {/* Leave Requests */}
        <Text size="lg" weight={600} mb="sm">
          Leave Requests
        </Text>
        {employee.leaveRequest?.length > 0 ? (
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.leaveRequest.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.type}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>
                    <Badge
                      color={leave.status === "Approved" ? "green" : "yellow"}
                    >
                      {leave.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Text>No leave requests found.</Text>
        )}

        <Divider my="lg" />

        {/* Payroll */}
        <Text size="lg" weight={600} mb="sm">
          Payroll
        </Text>
        {employee.payroll?.length > 0 ? (
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.payroll.map((payroll, index) => (
                <tr key={index}>
                  <td>{payroll.month}</td>
                  <td>${payroll.amount.toFixed(2)}</td>
                  <td>
                    <Badge color={payroll.status === "Paid" ? "green" : "red"}>
                      {payroll.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Text>No payroll records found.</Text>
        )}
      </Card>
    </div>
  );
};

export default EmployeeView;
