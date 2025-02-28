'use client';

import { Layout, Typography, Card, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import MapComponent from '../../../Components/Map/Map';

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
      <Header className="bg-white shadow-md">
        <div className="flex items-center">
          <EnvironmentOutlined className="text-2xl text-blue-500 mr-2" />
          <Title level={3} className="m-0">Location Map</Title>
        </div>
      </Header>
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