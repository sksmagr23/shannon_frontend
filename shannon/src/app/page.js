"use client";
import { motion, useInView } from "framer-motion";
import { FaSolarPanel, FaWind, FaIndustry, FaChartPie } from 'react-icons/fa';
import { useRef, useState } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
//1st component
const FeatureCard = ({ icon, title, delay }) => (
  <motion.div
    style={{ backgroundColor: 'rgba(255, 242, 219, 0.3)' }} 
    className="p-6 rounded-xl shadow-lg flex flex-col items-center"
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    viewport={{ once: false, amount: 0.8 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="text-5xl text-[#FFAB5B] mb-4">
      {icon}
    </div>
    <h3 className="text-[#003092] text-xl font-semibold mt-4">{title}</h3>
  </motion.div>
);


  export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  
  const text = "Renewable energy sources like solar and wind are highly unpredictable due to their dependence on weather conditions. This unpredictability can cause fluctuations in energy generation, leading to challenges in balancing power supply and demand. Effective forecasting is crucial for energy grid stability, reducing reliance on fossil fuel-based backup power.";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF2DB" }}>
      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-9 pb-9 md:px-6 bg-gradient-to-br from-[#003092] to-[#00879E] text-[#FFF2DB]">
    <div className="max-w-6xl mx-auto text-center !gap-20">
      {/* Heading */}
    <motion.h1 
      className="text-5xl md:text-6xl font-bold !mt-5 !mb-12"
      initial="hidden"
      variants={fadeIn}
      whileInView="visible"
      transition={{ duration: 0.5 }}
    >
      <span className="text-[#FFF2DB]">Accurate Forecasts, </span>
      <span className="text-[#FFAB5B]">Reliable Energy!!</span>
    </motion.h1>

    {/* Subheading */}
    <motion.h2
      className="text-4xl md:text-4xl font-bold !mb-8"
      initial="hidden"
      variants={fadeIn}
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <span className="text-[#FFAB5B]">Accurate Predictions </span>
      <span className="text-[#FFF2DB]">for a Sustainable Future!</span>
    </motion.h2>

    {/* Description */}
    <motion.p 
      className="text-lg md:text-xl leading-relaxed !mb-10"
      initial="hidden"
      variants={fadeIn}
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.4 }}
    >
     Our innovative platform addresses the unpredictability of renewable energy sources by leveraging advanced AI models to deliver accurate forecasts for solar and wind energy generation. With comprehensive insights, visualizations, and optimization tools, we empower energy providers to ensure grid stability, reduce costs, and support a cleaner energy future.
    </motion.p>
      
     
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard icon={<FaSolarPanel className="text-5xl text-[#FFAB5B]" />} title="Solar Energy Prediction" delay={0.6} />
        <FeatureCard icon={<FaWind className="text-5xl text-[#FFAB5B]" />} title="Wind Energy Prediction" delay={0.8} />
        <FeatureCard icon={<FaIndustry className="text-5xl text-[#FFAB5B] mb-4" />} title="Fossil Fuel Prediction" delay={1} />
        <FeatureCard icon={<FaChartPie className="text-5xl text-[#FFAB5B] mb-4" />} title="Energy Distribution" delay={1.2} />
      </div>
      <motion.button
        className="px-8 py-3 rounded-full text-[#003092] text-lg font-semibold bg-[#003092] hover:bg-[#FFAB5B] transition-colors duration-300 !cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial="hidden"
        variants={fadeIn}
        animate="visible"
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Get Started
      </motion.button>
    </div>
  </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-6" style={{ backgroundColor: "#003092" }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            style={{ color: "#FFF2DB" }}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            Why Choose Shannon?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Forecasting of Wind Power Generation",
                description: "Forecasting of wind power generation in a area using previous data of that area"
              },
              {
                title: "Forecasting of Solar Power Generation",
                description: "Forecasting of wind power generation in a area using previous data of that area"
              },
              {
                title: "Detailed Graph for each and Pie Chart",
                description: "You will be given a detailed graph on time v/s energy production"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#00879E" }}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white text-center">
                  {benefit.title}
                </h3>
                <p className="text-white opacity-90 text-center">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
