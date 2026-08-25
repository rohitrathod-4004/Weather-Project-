import React, { useState } from 'react';

function SearchBar({ onSearch, isLoading, onError }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on enter key
    
    const trimmedCity = city.trim();
    
    // Validation: Check for empty input
    if (!trimmedCity) {
      onError('Please enter a city name.');
      return;
    }

    onSearch(trimmedCity);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name (e.g., London, Tokyo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="search-button" 
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;
