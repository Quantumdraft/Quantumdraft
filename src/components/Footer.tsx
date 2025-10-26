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
    <footer className="gradient-card border-t border-border/50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Quantum Draft Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold">Quantum Draft</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Building intelligent systems that automate how businesses grow digitally. 
              Powered by innovation at KPR Incubation Hub.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Incubated at KPR Incubation Hub</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("innovation")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Innovation Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info.quantumdraft@gmail.com</li>
              <li>KPR Incubation Hub</li>
              <li>Coimbatore, Tamil Nadu</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Quantum Draft. Powered by KPR Incubation Hub.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
