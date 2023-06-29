import React, { useEffect, useState } from 'react';
import axios from "axios";

const LocationComponent = () => {
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
            axios.post(`http://localhost:3003/bot`,{latitude: latitude, longitude: longitude})
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationComponent;
