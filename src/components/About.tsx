
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
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Digital-First <span className="text-primary text-glow-primary">Innovation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quantum Draft is more than a development agency. We are a digital-first innovation hub focused on AI automation, web engineering, and strategic marketing. 
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-10 group glass-card-hover rounded-[2rem] border-white/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Vision, Mission, Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group p-10 rounded-[2.5rem] bg-surface border border-white/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-black mb-6 tracking-tight group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
