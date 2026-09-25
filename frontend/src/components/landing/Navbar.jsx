"use client";

import React, { useEffect, useState } from "react";
import Hamburger from "hamburger-react";

import { Inter } from "next/font/google";
import { Playwrite_BE_WAL } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
});

const playwrite_BE_WAL = Playwrite_BE_WAL({
  subsets: ["latin"],
});

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    "Features",
    "How it Works",
    "Compare",
    "FAQ",
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="relative z-50 w-full mt-5 h-18 px-5 py-2 md:p-2 flex justify-between md:justify-evenly items-center gap-2">
        
        {/* LOGO */}
        <div
          className={`w-40 h-full text-white text-2xl flex justify-center items-center md:text-4xl ${playwrite_BE_WAL.className}`}
        >
          कARMA:
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex h-full justify-evenly gap-2 items-center">
          
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
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer transition-colors hover:bg-white/5 hover:text-white rounded-xl ${inter.className}`}
          >
            FAQ
          </button>

          <div className="h-[80%] w-px bg-white/50" />

          <button
            className={`w-40 h-full text-[#c4c1bc] text-xl cursor-pointer transition-colors hover:bg-white/5 hover:text-white rounded-xl ${inter.className}`}
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

        {/* ================= MOBILE HAMBURGER ================= */}
        <div className="block md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={30}
            duration={0.5}
            color="#F0E6D6"
          />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 h-dvh w-full bg-[#08080c] md:hidden"
          >
            {/* MENU CONTENT */}
            <div className="h-full w-full px-5 pt-28 pb-8 flex flex-col">
              
              {/* NAVIGATION */}
              <div className="flex flex-col">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group w-full border-b border-white/10 py-6 text-left text-2xl font-medium text-[#d6d3ce] transition-colors hover:text-white ${inter.className}`}
                  >
                    <span className="flex items-center justify-between">
                      {item}

                      <span className="text-lg text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white/70">
                        →
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* SPACER */}
              <div className="flex-1" />

              {/* AUTH AREA */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.4,
                }}
                className="flex flex-col gap-3"
              >
                {/* SIGN IN */}
                <button
                  className={`h-14 w-full rounded-full border border-white/20 text-base font-medium text-white transition-colors hover:bg-white/5 ${inter.className}`}
                >
                  Sign In
                </button>

                {/* START FREE */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className={`h-14 w-full rounded-full bg-[#f3db07] text-base font-semibold text-[#050505] shadow-[0_6px_25px_rgba(243,219,7,0.15)] ${inter.className}`}
                >
                  Start Free
                </motion.button>
              </motion.div>

              {/* SMALL FOOTER TEXT */}
              <div
                className={`mt-5 text-center text-xs tracking-[0.2em] text-white/25 uppercase ${inter.className}`}
              >
                Focus · Consistency · Progress
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;