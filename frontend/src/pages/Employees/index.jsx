import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button, Card } from "@mantine/core";

import CustomModal from "../../components/Modals";
import { EmployeeTable } from "../../components/Table/EmployeesTable";
import CreateEmployee from "../../components/Forms/Employee/CreateEmployee";
import UpdateEmployee from "../../components/Forms/Employee/UpdateEmployee";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState();
  const buttonRef = useRef();
  const navigate = useNavigate();

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

  const actions = [
    {
      icon: <FaEye />,
      title: "View",
      handleClick: (item) => {
        navigate(`/employee/${item.id}`);
      },
    },
    {
      icon: <FaEdit />,
      title: "Edit",
      handleClick: (item) => {
        setActiveEmployee(item);
        setIsUpdateModalOpen(true);
      },
    },
    {
      icon: <FaTrashAlt />,
      title: "Delete",
      handleClick: (item) => onDelete(item.id),
    },
  ];

  async function onSubmit(formData) {
    const response = await fetch("/api/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      handleGetEmployees();
      setIsCreateModalOpen(false);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  const handleOnUpdate = async (body) => {
    const payload = {
      name: body.name,
      contact: body.contact,
    };
    const response = await fetch(`/api/employee/${activeEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      handleGetEmployees();
      setIsUpdateModalOpen(false);
      toast.success("Employee Updated");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  async function onDelete(id) {
    const response = await fetch(`/api/employee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      handleGetEmployees();
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    handleGetEmployees();
  }, []);
  return (
    <div>
      <Card>
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Employees</h3>
            <Button onClick={() => setIsCreateModalOpen(true)} title="Employee">
              Add Employee
            </Button>
          </div>
          <EmployeeTable
            actions={actions}
            headers={[
              { title: "Employee" },
              { title: "Department" },
              { title: "Contact" },
            ]}
            data={employees}
          />
        </div>
      </Card>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsCreateModalOpen(false)}
        title="Create Employee"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
      >
        <CreateEmployee ref={buttonRef} handleOnSubmit={onSubmit} />
      </CustomModal>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsUpdateModalOpen(false)}
        title="Update Employee"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
      >
        <UpdateEmployee
          activeEmployee={activeEmployee}
          ref={buttonRef}
          handleOnSubmit={handleOnUpdate}
        />
      </CustomModal>
    </div>
  );
};

export default Employees;
