import { useNavigate } from "react-router-dom";
import {signUp} from "../api/authApi.ts";

export const useAuth = () => {
    const navigate = useNavigate();

    const handleSignUp = async (formData: { username: string; password: string }) => {
        const { username, password } = formData;
        try {
            const data = await signUp(username, password);
            console.log("Signup successful:", data);
            navigate("/signin", { replace: true });
        } catch (error) {
            console.error("Signup failed:", error.message);
        }
    };

    return { handleSignUp };
};
