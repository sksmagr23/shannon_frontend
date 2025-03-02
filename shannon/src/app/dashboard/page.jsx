"use client";

import { Card, Typography, Carousel, Button } from "antd";
import { motion } from "framer-motion";
import Groq from "groq-sdk";
import { useEffect, useState, useRef } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const BRAND_COLORS = {
  primary: "#001092",
  secondary: "#00679E",
  accent: "#FFAB5B",
  background: "#FFF2DB",
};

const chartData = [
  { day: 1, solar_gen: 275 },
  { day: 2, solar_gen: 320 },
  { day: 3, solar_gen: 290 },
  { day: 4, solar_gen: 305 },
  { day: 5, solar_gen: 280 },
  { day: 6, solar_gen: 315 },
  { day: 7, solar_gen: 330 },
  { day: 8, solar_gen: 310 },
  { day: 9, solar_gen: 295 },
  { day: 10, solar_gen: 340 },
  { day: 11, solar_gen: 300 },
  { day: 12, solar_gen: 285 },
  { day: 13, solar_gen: 325 },
  { day: 14, solar_gen: 335 },
  { day: 15, solar_gen: 290 },
];

const powerGenData = [
  { name: "Solar", value: 340 },
  { name: "Wind", value: 280 },
  { name: "Hydro", value: 250 },
];

const COLORS = [BRAND_COLORS.primary, BRAND_COLORS.secondary, BRAND_COLORS.accent, "#5B9EFF", "#88D4D9"];

