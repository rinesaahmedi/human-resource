import { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Card,
  Group,
  Title,
  Text,
  Grid,
} from "@mantine/core";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  employeeId: yup
    .number()
    .typeError("Employee ID must be a number")
    .required("Employee ID is required"),
  reviewDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Review Date is required"),
  comments: yup
    .string()
    .max(500, "Comments must not exceed 500 characters")
    .nullable(),
});

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast({
        title: "Error",
        message: "Failed to fetch reviews",
        color: "red",
      });
    }
  };

  // Handle form submission to create a new review
  const handleCreateReview = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success",
          message: "Review created successfully!",
          color: "green",
        });
        fetchReviews(); // Refresh reviews
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          message: error.message || "Failed to create review",
          color: "red",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <Title order={2} mb="lg">
        Reviews Page
      </Title>

      {/* Form for creating reviews */}
      <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">
          Create a Review
        </Title>
        <ReviewForm onSubmit={handleCreateReview} loading={loading} />
      </Card>

      {/* Reviews list */}
      <Grid>
        {reviews.length &&
          reviews?.map((review) => (
            <Grid.Col sm={6} md={4} key={review.id}>
              <ReviewCard review={review} />
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
};

const ReviewForm = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employeeId: "",
      reviewDate: "",
      comments: "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // Clear form after successful submission
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="employeeId"
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            label="Employee ID"
            placeholder="Enter employee ID"
            error={errors.employeeId?.message}
            mb="sm"
          />
        )}
      />
      <Controller
        name="reviewDate"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label="Review Date"
            placeholder="Select review date"
            type="date"
            error={errors.reviewDate?.message}
            mb="sm"
          />
        )}
      />
      <Controller
        name="comments"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="Comments"
            placeholder="Enter comments (optional)"
            error={errors.comments?.message}
            mb="sm"
          />
        )}
      />
      <Group position="right">
        <Button type="submit" loading={loading}>
          Submit Review
        </Button>
      </Group>
    </form>
  );
};

const ReviewCard = ({ review }) => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
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
  </Card>
);

export default Reviews;
