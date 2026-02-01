import {
  SET_TEMPERATURE_UNIT,
  TOGGLE_TEMPERATURE_UNIT,
} from '../actions/settingsActions';

// Load settings from localStorage
const loadSettings = () => {
  try {
    const settings = localStorage.getItem('weatherSettings');
    return settings ? JSON.parse(settings) : { unit: 'celsius' };
  } catch (error) {
    return { unit: 'celsius' };
  }
};

const initialState = loadSettings();

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPERATURE_UNIT:
      const newState = {
        ...state,
        unit: action.payload,
      };
      localStorage.setItem('weatherSettings', JSON.stringify(newState));
      return newState;
    case TOGGLE_TEMPERATURE_UNIT:
      const toggledState = {
        ...state,
        unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius',
      };
      localStorage.setItem('weatherSettings', JSON.stringify(toggledState));
      return toggledState;
    default:
      return state;
  }
};

export default settingsReducer;

