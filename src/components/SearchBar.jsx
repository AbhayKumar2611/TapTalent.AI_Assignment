import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCities } from '../services/weatherApi';
import { addFavorite } from '../store/actions/favoritesActions';
import { FaSearch, FaPlus } from 'react-icons/fa';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { cities: favorites } = useSelector((state) => state.favorites);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      try {
        const cities = await searchCities(query);
        setResults(cities);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching cities:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleAddFavorite = (city) => {
    dispatch(addFavorite(city));
    setQuery('');
    setShowResults(false);
  };

  const isFavorite = (city) => {
    return favorites.some(
      (fav) => fav.name === city.name && fav.country === city.country
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-lg"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto">
          {results.map((city, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    {city.name}
                    {city.state && `, ${city.state}`}
                  </p>
                  <p className="text-sm text-gray-500">{city.country}</p>
                </div>
                {isFavorite(city) ? (
                  <span className="text-sm text-green-600 font-medium">Added</span>
                ) : (
                  <button
                    onClick={() => handleAddFavorite(city)}
                    className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                  >
                    <FaPlus /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <p className="text-gray-500 text-center">No cities found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

