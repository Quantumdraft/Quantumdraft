import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import QuantumField from "./QuantumField";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 gradient-hero">
      <QuantumField />
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card mb-10 animate-fade-in border-white/5 shadow-quantum">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground font-medium tracking-wide">Incubated at KPR Incubation Hub</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up tracking-tighter leading-[1.1]">
          Reimagining Digital<br />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow-primary">
            Growth through Quantum Intelligence
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up font-['Inter',sans-serif] leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Next-generation AI-powered web systems, hyper-growth marketing automation, and intelligent design — all converging in one quantum ecosystem.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="text-lg px-10 h-14 bg-primary text-primary-foreground hover:glow-primary transition-all duration-300 rounded-full font-bold"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("services")}
            className="text-lg px-10 h-14 border-white/10 glass-card-hover rounded-full font-bold"
          >
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
