import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { convertTemperature } from '../../utils/weatherUtils';

const TemperatureChart = ({ data, unit }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No temperature data available
      </div>
    );
  }

  const chartData = data.slice(0, 24).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: convertTemperature(item.main?.temp || 0, unit),
    feelsLike: convertTemperature(item.main?.feels_like || 0, unit),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          label={{
            value: `Temperature (°${unit === 'celsius' ? 'C' : 'F'})`,
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ r: 4 }}
          name={`Temp (°${unit === 'celsius' ? 'C' : 'F'})`}
        />
        <Line
          type="monotone"
          dataKey="feelsLike"
          stroke="#8b5cf6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          name={`Feels Like (°${unit === 'celsius' ? 'C' : 'F'})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;

