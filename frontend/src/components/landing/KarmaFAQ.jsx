"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is कARMA?",
    a: "कARMA is a developer-focused productivity platform that connects focused work, projects, tasks, analytics, achievements, and AI-powered insights in one workspace.",
  },
  {
    q: "Who is कARMA built for?",
    a: "कARMA is built for developers who want to track meaningful progress while building projects, learning, or working consistently over time.",
  },
  {
    q: "How does कARMA track my productivity?",
    a: "कARMA records your focus sessions, completed tasks, projects, streaks, and activity to build a clearer picture of how you work and where your time goes.",
  },
  {
    q: "What does कARMA Intelligence do?",
    a: "कARMA Intelligence analyzes your productivity data to surface patterns, identify potential focus leaks, and provide contextual recommendations based on your activity.",
  },
  {
    q: "Can I track different projects?",
    a: "Yes. You can organize your work around multiple projects and associate sessions and tasks with them, allowing you to understand where your time is actually going.",
  },
  {
    q: "Can other developers see my activity?",
    a: "कARMA is designed with a social layer where developers can connect and share activity. The visibility of specific activity depends on the platform's privacy controls.",
  },
  {
    q: "Is कARMA only a productivity tracker?",
    a: "No. The goal is to connect productivity with developer identity, progress, projects, achievements, analytics, and social accountability rather than tracking time alone.",
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15, ease: "easeOut" },
  },
};

export default function KarmaFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#0a0a0a] px-6 py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-3xl">
        {/* HEADING */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-400">
            <Sparkles className="size-3.5 text-neutral-300" />
            कARMA // FAQ
          </div> */}

          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Everything you
            <span className="text-neutral-500"> need to know.</span>
          </h2>

          <p className="max-w-xl text-balance text-sm leading-6 text-neutral-500 sm:text-base">
            Questions about how कARMA works, what it tracks, and how it fits
            into your development workflow.
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="mt-12 w-full divide-y divide-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.q} className="border-b border-white/10">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between py-6 text-left text-sm font-medium text-neutral-200 transition-colors hover:text-white sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-neutral-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-sm leading-6 text-neutral-500">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CONTACT / CTA */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-black">
                <MessageCircle className="size-4" />
              </span>

              <div className="flex flex-col leading-tight">
                <p className="text-sm font-medium text-neutral-200">
                  Still curious?
                </p>
                <p className="text-xs text-neutral-500">
                  Ask us about कARMA and what we&apos;re building.
                </p>
              </div>
            </div>

            <a
              href="#"
              className="group inline-flex h-9 items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-black transition-all hover:bg-neutral-200"
            >
              Explore कARMA
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
