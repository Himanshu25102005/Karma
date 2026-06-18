'use client'

import React, { useEffect, useState, Fragment } from 'react'
import {
    EvilPieChart,
    Pie,
    Label,
    Tooltip,
    Legend,
    Background,
} from "@/components/evilcharts/charts/pie-chart";
import api from '@/services/api';


const TimeByProject = () => {

    const [chartConfig, setChartConfig] = useState({});
    const [data, setData] = useState([
        {
            projectName: "",
            totalMinutes: 0,
        }
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.projectPiechart();
                const rawProjects = res.data;

                const formattedData = rawProjects.map((project) => ({
                    id: project._id,
                    projectName: project.name,
                    totalMinutes: Math.round(project.totalMinutes),
                    type: project.type,
                    color: project.color
                }));
                setData(formattedData);

                const configMap = rawProjects.reduce((accumulator, project) => {
                    const configKey = project._id;

                    accumulator[configKey] = {
                        label: project.name,
                        colors: {
                            light: [project.color || "#3b82f6"],
                            dark: [project.color || "#60a5fa"]
                        }
                    };

                    return accumulator;
                }, {});

                setChartConfig(configMap);

            } catch (err) {
                console.error("Error fetching or formatting chart data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='h-full w-full flex flex-col gap-2'>
                <div className='relative w-full flex justify-between items-center'>
                    <span className="text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                        Time by Project
                    </span>
                </div>
                <div className='w-full flex flex-row  border border-neutral-800 rounded-xl'>
                    {/* Pie Chart */}

                    {
                        data?
                            <EvilPieChart
                                className='w-[50%] h-50'
                                data={data}
                                dataKey="totalMinutes"
                                nameKey="id"
                                config={chartConfig}
                            >
                                <Tooltip />
                                <Label/>
                                <Pie isClickable paddingAngle={5} cornerRadius={8} />
                            </EvilPieChart>
                            :
                            <EvilPieChart
                                isLoading
                                className='w-[50%] h-50'
                                data={data}
                                dataKey="totalMinutes"
                                nameKey="id"
                                config={chartConfig}
                            >
                                <Tooltip />
                                <Pie isClickable paddingAngle={5} cornerRadius={8} />
                            </EvilPieChart>
                    }


                    {/* Data */}
                    <div className='w-[50%] h-full flex justify-center items-center p-4 '>
                        <div className='w-full h-full overflow-y-auto
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-neutral-800
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700'>

                            {/* Actual Data */}

                            {/* Parent container controls the global alignment grid */}
                            <div className="w-full max-w-md grid grid-cols-4 gap-y-3 items-center font-mono text-sm text-neutral-200 select-none">
                                {data.map((item) => (
                                    <React.Fragment key={item.projectName}>

                                        {/* Column 1 & 2: Project Name combined with the dynamic color dot */}
                                        <div className="col-span-2 flex items-center gap-3 truncate pr-4">
                                            <div
                                                className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                                                style={{ backgroundColor: item.color || "#525252" }} // ⚡ Dynamic inline color block mapping
                                            />
                                            <span className="font-semibold text-neutral-100 truncate">
                                                {item.projectName}
                                            </span>
                                        </div>

                                        {/* Column 3: Symmetrical Duration Track */}
                                        <div className="col-span-1 text-left font-medium text-neutral-400">
                                            {item.totalMinutes}m
                                        </div>

                                        {/* Column 4: Symmetrical Category Tag */}
                                        <div className="col-span-1 text-right text-xs bg-neutral-900/50 border border-neutral-800 text-neutral-400 py-1 px-2.5 rounded-md w-fit justify-self-end">
                                            {item.type || "General"}
                                        </div>

                                    </React.Fragment>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimeByProject