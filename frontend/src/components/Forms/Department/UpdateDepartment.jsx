import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../Input";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  employees: yup.string().notRequired(),
});

const UpdateDepartment = React.forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...props.activeDepartment },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.handleOnSubmit)}
    >
      <Input label="Name" {...register("name")} error={errors?.name?.message} />
      <Input
        label="Description"
        {...register("description")}
        error={errors?.description?.message}
      />
      <button ref={ref} type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
});

export default UpdateDepartment;
