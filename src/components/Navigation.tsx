import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/quantum-draft-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Simple intersection observer logic for active section
      const sections = ["about", "services", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <img src={logo} alt="Quantum Draft Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter font-['Space_Grotesk'] leading-none">
                QUANTUM<span className="text-primary text-glow-primary">DRAFT</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mt-1">Intelligence Ecosystem</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 py-1 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:text-primary ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent animate-pulse" />
                )}
              </button>
            ))}
            <Button 
              variant="gradient"
              onClick={() => scrollToSection("contact")} 
              className="rounded-full px-8 h-12 font-bold tracking-widest uppercase text-xs shadow-quantum"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 rounded-full bg-white/5 border border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-8 space-y-6 animate-fade-in border-t border-white/5 bg-background/95 backdrop-blur-3xl px-4 rounded-b-3xl shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-center text-lg font-bold tracking-widest uppercase py-2 transition-all ${
                  activeSection === item.id ? "text-primary scale-110" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("contact")} className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest">
              Get Started
            </Button>
          </div>
        )}
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
    </nav>
  );
};

export default Navigation;
