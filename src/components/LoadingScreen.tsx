import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import logo from "@/assets/quantum-draft-logo.png";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SECURE NODE...");
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  // 1. Progress Counter Simulation
  useEffect(() => {
    const duration = 2200; // Total loading time (ms)
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
      }
      setProgress(Math.floor(currentProgress));
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // 2. Terminal Log Subtitle Updates
  useEffect(() => {
    if (progress < 20) {
      setStatusText("CONNECTING CORE ARRAYS...");
    } else if (progress < 45) {
      setStatusText("RENDERING DESIGN SYSTEMS...");
    } else if (progress < 70) {
      setStatusText("ESTABLISHING NEURAL DECORATORS...");
    } else if (progress < 90) {
      setStatusText("OPTIMIZING COHESIVE ANIMATIONS...");
    } else {
      setStatusText("TRANSMISSION ESTABLISHED.");
    }
  }, [progress]);

  // 3. GSAP Slide-up/Fade Exit animation on 100% progress
  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline();
      
      tl.to(elementsRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut"
      });

      tl.to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut"
      }, "-=0.2");
    }
  }, [progress]);

  // Circumference calculation for circular SVG tracer
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020203] select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Background Dots Pattern & Mesh Gradient */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(255,255,255,.15)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Elements Wrapper */}
      <div ref={elementsRef} className="flex flex-col items-center justify-center relative z-10 px-6 max-w-sm text-center">
        
        {/* Logo and SVG Circular Loader */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          
          {/* Subtle Outer Glow */}
          <div className="absolute w-28 h-28 bg-blue-500/10 blur-[30px] rounded-full animate-pulse" />
          
          {/* SVG Progress Circle */}
          <svg className="w-full h-full transform -rotate-90 absolute">
            {/* Background Track Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-white/[0.03] fill-none"
              strokeWidth="2.5"
            />
            {/* Active Drawing Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-blue-500 fill-none transition-all duration-75"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.5))",
              }}
            />
          </svg>

          {/* Logo Brand Image */}
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain relative z-10 animate-pulse"
          />
        </div>

        {/* Monospace System Log Details */}
        <div className="space-y-3 font-mono">
          
          {/* Percent Value */}
          <div className="text-4xl font-extrabold text-white tracking-wider">
            {progress.toString().padStart(3, "0")}<span className="text-blue-500 text-2xl">%</span>
          </div>

          {/* Micro Status Message */}
          <div className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-bold min-h-[14px]">
            {statusText}
          </div>

          {/* Horizontal Progress Bar */}
          <div className="w-48 h-[2px] bg-white/[0.05] rounded-full mx-auto relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
