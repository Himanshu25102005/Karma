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
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = ["Features", "How it Works", "Compare", "FAQ"];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
    relative z-50
    flex w-full
    min-h-20
    items-center
    justify-between
    gap-2
    px-5
    py-3
    md:min-h-[88px]
    md:px-6
    md:py-4
    md:justify-evenly
    transition-all duration-500
    ${
      isScrolled
        ? "border-b border-white/10 bg-[#0F0F0E]/70 backdrop-blur-md"
        : "border-b border-transparent bg-transparent"
    }
  `}
      >
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`
          flex
          w-40
          items-center
          justify-center
          text-white 
          text-2xl
          leading-none
          md:w-44
          md:text-4xl
          ${playwrite_BE_WAL.className}
        `}
        >
          कARMA:
        </motion.div>

        {/* ================= DESKTOP NAV ================= */}
        <div
          className="hidden md:flex h-full justify-evenly gap-1 items-center relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {["Features", "How it Works", "Compare", "FAQ", "Sign In"].map(
            (label, i) => (
              <button
                key={label}
                onMouseEnter={() => setHoveredIndex(i)}
                className={`relative w-40 h-full text-[#c4c1bc] text-xl cursor-pointer transition-colors duration-300 hover:text-white rounded-xl ${inter.className}`}
              >
                {hoveredIndex === i && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-xl "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            )
          )}

          <div className="h-[80%] w-px bg-white/50 mx-1" />

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`group relative isolate overflow-hidden h-full ml-5 cursor-pointer rounded-2xl bg-[#f3db07] px-5 text-xl font-semibold text-[#050505] shadow-[0_6px_20px_rgba(243,219,7,0.15)] transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(243,219,7,0.35)] ${inter.className}`}
          >
            {/* diagonal sweep */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute -bottom-[80%] -left-[80%]
                h-[260%] w-[260%] rotate-45 scale-0
                bg-white
                transition-transform duration-500
                ease-[cubic-bezier(0.65,0,0.35,1)]
                group-hover:scale-100
              "
            />
            <span className="relative z-10 transition-colors duration-300">
              Start Free
            </span>
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
      </motion.div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 h-dvh w-full bg-[#08080c] md:hidden"
          >
            {/* MENU CONTENT */}
            <div className="h-full w-full px-5 pt-28 pb-8 flex flex-col">
              {/* NAVIGATION */}
              <div className="flex flex-col">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      delay: 0.1 + index * 0.07,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative w-full overflow-hidden border-b border-white/10 py-6 text-left text-2xl font-medium text-[#d6d3ce] transition-colors duration-300 hover:text-white ${inter.className}`}
                  >
                    {/* left-to-right underline sweep */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white/40 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                    />
                    <span className="flex items-center justify-between">
                      {item}
                      <motion.span
                        className="text-lg text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70"
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* SPACER */}
              <div className="flex-1" />

              {/* AUTH AREA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                {/* SIGN IN */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className={`h-14 w-full rounded-full border border-white/20 text-base font-medium text-white transition-colors duration-300 hover:bg-white/5 ${inter.className}`}
                >
                  Sign In
                </motion.button>

                {/* START FREE */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{
                    boxShadow: "0 8px 30px rgba(243,219,7,0.3)",
                  }}
                  className={`h-14 w-full rounded-full bg-[#f3db07] text-base font-semibold text-[#050505] shadow-[0_6px_25px_rgba(243,219,7,0.15)] ${inter.className}`}
                >
                  Start Free
                </motion.button>
              </motion.div>

              {/* SMALL FOOTER TEXT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className={`mt-5 text-center text-xs tracking-[0.2em] text-white/25 uppercase ${inter.className}`}
              >
                Focus · Consistency · Progress
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;