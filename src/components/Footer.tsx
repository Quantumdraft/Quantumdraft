import { Sparkles } from "lucide-react";
import logo from "@/assets/quantum-draft-logo.png";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-surface border-t border-white/5 relative overflow-hidden pb-12">
      <div className="container-custom py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <img src={logo} alt="Quantum Draft Logo" className="w-16 h-16 object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none">
                  QUANTUM<span className="text-primary">DRAFT</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mt-1">Intelligence Ecosystem</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed text-sm font-medium">
              Architecting the future of digital intelligence through AI, automation, and innovation.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span>Incubated at KPR Hub</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black tracking-[0.3em] uppercase mb-8 text-foreground">Explore</h3>
            <ul className="space-y-4">
              {["About", "Services", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 font-bold text-sm tracking-wide"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-black tracking-[0.3em] uppercase mb-8 text-foreground">Connect</h3>
            <ul className="space-y-4">
              <li className="text-muted-foreground font-bold text-sm tracking-wide hover:text-primary transition-colors cursor-pointer">
                info.quantumdraft@gmail.com
              </li>
              <li className="text-muted-foreground text-sm leading-relaxed">
                KPR Incubation Hub<br />
                Coimbatore, Tamil Nadu
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            © 2025 Quantum Draft. Research & Engineering.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
    </footer>
  );
};

export default Footer;
