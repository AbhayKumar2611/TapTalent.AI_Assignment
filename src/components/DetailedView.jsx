import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchWeatherData,
  fetchForecastData,
  fetchHourlyData,
} from '../store/actions/weatherActions';
import TemperatureChart from './charts/TemperatureChart';
import PrecipitationChart from './charts/PrecipitationChart';
import WindChart from './charts/WindChart';
import ForecastList from './ForecastList';
import HourlyForecast from './HourlyForecast';
import WeatherDetails from './WeatherDetails';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { convertTemperature, getWeatherIcon } from '../utils/weatherUtils';

const DetailedView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityName } = useParams();
  const { currentWeather, forecast, hourlyForecast, loading, error } = useSelector(
    (state) => state.weather
  );
  const { unit } = useSelector((state) => state.settings);

  useEffect(() => {
    if (cityName) {
      dispatch(fetchWeatherData(cityName));
      dispatch(fetchForecastData(cityName));
      dispatch(fetchHourlyData(cityName, 1));
    }
  }, [dispatch, cityName]);

  if (loading && !currentWeather.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-indigo-600 mx-auto mb-4" />
          <p className="text-xl text-gray-700">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !currentWeather.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentWeather.name) {
    return null;
  }

  const temp = convertTemperature(currentWeather.main?.temp || 0, unit);
  const icon = currentWeather.weather?.[0]?.icon || '01d';
  const description = currentWeather.weather?.[0]?.description || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        {/* Current Weather Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {currentWeather.name}, {currentWeather.sys?.country}
              </h1>
              <p className="text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <img
                src={getWeatherIcon(icon)}
                alt={description}
                className="w-24 h-24"
              />
              <div>
                <div className="text-5xl md:text-6xl font-bold text-gray-800">
                  {temp}°{unit === 'celsius' ? 'C' : 'F'}
                </div>
                <div className="text-lg text-gray-500 capitalize">{description}</div>
              </div>
            </div>
          </div>

          <WeatherDetails weather={currentWeather} unit={unit} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Temperature Trends
            </h2>
            <TemperatureChart data={hourlyForecast} unit={unit} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Precipitation Forecast
            </h2>
            <PrecipitationChart data={hourlyForecast} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Wind Speed & Direction</h2>
          <WindChart data={hourlyForecast} />
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2>
          <HourlyForecast data={hourlyForecast} unit={unit} />
        </div>

        {/* Daily Forecast */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5-7 Day Forecast</h2>
          <ForecastList data={forecast} unit={unit} />
        </div>
      </div>
    </div>
  );
};

export default DetailedView;

