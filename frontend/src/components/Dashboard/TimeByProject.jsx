import React from 'react'

import {
    EvilPieChart,
    Pie,
    Label,
    Tooltip,
    Legend,
    Background,
} from "@/components/evilcharts/charts/pie-chart";

const data = [
    { browser: "chrome", visitors: 275 },
    { browser: "safari", visitors: 200 },
    { browser: "firefox", visitors: 187 },
];

const chartConfig = {
    chrome: {
        label: "Chrome",
        colors: { light: ["#3b82f6"], dark: ["#60a5fa"] },
    },
    safari: {
        label: "Safari",
        colors: { light: ["#10b981"], dark: ["#34d399"] },
    },
    firefox: {
        label: "Firefox",
        colors: { light: ["#f59e0b"], dark: ["#fbbf24"] },
    },
};

const TimeByProject = () => {
    return (
        <div className='border rounded-xl w-full h-full flex flex-row '>

            {/* Pie Chart */}
            <EvilPieChart className='w-[50%] h-55 border' data={data} dataKey="visitors" nameKey="browser" config={chartConfig}>
                {/* <Legend isClickable /> */}
                <Tooltip />
                <Pie isClickable paddingAngle={5} cornerRadius={8}>
                    <Label />
                </Pie>
            </EvilPieChart>

            {/* Data */}
            <div className='border w-[50%] h-full flex justify-center items-center p-2'>
                <div className='w-full h-full border border-red-900 overflow-y-auto
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-neutral-800
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700'>

                    {/* Actual Data */}
                    <div className='h-8 w-full border flex flex-row items-center justify-center gap-10 '>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-red-900  '></div>
                            <span className='font-semibold'>AI Resume Builder</span>
                        </div>
                        <span>28m</span>
                        <span>38%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeByProject