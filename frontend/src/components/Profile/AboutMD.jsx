'use client'
import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Rowdies } from 'next/font/google';
import { easeInOut, motion } from 'framer-motion';
import { IconEdit } from '@tabler/icons-react';

const AboutMD = () => {
    return (
        <>
            <div className='h-full w-full border border-neutral-700 rounded-lg flex flex-col gap-1 md:gap-2'>

                {/* Headline */}
                <div className='h-11 md:h-15 w-full border-b border-neutral-500 flex flex-row justify-between items-center p-3 font-mono'>
                    <span className='text-neutral-200 text-lg md:text-xl '>
                        S-स्वरूप
                    </span>
                    <div className='flex flex-row justify-center items-center'>
                        <span className='text-neutral-400 text-md md:text-lg border-r border-neutral-400 px-2'>About.md</span>
                        <button className='text-neutral-300 px-1'>
                            <IconEdit className='h-5 w-5 md:h-6 md:w-6'/>
                        </button>
                    </div>
                </div>

                <div className='flex-1 border border-neutral-300 overflow-y-auto'></div>

            </div>
        </>
    )
}

export default AboutMD