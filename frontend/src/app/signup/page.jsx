"use client";

import React, { useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/services/api";
import AuthBrandingPanel from "@/components/Auth/AuthBrandingPanel";

export default function SignupPage() {
  const [form, setform] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errorMessage) setErrorMessage("");
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await api.signup(form);

      if (res.data) {
        await controls.start({
          x: [0, -10, 10, -10, 10, 0], // Success wiggle / feedback
          transition: { duration: 0.5 },
        });

        // 2. Redirect to session
        router.push("/session");
      } else {
        console.error("Signup failed");
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (e) {
      console.error("Signup error:", e);
      setErrorMessage(
        e.response?.data?.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Staggered Entrance Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const loginUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
    : "/login";

  return (
    <div className="min-h-screen min-h-dvh w-full bg-[#000306] text-white flex flex-col md:flex-row relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* ================= LEFT BRANDING PANEL ================= */}
      {/* 
        Breakpoints:
        ≥ 1024px: Split screen (46%-48% width)
        768px-1023px: Compressed split screen (42% width)
        < 768px: Sits cleanly ABOVE the form with compact height
      */}
      <aside className="w-full md:w-[42%] lg:w-[46%] xl:w-[48%] md:h-screen md:sticky md:top-0 shrink-0">
        <AuthBrandingPanel mode="signup" />
      </aside>

      {/* ================= RIGHT AUTHENTICATION PANEL ================= */}
      <main className="w-full md:w-[58%] lg:w-[54%] xl:w-[52%] flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 xl:px-16 min-h-[calc(100dvh-180px)] md:min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] flex flex-col"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-5 sm:mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA]">
              Sign Up Account
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1.5">
              Enter your personal data to create your account
            </p>
          </motion.div>

          {/* OAuth Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full"
          >
            {/* Google OAuth Button */}
            <motion.a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              whileHover={prefersReducedMotion ? {} : { y: -1.5, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group h-11 sm:h-12 text-[#FDFDFD] rounded-xl border border-white/[0.09] bg-[#0E1015]/80 hover:bg-[#141822] hover:border-cyan-500/40 flex gap-2 sm:gap-2.5 justify-center items-center cursor-pointer transition-colors duration-200 select-none px-3"
              aria-label="Sign up with Google"
            >
              <div className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <span className="font-medium text-xs sm:text-sm tracking-tight">Google</span>
            </motion.a>

            {/* GitHub OAuth Button */}
            <motion.button
              type="button"
              whileHover={prefersReducedMotion ? {} : { y: -1.5, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group h-11 sm:h-12 text-[#FDFDFD] rounded-xl border border-white/[0.09] bg-[#0E1015]/80 hover:bg-[#141822] hover:border-cyan-500/40 flex gap-2 sm:gap-2.5 justify-center items-center cursor-pointer transition-colors duration-200 select-none px-3"
              aria-label="Sign up with GitHub"
            >
              <div className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-medium text-xs sm:text-sm tracking-tight">GitHub</span>
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 w-full my-4 sm:my-5"
          >
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
            <span className="text-[11px] sm:text-xs text-[#787878] uppercase tracking-wider font-mono">
              or
            </span>
            <div className="h-[1px] flex-1 bg-white/[0.08]" />
          </motion.div>

          {/* Error Message if any */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-xs sm:text-sm text-center"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <motion.div animate={controls} className="w-full space-y-3.5 sm:space-y-4">
              {/* Name & Username: Side-by-side on desktop/tablet, stacked on mobile */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5"
              >
                {/* Name */}
                <div className="group/field flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-xs sm:text-sm font-medium text-[#DFDFDF] group-focus-within/field:text-cyan-400 transition-colors duration-200 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-[#0D0F14] border border-white/[0.1] text-white text-sm sm:text-base placeholder:text-white/25 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                    placeholder="eg. Ram"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Username */}
                <div className="group/field flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-xs sm:text-sm font-medium text-[#DFDFDF] group-focus-within/field:text-cyan-400 transition-colors duration-200 mb-1.5"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-[#0D0F14] border border-white/[0.1] text-white text-sm sm:text-base placeholder:text-white/25 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                    placeholder="eg. Ram_512GB"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="group/field flex flex-col">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-[#DFDFDF] group-focus-within/field:text-cyan-400 transition-colors duration-200 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-[#0D0F14] border border-white/[0.1] text-white text-sm sm:text-base placeholder:text-white/25 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="eg. ram@gmail.com"
                  autoComplete="email"
                  required
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="group/field flex flex-col">
                <label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-medium text-[#DFDFDF] group-focus-within/field:text-cyan-400 transition-colors duration-200 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-[#0D0F14] border border-white/[0.1] text-white text-sm sm:text-base placeholder:text-white/25 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                />
                <p className="text-[11px] sm:text-xs text-[#8A8A8A] mt-1.5">
                  Must be at least 8 characters long
                </p>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="w-full mt-6">
              <motion.button
                animate={controls}
                whileHover={prefersReducedMotion ? {} : { y: -1.5, scale: 1.01 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 sm:h-12 rounded-xl font-semibold text-sm sm:text-base tracking-tight text-black bg-[#FFFFFF] hover:bg-slate-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:bg-slate-200 border border-white cursor-pointer transition-all duration-200 select-none flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </motion.button>
            </motion.div>
          </form>

          {/* Footer Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-5 sm:mt-6 text-xs sm:text-sm text-[#8A8A8A]"
          >
            <span>Already have an account?</span>{" "}
            <motion.a
              href={loginUrl}
              className="relative text-[#E4E4E4] hover:text-white font-medium cursor-pointer inline-flex items-center ml-1 group transition-colors duration-200"
            >
              <span>Log in</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}