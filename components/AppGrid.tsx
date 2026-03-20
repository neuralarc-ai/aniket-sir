"use client";

import { useState, useMemo } from "react";
import { apps } from "@/data/apps";
import AppCard from "./AppCard";
import RecentCard from "./RecentCard";
import { BellIcon } from "./Icons";

const CATEGORIES = ["All", "AI", "Tools", "Personal"];

export default function AppGrid() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(
    () =>
      apps.filter((a) => {
        const matchesSearch = a.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesTab = activeTab === "All" || a.category === activeTab;
        return matchesSearch && matchesTab;
      }),
    [query, activeTab],
  );

  const recent = apps.slice(0, 3);

  return (
    <>
      {/* Topbar */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-medium text-foreground tracking-tight">
          My Apps
        </h1>
        <div className="ml-auto relative max-w-[260px] w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps..."
            className="w-full bg-input border border-border rounded-xl py-1.5 pl-8 pr-3 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button className="w-8 h-8 rounded-lg bg-input border border-border flex items-center justify-center relative hover:bg-muted transition">
          <BellIcon />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3.5 py-1 rounded-full text-xs font-medium border transition ${
              activeTab === cat
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Apps */}
      <section>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
          All Apps
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {filtered.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-5 text-center text-muted-foreground text-sm py-10">
              No apps found
            </p>
          )}
        </div>
      </section>

      {/* Recent */}
      <section>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
          Recently Opened
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {recent.map((app) => (
            <RecentCard key={app.id} app={app} />
          ))}
        </div>
      </section>
    </>
  );
}
