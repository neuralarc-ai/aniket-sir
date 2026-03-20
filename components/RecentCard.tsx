"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AppItem } from "@/types/app";

export default function RecentCard({ app }: { app: AppItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => window.open(app.url, "_blank")}
      className="cursor-pointer relative group"
    >
      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px] pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-card" />
      </div>

      <div className="relative flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border group-hover:border-primary/50 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-muted relative shrink-0 overflow-hidden">
          <Image src={app.icon} alt={app.name} fill className="object-cover" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-foreground truncate">
            {app.name}
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            {new URL(app.url).hostname}
          </p>
        </div>
        <span className="ml-auto text-muted-foreground text-xs shrink-0">
          ↗
        </span>
      </div>
    </motion.div>
  );
}
