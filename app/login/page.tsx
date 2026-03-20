"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "@/app/actions/auth";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeBox, setActiveBox] = useState(0);
  const router = useRouter();

  const handleLoginWithPin = async (currentPin: string) => {
    setError("");
    setIsLoading(true);

    const VALID_PIN = "1234";

    if (currentPin === VALID_PIN) {
      try {
        await setAuthCookie();
        localStorage.setItem("auth_token", "authenticated");
        router.push("/dashboard");
        router.refresh();
      } catch {
        setError("Failed to sign in. Please try again.");
        setIsLoading(false);
      }
    } else {
      setError("Invalid PIN");
      setIsLoading(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newPin = pin.split("");
    newPin[index] = value.replace(/\D/g, "");

    if (value && index < 3) {
      setActiveBox(index + 1);
    }

    const updatedPin = newPin.join("");
    setPin(updatedPin);

    if (updatedPin.length === 4 && index === 3 && value) {
      handleLoginWithPin(updatedPin);
    }
  };

  const handleBoxClick = (index: number) => {
    setActiveBox(index);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newPin = pin.split("");
      newPin[index] = "";

      setPin(newPin.join(""));

      if (index > 0) {
        setActiveBox(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveBox(index - 1);
    } else if (e.key === "ArrowRight" && index < 3) {
      setActiveBox(index + 1);
    }
  };

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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md px-8">
          <div
            className="rounded-2xl p-8 relative transition-all duration-500"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--card) / 0.1) 0%, hsl(var(--card) / 0.06) 100%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid hsl(var(--border) / 0.3)",
              boxShadow:
                "0 4px 24px -1px hsl(var(--foreground) / 0.06), inset 0 1px 0 hsl(var(--foreground) / 0.2), 0 0 0 1px hsl(var(--border) / 0.05)",
            }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-linear-to-r from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent font-sora">
                App Suite
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                Sign in to your workspace
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4 max-w-64 mx-auto">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="password"
                    inputMode="numeric"
                    value={pin[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onClick={() => handleBoxClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(input) => {
                      if (input && activeBox === index) {
                        setTimeout(() => input.focus(), 0);
                      }
                    }}
                    disabled={isLoading}
                    maxLength={1}
                    className={`w-full aspect-square rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-sora text-center text-lg font-semibold ${
                      activeBox === index
                        ? "ring-2 ring-primary/50 ring-offset-2"
                        : ""
                    }`}
                    style={{
                      caretColor: "transparent",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  />
                ))}
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground font-sora text-sm">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  Signing in...
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-sora">{error}</p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground font-sora">
                Secure authentication powered by NeuralArc
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
