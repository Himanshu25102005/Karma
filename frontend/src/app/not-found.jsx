"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  const ease = [0.22, 1, 0.36, 1];

  return (
    <main className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between bg-[#0C0C0B] px-6 py-8 text-[#EDEAE0] selection:bg-white/20 selection:text-white sm:px-10 sm:py-12">
      {/* Top minimal brand bar */}
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-neutral-300 transition-colors hover:text-white"
          aria-label="KARMA Home"
        >
          कARMA
        </Link>
        <span className="font-mono text-xs tracking-wider text-neutral-500">
          STATUS 404
        </span>
      </header>

      {/* Center Composition */}
      <div className="my-auto mx-auto flex w-full max-w-lg flex-col items-center py-10 text-center">
        {/* Technical / Status detail */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-neutral-400"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-40 duration-1000" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-400" />
          </span>
          <span>route !== found</span>
        </motion.div>

        {/* 404 Dominant Number */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease,
          }}
          className="select-none"
        >
          <span className="text-[clamp(6rem,17vw,11rem)] font-light leading-none tracking-[-0.06em] text-white">
            404
          </span>
        </motion.div>

        {/* Sarcastic Headline */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.24,
            ease,
          }}
          className="mt-4 text-2xl font-normal tracking-tight text-white sm:mt-6 sm:text-3xl md:text-4xl"
        >
          Well, this is awkward.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.36,
            ease,
          }}
          className="mt-3 max-w-md text-sm font-light leading-relaxed text-neutral-400 sm:mt-4 sm:text-base"
        >
          You found a route KARMA hasn’t built yet.
          <br className="hidden sm:inline" /> Even the best developers ship bugs.
        </motion.p>

        {/* Navigation Actions */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 0.48,
            ease,
          }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#EDEAE0] px-6 py-3 text-sm font-medium text-[#0C0C0B] transition-all duration-200 hover:bg-white active:scale-[0.98] sm:w-auto"
          >
            <span>Back to KARMA</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-neutral-300 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom minimal note */}
      <footer className="mx-auto flex w-full max-w-4xl items-center justify-center font-mono text-xs tracking-wider text-neutral-600 sm:justify-between">
        <span>ERR_PAGE_NOT_FOUND</span>
        <span className="hidden sm:inline">Built with intent.</span>
      </footer>
    </main>
  );
}
