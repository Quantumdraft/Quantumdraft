import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, HelpCircle, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import TrainingInternship, { tracksData } from "@/components/TrainingInternship";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const internshipFaqs = [
  {
    q: "Who is eligible for the Skill Training & Internship Program?",
    a: "Our program is open to undergraduate & graduate students, recent graduates, self-taught developers, and professionals transitioning into technology engineering. No prior professional experience is strictly required, though basic programming literacy is recommended."
  },
  {
    q: "What is the duration and weekly time commitment?",
    a: "Program tracks range from 1 Month to 3 Months depending on the specialization. Most cohorts require approximately 15-20 hours per week, allowing flexibility for students with academic schedules."
  },
  {
    q: "Will I receive a recommendation letter upon completion?",
    a: "Yes! Upon successful completion of your live project sprint and code evaluation, you will receive an official recommendation letter and endorsed engineering portfolio reference from senior leads."
  },
  {
    q: "How does the mentorship and code review process work?",
    a: "Every intern is paired with a Quantum Draft Technologies Senior Engineer. You'll participate in daily agile standups, receive PR (Pull Request) code reviews on real GitHub repos, and attend 1-on-1 career coaching sessions."
  }
];

const InternshipPage = () => {
  const scrollToApplication = () => {
    const element = document.getElementById("training");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-600/30 selection:text-white pt-28">
      
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden mesh-gradient-1">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
              <GraduationCap className="w-4 h-4" /> Next-Gen Tech Talent Engineering
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight font-sans mb-6">
              Skill Training & <span className="gradient-text-blue">Internship Program</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-sans leading-relaxed mb-8">
              Transform into a production-ready software engineer through real-world client projects, 1-on-1 senior mentorship, and hands-on code experience.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={scrollToApplication}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-8 h-12 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
              >
                Apply for Internship <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById("faq");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="rounded-full border-white/20 text-white hover:bg-white/5 font-semibold text-sm px-6 h-12"
              >
                View FAQs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Training Section */}
      <TrainingInternship id="training" />

      {/* Program Benefits Grid */}
      <section className="py-20 px-6 bg-[#07070a] border-t border-b border-white/[0.04]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">
              Why Join Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-sans">
              Designed for High Impact Skill Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Production Code, Not Tutorials",
                desc: "Write clean, modular code following enterprise architecture patterns, automated unit testing, and CI/CD pipelines.",
                icon: BookOpen
              },
              {
                title: "Endorsed Engineering Portfolio",
                desc: "Build a production-ready portfolio verified by Quantum Draft Technologies engineering leadership to showcase on LinkedIn and GitHub.",
                icon: Award
              },
              {
                title: "Agile Workflow Experience",
                desc: "Master industry-standard Git workflows, PR code reviews, daily standups, and production deployments.",
                icon: Sparkles
              }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-xl text-left">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-sans">{benefit.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-sans">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-[#050505]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Program Information
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4 text-left">
            {internshipFaqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/[0.06] rounded-xl px-6 bg-white/[0.01] backdrop-blur-xl overflow-hidden"
              >
                <AccordionTrigger className="text-left font-bold text-white text-sm md:text-base py-5 hover:text-blue-400 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-sm leading-relaxed pb-5 font-sans">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InternshipPage;
