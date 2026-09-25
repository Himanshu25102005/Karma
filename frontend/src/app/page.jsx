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

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <TopoField />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="sticky top-0 z-50 mx-auto w-[calc(100%-2rem)]"
        >
          <Navbar />
        </motion.nav>

        {/* Hero */}
        <section className="md:mt-10 w-full">
          <Hero />
        </section>
      </div>
    </main>
  );
}
