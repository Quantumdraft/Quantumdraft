import { motion } from "framer-motion";

const techList = [
  { name: "React", type: "Frontend" },
  { name: "Next.js", type: "Fullstack" },
  { name: "Python", type: "AI & Scripting" },
  { name: "FastAPI", type: "Backend API" },
  { name: "Node.js", type: "Runtime" },
  { name: "AWS", type: "Cloud Ops" },
  { name: "Azure", type: "Enterprise Cloud" },
  { name: "Docker", type: "Containerization" },
  { name: "TensorFlow", type: "Machine Learning" },
  { name: "OpenAI API", type: "Cognitive LLM" },
  { name: "MongoDB", type: "NoSQL DB" },
  { name: "PostgreSQL", type: "Relational DB" },
  { name: "Flutter", type: "Mobile Native" },
  { name: "Kubernetes", type: "Orchestration" },
  { name: "Vue.js", type: "Frontend" },
  { name: "TailwindCSS", type: "Design Library" }
];

const Technologies = () => {
  // Duplicate tech list to achieve seamless infinite marquee loop
  const duplicatedList = [...techList, ...techList, ...techList];

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-b border-white/[0.04]">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-6 text-center mb-12">
        <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">
          Our Technology Core
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white font-sans mt-3">
          Engineered with bleeding-edge developer ecosystems
        </h3>
      </div>

      {/* Infinite Horizontal Ticker track */}
      <div className="relative w-full flex items-center overflow-hidden py-4 select-none mask-gradient">
        {/* Shadow overlays on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Marquee Motion Container */}
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-6 whitespace-nowrap"
        >
          {duplicatedList.map((tech, idx) => (
            <div
              key={idx}
              className="inline-flex flex-col justify-center items-start px-6 py-4 rounded-xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md min-w-[160px] cursor-default hover:border-blue-500/20 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm font-bold text-white font-sans">
                {tech.name}
              </span>
              <span className="text-[9px] font-bold text-white/35 font-mono uppercase tracking-wider mt-1">
                {tech.type}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
