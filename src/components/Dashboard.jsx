import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../store/actions/weatherActions';
import CityCard from './CityCard';
import SearchBar from './SearchBar';
import Settings from './Settings';
import { FaCloudSun } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cities } = useSelector((state) => state.favorites);
  const { unit } = useSelector((state) => state.settings);

  // Fetch weather for all favorite cities on mount
  useEffect(() => {
    cities.forEach((city) => {
      dispatch(fetchWeatherData(`${city.name},${city.country}`));
    });
  }, [dispatch, cities.length]);

  const handleCityClick = (city) => {
    navigate(`/city/${encodeURIComponent(city.name)},${city.country}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <FaCloudSun className="text-4xl text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Weather Analytics Dashboard
            </h1>
          </div>
          <Settings />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Favorites Section */}
        {cities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaCloudSun className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Favorite Cities Yet
            </h2>
            <p className="text-gray-500 mb-4">
              Search for a city and add it to your favorites to see weather data here.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Favorite Cities ({cities.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city, index) => (
                <CityCard
                  key={`${city.name}-${city.country}-${index}`}
                  city={city}
                  onClick={() => handleCityClick(city)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

