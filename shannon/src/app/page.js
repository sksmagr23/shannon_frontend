"use client";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF2DB" }}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: "#003092" }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Welcome to Shannon
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            style={{ color: "#00879E" }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Renewable energy sources like solar and wind are highly unpredictable due to their
dependence on weather conditions. This unpredictability can cause fluctuations in energy
generation, leading to challenges in balancing power supply and demand. Effective
forecasting is crucial for energy grid stability, reducing reliance on fossil fuel-based backup
power.
          </motion.p>
          <motion.button
            className="px-8 py-3 rounded-full text-white text-lg font-semibold"
            style={{ backgroundColor: "#FFAB5B" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
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
