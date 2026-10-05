"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Inter, Playwrite_BE_WAL } from "next/font/google";

const playwrite_BE_WAL = Playwrite_BE_WAL({
  subsets: ["latin"],
});

export default function AuthBrandingPanel({ mode = "login" }) {
  const prefersReducedMotion = useReducedMotion();

  const isLogin = mode === "login";

  const title = isLogin ? "Welcome Back" : "Get Started with Us";
  const subtitle = isLogin
    ? "Sign in to continue your journey"
    : "Complete these easy steps to register your account";

  const steps = isLogin
    ? [
        {
          num: 1,
          title: "Verify your credentials",
          shortTitle: "Verify",
          active: true,
        },
        {
          num: 2,
          title: "Sync your latest activity",
          shortTitle: "Sync",
          active: false,
        },
        {
          num: 3,
          title: "Resume your progress",
          shortTitle: "Resume",
          active: false,
        },
      ]
    : [
        {
          num: 1,
          title: "Sign up your account",
          shortTitle: "Sign up",
          active: true,
        },
        {
          num: 2,
          title: "Start a Session",
          shortTitle: "Details",
          active: false,
        },
        {
          num: 3,
          title: "Set up your profile",
          shortTitle: "Profile",
          active: false,
        },
      ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#000306] border-b md:border-b-0 md:border-r border-white/[0.07] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 select-none">
      {/* ================= AMBIENT CYAN GLOW ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle top horizontal beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[1px]" />

        {/* Breathing ambient lamp glow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.16, 0.26, 0.16],
                  scale: [0.97, 1.03, 0.97],
                  y: [0, 6, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[440px] h-[180px] sm:h-[240px] lg:h-[280px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[60px] sm:blur-[80px]"
        />

        {/* Secondary deep navy glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 bg-blue-500/[0.06] rounded-full blur-[70px]" />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col justify-between h-full">
        {/* TOP: Brand Logo & Title */}
        <div className="flex flex-col items-center text-center">
          {/* Brand Logo & Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3 sm:mb-5"
          >
            <div className="relative flex items-center justify-center">
              {/* <svg
                className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 drop-shadow-[0_0_12px_rgba(56,130,246,0.35)]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 80 L45 55 H55 L80 30"
                  stroke="#3882F6"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 60 L45 35 H55 L80 10"
                  stroke="#3882F6"
                  strokeOpacity="0.35"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
            </div>
            <span className={`font-bold text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent ${playwrite_BE_WAL.className} pt-5`} >
              <span className="text-[#D9A928] mr-0.5">क</span>ARMA:
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1.5 sm:mb-2.5"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-sm lg:text-base text-slate-400 max-w-sm"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ================= NUMBERED ONBOARDING STEPS ================= */}

        {/* DESKTOP & TABLET: Vertical Stack of Step Cards */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col gap-2.5 lg:gap-3 w-full my-8"
        >
          {steps.map((step) => {
            if (step.active) {
              return (
                <motion.div
                  key={step.num}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white text-black h-12 lg:h-14 w-full rounded-xl px-4 flex items-center gap-3.5 shadow-[0_2px_12px_rgba(255,255,255,0.08)] cursor-default select-none"
                >
                  <div className="bg-[#0B0B0B] h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold leading-none">
                      {step.num}
                    </span>
                  </div>
                  <span className="font-semibold text-xs sm:text-sm lg:text-sm tracking-tight text-black truncate">
                    {step.title}
                  </span>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={step.num}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                        scale: 1.005,
                      }
                }
                transition={{ duration: 0.2 }}
                className="bg-[#12141A]/70 border border-white/[0.07] text-slate-300 h-12 lg:h-14 w-full rounded-xl px-4 flex items-center gap-3.5 transition-colors cursor-default select-none"
              >
                <div className="bg-white/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-slate-400 text-xs font-semibold leading-none">
                    {step.num}
                  </span>
                </div>
                <span className="text-xs sm:text-sm lg:text-sm tracking-tight text-slate-300 truncate">
                  {step.title}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* MOBILE (480px - 767px): Sleek Horizontal Stepper Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hidden sm:flex md:hidden items-center justify-center gap-2 w-full mt-4"
        >
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  step.active
                    ? "bg-white text-black shadow-sm"
                    : "bg-white/[0.04] border border-white/[0.08] text-slate-400"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step.active ? "bg-black text-white" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {step.num}
                </span>
                <span className="truncate max-w-[85px]">{step.shortTitle}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-[1px] w-3 bg-white/20 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* SMALL MOBILE (< 480px down to 320px): Ultra Compact Stepper Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex sm:hidden items-center justify-between w-full max-w-[280px] mx-auto mt-3 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold">
              1
            </span>
            <span className="text-[11px] text-slate-300 font-medium truncate max-w-[170px]">
              {steps[0].title}
            </span>
          </div>
          {/* Mini progress dots */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </motion.div>

        {/* BOTTOM: Subtle Developer Trust Badge (Desktop & Tablet only) */}
        <div className="hidden md:flex items-center justify-center pt-4 border-t border-white/[0.04]">
          <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase">
            Productivity Suite for High-Agency Developers
          </span>
        </div>
      </div>
    </div>
  );
}
