import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import Input from "../../Input";
import { Textarea, TextInput } from "@mantine/core";

// Validation schema
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

const UpdateReviewForm = React.forwardRef((props, ref) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...props.activeReview,
      reviewDate: new Date(props.activeReview.reviewDate),
    },
  });

  const handleFormSubmit = (data) => {
    props.onSubmit(data);
    reset();
  };

  console.log("FORM", new Date(props.activeReview.reviewDate));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="employeeId"
        control={control}
        render={({ field }) => (
          <Input
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
      <button ref={ref} type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
});

export default UpdateReviewForm;
