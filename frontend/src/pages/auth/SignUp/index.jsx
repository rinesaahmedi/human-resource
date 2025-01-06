import {useNavigate} from "react-router-dom";
import CustomCard from "../../../components/common/cards/CustomCard.tsx";
import {SignUpForm} from "../../../components/common/forms";


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
                console.log("Signup successful:", data);
                navigate("/signin", {replace: true});
            } else {
                console.error("Signup failed:", data);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    return (
        <div className='flex gap-[100px] justify-center h-screen items-center  '>
            <CustomCard
                title={'Register'}
                description={'Start by creating new account.'}
                style={'border-[#94929240] flex flex-col gap-[30px] border-none '}
                fontStyle={'text-left text-[#599698] font-bold'}
                descriptionStyle={'text-[#bab9b8]'}
            >
                <div>
                    <SignUpForm onSubmit={onSubmit}/>

                </div>

            </CustomCard>
            <img
                src="/images/signUp.svg"
                alt="Sign up illustration"
                className="w-[400px]"
            />
        </div>
    );
};

export default SignUp;
