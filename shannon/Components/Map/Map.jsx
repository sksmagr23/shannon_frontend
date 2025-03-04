"use client"

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapComponent = ({ center, onLocationClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding to get the place name
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            const placeName = data.features[0]?.place_name || "Current Location";
            
            setUserLocation({
              lat: latitude,
              lng: longitude,
              cityName: placeName
            });

            // Only set the clicked location, don't trigger analysis
            setClickedLocation({
              lat: latitude,
              lng: longitude,
              cityName: placeName
            });

            // Center map on user location
            if (map.current) {
              map.current.flyTo({
                center: [longitude, latitude],
                zoom: 10
              });
            }
          } catch (error) {
            console.error("Error getting location details:", error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 4
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Get user location as soon as map loads, but don't analyze
    map.current.on('load', () => {
      getUserLocation();
    });

    // Add click handler
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      handleLocationSelect({ lng, lat });
    });
  }, []);

  useEffect(() => {
    // Update marker when clickedLocation changes
    if (clickedLocation && map.current) {
      // Remove existing marker if any
      if (marker) {
        marker.remove();
      }

      // Create new marker
      const newMarker = new mapboxgl.Marker({
        color: '#003092',
        scale: 1.2
      })
        .setLngLat([clickedLocation.lng, clickedLocation.lat])
        .addTo(map.current);

      setMarker(newMarker);
    }
  }, [clickedLocation]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&limit=5`
      );
      const data = await response.json();
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [lng, lat] = suggestion.center;
    setClickedLocation({
      lng,
      lat,
      cityName: suggestion.place_name
    });

    // Center the map on the selected location
    map.current.flyTo({
      center: [lng, lat],
      zoom: 10
    });

    // Clear suggestions and search input
    setSuggestions([]);
    setSearchInput('');
  };

  const handleSearch = async () => {
    if (!searchInput) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const cityName = data.features[0].place_name;
        
        // Only set the clicked location, don't trigger analysis
        setClickedLocation({
          lng,
          lat,
          cityName
        });

        // Center the map
        map.current.flyTo({
          center: [lng, lat],
          zoom: 10
        });
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleLocationSelect = async ({ lng, lat }) => {
    const cityName = await getCityName(lng, lat);
    
    // Only set the clicked location, don't trigger analysis
    setClickedLocation({ lng, lat, cityName });

    if (map.current.getLayer('clicked-point')) {
      map.current.removeLayer('clicked-point');
      map.current.removeSource('clicked-point');
    }

    map.current.addSource('clicked-point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          },
        ],
      },
    });

    map.current.addLayer({
      id: 'clicked-point',
      type: 'circle',
      source: 'clicked-point',
      paint: {
        'circle-radius': 10,
        'circle-color': '#FFAB5B',
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#00879E',
      },
    });
  };

  const getCityName = async (lng, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}&types=place`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].text;
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Error getting location name:', error);
      return 'Unknown Location';
    }
  };

  const handleSelectLocation = () => {
    if (clickedLocation) {
      // Only trigger the analysis when user clicks the Analyze button
      onLocationClick({
        lat: clickedLocation.lat,
        lng: clickedLocation.lng,
        cityName: clickedLocation.cityName
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Search Container */}
      <div className="absolute top-4 left-4 w-80 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a location..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4D55CC] focus:border-transparent bg-white text-gray-700 placeholder-gray-400"
          />
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {suggestion.place_name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (clickedLocation) {
              onLocationClick(clickedLocation);
            }
          }}
          className="px-6 py-2.5 bg-[#4D55CC] text-white rounded-lg shadow-lg font-medium hover:bg-[#3a41a3] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!clickedLocation}
        >
          Analyze Location
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getUserLocation}
          className="px-6 py-2.5 bg-[#4D55CC] text-white rounded-lg shadow-lg font-medium hover:bg-[#3a41a3] transition-colors duration-200"
        >
          Use My Location
        </motion.button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D55CC]"></div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
