import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../common/button";

const reviews = [
    {
        name: "Michael Johnson",
        review: "Amazing features and seamless experience.",
        rating: 5,

    },
    {
        name: "Sarah Wilson",
        review: "User-friendly and efficient.",
        rating: 5,

    },
    {
        name: "Chris Evans",
        review: "Great value for the price.",
        rating: 4,

    },
    {
        name: "Emily Clark",
        review: "Fantastic customer support!",
        rating: 5,

    },
];

const ReviewCard = ({ name, review, rating }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-[#1F263E] shadow-md rounded-xl transition-transform transform hover:scale-105 mb-[40px]">
            <h4 className="text-lg font-semibold mb-2 text-white">{name}</h4>
            <p className="text-white text-center mb-4">{review}</p>
            <div className="flex space-x-1">
                {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">&#9733;</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                    <span key={i} className="text-gray-300">&#9733;</span>
                ))}
            </div>
        </div>
    );
};

const ClientReviews = () => {
    return (
        <div className="bg-white  py-[70px] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
            </div>
            <div className="container max-w-[1200px] mx-auto px-4 relative z-10">
                <h2 className="text-3xl text-[#1F263E] font-bold text-center mb-4">Client Reviews</h2>
                <p className="text-[#1F263E] text-center mb-10">
                    Hear what our clients are saying about us and share your experience!
                </p>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <ReviewCard
                                name={review.name}
                                review={review.review}
                                rating={review.rating}

                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="text-center mt-8 mx-w-[1200px] flex items-center justify-center">
                    <Button className={'px-6 py-2'} variant={'blue'} title={'Share Your Review'}/>
                    {/*<button className="bg-teal-900 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-teal-800 transition">*/}
                    {/*    Share Your Review*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default ClientReviews;
