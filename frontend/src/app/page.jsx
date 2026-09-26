"use client";
import Canvas from "@/components/landing/Canvas";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import useRefreshStore from "@/store/useRefreshStore";
import TopoField from "@/components/landing/TopoField";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Hero2 from "@/components/landing/Hero2";
import Demo from "@/components/landing/Demo";
import GradText from "@/components/landing/GradText";
import { Component as Features } from "@/components/landing/Features";
import ComparisonBlock from "@/components/landing/ComparisonBlock";
import KarmaFAQ from "@/components/landing/KarmaFAQ";
import FooterWithSuite from "@/components/landing/FooterWithSuite";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#0C0C0B]">
      {/* Background */}
       <div className="absolute inset-0 z-0">
        <TopoField />
      </div>

      {/* Content */}
      <div className="relative z-10 " id="top">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="sticky top-0 z-50 mx-auto w-[calc(100%-2rem)] py-3"
        >
          <Navbar />
        </motion.nav>

        <Hero2 />

        <section id="how-it-works">
          <Demo />
        </section>

        <GradText />

        <section id="features">
          <Features />
        </section>

        <section id="compare">
          <ComparisonBlock />
        </section>

        <section id="faq">
          <KarmaFAQ />
        </section>

        <FooterWithSuite />
      </div>
    </main>
  );
}
