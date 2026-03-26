import { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Shield,
  Zap,
  BarChart3,
  Cpu,
  Globe,
  Layers,
  ArrowLeft,
  ArrowRight,
  Code2
} from "lucide-react";
import { gsap } from "gsap";

const projects = [
  {
    title: "Rackprcas Website",
    category: "Corporate & Content",
    description: "Corporate website built for structured content and performance, featuring a responsive UI and SEO-ready architecture.",
    icon: Globe,
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6, 182, 212, 0.4)",
    tags: ["React", "SEO", "Responsive Design"],
    link: "https://rackprcas.in",
    bg: "/assets/projects/rackprcas_bg.png"
  },
  {
    title: "KK Exports",
    category: "E-Commerce & Branding",
    description: "Business website designed for global branding and lead generation with a product showcase and mobile optimization.",
    icon: Zap,
    color: "from-purple-500 to-pink-600",
    glow: "rgba(139, 92, 246, 0.4)",
    tags: ["E-Commerce", "Branding", "UI/UX"],
    link: "https://kkexps.com",
    bg: "/assets/projects/kkexports_bg.png"
  },
  {
    title: "RR Motors",
    category: "Service Display",
    description: "Automobile website for showcasing services and engagement with an interactive inquiry system.",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.4)",
    tags: ["Interaction", "Inquiry System", "Mobile First"],
    link: "motors.org.in",
    bg: "/assets/projects/rrmotors_bg.png"
  }
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      const offset = index - activeIndex;
      const absOffset = Math.abs(offset);

      const xTranslate = offset * 110;
      const zTranslate = -absOffset * 250;
      const rotateY = offset * -20;
      const opacity = Math.max(0, 1 - absOffset * 0.4);
      const scale = 1 - absOffset * 0.15;

      gsap.to(card, {
        x: `${xTranslate}%`,
        z: zTranslate,
        rotateY: rotateY,
        opacity: opacity,
        scale: scale,
        duration: 0.8,
        ease: "power2.out",
        visibility: opacity <= 0.05 ? "hidden" : "visible",
        zIndex: 100 - absOffset,
        pointerEvents: offset === 0 ? "auto" : "none",
      });
    });
  }, [activeIndex]);

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-background">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
            <Code2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Portfolio Slider</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Artifacts</span>
          </h2>
        </div>

        {/* 3D Slider Container */}
        <div className="relative h-[550px] md:h-[600px] flex items-center justify-center perspective-3000 overflow-visible">
          <div className="relative w-full h-full max-w-3xl mx-auto flex items-center justify-center transform-style-3d">
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute w-full max-w-2xl transform-gpu will-change-transform"
              >
                <div
                  className={`relative glass-card p-8 md:p-12 rounded-[3.5rem] border-white/10 overflow-hidden shadow-2xl bg-gradient-to-br ${project.color}/5 backdrop-blur-3xl`}
                  style={{
                    boxShadow: activeIndex === index ? `0 40px 100px -20px ${project.glow}` : 'none'
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 group-hover:opacity-30">
                    <img src={project.bg} alt="" className="w-full h-full object-cover grayscale brightness-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>

                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none z-0">
                    <project.icon size={200} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                      <div className="shrink-0 mb-8 lg:mb-0 lg:mr-10">
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[1.8rem] bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110`}>
                          <project.icon size={40} />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 mt-6 lg:mt-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-foreground">{project.category}</span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] uppercase font-black tracking-widest text-primary/70">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 justify-center lg:justify-start">
                          <button
                            onClick={() => window.open(project.link, "_blank")}
                            className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full font-black text-[10px] tracking-widest uppercase hover:glow-primary transition-all"
                          >
                            View <ExternalLink size={14} />
                          </button>
                          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 group">
                            <Github size={20} className="group-hover:text-primary transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-[-20px] left-0 w-full flex justify-center gap-12 items-center z-50">
            <button
              onClick={prevSlide}
              className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex gap-3">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === i
                      ? "w-12 bg-primary shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                      : "bg-white/20 hover:bg-white/40"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
