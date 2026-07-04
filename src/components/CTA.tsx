import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import { useTiltGlow } from "@/hooks/useTiltGlow";

const CTA = () => {
  const ref = useTiltGlow(true, 30); // Very subtle tilt for large box

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-custom relative z-10 px-4">
        <div 
          ref={ref}
          className="metal-panel glass-card card-glow p-12 md:p-20 border border-white/10 bg-gradient-to-r from-card/80 via-background/95 to-card/85 max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Diagnostic Grid Layout overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          
          {/* Subtle warning stripe on side edge */}
          <div className="absolute left-0 top-0 bottom-0 w-1 hazard-stripes opacity-40" />

          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded bg-black/40 border border-white/5 mb-8 backdrop-blur-xl">
              <span className="led-glow-orange animate-pulse" />
              <span className="hud-node-code">SYS_COMMUNICATION // SYSTEM_ACTIVE</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white max-w-3xl leading-tight uppercase font-['Space_Grotesk']">
              Ready to Initialize Your<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-glow-primary">
                Intelligent Digital Core?
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-12 font-mono uppercase tracking-wide leading-relaxed">
              &gt;&gt; Engage automated mechanics, high-torque pipelines, and neural structures designed to scale your operations autonomously.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                variant="gradient"
                className="w-full sm:w-auto text-xs px-10 h-14 hover-neon-glow hover:glow-primary rounded font-black tracking-widest uppercase text-white transition-all duration-300 border border-primary/40 bg-gradient-to-r from-primary to-orange-600"
              >
                <Calendar className="mr-3 w-4 h-4" />
                ENGAGE CORE // BOOK CONSULTATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
