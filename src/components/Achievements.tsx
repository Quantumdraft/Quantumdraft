import { useEffect, useState, useRef } from "react";
import { Heart, Award, Rocket, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

const CounterItem = ({ target, duration = 2, label, suffix = "", icon: Icon }: { target: number; duration?: number; label: string; suffix?: string; icon: any }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalFrames = duration * 60;
    let frame = 0;

    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad formula
      const easedProgress = progress * (2 - progress);
      const currentCount = Math.floor(easedProgress * (end - start) + start);

      setCount(currentCount);

      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(counter);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl flex flex-col items-center text-center cursor-default">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-5xl font-bold tracking-tight text-white mb-2">
        {count}
        {suffix}
      </span>
      <span className="text-xs md:text-sm text-white/40 uppercase tracking-widest font-semibold font-sans mt-2">
        {label}
      </span>
    </div>
  );
};

const Achievements = () => {
  return (
    <section className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2 border-t border-white/[0.03]">
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Milestones</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Our Performance in <span className="gradient-text-blue">Numbers</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            A numerical snapshot of our engineering footprint, client relationships, and industry recognition.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CounterItem target={10} label="Active Clients" suffix="+" icon={Heart} />
          <CounterItem target={10} label="Projects Completed" suffix="+" icon={CheckCircle} />
          <CounterItem target={4} label="Years Operational" suffix="+" icon={Rocket} />
          <CounterItem target={6} label="Industry Awards" suffix="" icon={Award} />
        </div>

      </div>
    </section>
  );
};

export default Achievements;
