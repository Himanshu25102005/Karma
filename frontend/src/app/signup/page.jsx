 'use client'
import api from "@/services/api";
import { useAnimation } from "framer-motion";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion } from "motion/react";
import { LampContainer } from "../../components/ui/Lamp";
import axios from "axios";

const page = () => {
    const [form, setform] = useState({
        email: "",
        username: "",
        password: "",
        name: "",
    });

    const router = useRouter();

    const controls = useAnimation(); // This defines 'controls'

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
            console.log(res);/* 
            setform(initialState); */

            if (res.data) {
                await controls.start({
                    x: [0, -10, 10, -10, 10, 0], // A little "shake" or "success" wiggle
                    transition: { duration: 0.5 }
                });

                // 2. Then redirect
                router.push('/session');
            }
            else {
                // ERROR: Show a toast or error message
                console.error("Signup failed");
            }

        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <div className="flex h-screen bg-[#000306]">
                <div className=" h-full hidden lg:flex w-1/2">
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

                                <div className="flex justify-center items-center gap-3 mb-5 p-4 pr-12">

                                    <svg
                                        className="h-10 w-10"
                                        viewBox="0 0 100 100"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20 80 L45 55 H55 L80 30" stroke="#3882F6" strokeWidth="12" />
                                        <path d="M20 60 L45 35 H55 L80 10" stroke="#3882F6" strokeOpacity="0.3" strokeWidth="12" />
                                    </svg>

                                    <span className="font-semibold text-4xl bg-gradient-to-br from-slate-200 to-slate-500 bg-clip-text text-transparent">
                                        Strava
                                    </span>
                                </div>

                                <motion.div

                                    className="px-2">
                                    <p className="text-center  text-4xl text-[#FFFFFF] mb-4">Get Started with Us</p>
                                    <p className="text-center text-xl text-[#AFAFAF]">Complete these easy steps to register your account</p>
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
                                        className="bg-[#ffffff] cursor-not-allowed group h-15 w-full rounded-lg mt-2 flex px-5 items-center gap-3 ">
                                        <div className="bg-[#0B0B0B] h-6  w-6 rounded-full group-hover:bg-[#0B0B0B] text-center">
                                            <p className="text-[#DBDADA]  group-hover:text-[#E1E1E1]">1</p>
                                        </div>
                                        <div className="text-[#000000] font-semibold group-hover:text-[#000000] group-hover:font-semibold">
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
                <motion.div
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="border-nonemotion. border-dashed border-white h-full w-1/2 flex justify-center items-center">
                    <div className=" h-200 w-200 ">
                        {/* Sign Up Account Div */}
                        <div className=" text-center flex flex-wrap gap-2">
                            <div className="text-[#FAFAFA] w-full font-bold text-3xl">Sign Up Account</div>
                            <div className="text-[#BCBCBC] text-md w-full ">Enter your personal data to create your account</div>
                        </div>

                        {/* OAuth Buttons */}
                        <div className="w-full  justify-center items-center py-2 px-4 flex gap-14 pt-8">

                            <motion.a
                            href="http://localhost:5000/auth/google"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    delay: 0.1,
                                    duration: 0.2,
                                    ease: "easeInOut",
                                }}
                                whileTap={{ scale: 1 }}
                                className="w-1/4 h-15 text-[#FDFDFD] rounded-xl border-2 border-[#1E1F1F] flex gap-2 justify-center items-center cursor-pointer  transition-colors">
                                {/* Add dimensions to this div or the SVG directly */}
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="h-6 w-6" // This makes it visible!
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <div className="font-medium">Google</div>
                            </motion.a>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                    delay: 0.1,
                                    duration: 0.2,
                                    ease: "easeInOut",
                                }}
                                whileTap={{ scale: 1 }}
                                className="w-1/4 h-15 text-[#FDFDFD] rounded-xl border-2 border-[#1E1F1F] flex gap-2 justify-center items-center cursor-pointer transition-colors">
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="h-6 w-6" // This handles the scaling perfectly
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                            fill="currentColor" // This makes it match your text color!
                                        />
                                    </svg>
                                </div>
                                <div className="font-medium">GitHub</div>
                            </motion.button>
                        </div>

                        {/* Or Line */}
                        <div className="flex items-center justify-center gap-4 w-full h-10">
                            <div className="h-[1px] w-1/4 bg-[#313131]"></div>
                            <span className="text-[#888888] text-sm">or</span>
                            <div className="h-[1px] w-1/4 bg-[#313131]"></div>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            {/* Input Form */}

                            <motion.div animate={controls} className="text-white w-full">

                                <div className="flex flex-wrap justify-center gap-2 p-5  ">
                                    <div className=" flex flex-col">
                                        <label className="text-[#DFDFDF] font-bold mb-4">
                                            Name
                                        </label>
                                        <div className="pr-2">
                                            <input className="bg-[#313131] p-3  rounded-xl " placeholder="eg. Ram"
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange} /></div>
                                    </div>
                                    <div className=" flex flex-col">
                                        <label className="text-[#DFDFDF] pl-2 font-bold mb-4">
                                            Username
                                        </label>
                                        <div className="pl-2">
                                            <input className="bg-[#313131] p-3 rounded-xl " placeholder="eg. Ram_512GB"
                                                type="text"
                                                name="username"
                                                value={form.username}
                                                onChange={handleChange} /></div>
                                    </div>
                                </div>

                                <div className=" flex w-full px-35 py-5">
                                    <div className="flex flex-col flex-1 px-8">
                                        <label className="text-[#DFDFDF] font-bold mb-4">Email</label>
                                        <input
                                            className="bg-[#313131] p-3 w-full rounded-xl text-white"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="eg. ram@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className=" flex w-full px-35 py-5">
                                    <div className="flex flex-col flex-1 px-8">
                                        <label className="text-[#DFDFDF] font-bold mb-2">Password</label>
                                        <input
                                            className="bg-[#313131] p-3 w-full rounded-xl text-white"
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </div>

                                <div className="text-[#DFDFDF] px-43 pt-2">
                                    <div>Must be at least 8 characters long</div>
                                </div>
                            </motion.div>

                            <div className="w-full mt-2 px-42 py-5 ">
                                <motion.button
                                    animate={controls}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{
                                        delay: 0.1,
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                    type="submit"
                                    whileTap={{ scale: 1 }}
                                    className="border-2 rounded-xl font-bold  text-[#565656] bg-[#FFFFFF] p-3 w-full border-white hover:text-[#000000] cursor-pointer">
                                    Sign Up
                                </motion.button>
                            </div>
                        </form>

                        <div className="text-center p-3">
                            <div className="text-center p-3">
                                <div className="text-[#6E6E70]">
                                    Already have an account? {" "}
                                    <motion.a
                                    href="http://localhost:3000/login"
                                        className="relative text-[#E4E4E4] cursor-pointer inline-block"
                                        whileHover="hover"
                                    >
                                        Log in
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[1px] bg-[#E4E4E4]"
                                            initial={{ width: 0 }}
                                            variants={{
                                                hover: { width: "100%" }
                                            }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div >
            </div >
        </>
    )

}

export default page