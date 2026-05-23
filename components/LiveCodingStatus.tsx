"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DiscordActivity {
  type: number;
  name: string;
  id: string;
  details?: string;
  state?: string;
  created_at: number;
  assets?: {
    large_text?: string;
    large_image?: string;
    small_text?: string;
    small_image?: string;
  };
}

interface LanyardResponse {
  data: {
    activities: DiscordActivity[];
    discord_status: string;
  };
  success: boolean;
}

interface LiveCodingStatusProps {
  defaultTitle: string;
  defaultDescription: string;
  defaultImg?: string;
  defaultImgClassName?: string;
  defaultSpareImg?: string;
  titleClassName?: string;
}

export const LiveCodingStatus = ({
  defaultTitle,
  defaultDescription,
  defaultImg,
  defaultImgClassName,
  defaultSpareImg,
  titleClassName,
}: LiveCodingStatusProps) => {
  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;

  const [statusData, setStatusData] = useState<{
    isCoding: boolean;
    ideName: string;
    details: string;
    state: string;
    createdAt: number;
    fileName: string;
  } | null>(null);

  // Poll Lanyard API
  useEffect(() => {
    if (!discordId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json: LanyardResponse = await res.json();
        
        if (json.success && json.data.activities) {
          const ideNames = [
            "visual studio code",
            "vscode",
            "webstorm",
            "pycharm",
            "intellij",
            "sublime text",
            "neovim",
            "eclipse",
            "android studio",
            "xcode",
            "code"
          ];
          
          // Find active IDE playing activity (type 0)
          const ideActivity = json.data.activities.find(
            (act) =>
              act.type === 0 &&
              ideNames.some((ide) => act.name.toLowerCase().includes(ide))
          );

          if (ideActivity) {
            const details = ideActivity.details || "Editing code";
            const state = ideActivity.state || "Active Session";
            
            // Extract filename from details
            const fileRegex = /([\w-]+\.[\w]+)/;
            const match = details.match(fileRegex);
            const fileName = match ? match[1] : "index.ts";

            setStatusData({
              isCoding: true,
              ideName: ideActivity.name,
              details,
              state,
              createdAt: ideActivity.created_at,
              fileName,
            });
            return;
          }
        }
        setStatusData(null);
      } catch (err) {
        console.error("Error fetching Lanyard status:", err);
        setStatusData(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [discordId]);

  // Live timer for coding session duration
  const [elapsedTime, setElapsedTime] = useState("");
  useEffect(() => {
    if (!statusData?.createdAt) return;

    const updateTimer = () => {
      const diff = Date.now() - statusData.createdAt;
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      let timerStr = "";
      if (hrs > 0) timerStr += `${hrs}h `;
      timerStr += `${mins}m ${secs}s`;
      setElapsedTime(timerStr);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [statusData?.createdAt]);

  // Fallback to static portfolio contents if no active coding session
  if (!discordId || !statusData || !statusData.isCoding) {
    return (
      <div className="h-full w-full flex flex-col justify-between">
        <div className="absolute h-full w-full overflow-hidden">
          {defaultImg && (
            <Image
              width={689}
              height={541}
              src={defaultImg}
              alt="Default static block"
              className={cn("object-cover object-center", defaultImgClassName)}
            />
          )}
        </div>

        <div className="absolute right-0 -mb-5 w-full opacity-80">
          {defaultSpareImg && (
            <Image
              width={208}
              height={96}
              src={defaultSpareImg}
              alt="Grid spacer"
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        <div className={cn("relative flex min-h-40 flex-col p-5 px-5 md:h-full lg:p-10", titleClassName)}>
          <div className="z-10 font-sans text-sm font-extralight text-[#c1c2d3] md:text-xs lg:text-base">
            {defaultDescription}
          </div>
          <div className="z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl">
            {defaultTitle}
          </div>
        </div>
      </div>
    );
  }

  // Render the Dynamic syntax highlighting
  const renderMockCode = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    
    if (ext === "py") {
      return (
        <pre className="font-mono text-[9px] md:text-[10px] lg:text-xs text-neutral-300 leading-relaxed">
          <span className="text-pink-500">def</span> <span className="text-blue-400">main</span>():<br />
          &nbsp;&nbsp;&nbsp;&nbsp;print(<span className="text-emerald-400">&quot;Deploying self-healing microservices...&quot;</span>)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;cloud_agent.status = <span className="text-emerald-400">&quot;ONLINE&quot;</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;cloud_agent.orchestrate()<br /><br />
          <span className="text-pink-500">if</span> __name__ == <span className="text-emerald-400">&quot;__main__&quot;</span>:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;main()
        </pre>
      );
    }

    if (ext === "css" || ext === "scss") {
      return (
        <pre className="font-mono text-[9px] md:text-[10px] lg:text-xs text-neutral-300 leading-relaxed">
          <span className="text-yellow-500">.cloud-system</span> &#123;<br />
          &nbsp;&nbsp;display: <span className="text-purple-400">flex</span>;<br />
          &nbsp;&nbsp;opacity: <span className="text-purple-400">1</span>;<br />
          &nbsp;&nbsp;background: <span className="text-emerald-400">linear-gradient</span>(45deg, #000, #111);<br />
          &nbsp;&nbsp;transition: <span className="text-purple-400">all 0.5s ease</span>;<br />
          &#125;
        </pre>
      );
    }

    // TSX/JSX/JS/TS fallback
    return (
      <pre className="font-mono text-[9px] md:text-[10px] lg:text-xs text-neutral-300 leading-relaxed">
        <span className="text-pink-500">import</span> &#123; CloudArchitect &#125; <span className="text-pink-500">from</span> <span className="text-emerald-400">"@/aws-cloud"</span>;<br />
        <span className="text-pink-500">import</span> &#123; useEffect, useState &#125; <span className="text-pink-500">from</span> <span className="text-emerald-400">"react"</span>;<br /><br />
        <span className="text-pink-500">export const</span> <span className="text-blue-400">SystemSync</span> = () =&gt; &#123;<br />
        &nbsp;&nbsp;console.log(<span className="text-emerald-400">"Autonomic control loop initialized"</span>);<br />
        &nbsp;&nbsp;<span className="text-pink-500">return</span> &lt;<span className="text-blue-400">Actuator</span> status=<span className="text-emerald-400">"ACTIVE"</span> /&gt;;<br />
        &#125;;
      </pre>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-between">
      {/* Background Spacer Grid */}
      <div className="absolute right-0 -mb-5 w-full opacity-60">
        {defaultSpareImg && (
          <Image
            width={208}
            height={96}
            src={defaultSpareImg}
            alt="Grid spacer"
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      {/* Dynamic Lanyard Live Status Overlay */}
      <div className="relative flex flex-col h-full w-full justify-between p-5 px-5 lg:p-10 z-10">
        
        {/* Left Side: Status Text Column */}
        <div className={cn("flex flex-col mb-4 md:mb-0", titleClassName)}>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
              Live Coding Session
            </span>
          </div>

          <div className="font-sans text-sm font-extralight text-[#c1c2d3] md:text-xs lg:text-base">
            {statusData.details}
          </div>
          <div className="max-w-96 font-sans text-lg font-bold lg:text-3xl mt-1 text-white leading-tight">
            Active in {statusData.ideName}
          </div>
          <div className="font-mono text-[9px] text-neutral-400 mt-2 tracking-wide uppercase">
            {statusData.state}
          </div>
        </div>

        {/* Right Side / Bottom: Beautiful IDE mockup */}
        <div className="relative w-full max-w-sm md:max-w-md bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl flex flex-col self-end mt-4">
          {/* Editor Header Tab Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              {/* Fake Window Buttons */}
              <div className="flex gap-1.5 mr-2">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[10px] text-neutral-300 flex items-center gap-1.5">
                <svg className="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
                {statusData.fileName}
              </span>
            </div>
            {/* Live elapsed timer */}
            <span className="font-mono text-[9px] text-neutral-400 bg-neutral-900/65 px-2 py-0.5 rounded border border-white/5">
              Timer: {elapsedTime}
            </span>
          </div>

          {/* Code Text Area */}
          <div className="flex p-4 gap-4 bg-black/25">
            {/* Line numbers */}
            <div className="flex flex-col text-right font-mono text-[9px] md:text-[10px] lg:text-xs text-neutral-600 select-none pr-2 border-r border-white/5">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
            </div>
            {/* Syntax block */}
            <div className="flex-1 overflow-x-auto">
              {renderMockCode(statusData.fileName)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
