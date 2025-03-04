'use client';
import { Layout, Typography, Card, Space } from 'antd';
import MapComponent from '../../../Components/Map/Map';
import './page.css';
import { useRouter } from 'next/navigation';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MapPage() {
  const router = useRouter();
  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
  };

  const handleLocationClick = (location) => {
    // Navigate to dashboard with location data as URL parameters
    const params = new URLSearchParams({
      lat: location.lat,
      lng: location.lng,
      cityName: location.cityName
    });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <Layout className="min-h-screen">
      <Content className="p-2 md:p-4 lg:p-6">
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