"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Rowdies } from "next/font/google";
import { easeInOut, motion } from "framer-motion";
import { IconEdit } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AboutMD = () => {
  const about = `
# Hi, I'm Himanshu 👋

Backend Engineer building AI-powered SaaS.

## 🚀 Currently Building

- **कARMA** — Developer Productivity Platform
- Legal AI workflows at Samanyay AI

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Next.js
- PostgreSQL

## 📌 Goals

- [x] Ship KARMA MVP
- [x] Reach 500 active users
- [ ] Learn Kubernetes

## Favourite Snippet



> "Small improvements every day compound into mastery."
`;
  const [edit, SetEdit] = useState(false);
  const [markdown, setMarkdown] = useState("");
  return (
    <>
      <div className="h-full w-full border border-neutral-700 rounded-lg flex flex-col gap-1 md:gap-2">
        {/* Headline */}
        <div className="h-11 md:h-15 w-full border-b border-neutral-500 flex flex-row justify-between items-center p-3 font-mono">
          <span className="text-neutral-200 text-lg md:text-xl ">स्वरूप</span>
          <div className="flex flex-row justify-center items-center">
            <span className="text-neutral-400 text-md md:text-lg border-r border-neutral-400 px-2">
              About.md
            </span>
            <button
              className="text-neutral-300 px-1"
              onClick={() => SetEdit(!edit)}
            >
              <IconEdit className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 border border-neutral-400 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700">
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
                className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-7 text-neutral-200 outline-none placeholder:text-neutral-600"
              />
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
                  <h2 className="mb-4 mt-6 text-2xl font-semibold text-neutral-100">
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
              }}
            >
              {about}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutMD;
