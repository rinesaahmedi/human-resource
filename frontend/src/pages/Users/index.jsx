import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Button, Card } from "@mantine/core";

import CustomModal from "../../components/Modals";
import UserTable from "../../components/Table/UsersTable";
import CreateUser from "../../components/Forms/CreateUser";
import UpdateUser from "../../components/Forms/UpdateUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState();

  const buttonRef = useRef();

  const handleGetUsers = async () => {
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
      icon: <FaEye />,
      title: "View",
      handleClick: (item) => setIsCreateModalOpen(true),
    },
    {
      icon: <FaEdit />,
      title: "Edit",
      handleClick: (item) => {
        setActiveUser(item);
        setIsUpdateModalOpen(true);
      },
    },
    {
      icon: <FaTrashAlt />,
      title: "Delete",
      handleClick: (item) => onDelete(item.id),
    },
  ];

  const handleCreateUser = async (formData) => {
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
      handleGetUsers();
      setIsCreateModalOpen(false);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  const onDelete = async (id) => {
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
      handleGetUsers();
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  const handleOnUpdate = async (body) => {
    const response = await fetch(`/api/user/${activeUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.ok) {
      handleGetUsers();
      setIsUpdateModalOpen(false);
      toast.success("User Updated");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <div>
      <Card>
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Users</h3>
            <Button onClick={() => setIsCreateModalOpen(true)} title="Employee">
              Add User
            </Button>
          </div>
          <UserTable
            actions={actions}
            headers={[
              { title: "Username" },
              { title: "Email" },
              { title: "Role" },
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
        onCancel={() => setIsCreateModalOpen(false)}
        title="Create User"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
      >
        <CreateUser ref={buttonRef} handleOnSubmit={handleCreateUser} />
      </CustomModal>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsUpdateModalOpen(false)}
        title="Update User"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
      >
        <UpdateUser
          activeUser={activeUser}
          ref={buttonRef}
          handleOnSubmit={handleOnUpdate}
        />
      </CustomModal>
    </div>
  );
};

export default Users;
