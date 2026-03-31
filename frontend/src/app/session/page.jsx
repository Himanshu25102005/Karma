import React from 'react'
import { SmoothCursor } from "../../components/ui/Smooth-cursor"
import { FloatingDock } from "../../components/ui/Floating-dock";
import Navbar from "../../components/functional/Navbar";
import Activity from "../../components/functional/Activity";
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

const page = () => {
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
  return (
    <>
      <SmoothCursor />
      <Navbar />
      <div className='bg-black min-h-screen pt-16'>

         {/* Main Outer Div */}

        <div className='border-2 border-dashed h-200 mt-2 border-white flex flex-wrap p-3 gap-5'>

            {/* Sprint's Div */}
            <div className='text-white border-2 border-solid rounded-xl px-8 py-2 border-gray-500 h-full w-1/4'>
              <Sprint/>
            </div>
            
            {/* Timer's Div */}
            <div className='text-white h-full w-1/2'>
              <Timer/>
            </div>
            
            {/* Activity's Div */}
            <div className='text-white h-full w-1/5'>
              <Activity/>
            </div>
        </div>

        {/* Floating Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <FloatingDock
            mobileClassName="translate-y-20" // only for demo, remove for production
            items={links}
          />
        </div>

      </div>
    </>
  );
}

export default page