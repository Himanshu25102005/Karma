"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-5 sm:px-6 md:px-8 border-b border-white/[0.08] bg-black/60 backdrop-blur-sm select-none"
    >
      {/* LEFT: कARMA Logo / Wordmark */}
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="group flex items-center gap-1.5 focus:outline-none cursor-target"
          aria-label="Go to Dashboard"
        >
          <span className="text-base sm:text-lg font-semibold tracking-tight text-white transition-opacity duration-200 group-hover:opacity-85">
            <span className="text-[#D9A928] font-medium mr-0.5">क</span>ARMA
          </span>
        </Link>
      </div>

      {/* CENTER: FOCUS SESSION (Desktop & Tablet, hidden on mobile) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="text-[10px] sm:text-[11px] font-light tracking-[0.22em] text-white/45 uppercase">
          FOCUS SESSION
        </span>
      </div>

      {/* RIGHT: ← Dashboard Navigation */}
      <div className="flex items-center">
        <Link
          href="/dashboard"
          className="group flex items-center gap-1.5 text-xs sm:text-sm font-normal text-white/50 hover:text-white transition-colors duration-200 cursor-target focus:outline-none"
        >
          <span className="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1">
            ←
          </span>
          <span className="transition-colors duration-200">
            Dashboard
          </span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;