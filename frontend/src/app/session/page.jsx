'use client'

import React, { useEffect, useState } from 'react';
import api from "@/services/api";
import SmoothCursor from "../../components/Effects/Smooth-cursor"
import { FloatingDock } from "../../components/Common/Floating-dock";
import Navbar from "../../components/Session/Navbar";
import Activity from "../../components/Session/Activity";
import ProjectSelector from "../../components/Session/ProjectSelector";
import Personal_Stats from "../../components/Session/Personal_Stats";
import Sprint from "../../components/Session/Sprint";
import { useUserStore } from "@/store/useUserStore";
import Timer from "../../components/Session/Timer";
import useProjectStore from '@/store/useProjectStore';
import {
  IconBrandGithub,
  IconBrandX,
  IconHomeStats,
  IconHome,
  IconDeviceLaptop,
  IconTerminal2,
  IconClockPlay,
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
            title: "Projects",
            icon: (
                <IconDeviceLaptop className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Session",
            icon: (
                <IconClockPlay className='h-20 w-20 text-white' />
            ),
            href: "http://localhost:3000/session",
        },
        {
            title: "Dashboard",
            icon: (
                <IconHomeStats className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "http://localhost:3000/analytics",
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

  const setCurrentProjectId = useProjectStore((state) => state.setCurrentProjectId);

  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const res = await api.getAllProjects();
        /* Priont the full recieved Object */
        console.log("Full response data:", res.data);
        setProjects(res.data.projects);
        setCurrentUser();
        /* const currentProject = projects.find(p => p.isCurrent) || null;

        setCurrentProjectId(currentProject?._id || null); */


      } catch (e) {
        console.log("error: ")
        console.log(e.message);
      }
    }

    fetchProjects();
  }, [])

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const currentProject = projects.find(p => p.isCurrent);

    if (currentProject) {
      console.log("SETTING ID:", currentProject._id);
      setCurrentProjectId(currentProject._id);
    } else {
      console.log("NO CURRENT PROJECT FOUND");
      setCurrentProjectId(null);
    }
  }, [projects]);  // 🔥 THIS IS THE KEY

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
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>


      
      <div className='bg-black min-h-screen pt-16'>

        {/* Main Outer Div */}

        <div className=' h-[94vh] overflow-hidden mt-2 border-white flex items-center p-3 gap-5'>

          <div className="text-white rounded-xl px-6 py-4 w-1/4 h-[99vh] flex flex-col gap-6 overflow-hidden">

            {/* Sprint (takes available space) */}
            <div className="flex-1 min-h-0 mt-5 ">
              <Sprint />
            </div>

            {/* Personal Stats (fixed height) */}
            <div className="h-[35%] ">
              <Personal_Stats />
            </div>

          </div>

          <div className='text-white w-1/2 h-full'>
            <ProjectSelector projects={projects} setProjects={setProjects} />
            <Timer />
          </div>

          <div className='text-white h-full  rounded-xl w-1/5 h-full p-2'>
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