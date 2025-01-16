import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {Card } from "@mantine/core";

import CustomModal from "../../components/Modals";

import DepartmentTable from "../../components/Table/DepartmentTable";
import CreateDepartment from "../../components/Forms/Department/CreateDepartment";
import UpdateDepartment from "../../components/Forms/Department/UpdateDepartment";
import Button from "../../components/common/button";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState();
  const buttonRef = useRef();

  const handleGetDepartments = async () => {
    const response = await fetch("/api/department", {
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
      setDepartments(responseToJson.data);
    } else {
      toast.error(responseToJson.message || "Something went wrong!");
    }
  };

  const actions = [
    {
      icon: <FaEdit />,
      title: "Edit",
      handleClick: (item) => {
        setActiveDepartment(item);
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
    const response = await fetch("/api/department", {
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
      handleGetDepartments();
      setIsCreateModalOpen(false);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  const handleOnUpdate = async (body) => {
    const response = await fetch(`/api/department/${activeDepartment.id}`, {
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
      handleGetDepartments();
      setIsUpdateModalOpen(false);
      toast.success("Department Updated");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  async function onDelete(id) {
    const response = await fetch(`/api/department/${id}`, {
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
      handleGetDepartments();
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    handleGetDepartments();
  }, []);

  return (
    <div>
      <Card style={{padding: "110px"}}>
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-between ">
            <h3 className="text-[30px] font-semibold">Department</h3>
            <Button variant={'blue'}
              onClick={() => setIsCreateModalOpen(true)}
              title=" Add Department"
            >
              {/*Add Department*/}
            </Button>
          </div>
          <DepartmentTable
            actions={actions}
            headers={[
              { title: "Name" },
              { title: "Description" },
              { title: "Employees" },
            ]}
            data={departments}
          />
        </div>
      </Card>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsCreateModalOpen(false)}
        title="Create Department"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
      >
        <CreateDepartment ref={buttonRef} handleOnSubmit={onSubmit} />
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
        <UpdateDepartment
          activeDepartment={activeDepartment}
          ref={buttonRef}
          handleOnSubmit={handleOnUpdate}
        />
      </CustomModal>
    </div>
  );
};

export default Department;
