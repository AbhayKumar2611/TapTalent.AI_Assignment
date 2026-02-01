import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureUnit } from '../store/actions/settingsActions';
import { FaCog } from 'react-icons/fa';

const Settings = () => {
  const dispatch = useDispatch();
  const { unit } = useSelector((state) => state.settings);

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-3">
      <FaCog className="text-gray-600" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Temperature:</span>
        <button
          onClick={() => dispatch(toggleTemperatureUnit())}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
        >
          {unit === 'celsius' ? '°C' : '°F'}
        </button>
        <span className="text-sm text-gray-500">
          (Click to switch to {unit === 'celsius' ? '°F' : '°C'})
        </span>
      </div>
    </div>
  );
};

export default Settings;

