import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#1F263E] text-white pt-[60px] pb-[20px]">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About Us</h4>
                        <p className="text-gray-400 text-sm">
                            We are dedicated to empowering businesses with tailored HR strategies to enhance operational efficiency, employee satisfaction, and organizational growth.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white transition">
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white transition">
                                    Client Reviews
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-white transition">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-400 text-sm">
                            Email: <a href="mailto:info@hrmsolutions.com" className="hover:text-white transition">info@hrmsolutions.com</a>
                        </p>
                        <p className="text-gray-400 text-sm">
                            Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 234 567 890</a>
                        </p>
                        <p className="text-gray-400 text-sm">
                            Address: 123 HRM Lane, Business City, BC 45678
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-600 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} HRM Solutions Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
