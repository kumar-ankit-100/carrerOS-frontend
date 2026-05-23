"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  funnel,
  applicationsOverTime,
  domainPerformance,
  companyConversion,
} from "@/lib/mock-data";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
} as const;

export function FunnelChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={funnel} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={70} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {funnel.map((_, i) => (
              <Cell key={i} fill={`hsl(var(--foreground) / ${1 - i * 0.15})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrendsChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={applicationsOverTime} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="trend1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.18} />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="applications" stroke="hsl(var(--foreground))" strokeWidth={1.75} fill="url(#trend1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DomainChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={domainPerformance} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="domain" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
          <Bar dataKey="rate" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompanyChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={companyConversion} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="company" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
          <Bar dataKey="applied" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="interview" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
