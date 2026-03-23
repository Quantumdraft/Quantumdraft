import { Rocket, Sparkles, Cpu, BarChart3 } from "lucide-react";

const Innovation = () => {
  return (
    <section id="innovation" className="section-padding relative overflow-hidden bg-surface py-32 md:py-48">
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground">KPR Innovation Lab</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
              Engineering the<br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Next Quantum
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
              Inside the KPR Incubation Hub, we are building the future of digital intelligence. Our lab is a playground for experimental AI and modular automation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Rocket, title: "Next-Gen Automation", desc: "Revolutionizing digital workflows with AI." },
                { icon: Cpu, title: "Design Intelligence", desc: "Adaptive systems that learn from users." },
                { icon: Sparkles, title: "Modular Components", desc: "Intelligent blocks for rapid scaling." },
                { icon: BarChart3, title: "Data Synthesis", desc: "Turning raw data into neural insights." }
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-16">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden p-[1px] bg-gradient-to-br from-white/20 to-transparent">
              <div className="absolute inset-0 bg-background/40 backdrop-blur-3xl rounded-[3rem]" />
              <div className="relative h-full w-full rounded-[3rem] overflow-hidden flex items-center justify-center bg-surface/50 group-hover:bg-surface/20 transition-all duration-700">
                <div className="text-center p-12">
                  <div className="relative inline-block mb-10">
                    <Cpu className="w-40 h-40 text-primary animate-spin-slow opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary/40 blur-3xl rounded-full" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl rotate-45 animate-float flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-background -rotate-45" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter">Lab.Live_Running</h3>
                  <div className="flex justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glowing Orbs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
