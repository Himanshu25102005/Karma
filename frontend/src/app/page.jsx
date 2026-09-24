"use client";
import Canvas from "@/components/landing/Canvas";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import useRefreshStore from "@/store/useRefreshStore";
import TopoField from "@/components/landing/TopoField";

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <TopoField/>
    </div>
  );
}
