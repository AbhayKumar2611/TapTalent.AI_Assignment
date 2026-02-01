import React from 'react';
import { convertTemperature, getWindDirection } from '../utils/weatherUtils';
import {
  FaTint,
  FaWind,
  FaEye,
  FaThermometerHalf,
  FaSun,
  FaCloudRain,
} from 'react-icons/fa';

const WeatherDetails = ({ weather, unit }) => {
  const temp = convertTemperature(weather.main?.temp || 0, unit);
  const feelsLike = convertTemperature(weather.main?.feels_like || 0, unit);
  const tempMin = convertTemperature(weather.main?.temp_min || 0, unit);
  const tempMax = convertTemperature(weather.main?.temp_max || 0, unit);

  const details = [
    {
      icon: <FaTint className="text-blue-500" />,
      label: 'Humidity',
      value: `${weather.main?.humidity || 0}%`,
    },
    {
      icon: <FaWind className="text-gray-500" />,
      label: 'Wind Speed',
      value: `${weather.wind?.speed || 0} m/s`,
      subValue: weather.wind?.deg
        ? `${getWindDirection(weather.wind.deg)} (${weather.wind.deg}°)`
        : null,
    },
    {
      icon: <FaEye className="text-indigo-500" />,
      label: 'Visibility',
      value: weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A',
    },
    {
      icon: <FaThermometerHalf className="text-red-500" />,
      label: 'Pressure',
      value: `${weather.main?.pressure || 0} hPa`,
    },
    {
      icon: <FaSun className="text-yellow-500" />,
      label: 'Feels Like',
      value: `${feelsLike}°${unit === 'celsius' ? 'C' : 'F'}`,
    },
    {
      icon: <FaCloudRain className="text-gray-600" />,
      label: 'Temperature Range',
      value: `${tempMin}° - ${tempMax}°`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {details.map((detail, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{detail.icon}</span>
            <span className="text-sm font-medium text-gray-600">{detail.label}</span>
          </div>
          <div className="text-lg font-semibold text-gray-800">{detail.value}</div>
          {detail.subValue && (
            <div className="text-xs text-gray-500 mt-1">{detail.subValue}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;

