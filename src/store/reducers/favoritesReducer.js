import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES,
} from '../actions/favoritesActions';

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem('weatherFavorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  cities: loadFavorites(),
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      const city = action.payload;
      const exists = state.cities.some(
        (fav) => fav.name === city.name && fav.country === city.country
      );
      if (!exists) {
        const newCities = [...state.cities, city];
        localStorage.setItem('weatherFavorites', JSON.stringify(newCities));
        return {
          ...state,
          cities: newCities,
        };
      }
      return state;
    case REMOVE_FAVORITE:
      const { name, country } = action.payload;
      const filteredCities = state.cities.filter(
        (city) => !(city.name === name && city.country === country)
      );
      localStorage.setItem('weatherFavorites', JSON.stringify(filteredCities));
      return {
        ...state,
        cities: filteredCities,
      };
    case CLEAR_FAVORITES:
      localStorage.setItem('weatherFavorites', JSON.stringify([]));
      return {
        ...state,
        cities: [],
      };
    default:
      return state;
  }
};

export default favoritesReducer;

