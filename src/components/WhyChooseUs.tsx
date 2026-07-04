import { Users, Cpu, Zap, Coins, ShieldCheck, Layers, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "We build zero-trust architectures utilizing OAuth2, stateful session tokens, data encryption at rest, and regular threat assessments.",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-400"
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Cloud infrastructure engineered on microservices, serverless clusters, and vector DB caching designed to handle millions of queries.",
    color: "from-blue-500/10 to-indigo-500/10 text-blue-400"
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Our collective is comprised of senior full-stack developers, DevOps engineers, and UI/UX architects with decades of combined experience.",
    color: "from-purple-500/10 to-pink-500/10 text-purple-400"
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    desc: "We build using modern languages and frameworks (React, NextJS, Python, FastAPI, Docker, and AWS) to ensure long-term maintainability.",
    color: "from-cyan-500/10 to-blue-500/10 text-cyan-400"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Utilizing agile sprint structures and streamlined CI/CD, we ship production-ready modules in rapid, predictable release cycles.",
    color: "from-yellow-500/10 to-orange-500/10 text-yellow-400"
  },
  {
    icon: Coins,
    title: "ROI Focused Value",
    desc: "Transparent flat-rate pricing models with predictable monthly sprints, ensuring zero hidden fees and maximum engineering efficiency.",
    color: "from-amber-500/10 to-orange-500/10 text-orange-400"
  },
  {
    icon: PhoneCall,
    title: "24/7 Dedicated Support",
    desc: "Continuous automated uptime telemetry monitoring and SLA support channels to ensure operational safety around the clock.",
    color: "from-pink-500/10 to-red-500/10 text-pink-400"
  }
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="innovation" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2">
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-left mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Why Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Enterprise Engineering, <span className="gradient-text-blue">Startup Agility</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            We deliver the code quality, reliability, and security of a global consultancy combined with the speed and innovation of a modern startup.
          </p>
        </div>

        {/* Advantage Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.title}
                variants={cardVariants}
                className="group p-8 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.02] hover:border-white/[0.1] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                {/* Icon Container with gradient background on hover */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adv.color} flex items-center justify-center mb-6 border border-white/[0.04] group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide group-hover:text-blue-400 transition-colors mb-3">
                  {adv.title}
                </h3>
                
                <p className="text-sm text-white/50 leading-relaxed font-sans font-normal">
                  {adv.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
