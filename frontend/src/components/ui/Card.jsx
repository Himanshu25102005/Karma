import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import Image from "next/image"
import { Icon24Hours, IconAccessPointOff, IconAdjustments, IconMessage, IconPlus, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'


const Card = () => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        exit={{
                            opacity: 0,
                            scale: 0.98,
                            filter: "blur(10px)"
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                        initial={{
                            opacity:1,
                            scale:1,
                            filter:"blur(0px)"
                        }}
                        className={cn(
                            'w-72 min-h-[25rem] h-[32rem] rounded-xl',
                            "shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]",
                            "p-4 flex flex-col"
                        )}>
                        <h2 className='font-bold text-[10px]'>New Card Component</h2>
                        <p className='text-neutral-600 mt-2 text-[10px]'>
                            A collection of beutiful UI card components, lets get on with it.
                        </p>
                        <div className='flex items-center justify-center'>
                            <button onClick={() => setOpen(false)} className='flex items-center gap-1 text-[10px] mt-4 rounded-md shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)] px-2 py-1'>
                                <Image className='h-5 w-5' width={50} height={50} alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZaUzw2pmQvD8BFibZ8F9fcoyJGGjYAxe6NA&s" />
                                Karma
                                <IconX className='h-3 w-3' />
                            </button>
                        </div>
                        <div className='bg-gray-100 relative flex-1 mt-4 rounded-md border border-dashed border-neutral-200'>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.98,
                                    filter: "blur(10px)"
                                }}
                                whileHover={{
                                    opacity: 100,
                                    scale: 1.00,
                                    filter: "blur(0px)"
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    mass: 1
                                }}
                                className='absolute inset-0 h-full w-full bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-200'>
                                <div className='flex gap-2 p-4'>
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <IconMessage className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Aceternity UI Components
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            A collection of UI components.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4'>
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <Icon24Hours className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            24 hours delivery
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            Order and enjoy in any phase of the day.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4'>
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <IconAccessPointOff className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Works Offline
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            You just order, we have the internet.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4'>
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <IconAdjustments className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Custmised Choice
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            Select food items as per your choice.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex gap-2 p-4 flex items-center justify-center'>
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <IconPlus className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Create Project
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Card