"use client";

import { Card, Typography, Carousel, Button, Table } from "antd";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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
} from "recharts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";

const { Title, Text } = Typography;

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export function Component() {
  const carouselRef = useRef(null);

  const next = () => {
    carouselRef.current.next();
  };

  const previous = () => {
    carouselRef.current.prev();
  };

  return (
    <div style={{ padding: "10px" }}>
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
          draggable={false}
          style={{
            margin: "0 auto",
            padding: "0 4px",
            width: "100%",
          }}
        >
          {/* line plot- 1 */}
          <div>
            <Card
              style={{
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                width: "100%",
                margin: "0 auto",
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10
              }}
            >
              <Title level={3}>Line Chart - Dots Colors</Title>
              <Text type="secondary">January - June 2024</Text>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
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
                      stroke="rgba(0,0,0,0.1)"
                    />
                    <XAxis dataKey="browser" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Line
                      dataKey="visitors"
                      type="monotone"
                      stroke="#000000"
                      strokeWidth={3}
                      activeDot={{
                        r: 8,
                        fill: "#000000",
                        strokeWidth: 0,
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
                      }}
                      dot={({ payload, ...props }) => (
                        <Dot
                          key={payload.browser}
                          r={5}
                          cx={props.cx}
                          cy={props.cy}
                          fill="#0073e6"
                          stroke="#000000"
                          filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"
                        />
                      )}
                      filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.1))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card-footer flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </Card>
          </div>

          {/* line plot- 2 */}
          <div>
            <Card
              style={{
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                width: "100%",
                margin: "0 auto",
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10
              }}
            >
              <Title level={3}>Line Chart - Dots Colors</Title>
              <Text type="secondary">January - June 2024</Text>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
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
                      stroke="rgba(0,0,0,0.1)"
                    />
                    <XAxis dataKey="browser" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Line
                      dataKey="visitors"
                      type="monotone"
                      stroke="#000000"
                      strokeWidth={3}
                      activeDot={{
                        r: 8,
                        fill: "#000000",
                        strokeWidth: 0,
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
                      }}
                      dot={({ payload, ...props }) => (
                        <Dot
                          key={payload.browser}
                          r={5}
                          cx={props.cx}
                          cy={props.cy}
                          fill="#00cc00"
                          stroke="#000000"
                          filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"
                        />
                      )}
                      filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.1))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card-footer flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </Card>
          </div>
          {/* line plot- 3 */}
          <div>
            <Card
              style={{
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                width: "100%",
                margin: "0 auto",
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10
              }}
            >
              <Title level={3}>Line Chart - Dots Colors</Title>
              <Text type="secondary">January - June 2024</Text>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
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
                      stroke="rgba(0,0,0,0.1)"
                    />
                    <XAxis dataKey="browser" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Line
                      dataKey="visitors"
                      type="monotone"
                      stroke="#000000"
                      strokeWidth={3}
                      activeDot={{
                        r: 8,
                        fill: "#000000",
                        strokeWidth: 0,
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
                      }}
                      dot={({ payload, ...props }) => (
                        <Dot
                          key={payload.browser}
                          r={5}
                          cx={props.cx}
                          cy={props.cy}
                          fill="#ff9933"
                          stroke="#000000"
                          filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"
                        />
                      )}
                      filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.1))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card-footer flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </Card>
          </div>
          {/* Pie Chart */}
          <div>
            <Card
              style={{
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                width: "100%",
                margin: "0 auto",
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10
              }}
            >
              <Title level={3}>Pie Chart - Browser Distribution</Title>
              <Text type="secondary">January - June 2024</Text>
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
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        border: "none",
                      }}
                    />
                    <Pie
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      fill="#8884d8"
                      paddingAngle={5}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={2}
                          filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.15))"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="card-footer flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Browser Distribution Analysis{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing browser usage distribution
                </div>
              </div>
            </Card>
          </div>
        </Carousel>

        <Button
          type="text"
          shape="circle"
          icon={<LeftOutlined style={{ fontSize: "18px" }} />} // Decreased from 24px
          onClick={previous}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 15,
            width: "32px", // Decreased from 44px
            height: "32px", // Decreased from 44px
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)", // Added semi-transparent background
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Added subtle shadow
          }}
        />
        <Button
          type="text"
          shape="circle"
          icon={<RightOutlined style={{ fontSize: "18px" }} />} // Decreased from 24px
          onClick={next}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 15,
            width: "32px", // Decreased from 44px
            height: "32px", // Decreased from 44px
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)", // Added semi-transparent background
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Added subtle shadow
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginTop: "32px" }}
      >
        <Card 
          style={{ 
            background: 'linear-gradient(to right bottom, #ffffff, #f8f9ff)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)', // Enhanced layered shadow
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Table
              dataSource={[
                {
                  key: '1',
                  browser: 'Chrome',
                  visitors: 275,
                  share: '29.8%',
                  trend: '+5.2%',
                  status: 'up',
                  color: '#4285F4'
                },
                {
                  key: '2',
                  browser: 'Safari',
                  visitors: 200,
                  share: '21.7%',
                  trend: '+3.8%',
                  status: 'up',
                  color: '#000000'
                },
                {
                  key: '3',
                  browser: 'Firefox',
                  visitors: 187,
                  share: '20.3%',
                  trend: '-1.2%',
                  status: 'down',
                  color: '#FF9500'
                },
                {
                  key: '4',
                  browser: 'Edge',
                  visitors: 173,
                  share: '18.8%',
                  trend: '+2.5%',
                  status: 'up',
                  color: '#0078D7'
                },
                {
                  key: '5',
                  browser: 'Other',
                  visitors: 90,
                  share: '9.4%',
                  trend: '-0.8%',
                  status: 'down',
                  color: '#888888'
                },
              ]}
              columns={[
                {
                  title: 'Browser',
                  dataIndex: 'browser',
                  key: 'browser',
                  render: (text, record) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: record.color 
                      }} />
                      <span style={{ fontWeight: 500 }}>{text}</span>
                    </div>
                  )
                },
                {
                  title: 'Visitors',
                  dataIndex: 'visitors',
                  key: 'visitors',
                  render: (text) => (
                    <span style={{ fontWeight: 500 }}>{text.toLocaleString()}</span>
                  )
                },
                {
                  title: 'Market Share',
                  dataIndex: 'share',
                  key: 'share',
                  render: (text) => (
                    <div style={{ 
                      background: '#f0f2f5', 
                      padding: '4px 12px', 
                      borderRadius: '12px',
                      display: 'inline-block'
                    }}>
                      {text}
                    </div>
                  )
                },
                {
                  title: 'Trend',
                  dataIndex: 'trend',
                  key: 'trend',
                  render: (text, record) => (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Text 
                        style={{
                          color: record.status === 'up' ? '#52c41a' : '#ff4d4f',
                          fontWeight: 500,
                          padding: '4px 12px',
                          background: record.status === 'up' ? '#f6ffed' : '#fff2f0',
                          borderRadius: '12px'
                        }}
                      >
                        {text}
                      </Text>
                    </motion.div>
                  ),
                },
              ]}
              pagination={false}
            />
          </motion.div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '24px' }}>
            <motion.div 
              style={{ flex: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card 
                title={
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #2196F3, #4CAF50)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Key Findings
                  </div>
                }
                style={{ 
                  height: '100%',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)', // Enhanced inner card shadow
                  borderRadius: '12px'
                }}
              >
                <motion.ul style={{ listStyleType: 'none', padding: 0 }}>
                  {[
                    'Chrome maintains market leadership with nearly 30% share',
                    'Safari shows strong growth in user adoption',
                    'Firefox experiencing slight decline in market share',
                    'Edge showing steady growth in user base'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                      style={{ 
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%',
                        backgroundColor: '#1890ff'
                      }} />
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
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card 
                title={
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #FF9800, #F44336)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Recommendations
                  </div>
                }
                style={{ 
                  height: '100%',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)', // Enhanced inner card shadow
                  borderRadius: '12px'
                }}
              >
                <motion.ul style={{ listStyleType: 'none', padding: 0 }}>
                  {[
                    'Optimize website performance for Chrome and Safari',
                    'Monitor Firefox user experience for potential issues',
                    'Consider enhanced testing on Edge platform',
                    'Maintain broad browser compatibility'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                      style={{ 
                        padding: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%',
                        backgroundColor: '#ff4d4f'
                      }} />
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
