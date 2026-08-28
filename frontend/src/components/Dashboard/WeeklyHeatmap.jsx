'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
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


const WeeklyHeatmap = ({profileRender}) => {
    // const currentStreak = useSessionStore((state) => state.currentStreak);
    const [value, setValue] = useState([]);
    const containerRef = useRef(null);
    const [heatmapWidth, setHeatmapWidth] = useState(600);

    const updateHeatmapWidth = useCallback(() => {
        if (containerRef.current) {
            const availableWidth = containerRef.current.clientWidth - 16;
            setHeatmapWidth(Math.max(280, availableWidth));
        }
    }, []);

    useEffect(() => {
        updateHeatmapWidth();
        const observer = new ResizeObserver(updateHeatmapWidth);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, [updateHeatmapWidth]);
    useEffect(() => {
        let fetchData = async () => {
            try {
                const res = await api.heatmapData();
                // console.log("data for heatmap: ", res.data);
                const rawData = res.data;
                const formattedData = rawData.map((item) => ({
                    date: item._id,
                    count: item.count,
                }));

                setValue(formattedData);
                // console.log("Current Streak Data: ", currentStreak)
            } catch (e) {
                console.log("Error fetching heatmap data: ", e)
            }
        }

        fetchData();

    }, [])
    const [selected, setSelected] = useState('')
    return (
        <>
            <div className='h-full w-full min-w-0 flex flex-col gap-2'>
                {profileRender
                    ?
                    <div className='min-h-0 '>
                    </div>
                    :
                    <div className='min-h-10 relative w-full flex justify-between items-center'>
                        <span className="text-lg sm:text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                            Focus Time Over Time
                        </span>
                    </div>}
                <div ref={containerRef} className="w-full min-w-0 flex-1 border border-neutral-800 rounded-xl p-2 sm:p-3 bg-neutral-900/10 overflow-x-auto overflow-y-hidden flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="w-full min-w-0"
                    >
                        <HeatMap
                            className="w-full max-w-full"
                            value={value}
                            width={heatmapWidth}
                            style={{ color: '#99a1af', '--rhm-rect-active': 'red' }}
                            startDate={new Date('2026/01/01')}
                            panelColors={['#212121', '#e4b293', '#d48462', '#c2533a', '#ad001d', '#6c0012']}
                            rectRender={(props, data) => {
                                const { key, ...rectProps } = props;

                                const dynamicOpacity =
                                    selected !== ""
                                        ? data.date === selected
                                            ? 1
                                            : 0.45
                                        : props.opacity;

                                return (
                                    <rect
                                        {...rectProps}
                                        opacity={dynamicOpacity}
                                        onClick={() => {
                                            setSelected(data.date === selected ? "" : data.date);
                                        }}
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