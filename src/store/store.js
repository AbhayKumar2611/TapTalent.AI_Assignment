import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import weatherReducer from './reducers/weatherReducer';
import favoritesReducer from './reducers/favoritesReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  favorites: favoritesReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
