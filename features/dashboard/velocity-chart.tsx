"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useVelocity } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/skeleton";

export function VelocityChart() {
  const { data, isLoading } = useVelocity(8);
  if (isLoading) return <Skeleton className="h-64 w-full rounded-md" />;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data ?? []} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.18} />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.08} />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area type="monotone" dataKey="applications" stroke="hsl(var(--foreground))" strokeWidth={1.75} fill="url(#g1)" />
          <Area type="monotone" dataKey="callbacks" stroke="hsl(var(--muted-foreground))" strokeWidth={1.25} fill="url(#g2)" strokeDasharray="4 3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
