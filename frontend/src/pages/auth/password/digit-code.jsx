import React from 'react';
import {useNavigate} from "react-router-dom";
import CustomCard from "../../../components/common/cards/CustomCard.tsx";
import Button from "../../../components/common/button";

const DigitCode = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-screen items-center text-white">
            <CustomCard
                title={"Enter Verification Code"}
                description={"Please enter the 6-digit code sent to your email or phone."}
                style={"border-[#94929240] flex flex-col gap-[30px] border-none max-w-[510px]"}
                fontStyle={"text-left text-[#599698] font-bold"}
                descriptionStyle={"text-[#bab9b8]"}
            >
                <div className="flex flex-col gap-[5px]">
                    <form className="flex flex-col gap-4">
                        {/* Verification Code Blocks */}
                        <div className="flex justify-center gap-3">
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-12 text-center border-b border-gray-300   text-[#5c5c5c] focus:outline-none  focus:border-b-[#599698] "
                                />
                            ))}
                        </div>
                        <Button
                            className="mt-5"
                            title="Verify Code"
                            variant="gray"
                            type="submit"
                            onClick={() => console.log("Code verified!")}
                        />
                    </form>

                        <Button
                            className="mt-3"
                            title="Back to login"
                            variant="outlined"
                            type="button"
                            onClick={() => navigate("/signin")}
                        />

                </div>
            </CustomCard>
        </div>

    );
};

export default DigitCode;