import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Button from "../common/button";
import ReviewCard from "../review/ReviewCard";
import ReviewForm from "../Forms/Reviews/CreateReview";
import CustomModal from "../Modals";
import { toast } from "react-toastify";

const HomeReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const buttonRef = useRef();

    // Fetch reviews from API
    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/review`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("accessToken")
                    )}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setReviews(data.data);
            } else {
                toast.error(data.message || "Failed to load reviews!");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    // Create a new review
    const handleCreateReview = async (payload) => {
        setLoading(true);
        try {
            const response = await fetch("/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("accessToken")
                    )}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Review created successfully!");
                fetchReviews();
                setIsCreateModalOpen(false);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to create review");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="bg-white py-[70px] relative overflow-hidden">
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
                                review={review.comments}
                                rating={review.rating}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="text-center mt-8 flex items-center justify-center">
                    <Button
                        className="px-6 py-2"
                        variant="blue"
                        title="Share Your Review"
                        onClick={() => setIsCreateModalOpen(true)}
                    />
                </div>
                {/* Modal for Creating a Review */}
                <CustomModal
                    showActionButtons
                    onSubmit={() => {
                        buttonRef.current.click?.();
                    }}
                    onCancel={() => setIsCreateModalOpen(false)}
                    title="Create a Review"
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                >
                    <ReviewForm
                        ref={buttonRef}
                        onSubmit={handleCreateReview}
                        loading={loading}
                    />
                </CustomModal>
            </div>
        </div>
    );
};

export default HomeReviews;