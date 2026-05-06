'use client'
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Card from '@/components/ui/Card';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';



const Testpage = () => {

    return (
        <>
            <div className={cn(GeistSans.className, "[perspective::1000px] [transform-style:preserve-3d  ]   min-h-screen pt-16 flex justify-center items-center")}>
                <Card />
            </div>
        </>
    )
}

export default Testpage