import { Code, Megaphone, FlaskConical } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web Development & App Solutions",
      description: "Responsive, SEO-optimized, and scalable websites & web apps including Food Delivery systems, Student Result portals, E-commerce bookstores, and more.",
      features: [
        "End-to-end UI/UX design with branding",
        "Custom web applications",
        "Mobile-responsive development",
        "CMS integration & management"
      ]
    },
    {
      icon: <Megaphone className="w-12 h-12" />,
      title: "Digital Marketing & Brand Growth",
      description: "Comprehensive marketing strategies powered by automation and AI-driven insights to accelerate your brand's digital presence.",
      features: [
        "Social media management & growth",
        "SEO & SEM optimization",
        "Automation-based lead nurturing",
        "AI-driven engagement strategies"
      ]
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Innovation Lab (Coming Soon)",
      description: "Cutting-edge R&D for next-generation digital solutions built at the KPR Innovation Hub.",
      features: [
        "AI-assisted design tools",
        "Modular automation systems",
        "Chatbot + CRM integrations",
        "Custom AI solutions"
      ]
    }
  ];

  return (
    <section id="services" className="section-padding gradient-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(174,86,153,0.1),transparent_50%)]" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Offerings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions designed to transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-8 group"
            >
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
