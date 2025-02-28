'use client';

import MapComponent from '../../../Components/Map/Map';

export default function MapPage() {
  const defaultCenter = {
    lat: 20.5937, // Default center coordinates (India)
    lng: 78.9629
  };

  const handleLocationClick = (location) => {
    console.log('Selected location:', location);
    // Handle the clicked location as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location Map</h1>
      <MapComponent 
        center={defaultCenter}
        onLocationClick={handleLocationClick}
      />
    </div>
  );
} 