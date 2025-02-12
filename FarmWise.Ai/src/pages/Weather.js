import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDate, setActiveDate] = useState(null);
  const apiKey = "3a16cd768fa7a9f91f5dbf5bfdd9c140";
  const cityname = "Hyderabad"; // Example city ID

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&lang=en&units=metric&APPID=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const groupedData = groupDataByDate(data.list);
        setForecast(groupedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const groupDataByDate = (data) => {
    return data.reduce((acc, curr) => {
      const date = new Date(curr.dt_txt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
  };

  const toggleDate = (date) => {
    setActiveDate(activeDate === date ? null : date);
  };

  const containerStyle = {
    padding: '20px',
    textAlign: 'center'
  };

  const headingStyle = {
    color: '#2a9d8f',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px'
  };

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    gap: '10px'
  };

  const cardStyle = {
    position: 'relative',
    backgroundColor: '#fff8e1',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '490px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    cursor: 'pointer',
    flex: '0 0 auto'
  };

  const dateStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333'
  };

  const detailStyle = {
    position: 'absolute',
    top: '30px',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 224, 0.9)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    zIndex: 1
  };

  const infoBoxStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '10px',
    margin: '5px 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
    display: 'flex', // Enable flexbox
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center-align items horizontally
    textAlign: 'center', // Center-align text
  };

  if (loading) return <div style={containerStyle}>Loading...</div>;
  if (error) return <div style={{ ...containerStyle, color: 'red' }}>Error: {error.message}</div>;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Weather Forecast</h1>
      <div style={scrollContainerStyle}>
        {Object.entries(forecast).map(([date, details]) => (
          <div key={date} style={cardStyle} onClick={() => toggleDate(date)}>
            <div style={dateStyle}>{date}</div>
            {activeDate === date && (
              <div style={detailStyle}>
                {details.map((detail, index) => (
                  <div key={index} style={infoBoxStyle}>
                    <p>Time: {new Date(detail.dt_txt).toLocaleTimeString()}</p>
                    <p>Temperature: {detail.main.temp_max} °C / {detail.main.temp_min} °C</p>
                    <p>Description: {detail.weather[0].main}, {detail.weather[0].description}</p>
                    <p>Humidity: {detail.main.humidity}%</p>
                    <p>Wind: {detail.wind.speed} KM/H</p>
                    <img src={`http://openweathermap.org/img/w/${detail.weather[0].icon}.png`} alt="Weather Icon" style={{ width: '50px', height: '50px' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;