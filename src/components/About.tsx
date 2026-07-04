import { useState } from "react";
import { ShieldCheck, Target, Heart, Eye, Milestone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  const tabContents = {
    mission: {
      title: "Our Mission",
      desc: "To empower modern enterprises by building high-performance, secure, and intelligent digital products. We bridge the gap between complex technology and clean user experiences, enabling scalable operational efficiency and sustainable business growth.",
      icon: Target,
      color: "text-blue-400 bg-blue-500/10",
    },
    vision: {
      title: "Our Vision",
      desc: "To lead the global paradigm shift towards autonomous, AI-driven business infrastructures. We envision a future where software operates seamlessly, adapting and learning continuously to unlock human potential and spark structural innovation.",
      icon: Eye,
      color: "text-cyan-400 bg-cyan-500/10",
    },
    values: {
      title: "Core Values",
      desc: "Integrity, technological excellence, and client-centricity. We build trust by maintaining extreme transparency in code and design, engineering robust, future-proof architectures, and measuring our success solely by our clients' growth.",
      icon: Heart,
      color: "text-purple-400 bg-purple-500/10",
    },
  };

  const timelineMilestones = [
    { year: "2022", title: "Agency Genesis", desc: "Formed a team of core developers focused on custom web and mobile architectures." },
    { year: "2023", title: "KPR Incubation", desc: "Partnered with KPR Hub to accelerate engineering research and deep-tech integrations." },
    { year: "2024", title: "AI & Cloud Pivots", desc: "Successfully scaled enterprise operations, integrating vector DBs and cloud LLMs." },
    { year: "2026", title: "Global Scaling", desc: "Delivering secure microservice products for global technology and retail brands." },
  ];

  return (
    <section id="about" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2">
      {/* Background circles */}
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section title */}
        <div className="text-left mb-16 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            Engineering High-Performance <span className="gradient-text-blue">Software & Intelligence</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Story + Tabs */}
          <div className="space-y-8">
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-sans">
              QuantumDraft is a digital innovation and software engineering agency. We specialize in architecting custom cloud ecosystems, integrating artificial intelligence tools, and developing high-throughput web systems. Backed by state-of-the-art incubation, we deliver clean, modular software that handles complexity seamlessly.
            </p>

            {/* Interactive Tabs Menu */}
            <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] max-w-md">
              {(["mission", "vision", "values"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Active Tab Content Card */}
            <div className="glass-panel p-8 min-h-[220px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 font-sans"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tabContents[activeTab].color}`}>
                      {(() => {
                        const Icon = tabContents[activeTab].icon;
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      {tabContents[activeTab].title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed pt-2">
                    {tabContents[activeTab].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Visual Timeline */}
          <div className="glass-panel p-8 md:p-10 space-y-8">
            <div className="flex items-center gap-3.5 border-b border-white/[0.05] pb-5">
              <Milestone className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Company Timeline</h3>
            </div>

            <div className="relative border-l border-white/[0.06] pl-6 ml-3 space-y-10">
              {timelineMilestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline point indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-blue-500 bg-[#050505] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  
                  {/* Milestone Content */}
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
                      {milestone.year}
                    </span>
                    <h4 className="text-sm font-semibold text-white font-sans uppercase tracking-wide group-hover:text-blue-300 transition-colors">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed font-sans mt-1.5">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
