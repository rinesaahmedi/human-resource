import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomCard from "../../../components/common/cards/CustomCard.tsx";
import Button from "../../../components/common/button";
import Input from "../../../components/common/input";


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
const ForgotPassword = () => {
    const {
        register,
        // handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(formSchema),
    });
    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-screen items-center  text-white">
            <CustomCard
                title={"Trouble logging in?"}
                description={
                    "Enter your email, phone, or username, and we'll send you a link to reset your password."
                }
                style={"border-[#94929240] flex flex-col gap-[30px] border-none w-[400px]"}
                fontStyle={"text-left text-[#599698] font-bold"}
                descriptionStyle={"text-[#bab9b8]"}
            >
                <div className={'flex flex-col gap-[25px]'}>
                    <form
                        // onSubmit={(e) => {
                        //     e.preventDefault();
                        //     const formData = Object.fromEntries(new FormData(e.target));
                        //     onSubmit(formData);
                        // }}
                        className="flex flex-col gap-4"
                    >

                        <Input
                            type="text"
                            name="password"
                            label="Email, Phone, or Username"
                            register={register}
                            error={errors.password?.message}
                        />
                        <Button className="mt-3" title="Send login link" variant="outlined" type="submit"
                                onClick={() => navigate("/digit-code")}/>

                    </form>
                    <div className={'flex flex-col gap-[10px]'}>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <span className="text-[#599698]">
                            Can't reset your password?
                        </span>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <div className="text-center text-[#bab9b8]">OR</div>
                        <div className="text-center">
                            <a
                                href="/signup"
                                className="text-[#599698] underline"
                            >
                                Create new account
                            </a>
                        </div>

                    </div>


                </div>

                <Button className="mt-3" title="Back to login" variant="gray" type="submit"
                        onClick={() => navigate("/signin")}/>

            </CustomCard>

        </div>
    );
};

export default ForgotPassword;
