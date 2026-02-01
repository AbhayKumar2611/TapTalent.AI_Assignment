import React from 'react';
import { convertTemperature, getWeatherIcon } from '../utils/weatherUtils';

const ForecastList = ({ data, unit }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No forecast data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const temp = convertTemperature(item.main?.temp || 0, unit);
        const tempMin = convertTemperature(item.main?.temp_min || 0, unit);
        const tempMax = convertTemperature(item.main?.temp_max || 0, unit);
        const icon = item.weather?.[0]?.icon || '01d';
        const description = item.weather?.[0]?.description || '';
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        return (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-24">
                <div className="font-semibold text-gray-800">{dayName}</div>
                <div className="text-sm text-gray-500">{dateStr}</div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={getWeatherIcon(icon)}
                  alt={description}
                  className="w-12 h-12"
                />
                <div>
                  <div className="font-semibold text-gray-800 capitalize">
                    {description}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.main?.humidity}% humidity
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-800">
                  {temp}°{unit === 'celsius' ? 'C' : 'F'}
                </div>
                <div className="text-sm text-gray-500">
                  {tempMin}° / {tempMax}°
                </div>
              </div>
              {item.wind && (
                <div className="text-sm text-gray-600 w-20">
                  <div>Wind</div>
                  <div className="font-semibold">{item.wind.speed} m/s</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastList;

