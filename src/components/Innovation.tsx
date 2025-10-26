import { Rocket, Sparkles, Cpu } from "lucide-react";

const Innovation = () => {
  return (
    <section id="innovation" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(45,212,191,0.15),transparent_50%)]" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">KPR Innovation Lab</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Innovation Powered by{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                KPR Incubation Hub
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Quantum Draft's R&D team is developing next-generation AI automation tools, 
              design intelligence systems, and modular web components inside the KPR Innovation Lab.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Next-Gen Automation</h3>
                  <p className="text-sm text-muted-foreground">
                    Building AI-powered tools that revolutionize digital workflows
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Design Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating systems that adapt and optimize based on user behavior
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Modular Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Developing reusable, intelligent web components for rapid deployment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-24 h-24 mx-auto mb-4 text-accent animate-glow-pulse" />
                  <p className="text-lg font-semibold">Innovation in Progress</p>
                  <p className="text-sm text-muted-foreground mt-2">
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
