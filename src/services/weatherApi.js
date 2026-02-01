const API_KEY = '9842846a97a1e28d5caa62662030b68e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper function to handle API errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch weather data');
  }
  return response.json();
};

// Fetch current weather for a city
export const fetchCurrentWeather = async (cityName) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
  );
  return handleResponse(response);
};

// Fetch 5-day forecast
export const fetchForecast = async (cityName) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
  );
  const data = await handleResponse(response);
  
  // Group forecast by day and get one entry per day
  const dailyForecast = [];
  const seenDays = new Set();
  
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    if (!seenDays.has(dayKey)) {
      seenDays.add(dayKey);
      dailyForecast.push({
        ...item,
        date: date.toISOString(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      });
    }
  });
  
  return dailyForecast.slice(0, 7); // Return up to 7 days
};

// Fetch hourly forecast (using 5-day forecast API and filtering)
export const fetchHourlyForecast = async (cityName, days = 1) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
  );
  const data = await handleResponse(response);
  
  // Filter for the next 24 hours (or specified days)
  const hours = days * 24;
  return data.list.slice(0, hours).map((item) => ({
    ...item,
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    date: new Date(item.dt * 1000).toISOString(),
  }));
};

// Search cities (using OpenWeatherMap geocoding API)
export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    const data = await handleResponse(response);
    return data.map((city) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

