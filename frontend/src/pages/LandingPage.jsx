import React from "react";

// Components import
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import CarList from "../components/CarList/CarList";
import Testimonial from "../components/Testimonial/Testimonial";
import AppStoreBanner from "../components/AppStoreBanner/AppStoreBanner";
import Contact from "../components/Contact/Contact";


const LandingPage = ({ theme }) => {
  return (
    <>
    
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Contact />
    </>
  );
};

export default LandingPage;
