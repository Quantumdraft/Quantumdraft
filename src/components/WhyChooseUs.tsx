import { Brain, Zap, BarChart, TrendingUp, Lightbulb } from "lucide-react";

const WhyChooseUs = () => {
  const usps = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Integrated Web Systems",
      description: "Leverage artificial intelligence to create smarter, more responsive digital experiences"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation for SMEs",
      description: "Enterprise-level automation tools tailored for small and medium businesses"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Data-Driven Design Decisions",
      description: "Every design choice backed by analytics and user behavior insights"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance-Based Marketing",
      description: "Marketing strategies focused on measurable results and ROI"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Continuous R&D and Innovation",
      description: "Constant evolution with cutting-edge research at KPR Innovation Hub"
    }
  ];

  return (
    <section className="section-padding gradient-card">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why Businesses Trust Quantum Draft
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine innovation, automation, and intelligence to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl gradient-accent flex items-center justify-center mb-6 group-hover:animate-glow-pulse">
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{usp.title}</h3>
              <p className="text-muted-foreground">{usp.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
