import React from 'react';

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const {
    location = 'Unknown Location',
    temperature,
    condition = 'N/A',
    icon,
    humidity,
    wind_kph
  } = weatherData;

  // Safe checks using nullish coalescing to ensure 0 is not treated as falsy
  const displayTemp = (temperature ?? null) !== null ? `${temperature}°C` : 'N/A';
  const displayHumidity = (humidity ?? null) !== null ? `${humidity}%` : 'N/A';
  const displayWind = (wind_kph ?? null) !== null ? `${wind_kph} kph` : 'N/A';

  return (
    <div className="weather-card">
      <h2 className="weather-location">{location}</h2>
      
      <div className="weather-main">
        {icon && <img src={icon} alt={condition} className="weather-icon" />}
        <div className="weather-info">
          <p className="weather-temperature">{displayTemp}</p>
          <p className="weather-condition">{condition}</p>
        </div>
      </div>

      <div className="weather-details">
        <p>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{displayHumidity}</span>
        </p>
        <p>
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{displayWind}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
