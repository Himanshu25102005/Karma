"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconX,
  IconEdit,
  IconUpload,
  IconMail,
  IconUser,
  IconAt,
  IconLink,
  IconTrash,
  IconPlus,
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandDribbble,
  IconBrandX,
  IconWorld,
} from "@tabler/icons-react";

const ABOUT_MAX = 160;

const DEFAULT_LINKS = [
  {
    id: 1,
    title: "GitHub",
    icon: IconBrandGithub,
    color: "text-neutral-300",
    url: "github.com/himatwork",
  },
  {
    id: 2,
    title: "Portfolio",
    icon: IconWorld,
    color: "text-violet-400/70",
    url: "himanshu.dev",
  },
  {
    id: 3,
    title: "LinkedIn",
    icon: IconBrandLinkedin,
    color: "text-sky-400/70",
    url: "linkedin.com/in/himanshu-dusane",
  },
  {
    id: 4,
    title: "X",
    icon: IconBrandX,
    color: "text-neutral-300",
    url: "x.com/himatwork",
  },
];

const inputClass =
  "w-full min-w-0 rounded-lg border border-neutral-700/80 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-200 outline-none transition-colors placeholder:text-neutral-600 focus:border-neutral-500";

const labelClass = "mb-1.5 block text-xs font-medium text-neutral-500";

