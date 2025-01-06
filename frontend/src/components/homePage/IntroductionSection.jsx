import React from 'react';

const IntroductionSection = () => {
    return (
        <div className="bg-gradient-to-br from-[#1F263E] to-[#88C0C3] h-screen flex flex-col lg:flex-row justify-center items-center text-white text-left gap-[20px] lg:gap-[40px] xs:p-[20px] ">
            <div className="flex flex-col max-w-[630px] text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    Improving HR Manager Workflow Radically
                </h1>
                <p className="text-base lg:text-lg max-w-[650px] mb-6">
                    Transforming HR Processes with Innovative Solutions to Enhance Efficiency,
                    Streamline Operations, and Empower Your Team to Focus on Strategic Initiatives.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                    <button className="bg-white text-[#599698] font-semibold py-2 px-6 rounded hover:bg-[#88C0C3] hover:text-white transition-all">
                        Get Started Today
                    </button>
                    <button className="bg-transparent border border-white py-2 px-6 rounded text-white hover:bg-white hover:text-[#599698] transition-all">
                        Try Demo Account
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <img
                    src="/images/explore.svg"
                    alt="Sign up illustration"
                    className="w-[350px] lg:w-[500px]"
                />
            </div>
        </div>
    );
};

export default IntroductionSection;