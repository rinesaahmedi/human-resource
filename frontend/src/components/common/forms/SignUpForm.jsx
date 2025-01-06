import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../input";
import Button from "../button";

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

const SignUpForm = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-[10px]"
        >
            {/*<h1 className="text-3xl font-medium">Sign Up</h1>*/}

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

            <Button className="mt-3" title="Sign Up" variant="outlined" type="submit"/>

            <Link className="text-[#599698] text-right " to={"/signin"}>
                Already have an account?
            </Link>
        </form>
    );
};

export default SignUpForm;
