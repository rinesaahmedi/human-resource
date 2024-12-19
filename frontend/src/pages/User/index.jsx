import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Text,
  Avatar,
  Group,
  Divider,
  Loader,
  Button,
  Modal,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../components/Input";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Name is required"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromUser = searchParams.get("fromUser") === "true";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGetUser = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
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
        setUser(responseToJson.data);
        setLoading(false);
        reset();
      } else {
        setLoading(false);
        toast.error(responseToJson.message || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleChangePassword = async (formData) => {
    try {
      const response = await fetch(`/api/user/change-password/${id}`, {
        method: "PATCH",
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
        toast.success("Password updated successfully!");
        setChangePasswordOpen(false);
      } else {
        toast.error(
          data.message || "Opss! something went wrong. Please try again later"
        );
      }
    } catch (error) {
      console.log("ERR", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    handleGetUser(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Text color="red" size="lg">
          User not found.
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
        style={{ width: 400 }}
      >
        <Group position="center" spacing="sm">
          <Avatar size={80} radius="xl" />
          <div>
            <Text size="lg" weight={700}>
              {user.username || "Unknown"}
            </Text>
            <Text size="sm" color="dimmed">
              Role: {user.role || "N/A"}
            </Text>
          </div>
        </Group>
        <Divider my="lg" />
        {!fromUser && (
          <Group position="center" spacing="md">
            <Button
              variant="outline"
              color="blue"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change Password
            </Button>
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        )}
      </Card>
      <Modal
        opened={isChangePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        title="Change Password"
        centered
      >
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            label="Current Password"
            placeholder="Enter your current password"
            {...register("currentPassword")}
            error={errors?.currentPassword?.message}
            type="password"
            required
          />
          <Input
            label="New Password"
            placeholder="Enter your new password"
            {...register("newPassword")}
            error={errors?.newPassword?.message}
            mt="sm"
            required
          />
          <Input
            label="Confirm New Password"
            placeholder="Please confirm your new password"
            {...register("confirmNewPassword")}
            error={errors?.confirmNewPassword?.message}
            mt="sm"
            required
          />
          <Button type="submit" fullWidth mt="md">
            Update Password
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default User;
