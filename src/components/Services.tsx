import { Code, Smartphone, Palette, ShoppingCart, GraduationCap, BarChart3, FlaskConical } from "lucide-react";

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
    <section id="services" className="section-padding gradient-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(174,86,153,0.1),transparent_50%)]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions designed to build, scale, and future-proof your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-8 group">
              <div className="text-primary mb-6 group-hover:text-accent transition-colors group-hover:animate-glow-pulse">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1">●</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
