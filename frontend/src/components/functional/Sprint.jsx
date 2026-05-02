'use client'
import api from "@/services/api";
import { useProjectStore } from '../../store/useProjectStore'
import { useParams } from 'next/navigation';
import React, { useState, useEffect, Fragment } from 'react'
import { IconPlus, IconCheck } from "@tabler/icons-react";
import { div } from "framer-motion/client";
const Sprint = ({ }) => {

    const currentProjectId = useProjectStore((state) => state.currentProjectId);
    const [newTask, setNewTasks] = useState('');
    const [tasks, setTasks] = useState([]);

    const addNewTask = async (e) => {
        e.preventDefault();
        try {
            if (!newTask.trim()) return;

            const res = await api.addNewTask(currentProjectId, { description: newTask });

            if (!res.data.success) {
                console.log("Cannot Add Task")
            }

            if (res.data.success) {
                setTasks((prev) => [...prev, res.data.task]);
            }

            setNewTasks('');

        } catch (error) {
            console.log(error)
        }
    }

    const addTaskOnChange = (e) => {
        const description = e.target.value;

        setNewTasks(description)
    }


    const completeTask = async (taskId) => {
        try {
            const res = await api.completeTask(taskId);

            if (res.data.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) => {
                        if (task._id === taskId) {
                            return { ...task, isCompleted: true };
                        }
                        return task;
                    })
                );
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {

        if (!currentProjectId) return;

        const getAllTasks = async () => {
            const res = await api.getAllTask(currentProjectId);
            setTasks(res.data.tasks.tasks);
        }

        getAllTasks();
    }, [currentProjectId])




    return (
        <div className='h-1/2 '>

            {/* Heading */}
            <div className='text-left p-3 mb-2 font-semibold text-4xl'>
                Today&apos;s Sprint
            </div>

            {/* Tasks Section */}
            <div className="flex px-10 border-2 border-solid rounded-xl h-full px-2 py-13">


                {/* LEFT SIDE (continuous line system) */}
                <div className="flex flex-col items-center mr-4 ">

                    {tasks?.map((task) => (
                        <Fragment key={task._id}>
                            <div className={`h-5 w-5 ${task.isCompleted ? 'bg-green-500' : 'bg-white'} rounded-full`}></div>
                            <div className={`w-1 ${task.isCompleted ? 'bg-yellow-500' : 'bg-white'} h-10`}></div>
                        </Fragment>
                    ))}


                </div>

                {/* RIGHT SIDE (tasks with gap) */}
                <div className="flex flex-col gap-5 w-full ">

                    {tasks?.map((task) => (
                        <div key={task._id} className={`border-2 border-white rounded-2xl p-2  flex gap-5 items-center`}>
                            <button onClick={() => { completeTask(task._id) }} className={`${task.isCompleted ? 'bg-gray-900' : 'border-transparent'} h-10 cursor-target w-10 border-2 border-white rounded-xl `}>
                                {task.isCompleted?
                                <IconCheck color="#DFDFDF" className='bg-white/5 rounded-md' size={25} />
                            :
                            <p/>}
                            </button>
                            <p className={`text-2xl ${task.isCompleted ? 'line-through opacity-50' : ''}`}>{task.description}</p>
                        </div>
                    ))}

                    {/* Add Task Div */}
                    <form action="" onSubmit={addNewTask} className="border-2 border-white rounded-2xl p-2 flex gap-5 items-center">
                        <button type="submit" className="h-10 cursor-pointer w-10  flex justify-center items-center rounded-xl cursor-target">
                            <IconPlus color="#DFDFDF" size={32} /></button>
                        <input placeholder="Add Task" onChange={addTaskOnChange} name="description" value={newTask} className="text-2xl" />
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Sprint