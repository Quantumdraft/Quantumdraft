import { Sparkles, Linkedin, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/quantum-draft-logo.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const scrollToSection = (rawId: string) => {
    const id = rawId === "about-us" ? "about" : rawId;
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed Successfully",
      description: `Thank you! ${email} has been added to our tech newsletter registry.`,
    });
    setEmail("");
  };

  return (
    <footer className="bg-[#050505] relative overflow-hidden py-20 px-6 border-t border-white/[0.04] font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Upper Grid Layout: Info, Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-white/[0.05]">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="flex items-center space-x-3">
              <img src={logoImg} alt="Quantum Draft Technologies Logo" className="h-8 w-auto object-contain" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xl font-bold tracking-tight text-white">Quantum Draft</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono">Technologies</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              We design, develop, and scale high-fidelity software architectures, neural integrations, and automated operational pipelines for global brands.
            </p>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold tracking-widest uppercase text-blue-400 font-mono">
              Incubated at KPR Hub
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-white/60 hover:text-blue-400 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/internship")} className="text-blue-400 hover:text-blue-300 transition-colors font-semibold flex items-center gap-1.5">
                  Skill Training & Internship
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")} className="text-white/60 hover:text-blue-400 transition-colors">
                  Portfolio Showcase
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("faq")} className="text-white/60 hover:text-blue-400 transition-colors">
                  FAQ Accordion
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="text-white/60 hover:text-blue-400 transition-colors">
                  Contact Office
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-left space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono">Services</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => scrollToSection("services")} className="text-white/60 hover:text-blue-400 transition-colors">
                  AI Solutions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-white/60 hover:text-blue-400 transition-colors">
                  Web Systems
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-white/60 hover:text-blue-400 transition-colors">
                  Cloud & SecOps
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-white/60 hover:text-blue-400 transition-colors">
                  Automations
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="text-left space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest font-mono">Newsletter</h4>
            <p className="text-xs text-white/50 leading-relaxed mb-4">
              Get seasonal summaries of deep tech releases and development guides.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="flex-1 bg-white/[0.01] border border-white/[0.06] text-xs h-10 px-3.5 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder:text-white/20"
                required
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Lower Bar: Copyright, Policies & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/35 font-mono uppercase tracking-widest">
            © 2026 Quantum Draft Technologies. All Rights Reserved.
          </p>
          
          <div className="flex gap-6 text-[10px] text-white/35 font-mono uppercase tracking-widest">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Public SLA</a>
            <button onClick={() => navigate("/admin")} className="hover:text-blue-400 text-blue-400/80 transition-colors">
              Admin Portal
            </button>
          </div>

          <div className="flex gap-3">
            {[
              { icon: Linkedin, link: "https://www.linkedin.com/in/quantum-draft-5a7201395/" },
              { icon: Instagram, link: "https://www.instagram.com/quantum.draft?igsh=aWtpYXplZDRzMHVh&utm_source=qr" },
              { icon: Twitter, link: "#" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.link}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all"
              >
                <soc.icon size={13} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
