import React, { useEffect, useState } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
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
      <h1>Location:</h1>
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
