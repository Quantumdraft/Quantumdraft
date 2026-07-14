import { useState } from "react";
import { ExternalLink, Github, ArrowRight, X, Shield, Cpu, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Landing Page", "Booking System", "Web App"];

const projects = [
  {
    title: "Rampex EdTech Landing Page",
    category: "Landing Page",
    desc: "Premium, conversion-driven landing page for an innovative EdTech platform, designed to streamline course discovery and student enrollment.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    link: "https://rampex.in",
    bg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    caseStudy: {
      challenge: "Rampex needed a high-performance, engaging landing page to showcase their online learning platform, courses, and educational tools to attract students and educators.",
      solution: "We developed a clean, modern EdTech landing page with smooth Framer Motion animations, interactive course categories, and an optimized student onboarding flow.",
      results: "Course inquiry rates increased by 58%, bounce rates dropped by 30%, and students reported a highly intuitive navigation experience.",
    }
  },
  {
    title: "KK Exports Landing Page",
    category: "Landing Page",
    desc: "High-performance corporate landing page designed to showcase global export operations and generate inbound trade leads.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    link: "https://kkexps.com",
    bg: "/assets/projects/kkexports_bg.png",
    caseStudy: {
      challenge: "KK Exports needed an authoritative and modern digital presence to showcase their international shipping and trade consulting services to global clients.",
      solution: "We engineered a visually stunning, fully responsive landing page optimized for speed, featuring interactive service showcases and contact funnels.",
      results: "Inbound leads increased by 45% and page speed index improved by 2.4s, establishing a strong international web presence.",
    }
  },
  {
    title: "RR Motors Booking Portal",
    category: "Booking System",
    desc: "Comprehensive web platform and booking system designed for a leading two-wheeler consulting and service company.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    link: "https://motors.org.in",
    bg: "/assets/projects/rrmotors_bg.png",
    caseStudy: {
      challenge: "The client needed a digital platform to manage two-wheeler consultations and a seamless online booking system for vehicle servicing and test rides.",
      solution: "We developed an interactive booking portal with real-time slot selection, service tracking, and automated consultation scheduling.",
      results: "Service booking efficiency improved by 80%, scheduling errors were eliminated, and customer engagement rose significantly.",
    }
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              Selected <span className="gradient-text-blue">Digital Breakthroughs</span>
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/[0.01] border border-white/[0.05] self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl bg-white/[0.01] border border-white/[0.05] overflow-hidden cursor-pointer"
                onClick={() => setSelectedCaseStudy(project)}
              >
                {/* Image Container with Zoom effect */}
                <div className="relative h-60 w-full overflow-hidden bg-black/40 border-b border-white/[0.05]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10 opacity-70" />
                  <img
                    src={project.bg}
                    alt={project.title}
                    className="h-full w-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 text-[9px] font-bold font-mono tracking-widest uppercase z-20">
                    {project.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-4 relative z-20">
                  <h3 className="text-xl font-bold text-white font-sans uppercase tracking-wide group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-sans font-normal">
                    {project.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-[9px] font-bold font-mono tracking-wider text-blue-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white/60 group-hover:text-blue-400 pt-6 mt-4 border-t border-white/[0.03] transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Modal Popup */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
              {/* Dismiss Area */}
              <div className="absolute inset-0" onClick={() => setSelectedCaseStudy(null)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl glass-panel p-8 md:p-12 max-h-[90vh] overflow-y-auto border border-white/10 z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="space-y-8 font-sans">
                  {/* Category Badge & Title */}
                  <div className="space-y-2 text-left">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">
                      Case Study // {selectedCaseStudy.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white font-sans uppercase tracking-wide">
                      {selectedCaseStudy.title}
                    </h3>
                  </div>

                  {/* Showcase details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    
                    {/* Challenge & Solution */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-blue-400" /> The Challenge
                        </h4>
                        <p className="text-sm text-white/75 leading-relaxed font-normal">
                          {selectedCaseStudy.caseStudy.challenge}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-cyan-400" /> The Solution
                        </h4>
                        <p className="text-sm text-white/75 leading-relaxed font-normal">
                          {selectedCaseStudy.caseStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results & Metadata */}
                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-6 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-indigo-400" /> The Results
                        </h4>
                        <p className="text-sm text-blue-300 font-bold leading-relaxed font-sans">
                          {selectedCaseStudy.caseStudy.results}
                        </p>
                      </div>

                      {/* Launch Button */}
                      <button
                        onClick={() => window.open(selectedCaseStudy.link, "_blank")}
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10"
                      >
                        Visit Launch Site <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
