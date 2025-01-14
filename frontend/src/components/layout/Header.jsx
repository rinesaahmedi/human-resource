import { useState } from "react";
import React from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="max-w-[1600px] p-[25px] fixed w-full z-10 top-0 left-0 right-0 bg-[rgba(31,38,62,0.3)] rounded-lg shadow-md backdrop-blur-[17.2px] mx-auto">
            <div className="flex items-center justify-center space-x-6 w-full">
                <div className="text-white font-semibold text-lg">Logo</div>

                {/* Desktop Navbar Items */}
                <div className="hidden md:flex space-x-4">
                    <a href="#home" className="text-white hover:text-gray-400 pr-[20px]">Home</a>
                    <a href="#about" className="text-white hover:text-gray-400 pr-[20px]">About</a>
                    <a href="#services" className="text-white hover:text-gray-400 pr-[20px]">Services</a>
                    <a href="#contact" className="text-white hover:text-gray-400 pr-[20px]">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={handleMenuToggle}
                    className="md:hidden text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"}`}
            >
                <div className="flex justify-end p-4">
                    <button
                        className="text-white text-3xl"
                        onClick={handleCloseMenu} // Close the mobile menu when the close button is clicked
                    >
                        &times;
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-6 mt-16">
                    <a href="#home" className="text-white text-2xl hover:text-gray-400">Home</a>
                    <a href="#about" className="text-white text-2xl hover:text-gray-400">About</a>
                    <a href="#services" className="text-white text-2xl hover:text-gray-400">Services</a>
                    <a href="#contact" className="text-white text-2xl hover:text-gray-400">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
