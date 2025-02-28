"use client"

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapComponent = ({ center, onLocationClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', 
      center: [center.lng, center.lat],
      zoom: 9
    });

    map.current.addControl(new mapboxgl.NavigationControl({
      visualizePitch: true
    }));

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setClickedLocation({ lng, lat });
      onLocationClick({ lng, lat });

      if (map.current.getLayer('clicked-point')) {
        map.current.removeLayer('clicked-point');
        map.current.removeSource('clicked-point');
      }

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
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'radius'],
            0, 10,
            100, 20
          ],
          'circle-color': '#FFAB5B',
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#00879E'
        }
      });
    });
  }, [center, onLocationClick]);

  const handleSelectLocation = () => {
    if (clickedLocation) {
      onLocationClick(clickedLocation);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
      style={{ backgroundColor: "#FFF2DB", borderRadius: "20px" }}
    >
      <motion.div 
        ref={mapContainer} 
        style={{ 
          height: '500px', 
          width: '100%', 
          borderRadius: '15px', 
          overflow: 'hidden',
          border: '3px solid #003092'
        }}
        whileHover={{ 
          boxShadow: '0px 0px 25px rgba(0,135,158,0.3)',
        }}
      />
      {clickedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 p-6 rounded-xl"
          style={{ 
            backgroundColor: "#003092",
            color: "#FFF2DB"
          }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: "#FFAB5B" }}>
            Selected Location
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(0,135,158,0.2)" }}>
              <p className="text-sm opacity-80">Latitude</p>
              <p className="text-xl font-semibold">{clickedLocation.lat.toFixed(6)}°</p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(0,135,158,0.2)" }}>
              <p className="text-sm opacity-80">Longitude</p>
              <p className="text-xl font-semibold">{clickedLocation.lng.toFixed(6)}°</p>
            </div>
          </div>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#FFAB5B",
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              className="w-[50%] py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden"
              style={{ 
                backgroundColor: "#00879E",
                color: "#FFF2DB"
              }}
              onClick={handleSelectLocation}
            >
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{ 
                  y: isHovering ? -30 : 0,
                  opacity: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                Analyze
              </motion.span>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={false}
                animate={{ 
                  y: isHovering ? 0 : 30,
                  opacity: isHovering ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                style={{ color: "#003092" }}
              >
                Let's Go! 🚀
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MapComponent;
