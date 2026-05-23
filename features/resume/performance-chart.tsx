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
import { resumePerformance } from "@/lib/mock-data";

export function ResumePerformanceChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={resumePerformance} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
          <Line type="monotone" name="Backend v3" dataKey="v3" stroke="hsl(var(--foreground))" strokeWidth={1.75} dot={false} />
          <Line type="monotone" name="Fullstack v2" dataKey="v2" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} dot={false} />
          <Line type="monotone" name="Frontend v4" dataKey="v4" stroke="hsl(var(--muted-foreground))" strokeWidth={1.25} strokeDasharray="4 3" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
