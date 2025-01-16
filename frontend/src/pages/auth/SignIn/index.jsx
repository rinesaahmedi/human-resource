import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCard from "../../../components/common/cards/CustomCard.tsx";
import { SignInForm } from "../../../components/common/forms";

import useUserStore from "../../../Stores/userStore.js";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useUserStore();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.data.token;
        const user = data.data.user;

        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        navigate("/");
        toast.success("Sign in successfully");
      } else {
        console.error("Sign-in failed:", data);
        toast.error(data.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("An error occurred during sign-in.");
    }
  };

  return (
    <div className="flex gap-[100px] justify-center h-screen items-center">
      <CustomCard
        title={"Sign In"}
        description={"Access your account by signing in."}
        style={"border-[#94929240] flex flex-col gap-[30px] border-none"}
        fontStyle={"text-left text-[#599698] font-bold"}
        descriptionStyle={"text-[#bab9b8]"}
      >
        <div>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </CustomCard>
      <img
        src="/images/signIn.svg"
        alt="Sign in illustration"
        className="w-[250px]"
      />
    </div>
  );
};

export default SignIn;
