import React from "react";
import IntroductionSection from "../components/homePage/IntroductionSection";
import AboutUsSection from "../components/homePage/AboutUsSection";
import Reviews from "../components/homePage/Reviews";
import SevicesSection from "../components/homePage/SevicesSection";
import EmployeeSummary from "../components/homePage/EmployeeSummary";
import Footer from "../components/layout/Footer";

const Home = () => {
    const employeeData = {
        totalEmployees: 120,
        recentHires: 5,
        departments: 8,
    };
    return (
        <div>
            <IntroductionSection/>
            <AboutUsSection/>
            <EmployeeSummary
                totalEmployees={employeeData.totalEmployees}
                recentHires={employeeData.recentHires}
                departments={employeeData.departments}
            />

            <SevicesSection/>
            <Reviews/>
            <Footer/>

        </div>
    );
};

export default Home;
