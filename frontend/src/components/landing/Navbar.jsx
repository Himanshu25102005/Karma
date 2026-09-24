"use client";
import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
});
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="w-full mt-5 h-18 px-5 py-2 md:p-2 flex justify-between md:justify-evenly items-center gap-2">
        <div className={`w-40 h-full text-white text-5xl ${inter.className}`}>
          कARMA:
        </div>
        <div className="hidden md:flex h-full justify-evenly gap-2 items-center     ">
          <button
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer transition-colors hover:bg-white/5 hover:text-white rounded-xl ${inter.className}`}
          >
            Features
          </button>
          <button
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer transition-colors hover:bg-white/5 hover:text-white rounded-xl ${inter.className}`}
          >
            How it Works
          </button>
          <button
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer border-neutral-400 transition-colors hover:bg-white/5 hover:text-white rounded-xl  ${inter.className}`}
          >
            FAQ
          </button>
          <div className="h-[80%] w-px bg-white/50"></div>
          <button
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer border-neutral-400 transition-colors hover:bg-white/5 hover:text-white rounded-xl ${inter.className}`}
          >
            Sign In
          </button>
          <motion.button
            className={`h-full ml-5 cursor-pointer rounded-2xl bg-[#f3db07] px-5 text-xl font-semibold text-[#050505] shadow-[0_6px_20px_rgba(243,219,7,0.15)] ${inter.className}`}
            whileHover={{
              y: -2,
              scale: 1.02,
              boxShadow: "0 10px 28px rgba(243, 219, 7, 0.22)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            Start Free
          </motion.button>
        </div>
        <div className="block md:hidden ">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={40}
            duration={0.5}
            color="#F0E6D6"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
