import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const PrecipitationChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No precipitation data available
      </div>
    );
  }

  const chartData = data.slice(0, 24).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    rain: item.rain?.['3h'] || 0,
    snow: item.snow?.['3h'] || 0,
  }));

  const hasPrecipitation = chartData.some((item) => item.rain > 0 || item.snow > 0);

  if (!hasPrecipitation) {
    return (
      <div className="text-center text-gray-500 py-8">
        No precipitation expected in the next 24 hours
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
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
            value: 'Precipitation (mm)',
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
        <Bar dataKey="rain" fill="#3b82f6" name="Rain (mm)" />
        <Bar dataKey="snow" fill="#60a5fa" name="Snow (mm)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PrecipitationChart;

