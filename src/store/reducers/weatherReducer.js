import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_FORECAST_START,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE,
  FETCH_HOURLY_START,
  FETCH_HOURLY_SUCCESS,
  FETCH_HOURLY_FAILURE,
  CLEAR_ERROR,
  CLEAR_WEATHER_DATA,
} from '../actions/weatherActions';

const initialState = {
  currentWeather: {},
  cityWeathers: {}, // Store weather data for multiple cities
  forecast: [],
  hourlyForecast: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WEATHER_SUCCESS:
      const cityKey = `${action.payload.name},${action.payload.sys?.country}`;
      return {
        ...state,
        loading: false,
        currentWeather: action.payload,
        cityWeathers: {
          ...state.cityWeathers,
          [cityKey]: action.payload,
        },
        lastUpdated: new Date().toISOString(),
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FORECAST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecast: action.payload,
      };
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_HOURLY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_HOURLY_SUCCESS:
      return {
        ...state,
        loading: false,
        hourlyForecast: action.payload,
      };
    case FETCH_HOURLY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_WEATHER_DATA:
      return {
        ...state,
        currentWeather: {},
        cityWeathers: {},
        forecast: [],
        hourlyForecast: [],
      };
    default:
      return state;
  }
};

export default weatherReducer;

