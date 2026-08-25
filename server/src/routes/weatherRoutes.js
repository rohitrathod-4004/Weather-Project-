import express from 'express';
import { getWeather } from '../controllers/weatherController.js';

const router = express.Router();

// Route: GET /api/weather
// Calls the getWeather controller function
router.get('/weather', getWeather);

export default router;
