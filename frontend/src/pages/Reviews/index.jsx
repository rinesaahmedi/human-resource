import { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Group,
  Title,
  Text,
  SimpleGrid,
  ActionIcon,
} from "@mantine/core";

import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReviewForm from "../../components/Forms/Reviews/CreateReview";
import CustomModal from "../../components/Modals";
import UpdateReviewForm from "../../components/Forms/Reviews/UpdateReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeReview, setActiveReview] = useState();
  const buttonRef = useRef();

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/review`, {
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
        setReviews(data.data);
        setLoading(false);
      } else {
        toast.error(data.message || "Failed to load employee data!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleCreateReview = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Review created successfully!");
        fetchReviews();
        setIsCreateModalOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = async (payload) => {
    setLoading(true);
    delete payload.id;
    delete payload.employee;
    try {
      const response = await fetch(`/api/review/${activeReview.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Review updated successfully!");
        fetchReviews();
        setIsUpdateModalOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/review/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      });

      if (response.ok) {
        toast.success("Review deleted successfully!");
        fetchReviews();
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <Title order={2} className="m-0">
          Reviews Page
        </Title>
        <Button onClick={() => setIsCreateModalOpen(true)} mb="lg">
          Add Review
        </Button>
      </div>

      <SimpleGrid cols={3} spacing="lg">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Card
              key={review.id}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              style={{ position: "relative" }}
            >
              {/* Delete Button */}
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => handleDeleteReview(review.id)}
                loading={deleting}
                radius="md"
                size="lg"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
                <FaTrash />
              </ActionIcon>

              {/* Edit Button */}
              <ActionIcon
                variant="filled"
                color="blue"
                onClick={() => {
                  setIsUpdateModalOpen(true);
                  setActiveReview(review);
                }}
                radius="md"
                size="lg"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "50px",
                }}
              >
                <FaEdit />
              </ActionIcon>

              <Text>
                <strong>Employee ID:</strong> {review.employeeId}
              </Text>
              <Text>
                <strong>Review Date:</strong>{" "}
                {new Date(review.reviewDate).toLocaleDateString()}
              </Text>
              {review?.comments && (
                <Text>
                  <strong>Comments:</strong> {review.comments}
                </Text>
              )}

              <Group position="apart" mt="md">
                <Text weight={500}>Review Details</Text>
              </Group>
            </Card>
          ))}
      </SimpleGrid>

      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsCreateModalOpen(false)}
        title="Create a Review"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(!isCreateModalOpen)}
      >
        <ReviewForm
          ref={buttonRef}
          onSubmit={handleCreateReview}
          loading={loading}
        />
      </CustomModal>
      <CustomModal
        showActionButtons
        onSubmit={() => {
          buttonRef.current.click?.();
        }}
        onCancel={() => setIsUpdateModalOpen(false)}
        title="Update a Review"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
      >
        <UpdateReviewForm
          ref={buttonRef}
          activeReview={activeReview}
          onSubmit={handleEditReview}
          loading={loading}
        />
      </CustomModal>
    </div>
  );
};

export default Reviews;
