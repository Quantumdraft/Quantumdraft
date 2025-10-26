import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const CTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-accent opacity-90" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Build Your Intelligent Digital System?
        </h2>
        <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-10">
          Transform your business with AI-powered automation and cutting-edge web solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="bg-background text-primary hover:bg-background/90 text-lg px-8 glow-primary"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Book a Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("pricing")}
             className="bg-background text-primary hover:bg-background/90 text-lg px-8 glow-primary"
          >
            Explore Packages <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
