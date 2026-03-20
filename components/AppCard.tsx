"use client";

import { AppItem } from "@/types/app";
import KiwiIcon from "./icons/KiwiIcon";
import { ArrowUpRight, Box, CalendarRange } from "lucide-react";

// ---------------- ICONS ----------------

const SvgWrapper = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const ICON_MAP: Record<string, React.ReactNode> = {
  "kiwi-svg": <KiwiIcon />,
  "mint-svg": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M 108 0 C 119.046 0 128 8.954 128 20 L 128.007 19.483 C 128.281 8.676 137.127 0 148 0 L 236 0 C 247.046 0 256 8.954 256 20 L 256 108 C 256 119.046 247.046 128 236 128 C 247.046 128 256 136.954 256 148 L 256 236 C 256 247.046 247.046 256 236 256 L 148 256 C 136.954 256 128 247.046 128 236 C 128 247.046 119.046 256 108 256 L 20 256 C 8.954 256 0 247.046 0 236 L 0 148 C 0 137.127 8.676 128.281 19.483 128.007 L 20 128 C 8.954 128 0 119.046 0 108 L 0 20 C 0 8.954 8.954 0 20 0 Z M 128 64 C 128 99.346 99.346 128 64 128 C 99.346 128 128 156.654 128 192 C 128 156.654 156.654 128 192 128 C 156.654 128 128 99.346 128 64 Z" />
    </svg>
  ),
  "admin-svg": (
    <img src="/logo-dark.svg" alt="Admin Dashboard" className="w-16 h-16" />
  ),
  "drift-svg": <Box strokeWidth={1.5} size={84} />,
  "calendar-svg": <CalendarRange strokeWidth={1.5} size={84} />,
};

// ---------------- COLORS ----------------

const COLOR_MAP: Record<string, string> = {
  Kiwi: "primary",
  Mint: "secondary",
  Stratos: "accent",
  Chronos: "ring",
};

// ---------------- COMPONENT ----------------

export default function AppCard({ app }: { app: AppItem }) {
  const colorVar = COLOR_MAP[app.name] || "ring";

  const handleOpen = () => {
    window.open(app.url, "_blank", "noopener,noreferrer");
  };

  const icon = ICON_MAP[app.icon] ?? (
    <span className="text-3xl">{app.icon}</span>
  );

  return (
    <div
      onClick={handleOpen}
      className="group relative cursor-pointer border border-border/50 hover:border-border transition-all duration-500 ease-in-out rounded-xl hover:scale-105"
    >
      {/* Card */}
      <div
        className="rounded-2xl p-8 flex flex-col items-center justify-center relative aspect-square max-w-[320px]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--card) / 0.1), hsl(var(--card) / 0.06))",
          backdropFilter: "blur(6px)",
          border: "1px solid hsl(var(--border) / 0.3)",
          boxShadow: "0 4px 24px -1px hsl(var(--foreground) / 0.06)",
        }}
      >
        {/* Open Button (always visible now) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="transition-all duration-300 ease-in-out absolute top-2 right-2 aspect-square p-1 border rounded-lg group-hover:bg-primary group-hover:text-background text-xs flex items-center gap-1"
        >
          <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-500 ease-in-out" />
        </button>

        {/* Icon */}
        <div
          className="w-24 h-24 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 duration-700 transition-all ease-in-out"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted) / 0.8))",
            borderColor: "hsl(var(--border) / 0.1)",
          }}
        >
          <div style={{ color: `hsl(var(--${colorVar}))` }}>{icon}</div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-2 tracking-tight">{app.name}</h3>
        <p className="text-base font-medium text-muted-foreground">
          {app.description}
        </p>
      </div>
    </div>
  );
}
