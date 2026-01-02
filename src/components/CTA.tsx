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
    <section className="section-padding relative overflow-hidden bg-card">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Space_Grotesk',sans-serif] font-semibold">
          Ready to Build Your Intelligent Digital System?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-['Inter',sans-serif]">
          Transform your business with AI-powered automation and cutting-edge web solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            variant="gradient"
            className="text-lg px-8"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Book a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