export function Component() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const next = () => carouselRef.current.next();
  const previous = () => carouselRef.current.prev();

  useEffect(() => {
    async function generateSummary() {
      const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const energyData = {
        solarGeneration: chartData,
        powerDistribution: powerGenData
      };

      const prompt = `
        Analyze this energy generation data and provide insights:
        Solar Generation Data (15 days): ${JSON.stringify(chartData)}
        Power Distribution: ${JSON.stringify(powerGenData)}

        Create a summary with:
        1. First line as a high-level overview
        2. 3-4 bullet points highlighting:
           - Key trends in solar generation
           - Peak and average performance
           - Distribution of power sources
           - Notable patterns

        Format: Start with an overview line, then bullet points starting with •
        Keep it concise and data-focused.
      `;

      try {
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a data analyst specializing in energy generation analysis. Provide clear, concise insights focused on numbers and trends."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 250,
        });

        setSummary(response.choices[0]?.message?.content || "Analysis not available");
      } catch (error) {
        console.error("Error generating summary:", error);
        setSummary("Based on the data analysis:\n• Solar generation shows an upward trend with peak generation of 340kW on day 10\n• Average solar generation over the period is around 305kW\n• Power distribution shows Solar leading at 39%, followed by Wind (32%) and Hydro (29%)\n• Notable consistent performance with generation staying above 275kW throughout the period");
      } finally {
        setIsLoading(false);
      }
    }

    generateSummary();
  }, []);

  const CustomLineChart = ({ color, dataKey = "solar_gen", animationEnabled = true }) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 50, left: 50, bottom: 20 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
        <XAxis dataKey="day" tick={{ fill: BRAND_COLORS.primary }} axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} label={{ value: "Day", position: "bottom", offset: 0 }} />
        <YAxis tick={{ fill: BRAND_COLORS.primary }} axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} label={{ value: "Solar Generation (kW)", angle: -90, position: "insideLeft" }} />
        <Tooltip contentStyle={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", border: "none", borderRadius: "8px" }} labelStyle={{ color: BRAND_COLORS.primary, fontWeight: "bold" }} formatter={(value) => [`${value} kW`, "Solar Generation"]} labelFormatter={(value) => `Day ${value}`} />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: 20 }} />
        <Line name="Solar Generation" dataKey={dataKey} type="monotone" stroke={color} strokeWidth={3} isAnimationActive={animationEnabled} animationDuration={1500} activeDot={{ r: 8, fill: color, strokeWidth: 2, stroke: "#FFFFFF", filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))" }} dot={{ r: 5, fill: color, stroke: "#FFFFFF", strokeWidth: 2 }} filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.2))" />
      </LineChart>
    </ResponsiveContainer>
  );

  const cardStyle = {
    background: `linear-gradient(135deg, #FFFFFF, ${BRAND_COLORS.background})`,
    boxShadow: "0 10px 40px rgba(0, 48, 146, 0.08), 0 4px 12px rgba(0, 135, 158, 0.05)",
    borderRadius: "16px",
    width: "100%",
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
    zIndex: 10,
    border: "none",
  };

  const buttonStyle = (position) => ({
    position: "absolute",
    [position]: 10,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 15,
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `rgba(255, 255, 255, 0.9)`,
    boxShadow: `0 4px 12px rgba(0, 48, 146, 0.15)`,
    border: `1px solid ${BRAND_COLORS.secondary}15`,
    borderRadius: "50%",
    transition: "all 0.3s ease",
    ":hover": {
      background: `${BRAND_COLORS.background}`,
      transform: "translateY(-50%) scale(1.05)",
    },
  });

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  const pieVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div style={{ padding: "16px", background: BRAND_COLORS.background, minHeight: "100vh" }}>
      <div style={{ maxWidth: "100%", margin: "0 auto", position: "relative", borderRadius: "16px", zIndex: 5 }}>
        <Carousel
          ref={carouselRef}
          dots={true}
          draggable={true}
          style={{ margin: "0 auto", padding: "0 4px", width: "100%" }}
          beforeChange={(from, to) => setActiveIndex(to)}
          dotStyle={{ background: BRAND_COLORS.secondary + "50", borderRadius: "4px", width: "20px", height: "6px" }}
          activeDotStyle={{ background: BRAND_COLORS.primary, borderRadius: "4px", width: "30px", height: "6px" }}
        >
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <Card style={cardStyle}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Title level={3} style={{ color: BRAND_COLORS.primary }}>
                    Browser Visitors Trend
                  </Title>
                  <Text type="secondary">January - June 2024</Text>
                </motion.div>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CustomLineChart color={BRAND_COLORS.primary} />
                </div>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial="hidden"
              animate={activeIndex === 1 ? "visible" : "hidden"}
              transition={{ duration: 0.5 }}
            >
              <Card style={cardStyle} bodyStyle={{ padding: "24px" }}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Title level={3} style={{ color: BRAND_COLORS.secondary }}>
                    Market Penetration
                  </Title>
                  <Text type="secondary">January - June 2024</Text>
                </motion.div>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CustomLineChart color={BRAND_COLORS.secondary} />
                </div>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial="hidden"
              animate={activeIndex === 2 ? "visible" : "hidden"}
              transition={{ duration: 0.5 }}
            >
              <Card style={cardStyle} bodyStyle={{ padding: "24px" }}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Title level={3} style={{ color: BRAND_COLORS.accent }}>
                    User Engagement Metrics
                  </Title>
                  <Text type="secondary">January - June 2024</Text>
                </motion.div>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <CustomLineChart color={BRAND_COLORS.accent} />
                </div>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial="hidden"
              animate={activeIndex === 3 ? "visible" : "hidden"}
              variants={pieVariants}
            >
              <Card style={cardStyle}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Title level={3} style={{ color: BRAND_COLORS.primary }}>
                    Browser Distribution
                  </Title>
                  <Text type="secondary">January - June 2024</Text>
                </motion.div>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          border: "none",
                          borderRadius: "8px",
                        }}
                        formatter={(value, name) => [
                          `${value} kW (${Math.round((value / 870) * 100)}%)`,
                          name,
                        ]}
                      />
                      <Legend
                        iconType="circle"
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                      />
                      <Pie
                        data={powerGenData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={160}
                        innerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        isAnimationActive={true}
                        animationBegin={300}
                        animationDuration={1500}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {powerGenData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={3}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </div>
        </Carousel>

        <Button
          type="text"
          shape="circle"
          icon={<LeftOutlined style={{ fontSize: "16px", color: BRAND_COLORS.primary }} />}
          onClick={previous}
          style={buttonStyle("left")}
          className="carousel-button"
        />
        <Button
          type="text"
          shape="circle"
          icon={<RightOutlined style={{ fontSize: "16px", color: BRAND_COLORS.primary }} />}
          onClick={next}
          style={buttonStyle("right")}
          className="carousel-button"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ marginTop: "16px" }}
      >
        <Card
          style={{
            background: `linear-gradient(135deg, #FFFFFF, ${BRAND_COLORS.background})`,
            boxShadow: "0 10px 40px rgba(0, 48, 146, 0.08), 0 4px 12px rgba(0, 135, 158, 0.05)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "none",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Title level={3} style={{ color: BRAND_COLORS.primary, marginBottom: "16px" }}>
            Data Summary
          </Title>
          <div className="summary-container" style={{ 
            background: `linear-gradient(145deg, ${BRAND_COLORS.background}, #ffffff)`,
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Text>Analyzing data...</Text>
              </div>
            ) : (
              summary.split('\n').map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  style={{
                    marginBottom: index === 0 ? "16px" : "12px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontSize: index === 0 ? "16px" : "15px",
                    color: index === 0 ? BRAND_COLORS.primary : "#333",
                    fontWeight: index === 0 ? "600" : "normal",
                  }}
                >
                  {index > 0 && (
                    <div style={{
                      minWidth: "8px",
                      height: "8px",
                      backgroundColor: BRAND_COLORS.accent,
                      borderRadius: "50%",
                      marginTop: "8px"
                    }} />
                  )}
                  <div style={{
                    flex: 1,
                    lineHeight: "1.6",
                  }}>{line}</div>
                </motion.div>
              ))
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Component;