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
  TextInput,
  PasswordInput,
} from "@mantine/core";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromUser = searchParams.get("fromUser") === "true";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`/api/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password updated successfully!");
        setChangePasswordOpen(false);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message || "Failed to update password.");
      }
    } catch (error) {
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
        <TextInput
          label="Current Password"
          placeholder="Enter your current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          required
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          mt="sm"
          required
        />
        <Button fullWidth mt="md" onClick={handleChangePassword}>
          Update Password
        </Button>
      </Modal>
    </div>
  );
};

export default User;
