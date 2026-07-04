import { useEffect, useState } from "react";
import { 
  Cpu, 
  Code2, 
  Smartphone, 
  Cloud, 
  Palette, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Presentation,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Cpu,
    title: "AI Solutions",
    desc: "Custom LLMs, vector database search integrations, neural networks, predictive learning, and natural language algorithms.",
    badge: "Advanced"
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "High-performance, secure single-page applications, custom CMS modules, and web portals built with React and Next.js.",
    badge: "Core"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Multi-platform iOS and Android applications utilizing Flutter and React Native for beautiful native execution.",
    badge: "Hybrid"
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    desc: "Robust deployment infrastructure, serverless architectures, Kubernetes management, and continuous CI/CD pipelines.",
    badge: "Scale"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Immersive user research, interactive wireframing, high-end prototyping, and scalable design systems for SaaS.",
    badge: "Creative"
  },
  {
    icon: Zap,
    title: "Automation & API",
    desc: "Orchestrating custom API middleware pipelines, chatbot agents, and automated no-code tool synchronizations.",
    badge: "Efficiency"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Data-led user acquisition campaigns, SEO performance audits, growth strategies, and search engine visibility optimizations.",
    badge: "Growth"
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    desc: "Deep reporting telemetry, clickstream user tracking pipelines, behavioral analytics engines, and data pipeline warehousing.",
    badge: "Telemetry"
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Zero-trust network frameworks, static audit checks, automated server hardening, TLS and OAuth2 authentication setups.",
    badge: "SecOps"
  },
  {
    icon: Presentation,
    title: "Business Intelligence",
    desc: "Constructing interactive dashboard analytics pipelines, real-time KPI aggregations, and business process modeling.",
    badge: "Strategy"
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCards = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, services.length - visibleCards);

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="section-padding bg-[#050505] relative overflow-hidden border-t border-b border-white/[0.03] mesh-gradient-1">
      {/* Background glow circle */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              Full-Spectrum <span className="gradient-text-blue">Technology Engineering</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === 0 
                  ? "border-white/10 text-white/20 cursor-not-allowed" 
                  : "border-white/20 hover:border-white text-white hover:bg-white/5 active:scale-95"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={activeIndex === maxIndex}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeIndex === maxIndex 
                  ? "border-white/10 text-white/20 cursor-not-allowed" 
                  : "border-white/20 hover:border-white text-white hover:bg-white/5 active:scale-95"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Flat Slider Container */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${activeIndex * (100 / visibleCards)}%)` }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.title} 
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3"
                >
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 24px 60px rgba(59, 130, 246, 0.08)",
                      borderColor: "rgba(59, 130, 246, 0.2)"
                    }}
                    onClick={() => scrollToSection("contact")}
                    className="group relative p-8 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer text-left"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div>
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                          <Icon className="w-5 h-5 transition-transform duration-500 group-hover:rotate-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[9px] font-bold text-white/50 tracking-wider uppercase group-hover:text-blue-300 group-hover:border-blue-500/20 transition-colors font-mono">
                          {service.badge}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide group-hover:text-blue-300 transition-colors mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans font-normal">
                        {service.desc}
                      </p>
                    </div>

                    {/* Footer link */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 group-hover:text-blue-400 pt-6 mt-6 border-t border-white/[0.03] transition-colors">
                      <span>Enquire Capabilities</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar / Indicator Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeIndex === i 
                  ? "w-8 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
