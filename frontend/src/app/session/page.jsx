'use client'

import React, { useEffect, useState } from 'react';
import api from "@/services/api";
import SmoothCursor from "../../components/ui/Smooth-cursor"
import { FloatingDock } from "../../components/ui/Floating-dock";
import Navbar from "../../components/functional/Navbar";
import Activity from "../../components/functional/Activity";
import ProjectSelector from "../../components/functional/ProjectSelector";
import Sprint from "../../components/functional/Sprint";
import Timer from "../../components/functional/Timer";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

const SessionPage = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const userData = await api.getProfile();
        // const userId = userData.data.data._id;

        // /* Print UserId */
        // console.log(userId);


        const res = await api.getAllProjects();

        /* Priont the full recieved Object */
        console.log("Full response data:", res.data);
        setProjects(res.data.projects);



      } catch (e) {
        console.log("error: ")
        console.log(e.message);
      }
    }

    fetchProjects();
  }, [])

  console.log("RENDER CHECK - Current Projects:", projects);



  const [isDark, setIsDark] = useState(true);
  return (
    <>
      <SmoothCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2} />
      <Navbar />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={isDark ? '#ffffff' : '#000000'}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className='bg-black min-h-screen pt-16'>

        {/* Main Outer Div */}

        <div className=' h-[94vh] overflow-hidden mt-2 border-white flex items-center p-3 gap-5'>

          <div className='text-white border-1 border-dashed rounded-xl px-8 py-2 border-gray-500 h-full w-1/4'>
            <Sprint />
          </div>

          <div className='text-white w-1/2 h-full '>
            <ProjectSelector projects={projects} setProjects={setProjects} />
            <Timer />
          </div>

          <div className='text-white h-full w-1/5 border-1 border-dashed rounded-xl border-gray-500  h-full'>
            <Activity />
          </div>
        </div>

        {/* Floating Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ">
          <FloatingDock
            mobileClassName="translate-y-20 " // only for demo, remove for production
            items={links}
          />
        </div>

      </div>
    </>
  );
}

export default SessionPage