"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useResumePerformanceSeries } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/skeleton";

export function ResumePerformanceChart() {
  const { data, isLoading } = useResumePerformanceSeries(6);
  if (isLoading || !data)
    return <Skeleton className="h-72 w-full rounded-md" />;

  const palette = [
    "hsl(var(--foreground))",
    "hsl(var(--muted-foreground))",
    "hsl(var(--muted-foreground))",
  ];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
          {data.versions.map((v, i) => (
            <Line
              key={v}
              type="monotone"
              name={v}
              dataKey={v}
              stroke={palette[i % palette.length]}
              strokeWidth={i === 0 ? 1.75 : 1.25}
              strokeDasharray={i > 1 ? "4 3" : undefined}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
