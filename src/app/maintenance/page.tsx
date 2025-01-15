"use client";

import { useState, useEffect } from "react";
import { useMetadata } from "@/utils/MetadataContext";
import { useRouter } from "next/navigation";

export default function Maintenance() {
  useMetadata("Maintenance");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/maintenance/progress");
        const data = await res.json();
        setTimeLeft(data.timeLeft);
        setProgress(data.progress);

        if (data.progress === 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/"), 3000);
        }
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    fetchData();

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8 transition-all duration-300">
      <div className="glass w-full max-w-lg md:max-w-3xl bg-transparent shadow-xl rounded-lg p-8 transition-all duration-300">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <h2 className="card-title text-white/50 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 text-center drop-shadow-xl transition-all duration-300">
            Under Maintenance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center justify-center transition-all duration-300">
            <div className="flex flex-col p-4 bg-primary rounded-lg text-white shadow-lg items-center justify-center transition-all duration-300">
              <span className="countdown font-mono text-5xl sm:text-6xl lg:text-7xl">
                <span style={{ "--value": timeLeft.days } as React.CSSProperties}>{timeLeft.days}</span>
              </span>
              <span className="text-sm mt-1 sm:text-base lg:text-lg">days</span>
            </div>
            <div className="flex flex-col p-4 bg-secondary rounded-lg text-white shadow-lg items-center justify-center transition-all duration-300">
              <span className="countdown font-mono text-5xl sm:text-6xl lg:text-7xl">
                <span style={{ "--value": timeLeft.hours } as React.CSSProperties}>{timeLeft.hours}</span>
              </span>
              <span className="text-sm mt-1 sm:text-base lg:text-lg">hours</span>
            </div>
            <div className="flex flex-col p-4 bg-accent rounded-lg text-white shadow-lg items-center justify-center transition-all duration-300">
              <span className="countdown font-mono text-5xl sm:text-6xl lg:text-7xl">
                <span style={{ "--value": timeLeft.minutes } as React.CSSProperties}>{timeLeft.minutes}</span>
              </span>
              <span className="text-sm mt-1 sm:text-base lg:text-lg">min</span>
            </div>
            <div className="flex flex-col p-4 bg-error rounded-lg text-white shadow-lg items-center justify-center transition-all duration-300">
              <span className="countdown font-mono text-5xl sm:text-6xl lg:text-7xl">
                <span style={{ "--value": timeLeft.seconds } as React.CSSProperties}>{timeLeft.seconds}</span>
              </span>
              <span className="text-sm mt-1 sm:text-base lg:text-lg">sec</span>
            </div>
          </div>
          <div className="mt-8 w-full">
            <progress
              className={`progress ${progress === 100 ? "progress-success" : "progress-primary"} w-full`}
              value={progress}
              max="100"
            ></progress>
            <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-mono mt-2 text-center">
              {progress === 100 ? (
                <div>Complete!</div>
              ) : (
                <>
                  <div>{progress.toFixed(2)}%</div>
                  <div>Almost there, just a few more days!</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
