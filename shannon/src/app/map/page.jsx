'use client';

import { Layout, Typography, Card, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import MapComponent from '../../../Components/Map/Map';
import './page.css'; // Import the CSS file

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MapPage() {
  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
  };

  const handleLocationClick = (location) => {
    console.log('Selected location:', location);
  };

  return (
    <Layout className="min-h-screen">
      <div className='flex flex-col items-center justify-center text-[#003092] text-6xl h-20 pt-6 bg-[#FFF2DB]'>
       <h2>Choose the location</h2>
      </div>
      <Content className="p-6">
        <Card className="w-full shadow-lg">
          <Space direction="vertical" className="w-full">
            <MapComponent 
              center={defaultCenter}
              onLocationClick={handleLocationClick}
            />
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}