import React from 'react';
import CustomCard from "../../components/common/cards/CustomCard.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../../components/common/button";


const coreValues = [
    { title: 'Integrity', description: 'We act with honesty, transparency, and accountability in all our actions.' },
    { title: 'Respect', description: 'We embrace diversity and treat all individuals with respect and dignity.' },
    { title: 'Collaboration', description: 'We work together, share knowledge, and help each other to succeed.' },
];

const teamMembers = [
    {
        name: "Samantha Green",
        role: "HR Director",
        description: "Dedicated to fostering a culture of inclusion and growth.",
        img: "https://via.placeholder.com/150",
    },
    {
        name: "Michael Johnson",
        role: "HR Specialist",
        description: "Passionate about talent acquisition and employee relations.",
        img: "https://via.placeholder.com/150",
    },
    {
        name: "Emily Clark",
        role: "HR Assistant",
        description: "Focused on ensuring smooth employee onboarding and support.",
        img: "https://via.placeholder.com/150",
    },
    {
        name: "Emily Clark",
        role: "HR Assistant",
        description: "Focused on ensuring smooth employee onboarding and support.",
        img: "https://via.placeholder.com/150",
    }, {
        name: "Emily Clark",
        role: "HR Assistant",
        description: "Focused on ensuring smooth employee onboarding and support.",
        img: "https://via.placeholder.com/150",
    }, {
        name: "Emily Clark",
        role: "HR Assistant",
        description: "Focused on ensuring smooth employee onboarding and support.",
        img: "https://via.placeholder.com/150",
    },
];

const Index = () => {
    return (
        <div

            className="min-h-screen bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <section
                className="relative bg-center text-white py-16 px-6 md:px-12"
            >
                <div
                    className="absolute inset-0 bg-center bg-cover "
                    style={{ backgroundImage: "url('/images/about-us.jpg')" }}
                ></div>
                <div className="relative container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        Human Resources Team
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl">
                        Building a better workplace, one employee at a time.
                    </p>
                </div>
            </section>


            {/* HR Mission Section */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Our Mission
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Our mission is to cultivate a culture of collaboration, respect, and growth. We are committed to
                        supporting every employee’s journey and fostering an inclusive environment where everyone feels
                        valued.
                    </p>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Core Values
                    </h2>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <CustomCard
                                key={index}
                                title={value.title}
                                description={value.description}
                                style={'bg-[#FDFEFF] hover:bg-white border-none rounded-lg p-6 '}
                                fontStyle={'text-[24px] text-bold '}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team Swiper */}
            <section className="py-16 px-6 md:px-12 ">
                <div className="container mx-auto text-center ">
                    <h2 className="text-3xl font-semibold text-gray-800 pb-[20px]">
                        Meet the Team
                    </h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{clickable: true}}
                        breakpoints={{
                            640: {slidesPerView: 1},
                            768: {slidesPerView: 2},
                            1024: {slidesPerView: 3},
                        }}
                        className="pb-10 "
                    >
                        {teamMembers.map((member, index) => (
                            <SwiperSlide key={index} className={'pb-[60px]'}>
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden pb-[60px] ">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-[10px] text-center ">
                                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                        <p className="text-gray-600">{member.role}</p>
                                        <p className="text-gray-500 mt-2">{member.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Join Us Section */}
            <section className="py-16 px-6 md:px-12 dark:bg-white text-black">
                <div className="flex flex-col gap-[20px] container mx-auto text-center items-center max-w-[650px]">
                    <h2 className="text-3xl font-bold">
                        Join Our Team
                    </h2>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                        We're always looking for talented and passionate individuals to join our dynamic HR team. If
                        you're ready to make a difference, let's connect!
                    </p>
                    <Button
                        className="px-6 py-2 w-[50%] text-center "
                        variant="blue"
                        title="Join our team"
                    />
                </div>
            </section>
        </div>
    );
};

export default Index;
