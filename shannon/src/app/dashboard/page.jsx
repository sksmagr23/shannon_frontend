"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Typography, Carousel, Button, Table } from "antd";
import { motion } from "framer-motion";
import Groq from "groq-sdk";
import { useSearchParams } from 'next/navigation';

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
  ReferenceLine,
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

export function Component() {
  const searchParams = useSearchParams();
  const [locationData, setLocationData] = useState({
    lat: null,
    lng: null,
    cityName: null
  });

  useEffect(() => {
    // Get location data from URL parameters
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const cityName = searchParams.get('cityName');
    
    if (lat && lng && cityName) {
      setLocationData({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        cityName: cityName
      });
    }
  }, [searchParams]);

  const [SolarData, setSolarData] = useState([]);
  const [Wind, setWind] = useState([]);
  const [Hydro, setHydro] = useState([]);

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
        if (locationData.lat && locationData.lng) {
          // Format dates for the API request
          const dates = [];
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 7); // 7 days before today
          
          for (let i = 0; i < 15; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);``
          }

          const data = {
            "Message": [
              Number(locationData.lat), 
              Number(locationData.lng), 
              Date.now()
            ]
          };

          const response = await axios.post(process.env.NEXT_PUBLIC_ML_API_KEY, data, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            timeout: 0,
            withCredentials: false
          })
          .catch((error) => {
            console.error("Error fetching ML prediction data:", error);
            setSolarData([
            { day: 1, solar_gen: 27.5 },
            { day: 2, solar_gen: 32.0 },
            { day: 3, solar_gen: 29.0 },
            { day: 4, solar_gen: 30.5 },
            { day: 5, solar_gen: 28.0 },
            { day: 6, solar_gen: 31.5 },
            { day: 7, solar_gen: 33.0 },
            { day: 8, solar_gen: 31.0 },
            { day: 9, solar_gen: 29.5 },
            { day: 10, solar_gen: 34.0 },
            { day: 11, solar_gen: 30.0 },
            { day: 12, solar_gen: 28.5 },
            { day: 13, solar_gen: 32.5 },
            { day: 14, solar_gen: 33.5 },
            { day: 15, solar_gen: 29.0 },
        ]);
        setWind([
          { day: 1, wind_gen: 27.5 },
          { day: 2, wind_gen: 32.0 },
          { day: 3, wind_gen: 29.0 },
          { day: 4, wind_gen: 30.5 },
          { day: 5, wind_gen: 28.0 },
          { day: 6, wind_gen: 31.5 },
          { day: 7, wind_gen: 33.0 },
          { day: 8, wind_gen: 31.0 },
          { day: 9, wind_gen: 29.5 },
          { day: 10, wind_gen: 34.0 },
          { day: 11, wind_gen: 30.0 },
          { day: 12, wind_gen: 28.5 },
          { day: 13, wind_gen: 32.5 },
          { day: 14, wind_gen: 33.5 },
          { day: 15, wind_gen: 29.0 },
        ]);
        setHydro([
          { day: 1, Hydro_gen: 27.5 },
          { day: 2, Hydro_gen: 32.0 },
          { day: 3, Hydro_gen: 29.0 },
          { day: 4, Hydro_gen: 30.5 },
          { day: 5, Hydro_gen: 28.0 },
          { day: 6, Hydro_gen: 31.5 },
          { day: 7, Hydro_gen: 33.0 },
          { day: 8, Hydro_gen: 31.0 },
          { day: 9, Hydro_gen: 29.5 },
          { day: 10, Hydro_gen: 34.0 },
          { day: 11, Hydro_gen: 30.0 },
          { day: 12, Hydro_gen: 28.5 },
          { day: 13, Hydro_gen: 32.5 },
          { day: 14, Hydro_gen: 33.5 },
          { day: 15, Hydro_gen: 29.0 },
        ]);
      });

          console.log("ML Prediction data:", response.data);

          if (response.data) {
            // Transform the data to include dates and multiply values by 100
            if (Array.isArray(response.data.solar_gen)) {
              const solarData = response.data.solar_gen.map((value, index) => ({
                date: dates[index],
                solar_gen: value * 100
              }));
              setSolarData(solarData);
            }

            if (Array.isArray(response.data.wind_gen)) {
              const windData = response.data.wind_gen.map((value, index) => ({
                date: dates[index],
                wind_gen: value * 100
              }));
              setWind(windData);
            }

            if (Array.isArray(response.data.hydro_gen)) {
              const hydroData = response.data.hydro_gen.map((value, index) => ({
                date: dates[index],
                Hydro_gen: value * 100
              }));
              setHydro(hydroData);
            }

            // Store the modified data
            const modifiedData = {
              ...response.data,
              solar_gen: response.data.solar_gen?.map(value => value * 100) || [],
              wind_gen: response.data.wind_gen?.map(value => value * 100) || [],
              hydro_gen: response.data.hydro_gen?.map(value => value * 100) || []
            };
            setData(modifiedData);
          }
        }
      } catch (error) {
        console.error("Error fetching ML prediction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (locationData.lat && locationData.lng) {
      fetchData();
    }
  }, [locationData]);

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

  useEffect(() => {
    async function generateDynamicInsights() {
      if (!data.solar_gen || !data.wind_gen || !data.hydro_gen) return;

      try {
        const groq = new Groq({
          apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
          dangerouslyAllowBrowser: true
        });

        // Calculate total generation for pie chart analysis
        const totalSolar = data.solar_gen.reduce((sum, val) => sum + val, 0);
        const totalWind = data.wind_gen.reduce((sum, val) => sum + val, 0);
        const totalHydro = data.hydro_gen.reduce((sum, val) => sum + val, 0);
        const totalGeneration = totalSolar + totalWind + totalHydro;

        // Calculate percentages for pie chart
        const solarPercentage = (totalSolar / totalGeneration) * 100;
        const windPercentage = (totalWind / totalGeneration) * 100;
        const hydroPercentage = (totalHydro / totalGeneration) * 100;

        // Analyze line chart trends
        const solarTrend = data.solar_gen[data.solar_gen.length - 1] - data.solar_gen[0];
        const windTrend = data.wind_gen[data.wind_gen.length - 1] - data.wind_gen[0];
        const hydroTrend = data.hydro_gen[data.hydro_gen.length - 1] - data.hydro_gen[0];

        const prompt = `You are an expert energy analyst. Analyze this energy generation data focusing on distribution and trends:

Pie Chart Distribution:
- Solar: ${solarPercentage.toFixed(1)}% of total generation
- Wind: ${windPercentage.toFixed(1)}% of total generation
- Hydro: ${hydroPercentage.toFixed(1)}% of total generation

Line Chart Trends:
- Solar trend: ${solarTrend > 0 ? 'increasing' : solarTrend < 0 ? 'decreasing' : 'stable'}
- Wind trend: ${windTrend > 0 ? 'increasing' : windTrend < 0 ? 'decreasing' : 'stable'}
- Hydro trend: ${hydroTrend > 0 ? 'increasing' : hydroTrend < 0 ? 'decreasing' : 'stable'}

Provide exactly 4 key findings and 4 recommendations based on:
1. The current distribution of energy sources (pie chart)
2. The trends in generation over time (line charts)
3. The balance between different energy sources

Format your response as a valid JSON object with this exact structure:
{
  "keyFindings": [
    "finding1",
    "finding2",
    "finding3",
    "finding4"
  ],
  "recommendations": [
    "recommendation1",
    "recommendation2",
    "recommendation3",
    "recommendation4"
  ]
}

Focus on:
- Distribution analysis from pie chart
- Trend analysis from line charts
- Balance between energy sources
- Opportunities for optimization

Do not include any other text or formatting. Only return the JSON object.`;

        const groqResponse = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are an expert energy analyst specializing in renewable energy systems. Analyze energy distribution and trends to provide actionable insights. Always respond with valid JSON only."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 500,
        });

        if (!groqResponse || !groqResponse.choices || !groqResponse.choices[0]?.message?.content) {
          throw new Error("Invalid response from Groq API");
        }

        const content = groqResponse.choices[0].message.content;
        let analysis;
        
        try {
          // Try to parse the response directly
          analysis = JSON.parse(content);
        } catch (parseError) {
          console.error("Initial JSON parse error:", parseError);
          // If direct parsing fails, try to extract JSON from the response
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            analysis = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("Could not parse JSON from response");
          }
        }

        // Validate the structure
        if (!analysis.keyFindings || !analysis.recommendations) {
          throw new Error("Invalid response structure");
        }

        setDashboardAnalysis(analysis);
      } catch (error) {
        console.error("Error generating insights:", error);
        setDashboardAnalysis({
          keyFindings: [
            "Error generating insights. Please try again later.",
            "Unable to analyze data patterns.",
            "Recommendations unavailable."
          ],
          recommendations: [
            "Unable to generate optimization suggestions.",
            "Please refresh the page to try again.",
            "Contact support if the issue persists."
          ]
        });
      }
    }

    if (data.solar_gen && data.wind_gen && data.hydro_gen) {
      generateDynamicInsights();
    }
  }, [data]);

  const buttonStyle = (position) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [position]: "10px",
    zIndex: 10,
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    border: `1px solid ${BRAND_COLORS.primary}20`,
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: BRAND_COLORS.primary,
      color: "white",
      transform: "translateY(-50%)",
    },
  });

  const CustomLineChart = ({ color, dataKey = "solar_gen", data, title, animationEnabled = true }) => {
    const currentDate = new Date().toISOString().split('T')[0];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 50,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            tick={{ fill: BRAND_COLORS.primary }} 
            axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} 
            label={{ value: "Date", position: "bottom", offset: 0 }} 
          />
          <YAxis 
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: BRAND_COLORS.primary }} 
            axisLine={{ stroke: BRAND_COLORS.primary, strokeWidth: 1.5 }} 
            label={{ value: `${title} Efficiency`, angle: -90, position: "insideLeft" }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", border: "none", borderRadius: "8px" }} 
            labelStyle={{ color: BRAND_COLORS.primary, fontWeight: "bold" }} 
            formatter={(value) => [`${value.toFixed(1)}%`, `${title} Efficiency`]} 
            labelFormatter={(date) => new Date(date).toLocaleDateString()} 
          />
          <Legend iconType="circle" iconSize={10} wrapperStyle={{ paddingTop: 20 }} />
          <ReferenceLine
            x={currentDate}
            stroke="#FF4D4F"
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{
              value: "Present",
              position: "top",
              fill: "#FF4D4F",
              fontSize: 12,
              fontWeight: "bold"
            }}
          />
          <Line 
            name={`${title} Efficiency`}
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
  };

  const cardStyle = {
    background: `linear-gradient(135deg, #FFFFFF, ${BRAND_COLORS.background})`,
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
      {locationData.cityName && (
        <Typography.Title level={2} style={{ color: BRAND_COLORS.primary, marginBottom: "24px" }}>
          Dashboard for {locationData.cityName}
        </Typography.Title>
      )}
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
                      data={data.solar_gen && data.wind_gen && data.hydro_gen ? [
                        {
                          name: "Solar",
                          value: data.solar_gen.reduce((sum, val) => sum + val, 0)
                        },
                        {
                          name: "Wind",
                          value: data.wind_gen.reduce((sum, val) => sum + val, 0)
                        },
                        {
                          name: "Hydro",
                          value: data.hydro_gen.reduce((sum, val) => sum + val, 0)
                        }
                      ] : powerGenData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={160}
                      innerRadius={80}
                      paddingAngle={5}
                      label={({ name, value, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {(data.solar_gen && data.wind_gen && data.hydro_gen ? [
                        {
                          name: "Solar",
                          value: data.solar_gen.reduce((sum, val) => sum + val, 0)
                        },
                        {
                          name: "Wind",
                          value: data.wind_gen.reduce((sum, val) => sum + val, 0)
                        },
                        {
                          name: "Hydro",
                          value: data.hydro_gen.reduce((sum, val) => sum + val, 0)
                        }
                      ] : powerGenData).map((entry, index) => (
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
                    (data.solar_gen.reduce((sum, val) => sum + val, 0) / 
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0)) * 100
                    ).toFixed(1) + "%" : "0.0%",
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
                    (data.wind_gen.reduce((sum, val) => sum + val, 0) / 
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0)) * 100
                    ).toFixed(1) + "%" : "0.0%",
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
                    (data.hydro_gen.reduce((sum, val) => sum + val, 0) / 
                      (data.solar_gen.reduce((sum, val) => sum + val, 0) +
                       data.wind_gen.reduce((sum, val) => sum + val, 0) +
                       data.hydro_gen.reduce((sum, val) => sum + val, 0)) * 100
                    ).toFixed(1) + "%" : "0.0%",
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
                  title: "Total Efficiency (%)",
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