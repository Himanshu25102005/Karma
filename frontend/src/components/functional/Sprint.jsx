'use client'
import api from "@/services/api";
import React from 'react'
import axios from 'axios'
const Sprint = ({tasks}) => {

 const tasks = api.getAllTask(projectId);

    return (
        <div className='border-b-1 h-1/2 '>

            {/* Heading */}
            <div className='text-left p-1 mb-2 font-semibold text-4xl'>
                Today's Sprint
            </div>

            {/* Tasks Section */}
            <div className="flex px-10">

                {/* LEFT SIDE (continuous line system) */}
                <div className="flex flex-col items-center mr-4 ">

                    {/* item 1 */}
                    <div className="h-5 w-5 bg-white rounded-full"></div>
                    <div className="w-1 h-10 bg-white"></div>


                </div>

                {/* RIGHT SIDE (tasks with gap) */}
                <div className="flex flex-col gap-5 w-full ">

                    <div className="border-2 border-white rounded-2xl p-2 flex gap-5 items-center">
                        <button className="h-10 w-10 border-2 border-white rounded-xl"></button>
                        <p className="text-2xl">Task 1</p>
                    </div>
=

                </div>

            </div>

        </div>
    )
}

export default Sprint