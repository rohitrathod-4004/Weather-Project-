import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import './index.css';

// Helper function to safely convert weather condition into a UI theme class
const getTheme = (weatherData) => {
  if (!weatherData) return 'theme-default';

  const condition = weatherData.condition?.toLowerCase() || '';
  const temp = weatherData.temperature;

  // Keyword matching for conditions
  if (condition.includes('storm') || condition.includes('thunder')) return 'theme-stormy';
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) return 'theme-rainy';
  if (condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard') || condition.includes('pellet')) return 'theme-snowy';
  if (condition.includes('clear') || condition.includes('sun')) return 'theme-clear';
  if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')) return 'theme-cloudy';

  // Fallback to temperature profiling if the condition text isn't matched
  if (typeof temp === 'number') {
    if (temp >= 30) return 'theme-hot';
    if (temp <= 10) return 'theme-cold';
  }

  // Safe fallback if nothing matches
  return 'theme-default';
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (city) => {
    setError(null);
    setWeatherData(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred while fetching data.');
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Network error: Could not reach the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which dynamic background class to apply
  const themeClass = getTheme(weatherData);

  return (
    <div className={`theme-wrapper ${themeClass}`}>
      <div className="app-container">
        <header className="app-header">
          <h1>Weather Explorer</h1>
          <p>Check the current weather for any city worldwide.</p>
        </header>
        
        <main className="app-main">
          <SearchBar 
            onSearch={fetchWeather} 
            isLoading={isLoading} 
            onError={setError} 
          />

          {isLoading && <Loader />}
          
          {!isLoading && error && <ErrorMessage message={error} />}
          
          {!isLoading && !error && weatherData && (
            <WeatherCard weatherData={weatherData} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
