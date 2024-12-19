import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../Input";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  contact: yup.string(),
});

const UpdateEmployee = React.forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...props.activeEmployee },
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.handleOnSubmit)}
    >
      <Input label="Name" {...register("name")} error={errors?.name?.message} />
      <Input
        label="Contact / Email"
        {...register("contact")}
        error={errors?.contact?.message}
      />
      <button ref={ref} type="submit" className="hidden">
        Submit
      </button>
    </form>
  );
});

export default UpdateEmployee;
