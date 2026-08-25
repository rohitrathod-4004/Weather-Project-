# Development Prompt History

## Overview

This project was developed through multiple AI-assisted development steps.

The goal was to build a full-stack Weather API application using React and Express, where users can search for weather information by city.

WeatherAPI.com was selected as the external API provider because an API key was already available for the project.

This document records the major prompts and instructions used during development.

---

## 1. Initial Project Direction

> Let's use the same structure and proceed with the work, no need to change the project structure.

The project continued with the separated client and server architecture:

```text
weather-app/
├── server/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       └── server.js
│
└── client/
    └── src/
        ├── components/
        ├── App.jsx
        └── index.css
```

---

## 2. Backend Implementation

> Implement only the backend weather API integration. Create a GET endpoint `/api/weather?city={city}` in `weatherRoutes.js` and handle the logic in `weatherController.js`. Read the WeatherAPI.com API key from `process.env.WEATHER_API_KEY` without exposing it. Validate the city query parameter and handle WeatherAPI failures without crashing the server. Transform the response to contain only: location, temperature, condition, icon, humidity, wind_kph.

---

## 3. Frontend MVP and Component Integration

> Implement the first frontend MVP. Create `SearchBar.jsx` to hold local component state and submit a city via form submission. Update `App.jsx` to fetch data from `/api/weather?city={encoded city name}`. Create `WeatherCard.jsx` to receive weather data through props and display location, temperature, condition, icon, humidity, and wind speed. Handle missing data safely without crashing the UI.

---

## 4. Loading States and Error Handling

> Complete the remaining frontend functionality. Add `isLoading` state in `App.jsx` and use a `Loader.jsx` component. Prevent stale weather data from being displayed during a new search. Implement `ErrorMessage.jsx` to handle invalid cities, empty inputs, network failures, and backend errors gracefully. Ensure a new valid search clears any previous error states.

---

## 5. UI Polish and Responsive Layout

> Improve the UI and layout using the existing CSS. Ensure the weather card has a controlled responsive width and long location names do not break the layout. Create a fixed-size area for the weather icon using `object-fit: contain`. Use a balanced grid layout for the humidity and wind information. Make the design polished and responsive without adding external libraries.

---

## 6. Dynamic Weather Themes

> Make the page visually dynamic based on the weather data returned from the API. Use `condition` and `temperature` to create a simple reusable mechanism for determining a UI theme. Apply a dynamic CSS class (e.g., `theme-rainy`, `theme-clear`) to the main application container to adapt the visual atmosphere with smooth transitions.
