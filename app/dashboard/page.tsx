"use client";

import { apps } from "@/data/apps";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuthCookie } from "@/app/actions/auth";
import AppCard from "@/components/AppCard";
import { LogOut } from "lucide-react";

export default function Dashboard() {
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
              "radial-gradient(circle, oklch(0.968 0.211 109.7692 / 0.18) 0%, oklch(0.968 0.211 109.7692 / 0.06) 50%, transparent 70%)",
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

      <header className="w-full flex items-center justify-center sticky top-0 p-2 backdrop-blur-xs z-50">
        <div className="flex items-center justify-between w-full md:max-w-7xl">
          <img
            src="/neuralarc.svg"
            alt="NeuralArc"
            className="h-12 w-auto block"
          />
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded cursor-pointer border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "hsl(var(--background) / 0.6)",
            }}
          >
            <LogOut />
          </button>
        </div>
      </header>

      {/* Floating Header Elements */}
      {/* <div className="fixed top-6 left-6 z-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
        </div>
      </div>

      <div className="fixed top-6 right-6 z-50">
      </div> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="w-full px-8 py-16 pt-24">
          {/* Hero Section */}
          <div className="mb-16 max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase border border-primary/30 bg-primary/10 text-primary">
                Workspace
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent">
              App Suite
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto font-medium">
              Powered by Helium
            </p>
          </div>

          {/* Apps Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative min-h-[600px]">
              {/* Top Left - Kiwi */}
              <div className="md:col-start-1 md:row-start-1 flex items-start justify-center">
                {filteredApps.find((app) => app.name === "Kiwi") && (
                  <div className="w-full max-w-xs">
                    <AppCard
                      key={filteredApps.find((app) => app.name === "Kiwi")?.id}
                      app={filteredApps.find((app) => app.name === "Kiwi")!}
                    />
                  </div>
                )}
              </div>

              {/* Top Right - Mint */}
              <div className="md:col-start-3 md:row-start-1 flex items-start justify-center">
                {filteredApps.find((app) => app.name === "Mint") && (
                  <div className="w-full max-w-xs">
                    <AppCard
                      key={filteredApps.find((app) => app.name === "Mint")?.id}
                      app={filteredApps.find((app) => app.name === "Mint")!}
                    />
                  </div>
                )}
              </div>

              {/* Center - Stratos */}
              <div className="md:col-start-2 md:row-start-1 md:row-span-2 flex items-center justify-center order-first md:order-none">
                {filteredApps.find((app) => app.name === "Stratos") && (
                  <div className="w-full max-w-xs">
                    <AppCard
                      key={
                        filteredApps.find((app) => app.name === "Stratos")?.id
                      }
                      app={filteredApps.find((app) => app.name === "Stratos")!}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Left - Drift */}
              <div className="md:col-start-1 md:row-start-2 flex items-end justify-center">
                {filteredApps.find((app) => app.name === "Drift") && (
                  <div className="w-full max-w-xs">
                    <AppCard
                      key={filteredApps.find((app) => app.name === "Drift")?.id}
                      app={filteredApps.find((app) => app.name === "Drift")!}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Right - Chronos */}
              <div className="md:col-start-3 md:row-start-2 flex items-end justify-center">
                {filteredApps.find((app) => app.name === "Chronos") && (
                  <div className="w-full max-w-xs">
                    <AppCard
                      key={
                        filteredApps.find((app) => app.name === "Chronos")?.id
                      }
                      app={filteredApps.find((app) => app.name === "Chronos")!}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-left">
        <div className="flex items-center justify-start gap-2 max-w-6xl mx-auto px-8">
          <img src="/neuralarc.webp" alt="NeuralArc" className="h-5 w-auto" />
          <p className="text-sm text-muted-foreground font-sora">
            A product by NeuralArc
          </p>
        </div>
      </footer>
    </div>
  );
}
