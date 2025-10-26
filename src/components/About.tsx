import { Brain, Zap, TrendingUp, Cpu } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Driven Design",
      description: "Intelligent systems that adapt and optimize based on user behavior and data insights"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation Systems",
      description: "Streamline workflows and reduce manual tasks with smart automation solutions"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance Marketing",
      description: "Data-driven strategies that deliver measurable ROI and sustainable growth"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Intelligent Ecosystems",
      description: "Comprehensive digital platforms that connect every aspect of your business"
    }
  ];

  const cards = [
    {
      title: "Vision",
      content: "To become a leader in digital automation by merging innovation with intelligent design systems that transform how businesses operate online."
    },
    {
      title: "Mission",
      content: "Empowering businesses with automated, scalable, and intelligent digital solutions that drive growth and efficiency."
    },
    {
      title: "Innovation Under KPR",
      content: "Backed by KPR Incubation Hub, we're pioneering next-generation AI automation tools and design intelligence systems."
    }
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Quantum Draft is a digital-first innovation hub focused on automation, web development, 
            and marketing innovation. We're not just building websites — we're building intelligent 
            systems that automate how businesses grow digitally.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4 group-hover:text-accent transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Vision, Mission, Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="gradient-card p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">{card.title}</h3>
              <p className="text-muted-foreground">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
