import {useNavigate} from "react-router-dom";
import {SignUpForm} from "../../components/Forms";

const SignUp = () => {
    const navigate = useNavigate();

    async function onSubmit(formData) {
        const {username, password} = formData;
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/signin", {replace: true});
            } else {
                console.error("Signup failed:", data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
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
                <SignUpForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

export default SignUp;