const EditForm = ({ onClose }) => {
  /* const data = {
    name, 
    username, 
    about,
    email,
    links,
  } */
  const fileref = useRef(null);
  const handliFileInput = () => {
    fileref.current.click();
  };
  const [name, setName] = useState("Himanshu Dusane");
  const [username, setUsername] = useState("himanshu2005");
  const [about, setAbout] = useState(
    "Building in public. Solving problems. Learning every day.",
  );
  const [email, setEmail] = useState("himanshu@example.com");
  const [links, setLinks] = useState(DEFAULT_LINKS);

  const handleClose = () => {
    onClose?.();
  };

  const handleLinkChange = (id, value) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: value } : link)),
    );
  };

  const handleRemoveLink = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "Link",
        icon: IconLink,
        color: "text-neutral-400",
        url: "",
      },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full w-full max-w-[100vw] flex-col overflow-hidden bg-[#0a0a0a] lg:h-auto lg:max-h-[min(90vh,820px)] lg:w-[min(900px,94vw)] lg:rounded-xl lg:border lg:border-neutral-800 lg:bg-[#0c0c0f] lg:shadow-2xl"
    >
      {/* Mobile header */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={handleClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Go back"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-semibold text-neutral-100">
          Edit Profile
        </span>
        <button
          type="button"
          onClick={handleClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden shrink-0 items-start justify-between border-b border-neutral-800 px-6 py-5 lg:flex">
        <div className="min-w-0 pr-4">
          <h2 className="text-xl font-semibold text-neutral-100 lg:text-2xl">
            Edit Profile
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Update your personal information and links
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <form
        method="post"
        encType="multipart/form-data"
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Mobile: avatar + sections */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center px-4 pb-6 pt-5">
              <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-600">
                  <Image
                    src="https://i.pinimg.com/originals/64/06/67/6406670622da320f2ee737b8a719d01e.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300"
                  aria-label="Edit photo"
                >
                  <IconEdit className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-orange-600 transition-colors hover:text-orange-500"
              >
                Change Photo
              </button>
            </div>

            {/* BASIC INFO */}
            <section className="px-4 pb-5">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Basic Info
              </h3>
              <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
                <div className="flex min-w-0 items-center gap-3 border-b border-neutral-800 px-4 py-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <IconUser className="h-5 w-5 text-neutral-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-neutral-500">Full Name</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full min-w-0 truncate bg-transparent text-sm font-medium text-neutral-100 outline-none"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-3 px-4 py-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                    <IconAt className="h-5 w-5 text-neutral-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-neutral-500">Username</p>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full min-w-0 truncate bg-transparent text-sm font-medium text-neutral-100 outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section className="px-4 pb-5">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                About
              </h3>
              <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <p className="mb-2 text-[11px] text-neutral-500">Bio</p>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value.slice(0, ABOUT_MAX))}
                  rows={4}
                  className="w-full min-w-0 resize-none bg-transparent text-sm leading-relaxed text-neutral-200 outline-none placeholder:text-neutral-600"
                  placeholder="Tell us about yourself..."
                />
                <span className="absolute bottom-3 right-4 text-[11px] text-neutral-500">
                  {about.length}/{ABOUT_MAX}
                </span>
              </div>
            </section>

            {/* SOCIAL LINKS - mobile cards */}
            <section className="px-4 pb-6">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Social Links
              </h3>
              <div className="flex flex-col gap-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <div
                      key={link.id}
                      className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
                    >
                      <div className="mb-3 flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                          <Icon className={`h-5 w-5 ${link.color}`} />
                        </div>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-200">
                          {link.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(link.id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
                          aria-label={`Remove ${link.title}`}
                        >
                          <IconTrash className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="min-w-0">
                        <p className="mb-1.5 text-[10px] uppercase tracking-wide text-neutral-600">
                          URL
                        </p>
                        <div className="flex min-w-0 items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2.5">
                          <IconLink className="h-4 w-4 shrink-0 text-neutral-600" />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) =>
                              handleLinkChange(link.id, e.target.value)
                            }
                            className="min-w-0 flex-1 truncate bg-transparent text-sm text-neutral-300 outline-none placeholder:text-neutral-600"
                            placeholder="https://"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={handleAddLink}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 py-3 text-sm font-medium text-orange-600 transition-colors hover:border-orange-600/50 hover:bg-orange-600/5"
              >
                <IconPlus className="h-4 w-4" />
                Add New Link
              </button>
            </section>
          </div>

          {/* Desktop: two-column layout */}
          <div className="hidden lg:flex lg:min-h-0 lg:gap-6 lg:p-6 xl:gap-8 xl:p-7">
            {/* Avatar column */}
            <div className="flex w-[168px] shrink-0 flex-col lg:w-[190px]">
              <span className={labelClass}>Avatar</span>
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 shrink-0 lg:h-36 lg:w-36">
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-600">
                    <Image
                      src="https://i.pinimg.com/originals/64/06/67/6406670622da320f2ee737b8a719d01e.jpg"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors hover:bg-neutral-800"
                    aria-label="Edit avatar"
                  >
                    <IconEdit className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-600">
                  JPG, PNG or GIF.
                  <br />
                  Max size 2MB.
                </p>
                <button
                  type="button"
                  onClick={handliFileInput}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-3 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-800"
                >
                  <IconUpload className="h-4 w-4" />
                  Change Avatar
                </button>
                <input
                  ref={fileref}
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Form column */}
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="min-w-0">
                  <label className={labelClass}>Username</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                      @
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`${inputClass} pl-7`}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-neutral-600">
                    This is your public username.
                  </p>
                </div>
              </div>

              <div className="mt-4 min-w-0">
                <label className={labelClass}>About</label>
                <div className="relative">
                  <textarea
                    value={about}
                    onChange={(e) =>
                      setAbout(e.target.value.slice(0, ABOUT_MAX))
                    }
                    rows={3}
                    className={`${inputClass} min-h-[88px] resize-none pb-7`}
                    placeholder="Tell us about yourself..."
                  />
                  <span className="absolute bottom-2.5 right-3 text-[11px] text-neutral-600">
                    {about.length} / {ABOUT_MAX}
                  </span>
                </div>
              </div>

              <div className="mt-4 min-w-0">
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <IconMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div className="mt-5 min-w-0">
                <label className={labelClass}>Links</label>
                <div className="flex flex-col gap-2.5">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <div
                        key={link.id}
                        className="flex min-w-0 items-center gap-2.5 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2 lg:gap-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                          <Icon className={`h-4 w-4 ${link.color}`} />
                        </div>
                        <span className="hidden w-16 shrink-0 truncate text-xs font-medium text-neutral-400 sm:block lg:w-20">
                          {link.title}
                        </span>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(link.id, e.target.value)
                          }
                          className="min-w-0 flex-1 truncate rounded-md border border-neutral-800 bg-neutral-950/50 px-2.5 py-1.5 text-xs text-neutral-300 outline-none focus:border-neutral-600"
                          placeholder="https://"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(link.id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-white/5 hover:text-red-400"
                          aria-label={`Remove ${link.title}`}
                        >
                          <IconTrash className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-700 py-2.5 text-xs font-medium text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-300"
                >
                  <IconPlus className="h-3.5 w-3.5" />
                  Add Another Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-neutral-800 bg-[#0a0a0a] px-4 py-4 lg:bg-[#0c0c0f] lg:px-6 lg:py-4">
          <div className="flex gap-3 lg:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900/80 px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-800 lg:flex-none lg:px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500 lg:flex-none lg:px-6"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default EditForm;
