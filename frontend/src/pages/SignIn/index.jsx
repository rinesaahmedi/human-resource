import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/Forms/SignInForm";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(formData) {
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
        console.log("Signin successful:", data);
        const accessToken = data.data.token;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        navigate("/", { replace: true });
      } else {
        console.error("Signin failed:", data);
        setError(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

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
        <SignInForm onSubmit={onSubmit} error={error} />
      </div>
    </div>
  );
};

export default SignIn;
