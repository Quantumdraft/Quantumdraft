import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What types of software projects do you handle?",
    answer: "We engineer enterprise web applications (React/NextJS), custom machine learning integration pipelines (Python/FastAPI), mobile native apps (Flutter/React Native), serverless cloud migrations (AWS/Kubernetes), and API workflow integrations."
  },
  {
    question: "What is your typical project development timeline?",
    answer: "Typical MVPs and initial product scopes take 4 to 8 weeks. Larger enterprise migration layouts or complex AI model integrations run in 3 to 6-month structural roadmaps, divided into transparent 2-week agile sprints."
  },
  {
    question: "Do you provide ongoing SLA support and maintenance?",
    answer: "Yes, we offer dedicated post-launch SLA contracts. These include 24/7 uptime monitoring telemetry, monthly dependency updates, automated backups checks, server patching, and continuous small feature additions."
  },
  {
    question: "How do you handle security compliance and data protection?",
    answer: "We incorporate zero-trust security architecture. All endpoints run encrypted SSL channels. We utilize JSON Web Tokens (JWT) for authentication, configure isolated database structures, and adhere strictly to HIPAA and GDPR guidelines where required."
  },
  {
    question: "How is your engineering pricing structured?",
    answer: "We operate on predictable flat-rate monthly engineering retainer sprints or fixed-price specifications. This avoids hidden costs and ensures our incentives align directly with delivering clean, robust code on schedule."
  },
  {
    question: "Can you collaborate directly with our internal developers?",
    answer: "Absolutely. We routinely function as an extension of internal client teams, collaborating via unified Slack/Discord channels, participating in daily standups, and pushing commits to shared GitHub or GitLab repositories."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-white/[0.06] py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left focus:outline-none group py-2"
      >
        <span className="text-base md:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors font-sans">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white transition-colors shrink-0 ml-4">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/50 leading-relaxed font-sans font-normal pt-2 pb-4 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2">
      <div className="container-custom relative z-10 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Frequently Asked <span className="gradient-text-blue">Questions</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            Find answers to commonly asked questions regarding our engineering methodologies, timelines, and collaboration setups.
          </p>
        </div>

        {/* Accordion List */}
        <div className="glass-panel p-8 md:p-12 space-y-2">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
