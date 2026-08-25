export const getWeather = async (req, res) => {
    try {
        // 1. Validate the city parameter
        const city = req.query.city?.trim();

        if (!city) {
            return res.status(400).json({ 
                error: 'Please provide a valid city name.' 
            });
        }

        // 2. Read API key securely
        const apiKey = process.env.WEATHER_API_KEY;
        if (!apiKey || apiKey === 'your_weather_api_key_here') {
            console.error('WEATHER_API_KEY is missing or invalid.');
            return res.status(500).json({ error: 'Server configuration error.' });
        }

        // 3. Make request to WeatherAPI using native fetch
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        // 4. Handle external API errors
        if (!response.ok) {
            // WeatherAPI returns error code 1006 for matching location not found
            if (data.error && data.error.code === 1006) {
                return res.status(404).json({ 
                    error: 'City not found. Please check your spelling.' 
                });
            }
            
            // Log other API errors for backend debugging, don't leak details to frontend
            console.error('WeatherAPI Error:', data.error);
            return res.status(502).json({ 
                error: 'Weather service is currently unavailable.' 
            });
        }

        // 5. Transform success response to our clean API contract
        const cleanData = {
            location: `${data.location.name}, ${data.location.country}`,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            humidity: data.current.humidity,
            wind_kph: data.current.wind_kph
        };

        return res.status(200).json(cleanData);

    } catch (error) {
        // Handle unexpected network errors or code failures securely
        console.error('Unexpected Controller Error:', error.message);
        return res.status(500).json({ 
            error: 'An unexpected error occurred on the server.' 
        });
    }
};
