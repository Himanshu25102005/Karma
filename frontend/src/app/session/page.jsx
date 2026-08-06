'use client'

import React, { useEffect, useState } from 'react';
import api from "@/services/api";
import SmoothCursor from "../../components/Effects/Smooth-cursor"
import { FloatingDock } from "../../components/Common/Floating-dock";
import Navbar from "../../components/Session/Navbar";
import Activity from "../../components/Session/Activity";
import ActivityDrawer from "../../components/Session/ActivityDrawer";
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
  IconTerminal2,
  IconUser,
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
            title: "Profile",
            icon: (
                <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "http://localhost:3000/profile",
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
            href: "http://localhost:3000/dashboard",
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
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getAllProjects();
        console.log("Full response data:", res.data);
        setProjects(res.data.projects);
        setCurrentUser();
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
  }, [projects]);

  useEffect(() => {
    const lockScroll = () => {
      if (window.innerWidth >= 1024) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
    lockScroll();
    window.addEventListener('resize', lockScroll);
    return () => {
      window.removeEventListener('resize', lockScroll);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const [isDark] = useState(true);

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

      <div className='bg-black min-h-screen overflow-x-hidden lg:h-screen lg:overflow-hidden lg:min-h-0'>

        {/* Mobile (<640px) */}
        <div className="sm:hidden flex flex-col gap-4 px-3 pt-16 pb-28 max-w-[100vw]">
          <section className="w-full min-w-0">
            <Timer
              mobileLayout
              projectSelector={<ProjectSelector projects={projects} setProjects={setProjects} />}
            />
          </section>
          <section className="w-full min-w-0">
            <Sprint compact />
          </section>
          <section className="w-full min-w-0">
            <Personal_Stats compact />
          </section>
          <section className="w-full min-w-0">
            <ActivityDrawer
              isOpen={activityDrawerOpen}
              onOpen={() => setActivityDrawerOpen(true)}
              onClose={() => setActivityDrawerOpen(false)}
            />
          </section>
        </div>

        {/* Tablet (640px–1024px) */}
        <div className="hidden sm:flex lg:hidden flex-col gap-5 px-4 pt-16 pb-28 max-w-[100vw]">
          <section className="w-full min-w-0">
            <ProjectSelector projects={projects} setProjects={setProjects} />
            <Timer />
          </section>
          <section className="w-full min-w-0">
            <Sprint compact />
          </section>
          <section className="w-full min-w-0">
            <Activity />
          </section>
          <section className="w-full min-w-0">
            <Personal_Stats />
          </section>
        </div>

        {/* Desktop / laptop (1024px+): 100vh locked, no page scroll */}
        <div className='hidden lg:flex h-[calc(100vh-4rem)] mt-16 min-h-0 overflow-hidden px-3 gap-5 max-w-[100vw]'>

          {/* LEFT: Sprint (flex-1, scrollable tasks) → Personal Stats (auto) */}
          <div className="text-white rounded-xl px-6 py-4 w-1/4 h-full min-h-0 shrink-0 flex flex-col gap-4 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-hidden">
              <Sprint fillHeight />
            </div>
            <div className="shrink-0">
              <Personal_Stats />
            </div>
          </div>

          {/* CENTER: vertically centered, no overflow */}
          <div className='text-white w-1/2 h-full min-h-0 shrink-0 flex flex-col justify-center overflow-hidden'>
            <ProjectSelector projects={projects} setProjects={setProjects} />
            <Timer />
          </div>

          {/* RIGHT: Activity column fills height */}
          <div className='text-white rounded-xl w-1/5 h-full min-h-0 shrink-0 p-2 overflow-hidden'>
            <Activity fillHeight />
          </div>
        </div>

        {/* Floating Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ">
          <FloatingDock
            mobileClassName="translate-y-20 "
            items={links}
          />
        </div>
      </div>
    </>
  );
}

export default SessionPage
