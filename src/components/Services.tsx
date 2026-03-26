import { useEffect, useRef, useState } from "react";
import { 
  Code, 
  Smartphone, 
  Palette, 
  ShoppingCart, 
  GraduationCap, 
  BarChart3, 
  FlaskConical, 
  ArrowLeft,
  ArrowRight,
  Zap,
  Cpu,
  Globe
} from "lucide-react";
import { gsap } from "gsap";

const services = [
  {
    icon: <Code className="w-10 h-10" />,
    title: "Website Development",
    description: "High-performance websites designed for scalability and growth. Includes custom web apps, SEO-ready builds, and CMS integration.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(6, 182, 212, 0.4)",
    tag: "Protocol_01",
    bg: "/assets/services/service_web_dev_bg.png"
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "UI/UX, Branding & Design",
    description: "Design systems that enhance user experience and brand identity through research, prototyping, and brand strategy.",
    color: "from-purple-500 to-violet-500",
    glow: "rgba(139, 92, 246, 0.4)",
    tag: "Protocol_02",
    bg: "/assets/services/service_uiux_bg.png"
  },
  {
    icon: <ShoppingCart className="w-10 h-10" />,
    title: "E-Commerce Solutions",
    description: "Conversion-focused online stores with seamless payment integration, inventory management, and performance optimization.",
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.4)",
    tag: "Protocol_03",
    bg: "/assets/services/service_ecommerce_bg.png"
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Automation & Integration",
    description: "Smart systems connecting tools and workflows via API integrations, CRM, chatbot automation, and no-code systems.",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.4)",
    tag: "Protocol_04",
    bg: "/assets/services/service_automation_bg.png"
  },
  {
    icon: <FlaskConical className="w-10 h-10" />,
    title: "Innovation Lab",
    description: "Experimental development of next-generation AI tools, autonomous agents, and custom AI systems.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.4)",
    tag: "Protocol_05",
    bg: "/assets/services/service_innovation_bg.png"
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      if (!card) return;

      const offset = index - activeIndex;
      const absOffset = Math.abs(offset);
      
      // Calculate 3D position
      const xTranslate = offset * 120; // Spread cards horizontally
      const zTranslate = -absOffset * 200; // Push further cards back
      const rotateY = offset * -25; // Rotate cards to face center
      const opacity = Math.max(0, 1 - absOffset * 0.4);
      const scale = 1 - absOffset * 0.2;

      gsap.to(card, {
        x: `${xTranslate}%`,
        z: zTranslate,
        rotateY: rotateY,
        opacity: opacity,
        scale: scale,
        duration: 0.8,
        ease: "power3.out",
        visibility: opacity <= 0 ? "hidden" : "visible",
        pointerEvents: offset === 0 ? "auto" : "none",
        zIndex: 100 - absOffset,
      });
    });
  }, [activeIndex]);

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 blur-[180px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground">Expertise Slider</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            Quantum <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Capabilities</span>
          </h2>
        </div>

        {/* 3D Slider Container */}
        <div className="relative h-[480px] md:h-[550px] flex items-center justify-center overflow-visible perspective-2000">
          <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center transform-style-3d">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute w-full max-w-xl transform-gpu will-change-transform"
              >
                <div 
                  className={`relative glass-card p-8 md:p-12 rounded-[3.5rem] border-white/10 overflow-hidden shadow-2xl bg-gradient-to-br ${service.color}/5 backdrop-blur-3xl transition-shadow duration-500`}
                  style={{
                    boxShadow: activeIndex === index ? `0 40px 100px -20px ${service.glow}` : 'none'
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 group-hover:opacity-30">
                    <img src={service.bg} alt="" className="w-full h-full object-cover grayscale brightness-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>

                  {/* Decorative number */}
                  <div className="absolute -top-10 -right-10 opacity-[0.05] select-none pointer-events-none z-0">
                    <span className="text-[18rem] font-black leading-none">0{index + 1}</span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-background/50 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 shadow-2xl mb-8">
                        <div className="transform transition-transform duration-500 group-hover:scale-110">
                          {service.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-foreground">{service.tag}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter leading-tight">{service.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {["Premium", "Scalable", "Intelligent"].map((t) => (
                            <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] uppercase font-black tracking-widest text-primary/70">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center gap-12 items-center z-50 px-4">
            <button 
              onClick={prevSlide}
              className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all active:scale-95 group"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex gap-3">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    activeIndex === i 
                    ? "w-12 bg-primary shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                    : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-16 h-16 rounded-full glass-card border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all active:scale-95 group"
            >
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
