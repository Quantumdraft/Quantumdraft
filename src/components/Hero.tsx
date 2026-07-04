import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Database, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { value: "10+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Industries Served" },
    { value: "24/7", label: "Diagnostic Support" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-20 mesh-gradient-1">
      {/* Premium Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 container-custom px-6 flex flex-col items-center text-center">
        
        {/* Floating tech pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300 font-sans">
            Next-Gen Tech Agency
          </span>
        </motion.div>

        {/* Headings */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8 font-sans"
          >
            Building Intelligent<br />
            <span className="gradient-text-blue">Digital Products</span><br />
            for Modern Businesses
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl font-sans font-normal leading-relaxed"
          >
            We design, build, and scale custom software systems, AI solutions, and automated workflows designed to drive growth and efficiency for enterprise companies.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto mb-20"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto text-sm px-8 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto text-sm px-8 h-14 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white font-semibold transition-all"
            >
              Book a Consultation
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating SaaS Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl relative mb-24"
        >
          {/* Glass panel visualizer */}
          <div className="relative glass-panel p-2 rounded-2xl border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 opacity-50" />
            
            {/* Mockup header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] bg-white/[0.01]">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <span className="text-[10px] text-white/35 font-mono">dashboard.quantumdraft.com</span>
              <div className="w-6" />
            </div>

            {/* Dashboard Mock Body */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/60 font-sans text-left">
              <div className="col-span-2 space-y-6">
                <div className="h-44 rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">Active Agents Execution</span>
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-semibold uppercase">Nominal</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-20">
                    {[35, 45, 30, 60, 40, 75, 50, 90, 65, 80, 55, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-[2px]" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-white/40 font-semibold uppercase">API Latency</span>
                    <span className="text-2xl font-bold text-white">12ms</span>
                    <span className="text-[9px] text-blue-400 font-mono">99.9% Uptime SLA</span>
                  </div>
                  <div className="h-28 rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-white/40 font-semibold uppercase">Data Streams</span>
                    <span className="text-2xl font-bold text-white">4.8 GB/s</span>
                    <span className="text-[9px] text-cyan-400 font-mono">Secure TLS 1.3</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Diagnostics */}
              <div className="space-y-4">
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5 space-y-4">
                  <span className="text-[10px] text-white/40 font-semibold uppercase block">System Topology</span>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-white/70 font-mono">Microservices Core</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-white/70 font-mono">Vector Storage</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-white/70 font-mono">Cognitive Shield</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating visual decorators */}
          <motion.div 
            variants={floatingVariants}
            animate="animate"
            className="absolute -top-6 -left-6 hidden md:flex items-center gap-3 p-3 glass-panel border border-white/[0.08]"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-white">Neural Optimizer</div>
              <div className="text-[9px] text-white/50">Active & Syncing</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Section */}
        <div className="w-full max-w-5xl pt-16 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-white/50 uppercase tracking-widest font-semibold">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
