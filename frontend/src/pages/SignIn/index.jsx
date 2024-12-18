import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useUserStore from "../../Stores/userStore";
import SignInForm from "../../components/Forms/SignInForm";

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
        navigate("/users");
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
    <div className="flex bg-sky-100">
      <div className="w-1/2 h-screen">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Background view"
          className="object-cover object-left-top w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-screen gap-4">
        <SignInForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default SignIn;
