import React from 'react';
import Hero from '../components/Home/Hero';
import ServiceCategories from '../components/Home/ServiceCategories';
import FeaturedSalons from '../components/Home/FeaturedSalons';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import MobileApp from '../components/Home/MobileApp';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <FeaturedSalons />
      <Features />
      <Testimonials />
      <MobileApp />
    </>
  );
};

export default Home;