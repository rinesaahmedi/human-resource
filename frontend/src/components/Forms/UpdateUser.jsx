import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../Input";

const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  role: yup.string(),
});

const UpdateUser = React.forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...props.activeUser },
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
      <button ref={ref} type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
});

export default UpdateUser;
