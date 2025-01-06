import React from 'react';
import CustomCard from '../common/cards/CustomCard.tsx';

const serviceCards = [
    {
        title: 'Recruitment Solutions',
        description:
            'Simplify hiring with our advanced recruitment tools, ensuring you attract top talent efficiently.',
        icon: '/images/recruitment.svg',
    },
    {
        title: 'Payroll Management',
        description:
            'Manage payroll seamlessly with our automated and secure solutions tailored to your business.',
        icon: '/images/payroll.svg',
    },
    {
        title: 'Employee Engagement',
        description:
            'Foster a thriving workplace culture with tools to boost employee satisfaction and productivity.',
        icon: '/images/employee-engagement.svg',
    },
    {
        title: 'Employee Benefits',
        description:
            'Provide attractive benefits packages that help you retain top talent and enhance loyalty.',
        icon: '/images/benefits.svg',
    },
    {
        title: 'HR Compliance',
        description:
            'Stay compliant with the latest HR regulations and avoid risks with our expert guidance.',
        icon: '/images/compliance.svg',
    },
    {
        title: 'HR Analytics',
        description:
            'Leverage data-driven insights to make informed decisions and optimize HR performance.',
        icon: '/images/analytics.svg',
    },
];

const ServicesSection = () => {
    return (
        <div className="bg-gray-100 py-16 px-6 lg:px-[50px]">
            <div className="flex flex-col gap-[40px] max-w-6xl mx-auto text-center">
                <div className="flex flex-col gap-[5px]">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                        Our Services
                    </h2>
                    <p className="text-gray-600 text-lg max-w-4xl mx-auto ">
                        We offer a wide range of innovative HR solutions designed to address the unique challenges of
                        modern organizations. From recruitment to employee retention, we have you covered.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
                    {serviceCards.map((service, index) => (
                        <CustomCard
                            key={index}
                            style="bg-gray-50 hover:bg-white hover:shadow-lg border-none rounded-lg p-6 hover:translate-y-[-10px] transition"
                            title={service.title}
                            fontStyle="text-xl font-semibold text-gray-800"
                            description={service.description}
                            descriptionStyle="text-gray-600"
                            icon={service.icon}
                            iconStyle="w-16 h-16 mx-auto mb-4"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
