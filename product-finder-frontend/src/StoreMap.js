// src/StoreMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './StoreMap.css';

const MoveMapToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 12); // Move the map to the new position with zoom level 12
    }
  }, [position, map]);
  return null;
};

const StoreMap = ({ selectedProduct }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [position, setPosition] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    const location = `${city}, ${state}`;
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=cf5385517645433da73b52d72d067be4`);
      const { lat, lng } = response.data.results[0].geometry;
      setPosition([lat, lng]);
    } catch (error) {
      console.error('Error fetching geocode data', error);
    }
  };

  // Create a green dot icon
  const greenDotIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (selectedProduct && selectedProduct.locations && selectedProduct.locations.length > 0) {
      setPosition(selectedProduct.locations[0]);
    }
  }, [selectedProduct]);

  return (
    <div className="map-container">
      <p className="location-blurb">Input your current city and state to find products in stock in stores near you.</p>
      <form onSubmit={handleLocationSubmit} className="location-form">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="location-input"
        />
        <input
          type="text"
          value={state}
          onChange={handleStateChange}
          placeholder="Enter state"
          className="location-input"
        />
        <button type="submit" className="location-button">Submit</button>
      </form>
      <MapContainer center={[40.712776, -74.005974]} zoom={12} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MoveMapToLocation position={position} />
        {position && (
          <>
            <Marker position={position} icon={greenDotIcon}>
              <Popup>Your location</Popup>
            </Marker>
            <Circle
              center={position}
              radius={16093.4} // 10 miles in meters
              fillColor="blue"
              color="blue"
              fillOpacity={0.2}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default StoreMap;
