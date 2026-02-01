// Action Types
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

// Action Creators
export const addFavorite = (city) => ({
  type: ADD_FAVORITE,
  payload: city,
});

export const removeFavorite = (name, country) => ({
  type: REMOVE_FAVORITE,
  payload: { name, country },
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});

