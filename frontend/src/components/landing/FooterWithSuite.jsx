"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

const defaultNavLinks = [
  { text: "KARMA", url: "#top" },
  { text: "Features", url: "#features" },
  { text: "Why KARMA", url: "#why-karma" },
  { text: "FAQ", url: "#faq" },
];

const defaultSocialLinks = [
  {
    text: "GitHub",
    url: "https://github.com/Himanshu25102005",
  },
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/himanshudusane",
  },
  {
    text: "Instagram",
    url: "https://www.instagram.com/_.himanxhu_.1/",
  },
  {
    text: "Resume",
    url: "https://drive.google.com/file/d/1BTl4HrL9rG_2w7ZvoRy69K-nhlfNX1Iz/view?usp=sharing",
  },
];

export default function FooterWithSuite({
  brandName = "कARMA",
  tagline = "Built with intent. Shipped with consistency.",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  description = "कARMA is a developer-first productivity platform built to help developers focus deeper, understand their work, and build consistently.",
  ctaText = "Star my repo ↗",
  ctaUrl = "https://github.com/Himanshu25102005/Karma",
  email = "himanshudusane12@gmail.com",
  copyright = "© 2026 Himanshu Dusane. Built with कARMA.",
  className,
}) {
  const footerRef = useRef(null);

  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.15,
  });

  // Smooth scroll for internal footer links
  const scrollToSection = (url) => {
    if (!url.startsWith("#")) return;

    const id = url.substring(1);
    const section = document.getElementById(id);

    if (!section) {
      console.warn(`Section with id "${id}" not found.`);
      return;
    }

    const navbarHeight = 100;

    const sectionPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className={cn(
        "relative w-full overflow-hidden bg-white select-none dark:bg-neutral-950",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="grid grid-cols-2 gap-8 px-8 pt-12 pb-4 md:px-12"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-0">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              onClick={(e) => {
                if (link.url.startsWith("#")) {
                  e.preventDefault();
                  scrollToSection(link.url);
                }
              }}
              className="py-0.75 text-[11px] tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
            >
              {link.text}
            </a>
          ))}

          <div className="h-5" />

          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="py-0.75 text-[11px] tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-0"
        >
          <p className="text-[11px] leading-relaxed tracking-[0.12em] uppercase text-neutral-900 dark:text-neutral-100">
            {description}
          </p>

          <div className="h-5" />

          <p className="text-[11px] leading-relaxed tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
            A note from the builder:
          </p>

          <div className="h-2" />

          <p className="max-w-xl text-[11px] leading-relaxed tracking-[0.12em] uppercase text-neutral-900 dark:text-neutral-100">
            I built KARMA because I wanted productivity to feel less like
            another dashboard and more like a reflection of how we actually
            build. If you&apos;re exploring the product, the code, or the person
            behind it — I&apos;d love for you to take a look.
          </p>

          <div className="h-5" />

          {/* RECRUITER CTA */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500">
              For recruiters & collaborators
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
              >
                <span>{ctaText}</span>

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="https://drive.google.com/file/d/1BTl4HrL9rG_2w7ZvoRy69K-nhlfNX1Iz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
              >
                <span>View Resume</span>

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="h-5" />

          <a
            href={`mailto:${email}`}
            className="break-all text-[11px] tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
          >
            {email}
          </a>

          <div className="h-4" />

          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
            {copyright}
          </p>
        </motion.div>
      </motion.div>

      {/* BRAND */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inset-x-0 text-center font-bold text-neutral-900 dark:text-neutral-100"
        style={{ fontSize: "clamp(3rem, 15vw, 13rem)" }}
      >
        {brandName}
      </motion.p>

      {/* BOTTOM */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.35,
        }}
        className="mt-1 flex items-center justify-between border-t border-neutral-200 px-8 py-3 dark:border-neutral-800 md:px-12"
      >
        <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500">
          {tagline}
        </p>

        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-[10px] tracking-[0.14em] uppercase text-neutral-400 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 md:block"
        >
          Open source ↗
        </a>
      </motion.div>
    </footer>
  );
}

export { FooterWithSuite };