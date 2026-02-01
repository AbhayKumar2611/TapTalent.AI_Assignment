import {
  fetchCurrentWeather,
  fetchForecast,
  fetchHourlyForecast,
} from '../../services/weatherApi';

// Action Types
export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const FETCH_FORECAST_START = 'FETCH_FORECAST_START';
export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';
export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';

export const FETCH_HOURLY_START = 'FETCH_HOURLY_START';
export const FETCH_HOURLY_SUCCESS = 'FETCH_HOURLY_SUCCESS';
export const FETCH_HOURLY_FAILURE = 'FETCH_HOURLY_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_WEATHER_DATA = 'CLEAR_WEATHER_DATA';

// Action Creators
export const fetchWeatherData = (cityName) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_START });
    try {
      const data = await fetchCurrentWeather(cityName);
      dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_WEATHER_FAILURE,
        payload: error.message || 'Failed to fetch weather data',
      });
    }
  };
};

export const fetchForecastData = (cityName) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FORECAST_START });
    try {
      const data = await fetchForecast(cityName);
      dispatch({ type: FETCH_FORECAST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_FORECAST_FAILURE,
        payload: error.message || 'Failed to fetch forecast data',
      });
    }
  };
};

export const fetchHourlyData = (cityName, days = 1) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_HOURLY_START });
    try {
      const data = await fetchHourlyForecast(cityName, days);
      dispatch({ type: FETCH_HOURLY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_HOURLY_FAILURE,
        payload: error.message || 'Failed to fetch hourly forecast data',
      });
    }
  };
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const clearWeatherData = () => ({
  type: CLEAR_WEATHER_DATA,
});

