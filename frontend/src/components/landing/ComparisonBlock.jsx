"use client";

import {
    Check,
    X,
    ArrowRight,
    Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const karmaPoints = [
    "Structured focus sessions with project and task tracking",
    "AI-powered productivity insights and recommendations",
    "Unified dashboard for focus, projects, tasks, and progress",
    "Streaks, achievements, and meaningful progress milestones",
    "Developer profile with activity and personal progress",
    "Built-in social layer for following and shared activity",
    "Markdown-powered personal workspace and developer identity",
    "Productivity data stays connected across your entire workflow",
];

const fragmentedPoints = [
    "Focus sessions tracked separately from project work",
    "Productivity insights require manual analysis",
    "Metrics scattered across multiple tools",
    "Progress and achievements lack a unified system",
    "Developer identity lives outside productivity tools",
    "Social activity is disconnected from actual work",
    "Personal context and documentation live elsewhere",
    "Switching between tools breaks the workflow",
];

/* ---------------- ANIMATION VARIANTS ---------------- */

const headingVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const listVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        x: -12,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

/* ---------------- ROW COMPONENTS ---------------- */

function CheckRow({ text }) {
    return (
        <motion.li
            variants={itemVariants}
            className="flex items-start gap-3"
        >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <Check className="size-3" aria-hidden />
            </span>

            <span className="text-sm leading-6 text-neutral-300">
                {text}
            </span>
        </motion.li>
    );
}

function CrossRow({ text }) {
    return (
        <motion.li
            variants={itemVariants}
            className="flex items-start gap-3"
        >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <X
                    className="size-3 text-neutral-500"
                    aria-hidden
                />
            </span>

            <span className="text-sm leading-6 text-neutral-500">
                {text}
            </span>
        </motion.li>
    );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function WhyKarma() {
    return (
        <section className="w-full bg-[#0a0a0a] px-6 py-20 text-white sm:py-24 lg:py-32">

            <div className="mx-auto w-full max-w-5xl">

                {/* SECTION HEADING */}

                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    className="mb-12 text-center sm:mb-16"
                >

                    <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your work deserves
                        <span className="text-neutral-500">
                            {" "}one place.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
                        KARMA connects the way you focus, build, measure, and grow
                        into one developer-first workspace.
                    </p>

                </motion.div>


                {/* COMPARISON */}

                <div className="grid gap-5 md:grid-cols-2">

                    {/* KARMA CARD */}

                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-7"
                    >

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <h3 className="text-lg font-semibold text-white">
                                    KARMA
                                </h3>

                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                                    Developer-first
                                </span>

                            </div>

                            <p className="mb-6 text-sm leading-6 text-neutral-500">
                                Everything you need to turn focused work into
                                visible, measurable progress.
                            </p>

                            <div className="h-px w-full bg-white/10" />

                            <motion.ul
                                variants={listVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                className="mt-6 flex flex-col gap-4"
                            >
                                {karmaPoints.map((point) => (
                                    <CheckRow
                                        key={point}
                                        text={point}
                                    />
                                ))}
                            </motion.ul>

                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">

                            <a
                                href="#"
                                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-black transition-all hover:bg-neutral-200"
                            >
                                Explore KARMA

                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>

                        </div>

                    </motion.div>


                    {/* FRAGMENTED WORKFLOW */}

                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.015] p-6 sm:p-7"
                    >

                        <div>

                            <h3 className="mb-2 text-lg font-semibold text-neutral-400">
                                A fragmented workflow
                            </h3>

                            <p className="mb-6 text-sm leading-6 text-neutral-600">
                                When your focus, progress, identity, and
                                insights live across disconnected tools.
                            </p>

                            <div className="h-px w-full bg-white/5" />

                            <motion.ul
                                variants={listVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}
                                className="mt-6 flex flex-col gap-4"
                            >
                                {fragmentedPoints.map((point) => (
                                    <CrossRow
                                        key={point}
                                        text={point}
                                    />
                                ))}
                            </motion.ul>

                        </div>

                        <div className="mt-8 border-t border-white/5 pt-6">

                            <div className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-sm font-medium text-neutral-500">
                                Too many disconnected tools
                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
}