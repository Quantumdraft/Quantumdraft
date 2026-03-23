import { Code, Smartphone, Palette, ShoppingCart, GraduationCap, BarChart3, FlaskConical, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Website Development",
      description:
        "Modern, scalable, and SEO-optimized websites built to deliver performance, usability, and business growth.",
      features: [
        "Corporate & portfolio websites",
        "Custom web applications",
        "SEO-ready & high-performance builds",
        "CMS integration & maintenance"
      ]
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile App Development",
      description:
        "High-quality mobile applications designed for smooth performance, intuitive UX, and long-term scalability.",
      features: [
        "Android & iOS applications",
        "Cross-platform development",
        "Backend & API integration",
        "App optimization & updates"
      ]
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "UI/UX, Graphic & Branding",
      description:
        "User-centered design and strong brand identity systems that improve engagement and build trust.",
      features: [
        "UI/UX research & prototyping",
        "Graphic & social media creatives",
        "Logo & brand identity design",
        "Design systems & guidelines"
      ]
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "E-Commerce Solutions",
      description:
        "End-to-end e-commerce platforms built for conversions, secure transactions, and inventory efficiency.",
      features: [
        "Online store development",
        "Payment gateway integration",
        "Inventory & order management",
        "Product catalog & performance optimization"
      ]
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Training & Tech Education",
      description:
        "Industry-oriented training programs focused on practical skills, real-world projects, and mentorship.",
      features: [
        "Web & app development training",
        "UI/UX & design tools",
        "AI & automation fundamentals",
        "Hands-on projects & guidance"
      ]
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Data Analytics & Data Science",
      description:
        "Data-driven insights and analytics solutions to support smarter decision-making and business intelligence.",
      features: [
        "Business intelligence dashboards",
        "Data visualization & reporting",
        "Predictive analytics",
        "AI & ML-based insights"
      ]
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Innovation Lab (Upcoming)",
      description:
        "Research and development of next-generation AI, automation, and intelligent digital systems.",
      features: [
        "AI-assisted design tools",
        "Automation & workflow systems",
        "Chatbot & CRM integrations",
        "Custom AI-powered solutions"
      ]
    }
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Quantum <span className="text-muted-foreground">Capabilities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We merge cutting-edge technology with creative excellence to build digital ecosystems that thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`glass-card p-10 group relative overflow-hidden glass-card-hover transition-all duration-500 rounded-[2rem] border-white/5 ${
                index % 3 === 1 ? "md:translate-y-12" : ""
              }`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <span className="text-8xl font-black font-['Space_Grotesk']">0{index + 1}</span>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{service.description}</p>

                <div className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:scale-150 transition-all duration-300" />
                      <span className="text-xs font-bold tracking-wide uppercase text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <button className="text-xs font-black tracking-[0.3em] uppercase text-primary flex items-center gap-2 hover:gap-4 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      </div>
    </section>
  );
};

export default Services;
