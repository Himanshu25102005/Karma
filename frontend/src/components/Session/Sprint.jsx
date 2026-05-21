'use client'
import api from "@/services/api";
import { useProjectStore } from '../../store/useProjectStore'
import { useAnimation, motion } from "framer-motion";
import React, { useState, useEffect, Fragment } from 'react'
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import useRefreshStore from "@/store/useRefreshStore";

const Sprint = ({ }) => {
    const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);
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
            triggerRefresh();

        } catch (error) {
            console.log(error)
        }
    }

    const addTaskOnChange = (e) => {
        const description = e.target.value;
        triggerRefresh();
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
            triggerRefresh();
        } catch (err) {
            console.log(err);
        }
    };

    const delTask = async (taskId) => {
        const res = await api.delTask(taskId, currentProjectId);
        console.log(res.data);

        setTasks((prevTasks) => {
            return prevTasks.filter((task) => task._id !== taskId);
        });
        triggerRefresh();
    }

    useEffect(() => {

        if (!currentProjectId) return;

        const getAllTasks = async () => {
            const res = await api.getAllTask(currentProjectId);
            setTasks(res.data.tasks.tasks);
        }

        getAllTasks();
    }, [currentProjectId])






    return (
        <div className='max-h-1/2'>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-between px-4 py-3 mb-3"
            >

                {/* LEFT: Title */}
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold tracking-tight text-white">
                        Today’s Sprint
                    </span>

                    {/* subtle underline */}
                    <div className="mt-1 h-[2px] w-10 bg-white/20 rounded-full" />
                </div>

                {/* OPTIONAL RIGHT (future use) */}
                <div className="text-sm text-gray-400">{tasks.length} Tasks</div>

            </motion.div>

            {/* Tasks Section */}
            {/*  <div className="flex px-10 h-full py-13 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]"> */}
            <div className="flex px-10 h-[450px] py-10 bg-white/[0.01] w-[97%] rounded-2xl">


                {/* LEFT SIDE (continuous line system) */}
                <div className="flex flex-col items-center mr-4 relative">

                    {/* Vertical base line */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-white/10" />

                    {tasks?.map((task, index) => (
                        <Fragment key={task._id}>

                            {/* DOT */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: index * 0.08,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 18
                                }}
                                className={`relative z-10 h-5 w-5 rounded-full flex items-center justify-center
                            ${task.isCompleted
                                        ? "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                        : "bg-white/80"}
                            `}
                            >
                                {/* inner pulse (only if completed) */}
                                {task.isCompleted && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0.8, 1.2, 1] }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute h-full w-full rounded-full bg-green-400/30"
                                    />
                                )}
                            </motion.div>

                            {/* LINE */}
                            {index !== tasks.length - 1 && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 40 }}
                                    transition={{
                                        delay: index * 0.08 + 0.05,
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                    className={`w-[2px]
                                  ${task.isCompleted
                                            ? "bg-gradient-to-b from-green-400 to-yellow-400"
                                            : "bg-white/20"}
                                    `}
                                />
                            )}

                        </Fragment>
                    ))}

                </div>

                {/* RIGHT SIDE (tasks with gap) */}
                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-5 relative 
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-neutral-800
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700
                    ">
                        {(Array.isArray(tasks) ? tasks : []).map((task, index) => (

                            <motion.div
                                key={task._id}

                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.06,
                                    duration: 0.25,
                                    ease: "easeOut"
                                }}

                                className={`group border rounded-2xl p-3 flex gap-5 items-center transition-all duration-200
                                ${task.isCompleted
                                        ? "border-white/10 bg-white/[0.03]"
                                        : "border-white/20 bg-white/[0.04] hover:bg-white/[0.07]"}
                                `}
                            >

                                {/* CHECK BUTTON */}
                                <motion.button
                                    onClick={() => completeTask(task._id)}

                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        backgroundColor: task.isCompleted ? "#0f172a" : "transparent"
                                    }}
                                    transition={{ duration: 0.2 }}

                                    className={`h-10 w-10 cursor-target flex items-center justify-center rounded-xl border-2 transition-all duration-200
                                    ${task.isCompleted
                                            ? "border-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                                            : "border-white/30 group-hover:border-white/50"}
                                    `}
                                >
                                    {task.isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 15 }}
                                            className="h-3 w-3 rounded-full bg-green-400"
                                        />
                                    )}
                                </motion.button>

                                {/* TASK TEXT */}
                                <motion.p
                                    layout
                                    className={`text-xl transition-all duration-200
                                     ${task.isCompleted
                                            ? "line-through opacity-25 text-gray-400"
                                            : "text-white"}
                                     `}
                                >
                                    {task.description}
                                </motion.p>

                                <motion.div
                                    className="absolute h-13 w-13 right-5 border border-neutral-800 rounded-full flex flex-row justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-target"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                                        whileTap={{ scale: 0.9, rotate: -5 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                        className="h-7 w-7 flex justify-center items-center "
                                    >
                                        <IconTrash
                                            className="h-full w-full text-red-600 transition-colors"
                                            onClick={() => delTask(task._id)}
                                        />
                                    </motion.div>
                                </motion.div>

                            </motion.div>
                        ))}
                    </div>
                    {/* ADD TASK */}
                    <motion.form
                        onSubmit={addNewTask}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}

                        className="mt-4 border border-white/20 rounded-2xl p-3 flex gap-5 items-center bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
                    >
                        <button
                            type="submit"
                            className="h-10 w-10 cursor-target flex justify-center items-center rounded-xl hover:bg-white/10 transition"
                        >
                            <IconPlus size={26} />
                        </button>

                        <input
                            placeholder="Add Task"
                            onChange={addTaskOnChange}
                            name="description"
                            value={newTask}
                            className="text-xl bg-transparent outline-none placeholder:text-gray-500 w-full"
                        />
                    </motion.form>

                </div>

            </div>

        </div>
    )
}

export default Sprint