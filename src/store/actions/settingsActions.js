// Action Types
export const SET_TEMPERATURE_UNIT = 'SET_TEMPERATURE_UNIT';
export const TOGGLE_TEMPERATURE_UNIT = 'TOGGLE_TEMPERATURE_UNIT';

// Action Creators
export const setTemperatureUnit = (unit) => ({
  type: SET_TEMPERATURE_UNIT,
  payload: unit,
});

export const toggleTemperatureUnit = () => ({
  type: TOGGLE_TEMPERATURE_UNIT,
});

