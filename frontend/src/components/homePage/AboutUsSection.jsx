import React from 'react';
import CustomCard from "../common/cards/CustomCard.tsx";
import {NavLink} from "react-router-dom";

const itemCards = [
    {
        title: 'Employee-Centric Approach',
        description: ' We believe in creating a workplace environment where employees thrive, contributing to both their personal growth and the success of the organization.'
    },
    {
        title: 'Streamlined Operations',
        description: 'Our innovative solutions are designed to simplify complex HR processes, saving time and reducing administrative burdens.'
    },
    {
        title: 'Expertise You Can Trust',
        description: 'With years of industry experience, our team brings a wealth of knowledge to address your HR challenges effectively.'
    }

]
const AboutUsSection = () => {
    return (
        <div className="bg-gray-50 py-16 px-6 lg:px-[50px]">
            <div className=" flex flex-col gap-[20px] max-w-6xl mx-auto text-center lg:text-left">
                <div className={'flex flex-col gap-[5px]'}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1F263E]">
                        About Us
                    </h2>
                    <p className="text-[#1F263E] text-lg leading-relaxed max-w-4xl mx-auto lg:mx-0 mb-8">
                        At <strong className="text-gray-800">HR Solutions Inc.</strong>, we are dedicated to empowering
                        businesses with tailored human resource strategies. Our mission is to enhance operational
                        efficiency, drive employee satisfaction, and foster organizational growth.
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {itemCards.map((item, index) => {
                        return (
                            <CustomCard
                                key={index}
                                style={'bg-[#FDFEFF] hover:bg-white hover:shadow-lg border-none rounded-lg p-6 hover:translate-y-[-10px] transition'}
                                title={item.title}
                                fontStyle={'text-xl font-semibold text-gray-800 '}
                                description={item.description}
                                descriptionStyle={'text-gray-400'}
                            />
                        )
                    })}
                    <div className="decoration-[#599698] hover:decoration-[#1F263E] underline-offset-1 ">
                        <NavLink className="underline text-[#599698] hover:text-[#1F263E] underline-offset-[8px]"
                                 to={'/about-us'}>
                            Read more
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AboutUsSection;