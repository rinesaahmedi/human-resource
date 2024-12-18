import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Card } from "@mantine/core";

import CustomModal from "../../components/Modals";
import { EmployeeTable } from "../../components/Table/EmployeesTable";
import CreateEmployee from "../../components/Forms/CreateEmployee";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();

  const handleGetEmployees = async () => {
    const response = await fetch("/api/user", {
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
      setUsers(responseToJson.data);
    } else {
      toast.error(responseToJson.message || "Something went wrong!");
    }
  };

  const actions = [
    {
      icon: <FaEdit />,
      title: "Edit",
      handleClick: (item) => setIsOpen(true),
    },
    {
      icon: <FaTrashAlt />,
      title: "Delete",
      handleClick: (item) => onDelete(item),
    },
  ];

  async function onSubmit(formData) {
    const response = await fetch("/api/user", {
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
      setIsOpen(false);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  async function onDelete(id) {
    const response = await fetch(`/api/user/${id}`, {
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
            <h3 className="text-2xl font-semibold">Users</h3>
            <Button onClick={() => setIsOpen(true)} title="Employee">
              Add User
            </Button>
          </div>
          <EmployeeTable
            actions={actions}
            headers={[
              { title: "Username" },
              { title: "Email" },
              { title: "Age" },
            ]}
            data={users}
          />
        </div>
      </Card>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsOpen(false)}
        title="Create User"
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <CreateEmployee ref={buttonRef} handleOnSubmit={onSubmit} />
      </CustomModal>
    </div>
  );
};

export default Users;
