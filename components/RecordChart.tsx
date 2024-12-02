"use client"

import { useEffect, useState } from 'react';
import axios from "axios";
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
import { array } from 'zod';

const newChartData: { date: string; value: number }[] = []

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export function Component() {

  // Array of objects containing the date and value of the chart
  const [chatData, setChartData] = useState(newChartData);


  const fetchData1 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/disaster/dashboard");
      
      // Transform data into the desired format
      const transformedData = response.data.disasterMarkCounts.map((item : any) => {
        const date = Object.keys(item)[0]; // Extract the date
        const value = Object.values(item)[0]; // Extract the value
        return { date, value }; // Return the transformed object
      });

      // Set the transformed data to the state
      setChartData(transformedData);
      console.log(transformedData);
      
      
    } catch (error) {
      console.error("Error fetching victim stats:", error);
    }
  };

  // fetch the number of requests for each status on page load
  useEffect(() => {
    fetchData1();
  }, []);

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("value")

  const total = React.useMemo(() => ({
    value: chatData.reduce((acc, curr) => acc + curr.value, 0),
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
            data={chatData}
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