import React from 'react';
import { convertTemperature, getWeatherIcon } from '../utils/weatherUtils';

const HourlyForecast = ({ data, unit }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No hourly forecast data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4">
        {data.slice(0, 24).map((item, index) => {
          const temp = convertTemperature(item.main?.temp || 0, unit);
          const icon = item.weather?.[0]?.icon || '01d';
          const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={index}
              className="flex-shrink-0 bg-gray-50 rounded-lg p-4 border border-gray-200 min-w-[100px] text-center"
            >
              <div className="text-sm font-medium text-gray-600 mb-2">{time}</div>
              <img
                src={getWeatherIcon(icon)}
                alt={item.weather?.[0]?.description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-lg font-semibold text-gray-800">
                {temp}°{unit === 'celsius' ? 'C' : 'F'}
              </div>
              {item.rain && item.rain['3h'] && (
                <div className="text-xs text-blue-600 mt-1">
                  {item.rain['3h']}mm
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

