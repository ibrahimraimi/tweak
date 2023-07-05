"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { VibeToggle } from "@/components/vibe-toggle";
import { VibeType } from "@/types";

export default function Home() {
  const [bio, setBio] = React.useState<string>("");
  const [vibe, setVibe] = React.useState<VibeType>("Professional");

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <a
            className={cn(
              "flex max-w-full items-center justify-center rounded-full border border-gray-300 bg-muted px-4 py-2 text-sm text-primary shadow-md transition-colors mb-5"
            )}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={cn("px-4 text-[2rem]")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </span>
            <p>Star on GitHub</p>
          </a>
          <h1 className="font-heading font-bold text-primary text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Generate your next Twitter bio using OpenAI GPT-3
          </h1>
        </div>

        <div className="container max-w-xl w-full">
          <div className="flex mt-10 pb-5 items-center space-x-3">
            <span className="flex justify-center items-center text-center mb-5 sm:mb-0 h-[30px] w-[30px] text-primary-foreground dark:text-white font-bold bg-primary dark:bg-primary-foreground p-2 rounded-full">
              1
            </span>
            <p className="text-left font-medium">
              Copy your current bio{" "}
              <span className=" text-slate-500 dark:text-slate-500">
                (or write a few sentences about yourself)
              </span>
            </p>
          </div>

          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com."
          />

          <div className="flex mt-10 pb-5 items-center space-x-3">
            <span className="flex justify-center items-center text-center mb-5 sm:mb-0 h-[30px] w-[30px] text-primary-foreground dark:text-white font-bold bg-primary dark:bg-primary-foreground p-2 rounded-full">
              2
            </span>
            <p className="text-left font-medium">Select your vibe</p>
          </div>
          <div className="grid w-full gap-2">
            <VibeToggle vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>
        </div>
      </section>
    </>
  );
}
