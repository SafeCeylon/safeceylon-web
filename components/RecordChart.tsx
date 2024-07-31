"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const newChartData = [
  { date: "2024-04-01", value: 118 },
  { date: "2024-04-02", value: 5 },
  { date: "2024-04-03", value: 70 },
  { date: "2024-04-04", value: 94 },
  { date: "2024-04-05", value: 115 },
  { date: "2024-04-06", value: 125 },
  { date: "2024-04-07", value: 98 },
  { date: "2024-04-08", value: 114 },
  { date: "2024-04-09", value: 44 },
  { date: "2024-04-10", value: 44 },
  { date: "2024-04-11", value: 152 },
  { date: "2024-04-12", value: 113 },
  { date: "2024-04-13", value: 167 },
  { date: "2024-04-14", value: 23 },
  { date: "2024-04-15", value: 36 },
  { date: "2024-04-16", value: 34 },
  { date: "2024-04-17", value: 153 },
  { date: "2024-04-18", value: 80 },
  { date: "2024-04-19", value: 59 },
  { date: "2024-04-20", value: 105 },
  { date: "2024-04-21", value: 30 },
  { date: "2024-04-22", value: 93 },
  { date: "2024-04-23", value: 19 },
  { date: "2024-04-24", value: 155 },
  { date: "2024-04-25", value: 146 },
  { date: "2024-04-26", value: 12 },
  { date: "2024-04-27", value: 95 },
  { date: "2024-04-28", value: 70 },
  { date: "2024-04-29", value: 126 },
  { date: "2024-04-30", value: 89 }
]

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function Component() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("value")

  const total = React.useMemo(() => ({
    value: newChartData.reduce((acc, curr) => acc + curr.value, 0),
  }), [])

  return (
    <Card className="w-full h-full bg-[#FFF9F0]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Disaster Location Marks</CardTitle>
          <CardDescription>
            By genaral public users throgh the mobile app
          </CardDescription>
        </div>
        <div className="flex">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {"Total"}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[180px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={newChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="value"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Component