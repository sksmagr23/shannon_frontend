import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapComponent = ({ center, onLocationClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center.lng, center.lat],
      zoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add click event listener
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setClickedLocation({ lng, lat });
      onLocationClick({ lng, lat });

      // Remove previous marker if exists
      if (map.current.getLayer('clicked-point')) {
        map.current.removeLayer('clicked-point');
        map.current.removeSource('clicked-point');
      }

      // Add marker at clicked location
      map.current.addSource('clicked-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          }]
        }
      });

      map.current.addLayer({
        id: 'clicked-point',
        type: 'circle',
        source: 'clicked-point',
        paint: {
          'circle-radius': 10,
          'circle-color': '#F84C4C'
        }
      });
    });
  }, [center, onLocationClick]);

  return (
    <div>
      <div ref={mapContainer} style={{ height: '400px', width: '100%' }} />
      {clickedLocation && (
        <div>
          <h3>Clicked Location:</h3>
          <p>Latitude: {clickedLocation.lat.toFixed(6)}</p>
          <p>Longitude: {clickedLocation.lng.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
