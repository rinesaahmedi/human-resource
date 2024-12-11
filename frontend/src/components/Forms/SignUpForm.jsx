import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../Input";
import Button from "../Button";

const usernameRegEx = /^(?=.{3,16}$)[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/;

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(usernameRegEx, "Username is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  let navigate = useNavigate();

  async function onSubmit(formData) {
    const { username, password } = formData;
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("Form Submitted", response);

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        navigate("/signin", { replace: true });
      } else {
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center w-3/5 gap-4"
    >
      <h1 className="text-3xl font-medium">Sign Up</h1>

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

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        register={register}
        error={errors.confirmPassword?.message}
      />

      <Button className="mt-3" title="Sign Up" variant="blue" type="submit" />

      <Link className="text-green-500" to={"/signin"}>
        Already have an account?
      </Link>
    </form>
  );
};

export default SignUpForm;
