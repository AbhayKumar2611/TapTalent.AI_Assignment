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

const WindChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No wind data available
      </div>
    );
  }

  const chartData = data.slice(0, 24).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    speed: item.wind?.speed || 0,
    gust: item.wind?.gust || 0,
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
            value: 'Wind Speed (m/s)',
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
          dataKey="speed"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Wind Speed (m/s)"
        />
        {chartData.some((item) => item.gust > 0) && (
          <Line
            type="monotone"
            dataKey="gust"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            name="Wind Gust (m/s)"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WindChart;

