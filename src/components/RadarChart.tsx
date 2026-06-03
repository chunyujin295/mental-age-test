import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { DimensionResult } from '../types';

interface RadarChartProps {
  dimensions: DimensionResult[];
}

export default function RadarChart({ dimensions }: RadarChartProps) {
  const chartData = dimensions.map((d) => ({
    dimension: `${d.icon} ${d.label}`,
    value: d.percentage,
    age: d.mentalAge,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-72 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fill: 'rgba(255,255,255,0.8)',
              fontSize: 13,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={45}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="心理年龄"
            dataKey="value"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={2}
            fill="rgba(255,255,255,0.3)"
            fillOpacity={0.4}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
