"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Rowdies } from "next/font/google";
import { easeInOut, motion } from "framer-motion";
import { IconEdit } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useUserStore from "@/store/useUserStore";

const AboutMD = () => {
  const about = `
# Welcome to कARMA 👋

I'm the Architect behind this platform, and this is your personal **README.md**.

Think of it as your workspace introduction—not a portfolio. Tell people what you're building, what you're learning, and what keeps you curious.

A few suggestions:

- Keep it concise.
- Use simple Markdown.
- Focus on what matters today, not everything you've ever done.

> 🚧 This feature is still under development. Right now, basic Markdown is supported, and more capabilities will be added over time.

Now it's your turn, start writing your story.
`;
  const [edit, SetEdit] = useState(false);
  const [markdown, setMarkdown] = useState(about);
  const currAbout = useUserStore((state) => state.about);

  const updateAbout = async () => {
    try {
      if (!markdown) throw e;
      if (markdown != currAbout) {
        const res = await api.updateProfile(markdown);
        console.log(res.data);
      } else throw e;
    } catch (e) {
      console.log("About section errored");
    }
  };
  return (
    <>
      <div className="h-full w-full border border-neutral-700 rounded-lg flex flex-col gap-1 md:gap-2">
        {/* Headline */}
        <div className="h-11 md:h-15 w-full border-b border-neutral-500 flex flex-row justify-between items-center p-3 font-mono">
          <span className="bg-linear-to-r from-[#E9E9E9] via-[#868585] to-[#636060] bg-clip-text text-xl md:text-2xl font-semibold tracking-wide text-transparent">
            स्वरूप
          </span>
          <div className="flex flex-row justify-center items-center">
            <span className="text-neutral-400 text-md md:text-lg border-r border-neutral-400 px-2">
              About.md
            </span>
            <button
              className="text-neutral-300 px-1 cursor-pointer"
              onClick={() => SetEdit(!edit)}
            >
              <IconEdit className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-1 px-2 relative border border-neutral-400 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
          {edit ? (
            <div className="h-full w-full border border-neutral-200">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder={`# Hi, I'm Himanshu 👋

Building AI-powered SaaS.

## Currently

- Building KARMA
- Learning System Design

\`\`\`js
const app = "KARMA";
\`\`\`
`}
                spellCheck={false}
                className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-7 text-neutral-200 outline-none placeholder:text-neutral-600 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
              />
              <button
                onClick={() => {
                  SetEdit(!edit);
                  updateAbout();
                }}
                className="cursor-pointer absolute bottom-2 right-5 flex h-8 w-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/70 font-mono text-sm text-neutral-200 backdrop-blur-sm transition-all duration-200 hover:border-[#ce8a14]/70 hover:bg-[#ce8a14]/10 hover:text-[#f5c56b] active:scale-95"
              >
                {edit ? "Preview" : "Compose"}
              </button>
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-5 text-4xl font-bold text-white">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mt-6 mb-4 text-2xl font-semibold text-neutral-100">
                    {children}
                  </h2>
                ),

                p: ({ children }) => (
                  <p className="mb-4 leading-7 text-neutral-300">{children}</p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 ml-5 list-disc space-y-2 text-neutral-300">
                    {children}
                  </ul>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-purple-500 pl-4 italic text-neutral-400">
                    {children}
                  </blockquote>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#8B5CF6] underline decoration-[#8B5CF6]/40 underline-offset-4 transition-all duration-200 hover:text-[#A78BFA] hover:decoration-[#A78BFA]"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutMD;
