import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../Input";
import Button from "../Button";

const usernameRegEx = /^(?=.{3,16}$)[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/;

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(usernameRegEx, "Username is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center w-3/5 gap-4"
    >
      <h1 className="text-3xl font-medium">Log in</h1>

      <Input
        type="text"
        name="username"
        label="Username"
        register={register}
        error={errors.username?.message}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        register={register}
        error={errors.password?.message}
      />

      <Button className="mt-3" title="Log in" variant="red" type="submit" />

      <Link className="text-green-500" to={`/signup`}>
        Sign up here
      </Link>
    </form>
  );
};

export default SignInForm;
