'use client'

import React, { useEffect, useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { motion } from "motion/react";
import api from '@/services/api';


/* const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/04/12', count: 2 },
    { date: '2016/05/01', count: 17 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/03', count: 27 },
    { date: '2016/05/04', count: 11 },
    { date: '2016/05/08', count: 32 },
]; */


const WeeklyHeatmap = () => {
    const [value, setValue] = useState([]);
    useEffect(() => {
        let fetchData = async () => {
            try {
                const res = await api.heatmapData();
                console.log("data for heatmap: ", res.data);
                const rawData = res.data;
                const formattedData = rawData.map((item) => ({
                    date: item._id,
                    count: item.count,
                }));

                setValue(formattedData);
            } catch (e) {
                console.log("Error fetching heatmap data: ", e)
            }
        }

        fetchData();

    }, [])
    const [selected, setSelected] = useState('')
    return (
        <>
            <div className='h-[87%] w-full flex flex-col gap-2'>
                <div className='h-10 relative w-full flex justify-between items-center'>
                    <span className="text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                        Focus Time Over Time
                    </span>
                </div>
                <div className="w-full h-full border border-neutral-800 rounded-xl p-2 bg-neutral-900/10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1] // Premium, smooth cubic-bezier ease-out curve
                        }}
                        className="w-full"
                    >
                        <HeatMap
                            className="w-full"
                            value={value}
                            width={600}
                            style={{ color: '#99a1af', '--rhm-rect-active': 'red' }}
                            startDate={new Date('2026/01/01')}
                            panelColors={['#212121', '#e4b293', '#d48462', '#c2533a', '#ad001d', '#6c0012']}
                            rectRender={(props, data) => {
                                const dynamicOpacity = selected !== ''
                                    ? (data.date === selected ? 1 : 0.45)
                                    : props.opacity;

                                return (
                                        <rect
                                            {...props}
                                            opacity={dynamicOpacity} 
                                            onClick={() => {
                                                setSelected(data.date === selected ? '' : data.date);
                                            }}
                                            content={`count: ${data.count || 0}`}
                                            placement={top}
                                        />
                                );
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default WeeklyHeatmap