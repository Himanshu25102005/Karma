"use client";

import React, { useEffect, useState } from "react";
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from "@/components/Effects/Smooth-Cursor2";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconUsersGroup,
  IconCalendarEvent,
  IconBrandDribbble,
  IconBrandHackerrank,
  IconBrandLeetcode,
  IconHome,
  IconEdit,
  IconTerminal2,
  IconClockPlay,
  IconHomeStats,
  IconLinkFilled,
  IconExternalLink,
  IconUser,
} from "@tabler/icons-react";
import api from "@/services/api";
import { Crete_Round, Rowdies } from "next/font/google";
import Image from "next/image";
import Stats from "@/components/Profile/Stats";
import WeeklyHeatmap from "@/components/Dashboard/WeeklyHeatmap";
import { easeInOut, motion } from "framer-motion";
import AboutMD from "@/components/Profile/AboutMD";
import EditForm from "@/components/Profile/EditForm";
import useUserStore from "@/store/useUserStore";
import useRefreshStore from "@/store/useRefreshStore";
const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const ProfilePage = () => {
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
      icon: <IconClockPlay className="h-20 w-20 text-white" />,
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

  const MobUserLinks = [
    {
      id: 1,
      title: "GitHub",
      icon: IconBrandGithub,
      color: "text-neutral-300",
      link: "https://github.com/himatwork",
    },
    {
      id: 2,
      title: "LinkedIn",
      icon: IconBrandLinkedin,
      color: "text-sky-400/70",
      link: "https://linkedin.com/in/himanshu-dusane",
    },
    {
      id: 3,
      title: "Portfolio",
      icon: IconBrandDribbble,
      color: "text-violet-400/70",
      link: "https://himanshu.dev",
    },
  ];
  const userLinks = [
    {
      id: 1,
      title: "GitHub",
      icon: IconBrandGithub,
      color: "text-neutral-300",
      link: "https://github.com/himatwork",
    },
    {
      id: 2,
      title: "LinkedIn",
      icon: IconBrandLinkedin,
      color: "text-sky-400/70",
      link: "https://linkedin.com/in/himanshu-dusane",
    },
    {
      id: 3,
      title: "Portfolio",
      icon: IconBrandDribbble,
      color: "text-violet-400/70",
      link: "https://himanshu.dev",
    },
    {
      id: 4,
      title: "X",
      icon: IconBrandX,
      color: "text-neutral-300",
      link: "https://x.com/himatwork",
    },
    {
      id: 5,
      title: "LeetCode",
      icon: IconBrandLeetcode,
      color: "text-amber-400/70",
      link: "https://leetcode.com/u/himatwork",
    },
    {
      id: 6,
      title: "HackerRank",
      icon: IconBrandHackerrank,
      color: "text-emerald-400/70",
      link: "https://www.hackerrank.com/profile/himatwork",
    },
  ];

  const refreshToggle = useRefreshStore((state) => state.refreshToggle);
  const avatar = useUserStore((state) => state.avatar);
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const bio = useUserStore((state) => state.bio);
  const dbLinks = useUserStore((state) => state.links);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const createdAt = useUserStore((state) => state.createdAt);
  const [edit, setEdit] = useState(false);

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toLowerCase();
  };
  const displayUserLinks =
    dbLinks && dbLinks.length > 0
      ? dbLinks.map((l, index) => {
          const platform = (l.platform || "").toLowerCase();
          let icon = IconLinkFilled;
          let color = "text-neutral-300";
          let title = l.platform
            ? l.platform.charAt(0).toUpperCase() + l.platform.slice(1)
            : "Link";

          if (platform === "github") {
            icon = IconBrandGithub;
            color = "text-neutral-300";
            title = "GitHub";
          } else if (platform === "linkedin") {
            icon = IconBrandLinkedin;
            color = "text-sky-400/70";
            title = "LinkedIn";
          } else if (
            platform === "portfolio" ||
            platform === "website" ||
            platform === "dribbble"
          ) {
            icon = IconBrandDribbble;
            color = "text-violet-400/70";
            title = "Portfolio";
          } else if (platform === "x" || platform === "twitter") {
            icon = IconBrandX;
            color = "text-neutral-300";
            title = "X";
          } else if (platform === "leetcode") {
            icon = IconBrandLeetcode;
            color = "text-amber-400/70";
            title = "LeetCode";
          } else if (platform === "hackerrank") {
            icon = IconBrandHackerrank;
            color = "text-emerald-400/70";
            title = "HackerRank";
          }

          return {
            id: index + 1,
            title,
            icon,
            color,
            link: l.url.startsWith("http") ? l.url : `https://${l.url}`,
          };
        })
      : userLinks;

  const pfp =
    avatar ||
    "https://i.pinimg.com/originals/64/06/67/6406670622da320f2ee737b8a719d01e.jpg";

  useEffect(() => {
    setCurrentUser();
  }, [refreshToggle, setCurrentUser]);

  useEffect(() => {
    if (!edit) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEdit(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [edit]);
  return (
    <>
      <SmoothCursor />

      <div className="min-h-screen w-full max-w-[100vw] bg-[#0a0a0a] flex flex-col relative overflow-x-hidden select-none">
        {/* TOP MARGIN*/}
        <div className="shrink-0 h-8 lg:h-14 w-full border-b border-dashed border-neutral-700/60 flex items-center px-6">
          {/* <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">कΛRMΛ // System_v2</span> */}
        </div>

        {/* left and right vertical margins*/}
        <div className="flex-1 flex flex-row w-full min-w-0 min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-9.5rem)]">
          {/* Left Margin Buffer */}
          <div className="hidden lg:block w-16 xl:w-24 min-[1440px]:w-32 border-r border-dashed border-neutral-700/60 self-stretch shrink-0" />

          {/* MAIN WORKING AREA */}

          <div className="border relative w-full min-w-0 flex flex-col md:flex-row flex-1 md:min-h-full justify-center items-stretch p-7 md:p-4 gap-5">
            {/* Edit Profile Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: edit ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 z-10 flex items-stretch justify-center bg-[#0a0a0a]/95 p-0 backdrop-blur-md lg:items-center lg:bg-gray-700/30 lg:p-4 ${edit ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {edit && <EditForm onClose={() => setEdit(false)} />}
            </motion.div>

            {/* Profile Section */}
            <div className="shrink-0 md:shrink md:min-h-full flex flex-col gap-5 w-full md:w-1/5 min-w-0 rounded-xl bg-neutral-900/50 p-5">
              {/* Profile Icon and description */}
              <div className="shrink-0 w-full min-w-0 md:flex md:flex-col md:gap-7">
                <div className="w-full min-w-0 flex justify-between md:justify-center items-center gap-3">
                  {/* Profile Icon */}
                  <div className="relative w-24 sm:w-32 md:w-50 aspect-square shrink-0">
                    <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-300">
                      <Image
                        src={pfp}
                        alt="Profile"
                        fill
                        sizes="(max-width: 1024px) 128px, 144px"
                        className="object-cover"
                      />
                    </div>

                    <motion.button
                      onClick={() => setEdit(!edit)}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.04 }}
                      transition={{ ease: easeInOut }}
                      duration={0.3}
                      className={`absolute cursor-pointer bottom-2 right-2 z-20 flex h-9 w-15 items-center justify-center rounded-xl border flex-row gap-1 border-white/10 bg-black/60 backdrop-blur hover:rounded-lg duration-75 ${edit ? "hidden" : "visible"}`}
                    >
                      <IconEdit className="h-5 w-5 text-white" />
                      <span className="text-orange-600 text-md font-semibold">
                        Edit
                      </span>
                    </motion.button>
                  </div>
                  <div className="md:hidden min-w-0 flex-1 flex flex-col justify-center items-center text-center">
                    <span
                      className={`${rowdies.className} text-xl sm:text-2xl font-semibold text-neutral-300 wrap-break-word w-full`}
                    >
                      {name || "Himanshu Dusane"}
                    </span>
                    <span className="text-sm sm:text-lg text-neutral-500 truncate max-w-full">
                      {email || "himatwork01@gmail.com"}
                    </span>
                    <span className="text-sm sm:text-lg text-neutral-400 mt-2 break-words w-full">
                      {bio || "Building in public. Ship, Learn & Repeat"}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col gap-7 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <span
                      className={`${rowdies.className} text-xl md:text-2xl text-neutral-300 flex justify-center items-center w-full break-words text-center`}
                    >
                      {name || "Himanshu Dusane"}
                    </span>
                    <span className="text-neutral-500 text-md flex justify-center items-center w-full truncate">
                      {email || "himatwork01@gmail.com"}
                    </span>
                  </div>
                  <span className="text-neutral-400 text-md flex justify-center items-center text-center wrap-break-word">
                    {bio || "Building in public. Ship, Learn & Repeat"}
                  </span>
                </div>
              </div>

              {/* Links */}
              <div className="w-full min-w-0 p-3 flex flex-col gap-2 md:flex-1 md:min-h-0">
                {/* Links Card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                  className="hidden md:flex flex-col md:flex-1 md:min-h-0 w-full min-w-0 border-2 border-neutral-800 rounded-lg divide-y divide-neutral-200 p-2 overflow-hidden"
                >
                  {displayUserLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <div
                        key={link.id}
                        onClick={() => window.open(link.link, "_blank")}
                        className="group flex cursor-pointer items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-neutral-700 hover:bg-white/3"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4 transition-colors group-hover:bg-white/[0.07]">
                          <Icon
                            className={`h-6 w-6 ${link.color} transition-transform duration-200 group-hover:scale-110`}
                          />
                        </div>

                        <div className="min-w-0 flex-1 overflow-hidden">
                          <p className="truncate font-mono text-sm font-medium text-neutral-200">
                            {link.title}
                          </p>

                          <p className="block truncate text-xs text-neutral-500 transition-colors duration-200 group-hover:text-neutral-300">
                            {link.link}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(link.link, "_blank");
                          }}
                          className="shrink-0 rounded-lg p-2 text-neutral-500 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        >
                          <IconLinkFilled className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.5, 0.7, 1] }}
                  transition={{ duration: 1, ease: easeInOut }}
                  className="hidden md:flex flex-col shrink-0 w-full min-w-0 border-2 border-neutral-800 rounded-lg py-3"
                >
                  {/* Date Joined */}
                  <div className="flex flex-row justify-start items-start border-b border-neutral-700 gap-3 p-3 px-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4 hover:bg-white/[0.07] transition-colors">
                      <IconCalendarEvent className="h-6 w-6 text-neutral-300" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-md text-neutral-600">Joined</span>
                      <span className="text-sm text-neutral-300">
                        {formatDate(createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Follower and Following */}
                  <div className="flex flex-col sm:flex-row border-t border-neutral-800">
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 sm:border-r border-neutral-800 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4">
                        <IconUsersGroup className="h-6 w-6 text-neutral-300" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Followers
                        </p>

                        <p className="text-xl font-semibold text-neutral-200">
                          ---
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center gap-3 px-5 py-4 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                        <IconUsersGroup className="h-6 w-6 text-neutral-300" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          Following
                        </p>

                        <p className="text-xl font-semibold text-neutral-200">
                          ---
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Links Section */}
                <div className="md:hidden mt-5 w-full">
                  <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-white/2">
                    {displayUserLinks.map((link, index) => {
                      const Icon = link.icon;

                      return (
                        <a
                          key={link.id}
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-white/[0.04]
                                                    ${index !== displayUserLinks.length - 1 ? "border-b border-white/5" : ""}`}
                        >
                          {/* Icon */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                            <Icon className={`h-5 w-5 ${link.color}`} />
                          </div>

                          {/* Platform */}
                          <span className="min-w-0 flex-1 text-sm font-medium text-neutral-200">
                            {link.title}
                          </span>

                          {/* External Link */}
                          <IconExternalLink className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-200" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats + About + Heatmap Section */}
            <div className="w-full md:w-1/2 min-w-0 flex flex-col md:min-h-full gap-2 justify-start items-stretch">
              <div className="w-full shrink-0 min-w-0 bg-neutral-900/50 rounded-lg p-2 md:p-1">
                <Stats />
              </div>
              <div className="w-full min-h-[12rem] h-[38vh] sm:h-[42vh] md:h-auto md:flex-1 md:min-h-0 min-w-0 bg-neutral-900/50 rounded-lg p-2 md:p-2 overflow-hidden flex flex-col">
                <AboutMD />
              </div>
              <div className="w-full shrink-0 min-w-0 bg-neutral-900/50 rounded-lg p-1">
                <WeeklyHeatmap profileRender={true} />
              </div>
            </div>
          </div>

          {/* Right Margin Buffer */}
          <div className="hidden lg:block w-16 xl:w-24 min-[1440px]:w-32 border-l border-dashed border-neutral-700/60 self-stretch shrink-0" />
        </div>

        {/*  BOTTOM MARGIN  */}
        <div className="shrink-0 h-12 w-full border-t border-dashed border-neutral-700/60 flex items-center justify-between px-6 text-[10px] font-mono text-neutral-600"></div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ">
        <FloatingDock mobileClassName="translate-y-20 " items={links} />
      </div>
    </>
  );
};

export default ProfilePage;
