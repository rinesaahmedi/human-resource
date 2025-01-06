import React from "react";
import Button from "../common/button";

const EmployeeSummary = ({ totalEmployees, recentHires, departments }) => {
    return (
        <div className="bg-white py-16 px-6   max-w-[1200px] mx-auto">
            <h2 className="text-xl font-semibold text-[#1F263E] mb-6 text-center">
                Employee Management Summary
            </h2>
            <div className="flex justify-center gap-4 md:gap-6">
                {/* Total Employees */}
                <div className="flex flex-col items-center justify-center bg-[#F7FAFC] w-[250px] h-[250px] rounded-full border border-[#599698] shadow">
                    <span className="text-4xl font-bold text-[#1F263E]">{totalEmployees}</span>
                    <p className="text-gray-600 text-sm mt-2 text-center">Total Employees</p>
                </div>
                {/* Recent Hires */}
                <div className="flex flex-col items-center justify-center bg-[#F7FAFC] w-[250px] h-[250px] rounded-full border border-[#599698] shadow">
                    <span className="text-4xl font-bold text-[#1F263E]">{recentHires}</span>
                    <p className="text-gray-600 text-sm mt-2 text-center">Recent Hires (30 days)</p>
                </div>
                {/* Departments */}
                <div className="flex flex-col items-center justify-center bg-[#F7FAFC] w-[250px] h-[250px] rounded-full border border-[#599698] shadow">
                    <span className="text-4xl font-bold text-[#1F263E]">{departments}</span>
                    <p className="text-gray-600 text-sm mt-2 text-center">Departments</p>
                </div>
            </div>
            <div className="mt-[80px] flex justify-center">

                <Button variant={'gray'} title={'View All Employees'} />
            </div>
        </div>
    );
};

export default EmployeeSummary;
