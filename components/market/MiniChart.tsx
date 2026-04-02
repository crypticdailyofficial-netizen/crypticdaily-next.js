'use client';

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: number[];
  positive: boolean;
}

export function MiniChart({ data, positive }: MiniChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = positive ? "#10B981" : "#EF4444";

  return (
    <div className="w-24 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={`gradient-${positive ? "up" : "down"}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#gradient-${positive ? "up" : "down"})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
