'use client'
import api from "@/services/api";
import React, { useState } from 'react'
import { motion } from "motion/react";
import { LampContainer } from "../../components/ui/Lamp";

const page = () => {
    const [form, setform] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setform(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.signup(form)
            console.log(res)


        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>


            <div className="flex h-screen bg-[#000306]">
                <div className="border-2 border-dashed border-white h-full w-1/2">
                    <div className="h-full w-full bg-colour">

                        <LampContainer>
                            {/* <motion.h1
                                initial={{ opacity: 0.5, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-7xl"
                            >
                                Strava
                            </motion.h1> */}
                            <motion.div
                                initial={{ opacity: 0.5, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className=" w-100 ">

                                <div className="flex">
                                    <div >
                                        <svg width="100" height="100" viewBox="0 0 1 00 100" fill="none" xmlns="http://www.w3.or g/2000/svg">
                                            <path d="M20 80 L45 55 H55 L80 30" stroke="#3882F6" stroke-width="12" stroke-linecap="butt" stroke-linejoin="miter" />
                                            <path d="M20 60 L45 35 H55 L80 10" stroke="#3882F6" stroke-width="12" stroke-opacity="0.3" stroke-linecap="butt" stroke-linejoin="miter" />
                                            <rect x="42" y="52" width="6" height="6" f ill="#3882F6" />
                                            <rect x="52" y="32" width="6" height="6" f il1="#3882F6" />
                                        </svg>
                                    </div>
                                    <div className="text-center font-semibold text-3xl text-[#DEDDDF] m-2 mb-4"> Strava
                                    </div>
                                </div>

                                <motion.div

                                    className="px-2">
                                    <p className="text-center  text-4xl text-[#FFFFFF] mb-4">Get Started with Us</p>
                                    <p className="text-center text-2xl text-[#AFAFAF]">Complete these easy steps to register your account</p>
                                </motion.div>

                                <div className="px-6 mt-2 flex flex-wrap gap-2 ">
                                    <motion.button
                                        whileHover={{ backgroundColor: "#ffffff", scale: 1.01 }}
                                        transition={{
                                            delay: 0,
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                        whileTap={{ scale: 1 }}
                                        className="bg-[#3F3F3F] cursor-pointer group h-15 w-full rounded-lg mt-2 flex px-5 items-center gap-3 ">
                                        <div className="bg-[#767676] h-6  w-6 rounded-full group-hover:bg-[#0B0B0B] text-center">
                                            <p className="text-[#DBDADA] group-hover:text-[#E1E1E1]">1</p>
                                        </div>
                                        <div className="text-[#DBDADA]  group-hover:text-[#000000] group-hover:font-semibold">
                                            Sign up your account
                                        </div>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ backgroundColor: "#ffffff", scale: 1.01 }}
                                        transition={{
                                            delay: 0,
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                        whileTap={{ scale: 1 }}
                                        className="bg-[#3F3F3F] cursor-pointer group h-15 w-full rounded-lg mt-2 flex px-5 items-center gap-3 ">
                                        <div className="bg-[#767676] h-6  w-6 rounded-full group-hover:bg-[#0B0B0B] text-center">
                                            <p className="text-[#DBDADA] group-hover:text-[#E1E1E1]">2</p>
                                        </div>
                                        <div className="text-[#DBDADA]  group-hover:text-[#000000] group-hover:font-semibold">
                                            Answer some easy questions
                                        </div>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ backgroundColor: "#ffffff", scale: 1.01 }}
                                        transition={{
                                            delay: 0,
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                        whileTap={{ scale: 1 }}
                                        className="bg-[#3F3F3F] cursor-pointer group h-15 w-full rounded-lg mt-2 flex px-5 items-center gap-3 ">
                                        <div className="bg-[#767676] h-6  w-6 rounded-full group-hover:bg-[#0B0B0B] text-center">
                                            <p className="text-[#DBDADA] group-hover:text-[#E1E1E1]">3</p>
                                        </div>
                                        <div className="text-[#DBDADA]  group-hover:text-[#000000] group-hover:font-semibold">
                                            Set up you profile
                                        </div>
                                    </motion.button>



                                </div>
                            </motion.div>
                        </LampContainer>
                    </div>
                </div>
                <div className="border-2 border-dashed border-white h-full w-1/2"></div>

            </div>
            {/* <form action="" onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder='Email' value={form.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-2 " />
                            <input type="text" name="username" placeholder='Username' value={form.username} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-2" />
                            <input type="password" name="password" placeholder='Password' value={form.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mt-2" />
                            <div className="flex justify-center">
                                <button className="mt-2 px-4 py-2 border-2 rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form> */}
        </>
    )
}

export default page