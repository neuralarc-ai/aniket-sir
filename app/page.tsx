"use client";

import { apps } from "@/data/apps";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "@/app/actions/auth";
import AppCard from "@/components/AppCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState({ dayAndDate: "", message: "" });
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }

    // Set dynamic greeting based on time and day
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const dayAndDate = `${dayName}, ${monthName} ${date}`;

    const hour = now.getHours();

    let emoji = "";
    let timeOfDay = "";

    if (hour < 12) {
      emoji = "👋";
      timeOfDay = "morning";
    } else if (hour < 18) {
      emoji = "☀️";
      timeOfDay = "afternoon";
    } else {
      emoji = "🌙";
      timeOfDay = "evening";
    }

    setGreeting({
      dayAndDate: dayAndDate,
      message: `Good ${timeOfDay} ${emoji}`,
    });
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    await clearAuthCookie();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={{
        background:
          "radial-gradient(circle at center, hsl(var(--background)) 0%, oklch(0.8828 0.0285 98.1033 / 0.08) 40%, oklch(0.8828 0.0285 98.1033 / 0.04) 70%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundSize: "40px 40px",
            backgroundImage:
              "linear-gradient(to right, oklch(0.8828 0.0285 98.1033 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.8828 0.0285 98.1033 / 0.08) 1px, transparent 1px)",
            maskImage:
              "radial-gradient(circle at center, black 50%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 50%, transparent 85%)",
          }}
        ></div>
        <div
          className="animate-blob"
          style={{
            position: "absolute",
            pointerEvents: "none",
            borderRadius: "50%",
            filter: "blur(120px)",
            zIndex: 0,
            opacity: 0.4,
            background:
              "radial-gradient(circle, oklch(0.8677 0.0735 7.0855 / 0.25) 0%, oklch(0.8677 0.0735 7.0855 / 0.1) 50%, transparent 70%)",
            width: "600px",
            height: "600px",
            top: "-200px",
            left: "-100px",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="animate-blob-reverse"
          style={{
            position: "absolute",
            pointerEvents: "none",
            borderRadius: "50%",
            filter: "blur(140px)",
            zIndex: 0,
            opacity: 0.4,
            background:
              "radial-gradient(circle, oklch(0.8148 0.0819 225.7537 / 0.2) 0%, oklch(0.8148 0.0819 225.7537 / 0.08) 50%, transparent 70%)",
            width: "800px",
            height: "800px",
            top: "20%",
            right: "10%",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="animate-blob"
          style={{
            position: "absolute",
            pointerEvents: "none",
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: 0,
            opacity: 0.4,
            background:
              "radial-gradient(circle, oklch(0.9680 0.2110 109.7692 / 0.18) 0%, oklch(0.9680 0.2110 109.7692 / 0.06) 50%, transparent 70%)",
            width: "500px",
            height: "500px",
            bottom: "-100px",
            left: "20%",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, oklch(0.8828 0.0285 98.1033 / 0.06) 30%, oklch(0.8828 0.0285 98.1033 / 0.03) 60%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 px-6 py-2 border-b border-border bg-background/50 backdrop-blur-lg z-50 flex items-center justify-center">
        <div className="flex items-center justify-between md:max-w-7xl">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/neuralarc.svg"
              alt="NeuralArc"
              className="h-12 w-auto block"
            />
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-20 relative z-10">
        <div className="w-full px-8 py-16">
          {/* Hero Section */}
          <div className="mb-16 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                  {greeting.dayAndDate}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground/90">
                  {greeting.message}
                </h2>
              </div>

              <div className="text-center flex-1">
                <div className="inline-flex items-center justify-center mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-primary/30 bg-primary/10 text-primary">
                    Workspace
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
                  App Suite
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto font-medium">
                  All internal apps at one place
                </p>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
