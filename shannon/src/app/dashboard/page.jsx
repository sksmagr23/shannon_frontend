"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Typography, Carousel, Button, Table } from "antd";
import { motion } from "framer-motion";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
}
export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

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
import axios from "axios";

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
  {
    name: "Solar",
    value: 340,
  },
  {
    name: "Wind",
    value: 280,
  },
  {
    name: "Hydro",
    value: 250,
  },
];

const COLORS = [
  BRAND_COLORS.primary,
  BRAND_COLORS.secondary,
  BRAND_COLORS.accent,
  "#5B9EFF",
  "#88D4D9",
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: BRAND_COLORS.secondary,
  },
  chrome: {
    label: "Chrome",
    color: BRAND_COLORS.primary,
  },
  safari: {
    label: "Safari",
    color: BRAND_COLORS.secondary,
  },
  firefox: {
    label: "Firefox",
    color: BRAND_COLORS.accent,
  },
  edge: {
    label: "Edge",
    color: "#5B9EFF",
  },
  other: {
    label: "Other",
    color: "#88D4D9",
  },
};

export function Component() {
  const [SolarData, setSolarData] = useState([
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
  ]);
  const [Wind, setWind] = useState([
    { day: 1, wind_gen: 275 },
    { day: 2, wind_gen: 320 },
    { day: 3, wind_gen: 290 },
    { day: 4, wind_gen: 305 },
    { day: 5, wind_gen: 280 },
    { day: 6, wind_gen: 315 },
    { day: 7, wind_gen: 330 },
    { day: 8, wind_gen: 310 },
    { day: 9, wind_gen: 295 },
    { day: 10, wind_gen: 340 },
    { day: 11, wind_gen: 300 },
    { day: 12, wind_gen: 285 },
    { day: 13, wind_gen: 325 },
    { day: 14, wind_gen: 335 },
    { day: 15, wind_gen: 290 },
  ]);
  const [Hydro, setHydro] = useState([
    { day: 1, Hydro_gen: 275 },
    { day: 2, Hydro_gen: 320 },
    { day: 3, Hydro_gen: 290 },
    { day: 4, Hydro_gen: 305 },
    { day: 5, Hydro_gen: 280 },
    { day: 6, Hydro_gen: 315 },
    { day: 7, Hydro_gen: 330 },
    { day: 8, Hydro_gen: 310 },
    { day: 9, Hydro_gen: 295 },
    { day: 10, Hydro_gen: 340 },
    { day: 11, Hydro_gen: 300 },
    { day: 12, Hydro_gen: 285 },
    { day: 13, Hydro_gen: 325 },
    { day: 14, Hydro_gen: 335 },
    { day: 15, Hydro_gen: 290 },
  ]);

  const [dashboardAnalysis, setDashboardAnalysis] = useState({
    keyFindings: [
      "Solar generation shows highest contribution at peak hours",
      "Wind generation remains stable throughout the period",
      "Hydro power provides consistent base load generation",
      "Overall system efficiency maintains above 85%"
    ],
    recommendations: [
      "Optimize solar panel alignment for maximum exposure",
      "Implement predictive maintenance for wind turbines",
      "Balance hydro reservoir levels for peak demand",
      "Consider energy storage solutions for better grid stability"
    ]
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/prediction/preFetch");
        if (response.data) {
          // Store the full data
          setData(response.data);
          
          // Transform the data for each generation type
          const solarData = response.data.solar_gen?.map((value, index) => ({
            day: index + 1,
            solar_gen: value
          })) || [];
          
          const windData = response.data.wind_gen?.map((value, index) => ({
            day: index + 1,
            wind_gen: value
          })) || [];
          
          const hydroData = response.data.hydro_gen?.map((value, index) => ({
            day: index + 1,
            Hydro_gen: value
          })) || [];

          setSolarData(solarData);
          setWind(windData);
          setHydro(hydroData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Remove the dependencies to prevent infinite loop

  console.log(data.solar_gen);
  console.log(data.wind_gen);
  console.log(data.hydro_gen);
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


  const CustomLineChart = ({ color, dataKey = "solar_gen", data, title, animationEnabled = true }) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data} // Now using the data prop passed to the component
        margin={{
          top: 20,
          right: 50,
          left: 50,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
        <XAxis 
          dataKey="day" 
          tick={{ fill: BRAND_COLORS.primary }} 
          axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} 
          label={{ value: "Day", position: "bottom", offset: 0 }} 
        />
        <YAxis 
          domain={[0, 1]}
          ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
          tick={{ fill: BRAND_COLORS.primary }} 
          axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} 
          label={{ value: `${title} Generation`, angle: -90, position: "insideLeft" }} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", border: "none", borderRadius: "8px" }} 
          labelStyle={{ color: BRAND_COLORS.primary, fontWeight: "bold" }} 
          formatter={(value) => [`${value.toFixed(3)} MW`, `${title} Generation`]} 
          labelFormatter={(value) => `Day ${value}`} 
        />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: 20 }} />
        <Line 
          name={`${title} Generation`}
          dataKey={dataKey} 
          type="monotone" 
          stroke={color} 
          strokeWidth={3} 
          isAnimationActive={animationEnabled} 
          animationDuration={1500} 
          activeDot={{ r: 8, fill: color, strokeWidth: 2, stroke: "#FFFFFF" }} 
          dot={{ r: 5, fill: color, stroke: "#FFFFFF", strokeWidth: 2 }} 
        />
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
          dotStyle={{
            background: BRAND_COLORS.secondary + "50",
            borderRadius: "4px",
            width: "20px",
            height: "6px",
          }}
          activeDotStyle={{
            background: BRAND_COLORS.primary,
            borderRadius: "4px",
            width: "30px",
            height: "6px",
          }}
        >
          {/* First slide - Solar */}
          <div>
            <Card style={cardStyle}>
              <Title level={3} style={{ color: BRAND_COLORS.primary }}>
                Solar Generation Trend
              </Title>
              <div style={{ height: "500px" }}>
                <CustomLineChart
                  color={BRAND_COLORS.primary}
                  dataKey="solar_gen"
                  data={SolarData}
                  title="Solar"
                />
              </div>
            </Card>
          </div>

          {/* Second slide - Wind */}
          <div>
            <Card style={cardStyle}>
              <Title level={3} style={{ color: BRAND_COLORS.secondary }}>
                Wind Generation Trend
              </Title>
              <div style={{ height: "500px" }}>
                <CustomLineChart
                  color={BRAND_COLORS.secondary}
                  dataKey="wind_gen"
                  data={Wind}
                  title="Wind"
                />
              </div>
            </Card>
          </div>

          {/* Third slide - Hydro */}
          <div>
            <Card style={cardStyle}>
              <Title level={3} style={{ color: BRAND_COLORS.accent }}>
                Hydro Generation Trend
              </Title>
              <div style={{ height: "500px" }}>
                <CustomLineChart
                  color={BRAND_COLORS.accent}
                  dataKey="Hydro_gen"
                  data={Hydro}
                  title="Hydro"
                />
              </div>
            </Card>
          </div>

          {/* Fourth slide - Distribution Pie Chart */}
          <div>
            <Card style={cardStyle}>
              <Title level={3} style={{ color: BRAND_COLORS.primary }}>
                Power Generation Distribution
              </Title>
              <div style={{ height: "500px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Solar",
                          value: data.solar_gen ? data.solar_gen.reduce((sum, val) => sum + val, 0) : 0,
                        },
                        {
                          name: "Wind",
                          value: data.wind_gen ? data.wind_gen.reduce((sum, val) => sum + val, 0) : 0,
                        },
                        {
                          name: "Hydro",
                          value: data.hydro_gen ? data.hydro_gen.reduce((sum, val) => sum + val, 0) : 0,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={160}
                      innerRadius={80}
                      paddingAngle={5}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
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
                    <Tooltip
                      formatter={(value, name) => [
                        `${value.toFixed(0)} kW`,
                        `${name} Generation`,
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
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
          styles={{
            body: { padding: "24px" }
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Title
              level={3}
              style={{ color: BRAND_COLORS.primary, marginBottom: "24px" }}
            >
              Energy Generation Analysis
            </Title>

            <Table
              dataSource={[
                {
                  key: "1",
                  source: "Solar",
                  generation: data.solar_gen ? 
                    data.solar_gen.reduce((sum, val) => sum + val, 0).toFixed(3) : "0.000",
                  share: data.solar_gen ? 
                    ((data.solar_gen.reduce((sum, val) => sum + val, 0) / 
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0))) * 100
                    ).toFixed(1) + "%" : "0.0%",
                  status: "up",
                  color: BRAND_COLORS.primary,
                },
                {
                  key: "2",
                  source: "Wind",
                  generation: data.wind_gen ?
                    data.wind_gen.reduce((sum, val) => sum + val, 0).toFixed(3) : "0.000",
                  share: data.wind_gen ?
                    ((data.wind_gen.reduce((sum, val) => sum + val, 0) /
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0))) * 100
                    ).toFixed(1) + "%" : "0.0%",
                  status: "up",
                  color: BRAND_COLORS.secondary,
                },
                {
                  key: "3",
                  source: "Hydro",
                  generation: data.hydro_gen ?
                    data.hydro_gen.reduce((sum, val) => sum + val, 0).toFixed(3) : "0.000",
                  share: data.hydro_gen ?
                    ((data.hydro_gen.reduce((sum, val) => sum + val, 0) /
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0))) * 100
                    ).toFixed(1) + "%" : "0.0%",
                  status: "up",
                  color: BRAND_COLORS.accent,
                },
              ]}
              columns={[
                {
                  title: "Energy Source",
                  dataIndex: "source",
                  key: "source",
                  render: (text, record) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "4px",
                          backgroundColor: record.color,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <span
                        style={{ fontWeight: 600, color: BRAND_COLORS.primary }}
                      >
                        {text}
                      </span>
                    </div>
                  ),
                },
                {
                  title: "Total Generation (MW)",
                  dataIndex: "generation",
                  key: "generation",
                  render: (text) => (
                    <span style={{ fontWeight: 600 }}>{text}</span>
                  ),
                },
                {
                  title: "Share of Total Generation",
                  dataIndex: "share",
                  key: "share",
                  render: (text) => (
                    <div
                      style={{
                        background: `${BRAND_COLORS.background}`,
                        padding: "6px 14px",
                        borderRadius: "12px",
                        display: "inline-block",
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      {text}
                    </div>
                  ),
                },
              ]}
              pagination={false}
            />
          </motion.div>

          <div style={{ marginTop: "40px", display: "flex", gap: "24px" }}>
            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card
                title={
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.secondary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Generation Insights
                  </div>
                }
                style={{
                  height: "100%",
                  boxShadow:
                    "0 8px 24px rgba(0, 48, 146, 0.06), 0 2px 8px rgba(0, 135, 158, 0.04)",
                  borderRadius: "12px",
                  border: "none",
                }}
              >
                <motion.ul style={{ listStyleType: "none", padding: 0 }}>
                  {dashboardAnalysis.keyFindings.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5, color: BRAND_COLORS.primary }}
                      style={{
                        padding: "12px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        borderBottom:
                          index < 3 ? "1px solid rgba(0,0,0,0.06)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "2px",
                          backgroundColor: BRAND_COLORS.primary,
                          transform: "rotate(45deg)",
                        }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </Card>
            </motion.div>

            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card
                title={
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Optimization Suggestions
                  </div>
                }
                style={{
                  height: "100%",
                  boxShadow:
                    "0 8px 24px rgba(0, 48, 146, 0.06), 0 2px 8px rgba(0, 135, 158, 0.04)",
                  borderRadius: "12px",
                  border: "none",
                }}
              >
                <motion.ul style={{ listStyleType: "none", padding: 0 }}>
                  {dashboardAnalysis.recommendations.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5, color: BRAND_COLORS.secondary }}
                      style={{
                        padding: "12px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        borderBottom:
                          index < 3 ? "1px solid rgba(0,0,0,0.06)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "2px",
                          backgroundColor: BRAND_COLORS.secondary,
                          transform: "rotate(45deg)",
                        }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </Card>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Component;