import { useState } from "react";
import { Search, Compass, PencilRuler, Code, TestTube, Rocket, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    phase: "01",
    name: "Discovery",
    icon: Search,
    title: "Understanding & Strategy",
    desc: "We analyze your business targets, research user workflows, map out integrations, and align on a technical specification framework.",
    details: ["Requirements gathering", "Technical feasibility", "Scope definition", "Budget & schedule estimation"]
  },
  {
    phase: "02",
    name: "Planning",
    icon: Compass,
    title: "System Architecture Design",
    desc: "We design data models, cloud database topologies, API endpoints, microservices layouts, and select libraries/frameworks.",
    details: ["ERD database designs", "AWS/Google Cloud maps", "API specs creation", "Sprint planner setups"]
  },
  {
    phase: "03",
    name: "Design",
    icon: PencilRuler,
    title: "UI/UX & Interactive Prototypes",
    desc: "Our design team builds high-fidelity mockups, responsive screens, design systems, and animated interactive clickable previews.",
    details: ["Figma screens design", "Interactive click previews", "Typography & logo tokens", "Accessibility checks"]
  },
  {
    phase: "04",
    name: "Development",
    icon: Code,
    title: "Agile Coding Sprints",
    desc: "Our engineering squad develops modular frontend components, secure backend codebases, and integrates database hooks.",
    details: ["React & TypeScript setup", "FastAPI/Node backends", "Secure DB integrations", "Git merge reviews"]
  },
  {
    phase: "05",
    name: "Testing",
    icon: TestTube,
    title: "QA Auditing & Testing",
    desc: "We run end-to-end integration tests, static security checks, unit testing, performance metrics, and load balancing audits.",
    details: ["E2E cypress checks", "Jest unit testing", "JWT token validations", "Load balancing stress testing"]
  },
  {
    phase: "06",
    name: "Deployment",
    icon: Rocket,
    title: "Production Launch",
    desc: "We host codebases on production cloud servers (AWS/Vercel/Docker), wire secure DNS routes, and coordinate live release steps.",
    details: ["CI/CD automatic builds", "CDN static setups", "SSL certification checks", "Database migrations run"]
  },
  {
    phase: "07",
    name: "Support",
    icon: HeartHandshake,
    title: "Diagnostic Monitoring",
    desc: "We monitor telemetry channels, log server load speeds, deploy security patch bundles, and execute maintenance iterations.",
    details: ["Uptime alert telemetry", "Logs error reviews", "Framework version updates", "New feature updates"]
  }
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background glowing circle */}
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            How We Build <span className="gradient-text-blue">Intelligent Products</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            We follow a rigorous, fully transparent engineering lifecycle to deliver robust code and elegant user interfaces.
          </p>
        </div>

        {/* Process Steps List (Horizontal Navigation on Desktop, Grid on Mobile) */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 p-2.5 rounded-2xl bg-white/[0.01] border border-white/[0.05] mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.name}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 min-w-[120px] flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600/15 border border-blue-500/35 text-blue-400 shadow-lg shadow-blue-500/5" 
                    : "text-white/40 hover:text-white hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold tracking-wider mb-2 ${isActive ? "text-blue-400" : "text-white/35"}`}>
                  {step.phase}
                </span>
                <Icon className="w-5 h-5 mb-2" />
                <span className="text-xs font-semibold tracking-wide uppercase font-sans whitespace-nowrap">
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.02] pointer-events-none z-0">
            {(() => {
              const Icon = steps[activeStep].icon;
              return <Icon className="w-96 h-96 text-white" />;
            })()}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
            >
              {/* Left text column */}
              <div className="lg:col-span-3 space-y-6">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block">
                  Phase {steps[activeStep].phase} // Execution Details
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-sans uppercase tracking-wide">
                  {steps[activeStep].title}
                </h3>
                <p className="text-base text-white/60 leading-relaxed font-sans font-normal">
                  {steps[activeStep].desc}
                </p>
              </div>

              {/* Right lists column */}
              <div className="lg:col-span-2 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block border-b border-white/[0.05] pb-2">
                  Action Deliverables
                </span>
                <ul className="space-y-3 font-sans text-sm text-white/70">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Process;
