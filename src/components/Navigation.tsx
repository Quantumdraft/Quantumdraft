import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Cpu, Globe, Database, Shield, Zap, Sparkles, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "../assets/quantum-draft-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveDropdown(null);
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const servicesMenu = [
    { name: "AI Solutions", desc: "Custom LLMs, neural networks, predictive models", icon: Cpu, id: "services" },
    { name: "Web Systems", desc: "NextJS, React, enterprise cloud portals", icon: Code2, id: "services" },
    { name: "Cloud & Security", desc: "AWS, Kubernetes, zero-trust architectures", icon: Shield, id: "services" },
    { name: "Automations", desc: "High-throughput API & workflow integrations", icon: Zap, id: "services" },
  ];

  const companyMenu = [
    { name: "Who We Are", desc: "Our history, mission, vision and values", icon: Sparkles, id: "about" },
    { name: "Why Us", desc: "What sets our technology engineering apart", icon: Globe, id: "innovation" },
    { name: "Our Process", desc: "Discovery, development, deployment cycle", icon: Database, id: "process" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-[#050507]/95 backdrop-blur-xl border-b border-white/[0.06] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-custom px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => {
            setIsOpen(false);
            if (location.pathname !== "/") {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img src={logoImg} alt="QuantumDraft Logo" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight font-sans text-white group-hover:text-blue-400 transition-colors">
            QuantumDraft
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors py-2">
              Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180 text-blue-400" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] p-6 glass-panel"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {servicesMenu.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-white/50 leading-normal mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("company")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors py-2">
              Company <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "company" ? "rotate-180 text-blue-400" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "company" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[320px] p-4 glass-panel"
                >
                  <div className="flex flex-col gap-2">
                    {companyMenu.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center gap-3.5 p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Additional Links */}
          <button onClick={() => scrollToSection("projects")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Portfolio
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            FAQ
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Contact
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            onClick={() => scrollToSection("contact")}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 h-11 transition-all"
          >
            Start Your Project
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/5 border border-white/5"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#050507]/95 backdrop-blur-2xl px-6 py-8 overflow-y-auto max-h-[calc(100vh-80px)] shadow-2xl"
          >
            <div className="flex flex-col gap-6 font-sans">
              <div className="border-b border-white/[0.05] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40 block mb-3">Services</span>
                <div className="grid grid-cols-2 gap-4">
                  {servicesMenu.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm font-medium text-white/80 hover:text-blue-400 py-1"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-b border-white/[0.05] pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40 block mb-3">Company</span>
                <div className="flex flex-col gap-2">
                  {companyMenu.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm font-medium text-white/80 hover:text-blue-400 py-1"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => scrollToSection("projects")} className="text-left text-sm font-medium text-white/80 hover:text-blue-400 py-1">
                Portfolio
              </button>
              <button onClick={() => scrollToSection("faq")} className="text-left text-sm font-medium text-white/80 hover:text-blue-400 py-1">
                FAQ
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium text-white/80 hover:text-blue-400 py-1">
                Contact
              </button>

              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 mt-4"
              >
                Start Your Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
