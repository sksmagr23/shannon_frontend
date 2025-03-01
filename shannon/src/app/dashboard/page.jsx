"use client";

import { Card, Typography, Carousel, Button, Table } from "antd";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Groq from "groq-sdk";
import { useEffect } from "react";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, dangerouslyAllowBrowser: true });
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
  Dot,
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
import { useRef, useState } from "react";


useEffect(() => {});


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
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [dashboardTitle, setDashboardTitle] = useState(
    "Browser Usage Analytics Dashboard"
  );
  const [dashboardAnalysis, setDashboardAnalysis] = useState({
    title: "",
    keyFindings: [],
    recommendations: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const next = () => {
    carouselRef.current.next();
  };

  const previous = () => {
    carouselRef.current.prev();
  };

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

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.5 + custom * 0.1,
        duration: 0.4,
        type: "spring",
      },
    }),
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

  const CustomLineChart = ({
    color,
    dataKey = "solar_gen",
    animationEnabled = true,
  }) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 50,
          left: 50,
          bottom: 20,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="rgba(0,0,0,0.08)"
        />
        <XAxis
          dataKey="day"
          tick={{ fill: BRAND_COLORS.primary }}
          axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }}
          label={{ value: "Day", position: "bottom", offset: 0 }}
        />
        <YAxis
          tick={{ fill: BRAND_COLORS.primary }}
          axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }}
          label={{
            value: "Solar Generation (kW)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            border: "none",
            borderRadius: "8px",
          }}
          labelStyle={{ color: BRAND_COLORS.primary, fontWeight: "bold" }}
          formatter={(value) => [`${value} kW`, "Solar Generation"]}
          labelFormatter={(value) => `Day ${value}`}
        />
        <Legend
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ paddingTop: 20 }}
        />
        <Line
          name="Solar Generation"
          dataKey={dataKey}
          type="monotone"
          stroke={color}
          strokeWidth={3}
          isAnimationActive={animationEnabled}
          animationDuration={1500}
          activeDot={{
            r: 8,
            fill: color,
            strokeWidth: 2,
            stroke: "#FFFFFF",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))",
          }}
          dot={{
            r: 5,
            fill: color,
            stroke: "#FFFFFF",
            strokeWidth: 2,
          }}
          filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.2))"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const cardStyle = {
    background: `linear-gradient(135deg, #FFFFFF, ${BRAND_COLORS.background})`,
    boxShadow:
      "0 10px 40px rgba(0, 48, 146, 0.08), 0 4px 12px rgba(0, 135, 158, 0.05)",
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

  async function getDashboardInsights() {
    try {
      const prompt = `
        Analyze this browser usage data:
        ${JSON.stringify({
          chartData,
          browserData: [
            {
              browser: "Chrome",
              visitors: 275,
              share: "29.8%",
              trend: "+5.2%",
            },
            {
              browser: "Safari",
              visitors: 200,
              share: "21.7%",
              trend: "+3.8%",
            },
            {
              browser: "Firefox",
              visitors: 187,
              share: "20.3%",
              trend: "-1.2%",
            },
            { browser: "Edge", visitors: 173, share: "18.8%", trend: "+2.5%" },
            { browser: "Other", visitors: 90, share: "9.4%", trend: "-0.8%" },
          ],
        })}

        Generate:
        1. A dashboard title that highlights key trends
        2. 4 key findings about browser usage patterns
        3. 4 actionable recommendations for optimization
        
        Format response as JSON with fields:
        {
          "title": "string",
          "keyFindings": ["string"],
          "recommendations": ["string"]
        }
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        maxTokens: 1000,
      });

      const response = JSON.parse(
        chatCompletion.choices[0]?.message?.content || "{}"
      );
      return response;
    } catch (error) {
      console.error("Error getting dashboard insights:", error);
      return {
        title: "Browser Usage Analytics Dashboard",
        keyFindings: [],
        recommendations: [],
      };
    }
  }

  useEffect(() => {
    async function updateDashboardContent() {
      setIsLoading(true);
      try {
        const insights = await getDashboardInsights();
        setDashboardTitle(insights.title);
        setDashboardAnalysis(insights);
      } catch (error) {
        console.error("Error updating dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    updateDashboardContent();
  }, []);

  useEffect(() => {
    async function fetchAnalysis() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chartData,
            browserData: [
              { browser: 'Chrome', visitors: 275, share: '29.8%', trend: '+5.2%' },
              { browser: 'Safari', visitors: 200, share: '21.7%', trend: '+3.8%' },
              { browser: 'Firefox', visitors: 187, share: '20.3%', trend: '-1.2%' },
              { browser: 'Edge', visitors: 173, share: '18.8%', trend: '+2.5%' },
              { browser: 'Other', visitors: 90, share: '9.4%', trend: '-0.8%' }
            ]
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDashboardAnalysis({
          keyFindings: data.keyFindings || [],
          recommendations: data.recommendations || []
        });
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setDashboardAnalysis({
          keyFindings: [
            "Chrome leads with 29.8% market share",
            "Safari shows strong growth at 21.7%",
            "Firefox experiencing slight decline",
            "Edge maintains steady growth"
          ],
          recommendations: [
            "Optimize for Chrome compatibility",
            "Enhance Safari performance",
            "Investigate Firefox decline",
            "Continue Edge support"
          ]
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalysis();
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        background: BRAND_COLORS.background,
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: BRAND_COLORS.primary,
            fontWeight: 600,
          }}
        >
          {dashboardTitle}
        </Title>
      </motion.div>

      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          position: "relative",
          borderRadius: "16px",
          zIndex: 5,
        }}
      >
        <Carousel
          ref={carouselRef}
          dots={true}
          draggable={true}
          style={{
            margin: "0 auto",
            padding: "0 4px",
            width: "100%",
          }}
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
                <motion.div
                  className="card-footer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 500,
                      color: "#52c41a",
                    }}
                  >
                    Trending up by 5.2% this month <TrendingUp size={16} />
                  </div>
                  <div style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                    Showing total visitors for the last 6 months
                  </div>
                </motion.div>
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
                <motion.div
                  className="card-footer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 500,
                      color: "#52c41a",
                    }}
                  >
                    Trending up by 5.2% this month <TrendingUp size={16} />
                  </div>
                  <div style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                    Showing total visitors for the last 6 months
                  </div>
                </motion.div>
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
                <motion.div
                  className="card-footer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 500,
                      color: "#52c41a",
                    }}
                  >
                    Trending up by 5.2% this month <TrendingUp size={16} />
                  </div>
                  <div style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                    Showing total visitors for the last 6 months
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial="hidden"
              animate={activeIndex === 3 ? "visible" : "hidden"}
              variants={pieVariants}
            >
              <Card style={cardStyle} bodyStyle={{ padding: "24px" }}>
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
                <motion.div
                  className="card-footer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 500,
                      color: BRAND_COLORS.primary,
                    }}
                  >
                    Browser Distribution Analysis
                  </div>
                  <div style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                    Chrome remains the market leader with 29.8% share
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </Carousel>

        <Button
          type="text"
          shape="circle"
          icon={
            <LeftOutlined
              style={{ fontSize: "16px", color: BRAND_COLORS.primary }}
            />
          }
          onClick={previous}
          style={{
            ...buttonStyle("left"),
            ":hover": {
              background: BRAND_COLORS.background,
              color: BRAND_COLORS.primary,
            },
          }}
          className="carousel-button"
        />
        <Button
          type="text"
          shape="circle"
          icon={
            <RightOutlined
              style={{ fontSize: "16px", color: BRAND_COLORS.primary }}
            />
          }
          onClick={next}
          style={{
            ...buttonStyle("right"),
            ":hover": {
              background: BRAND_COLORS.background,
              color: BRAND_COLORS.primary,
            },
          }}
          className="carousel-button"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginTop: "40px" }}
      >
        <Card
          style={{
            background: `linear-gradient(135deg, #FFFFFF, ${BRAND_COLORS.background})`,
            boxShadow:
              "0 10px 40px rgba(0, 48, 146, 0.08), 0 4px 12px rgba(0, 135, 158, 0.05)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "none",
          }}
          bodyStyle={{ padding: "24px" }}
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
              Browser Market Analysis
            </Title>

            <Table
              dataSource={[
                {
                  key: "1",
                  browser: "Chrome",
                  visitors: 275,
                  share: "29.8%",
                  trend: "+5.2%",
                  status: "up",
                  color: BRAND_COLORS.primary,
                },
                {
                  key: "2",
                  browser: "Safari",
                  visitors: 200,
                  share: "21.7%",
                  trend: "+3.8%",
                  status: "up",
                  color: BRAND_COLORS.secondary,
                },
                {
                  key: "3",
                  browser: "Firefox",
                  visitors: 187,
                  share: "20.3%",
                  trend: "-1.2%",
                  status: "down",
                  color: BRAND_COLORS.accent,
                },
                {
                  key: "4",
                  browser: "Edge",
                  visitors: 173,
                  share: "18.8%",
                  trend: "+2.5%",
                  status: "up",
                  color: "#5B9EFF",
                },
                {
                  key: "5",
                  browser: "Other",
                  visitors: 90,
                  share: "9.4%",
                  trend: "-0.8%",
                  status: "down",
                  color: "#88D4D9",
                },
              ]}
              columns={[
                {
                  title: "Browser",
                  dataIndex: "browser",
                  key: "browser",
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
                  title: "Visitors",
                  dataIndex: "visitors",
                  key: "visitors",
                  render: (text) => (
                    <span style={{ fontWeight: 600 }}>
                      {text.toLocaleString()}
                    </span>
                  ),
                },
                {
                  title: "Market Share",
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
                {
                  title: "Trend",
                  dataIndex: "trend",
                  key: "trend",
                  render: (text, record) => (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Text
                        style={{
                          color: record.status === "up" ? "#52c41a" : "#ff4d4f",
                          fontWeight: 600,
                          padding: "6px 14px",
                          background:
                            record.status === "up" ? "#f6ffed" : "#fff2f0",
                          borderRadius: "12px",
                          display: "inline-block",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                      >
                        {text}
                      </Text>
                    </motion.div>
                  ),
                },
              ]}
              pagination={false}
              onRow={(record, index) => ({
                onMouseEnter: () => setHoveredRow(index),
                onMouseLeave: () => setHoveredRow(null),
                style: {
                  background:
                    hoveredRow === index
                      ? `${BRAND_COLORS.background}50`
                      : undefined,
                  transition: "background 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transform:
                    hoveredRow === index ? "translateX(5px)" : undefined,
                },
              })}
              rowClassName={() => "browser-row"}
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
                    Key Findings
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
                    Recommendations
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
