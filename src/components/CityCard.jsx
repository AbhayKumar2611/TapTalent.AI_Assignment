import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../store/actions/weatherActions';
import { convertTemperature, getWeatherIcon } from '../utils/weatherUtils';
import { FaTrash } from 'react-icons/fa';
import { removeFavorite } from '../store/actions/favoritesActions';
import { useNavigate } from 'react-router-dom';

const CityCard = ({ city, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityWeathers } = useSelector((state) => state.weather);
  const { unit } = useSelector((state) => state.settings);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const cityKey = `${city.name},${city.country}`;

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      try {
        await dispatch(fetchWeatherData(cityKey));
      } catch (error) {
        console.error('Error loading weather:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
    // Refresh every 5 minutes
    const interval = setInterval(loadWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch, cityKey]);

  useEffect(() => {
    // Find weather for this city from cityWeathers
    const cityWeather = cityWeathers[cityKey];
    if (cityWeather) {
      setWeather(cityWeather);
      setLoading(false);
    }
  }, [cityWeathers, cityKey]);

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    dispatch(removeFavorite(city.name, city.country));
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(city);
    } else {
      navigate(`/city/${encodeURIComponent(cityKey)}`);
    }
  };

  if (loading && !weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow" onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{city.name}</h3>
            <p className="text-sm text-gray-500">{city.country}</p>
          </div>
          <button
            onClick={handleRemoveFavorite}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Remove from favorites"
          >
            <FaTrash />
          </button>
        </div>
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  const temp = convertTemperature(weather.main?.temp || 0, unit);
  const feelsLike = convertTemperature(weather.main?.feels_like || 0, unit);
  const icon = weather.weather?.[0]?.icon || '01d';
  const description = weather.weather?.[0]?.description || '';

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{weather.name}</h3>
          <p className="text-sm text-gray-500">
            {weather.sys?.country} {city.state ? `, ${city.state}` : ''}
          </p>
        </div>
        <button
          onClick={handleRemoveFavorite}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Remove from favorites"
        >
          <FaTrash />
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIcon(icon)}
            alt={description}
            className="w-16 h-16"
          />
          <div>
            <div className="text-4xl font-bold text-gray-800">
              {temp}°{unit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="text-sm text-gray-500 capitalize">{description}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Feels like</p>
          <p className="font-semibold text-gray-800">{feelsLike}°</p>
        </div>
        <div>
          <p className="text-gray-500">Humidity</p>
          <p className="font-semibold text-gray-800">{weather.main?.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-500">Wind Speed</p>
          <p className="font-semibold text-gray-800">{weather.wind?.speed} m/s</p>
        </div>
        <div>
          <p className="text-gray-500">Pressure</p>
          <p className="font-semibold text-gray-800">{weather.main?.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default CityCard;

