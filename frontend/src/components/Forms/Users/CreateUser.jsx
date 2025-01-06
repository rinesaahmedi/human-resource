import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../Input";

const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  role: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const CreateUser = React.forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.handleOnSubmit)}
    >
      <Input
        label="Username"
        {...register("username")}
        error={errors?.username?.message}
      />
      <Input label="Role" {...register("role")} error={errors?.role?.message} />
      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors?.password?.message}
      />
      <Input
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors?.confirmPassword?.message}
      />
      <button ref={ref} type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
});

export default CreateUser;
