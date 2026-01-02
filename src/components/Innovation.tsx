import { Rocket, Sparkles, Cpu } from "lucide-react";

const Innovation = () => {
  return (
    <section id="innovation" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(188_92%_56%_/_0.15),transparent_50%)]" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground font-['Inter',sans-serif]">KPR Innovation Lab</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Space_Grotesk',sans-serif] font-semibold">
              Innovation Powered by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                KPR Incubation Hub
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 font-['Inter',sans-serif]">
              Quantum Draft's R&D team is developing next-generation AI automation tools, 
              design intelligence systems, and modular web components inside the KPR Innovation Lab.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Next-Gen Automation</h3>
                  <p className="text-sm text-muted-foreground font-['Inter',sans-serif]">
                    Building AI-powered tools that revolutionize digital workflows
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Design Intelligence</h3>
                  <p className="text-sm text-muted-foreground font-['Inter',sans-serif]">
                    Creating systems that adapt and optimize based on user behavior
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Modular Components</h3>
                  <p className="text-sm text-muted-foreground font-['Inter',sans-serif]">
                    Developing reusable, intelligent web components for rapid deployment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 shadow-card">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-24 h-24 mx-auto mb-4 text-accent" />
                  <p className="text-lg font-semibold font-['Space_Grotesk',sans-serif]">Innovation in Progress</p>
                  <p className="text-sm text-muted-foreground mt-2 font-['Inter',sans-serif]">
                    Pioneering the future of digital automation
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
