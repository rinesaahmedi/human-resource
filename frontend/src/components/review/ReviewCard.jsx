import React from 'react';

const ReviewCard = ({ name, review, rating }) => {
    return (
        <div
            className="flex flex-col items-center gap-[10px] p-6 bg-[#1F263E] shadow-md rounded-xl transition-transform transform hover:scale-105 mb-[40px]">
            <div className={'flex flex-col items-center '}>
                <h4 className="text-lg font-semibold text-white">{name}</h4>
                <div className="flex space-x-1">
                    {[...Array(rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">&#9733;</span>
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">&#9733;</span>
                    ))}
                </div>
            </div>

            <p className="text-white text-center mb-4">{review}</p>

        </div>
    );
};

export default ReviewCard;