import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code2, 
  Cpu, 
  Cloud, 
  Palette, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Send, 
  Users, 
  ArrowRight, 
  Clock,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveApplication } from "@/lib/applicationStorage";

export interface ProgramTrack {
  id: string;
  title: string;
  category: string;
  icon: any;
  duration: string;
  skills: string[];
  description: string;
  badge: string;
  bgGradient: string;
}

export const tracksData: ProgramTrack[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Engineering",
    category: "Web Systems",
    icon: Code2,
    duration: "1 - 3 Months",
    skills: ["React 18", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST/GraphQL"],
    description: "Master modern frontend frameworks, backend microservices, and database architecture by building production-grade web applications.",
    badge: "Most Popular",
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent"
  },
  {
    id: "aiml",
    title: "AI & Machine Learning Systems",
    category: "Artificial Intelligence",
    icon: Cpu,
    duration: "2 - 3 Months",
    skills: ["Python", "PyTorch", "LLM Fine-Tuning", "LangChain", "Vector DBs", "OpenAI APIs"],
    description: "Learn to build, train, and deploy generative AI agents, neural pipelines, and semantic search architectures.",
    badge: "Advanced",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent"
  },
  {
    id: "devops",
    title: "Cloud & DevOps Architecture",
    category: "Cloud Systems",
    icon: Cloud,
    duration: "1 - 2 Months",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Terraform", "Nginx"],
    description: "Gain hands-on experience orchestrating automated deployment pipelines, serverless clusters, and zero-downtime infrastructure.",
    badge: "High Demand",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent"
  },
  {
    id: "uiux",
    title: "UI/UX & Product Design",
    category: "Creative Design",
    icon: Palette,
    duration: "1 - 2 Months",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping", "Design Tokens"],
    description: "Design sleek, glassmorphic digital experiences and SaaS UI design systems aligned with modern global design trends.",
    badge: "Creative",
    bgGradient: "from-rose-500/10 via-amber-500/5 to-transparent"
  },
  {
    id: "mobile",
    title: "Mobile App Engineering",
    category: "Mobile Systems",
    icon: Smartphone,
    duration: "2 - 3 Months",
    skills: ["React Native", "Flutter", "Dart", "iOS/Android Native APIs", "App Store Release"],
    description: "Architect high-performance cross-platform iOS & Android mobile applications with smooth UI animations and offline sync.",
    badge: "Mobile",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent"
  },
  {
    id: "cyber",
    title: "Cyber Security & SecOps",
    category: "Security",
    icon: ShieldCheck,
    duration: "1 - 2 Months",
    skills: ["Zero-Trust Architectures", "Vulnerability Scanning", "OAuth2 / JWT", "OWASP Hardening"],
    description: "Understand offensive and defensive web security, automated vulnerability analysis, and zero-trust protocol implementation.",
    badge: "SecOps",
    bgGradient: "from-blue-600/10 via-purple-600/5 to-transparent"
  }
];

const highlights = [
  {
    icon: Briefcase,
    title: "Live Production Projects",
    desc: "Work on real-world web and AI projects with actual deployment pipelines, not simulated exercises."
  },
  {
    icon: Users,
    title: "1-on-1 Senior Mentorship",
    desc: "Get code reviews, technical guidance, and career advice directly from Quantum Draft Technologies senior engineers."
  },
  {
    icon: Award,
    title: "Letter of Recommendation",
    desc: "Earn an official personalized recommendation letter and endorsed portfolio reference."
  },
  {
    icon: FileText,
    title: "Agile Workflow Experience",
    desc: "Participate in daily engineering standups, sprint planning, and pull-request code reviews on active repositories."
  }
];

const roadmapSteps = [
  {
    step: "01",
    title: "Apply & Screening",
    desc: "Submit your application and complete a short technical assessment to identify your current skill baseline."
  },
  {
    step: "02",
    title: "Intensive Bootcamp",
    desc: "Dive into live interactive workshops, architectural deep dives, and guided coding assignments."
  },
  {
    step: "03",
    title: "Live Client Sprint",
    desc: "Join an agile sprint team to build real production features under senior engineer code reviews."
  },
  {
    step: "04",
    title: "Portfolio Endorsement",
    desc: "Receive comprehensive portfolio review, official recommendation letter, and resume refinement."
  }
];

interface TrainingInternshipProps {
  id?: string;
}

const TrainingInternship = ({ id = "training" }: TrainingInternshipProps) => {
  const { toast } = useToast();
  const [selectedTrack, setSelectedTrack] = useState<ProgramTrack | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    trackId: "fullstack",
    experienceLevel: "Student / Graduate",
    portfolioUrl: "",
    sop: ""
  });

  const handleOpenModal = (track?: ProgramTrack) => {
    if (track) {
      setSelectedTrack(track);
      setFormData((prev) => ({ ...prev, trackId: track.id }));
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trackObj = tracksData.find(t => t.id === formData.trackId);
    const trackName = trackObj?.title || "Skill Training";

    try {
      // Persist application to Admin Storage
      await saveApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        trackId: formData.trackId,
        trackTitle: trackName,
        experienceLevel: formData.experienceLevel,
        portfolioUrl: formData.portfolioUrl,
        sop: formData.sop
      });

      setIsSubmitting(false);
      setIsModalOpen(false);
      
      toast({
        title: "Application Received! 🚀",
        description: `Thank you ${formData.fullName}! Your application for ${trackName} has been submitted. Our admissions team will reach out via ${formData.email} within 24 hours.`,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        trackId: "fullstack",
        experienceLevel: "Student / Graduate",
        portfolioUrl: "",
        sop: ""
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: "Could not submit your application. Please check your network connection and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id={id} className="section-padding bg-[#050505] relative overflow-hidden border-t border-b border-white/[0.04] mesh-gradient-2 font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase text-blue-400 font-mono tracking-widest">
              Quantum Draft Technologies Academy
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
            Skill Training & <span className="gradient-text-blue">Internship Program</span>
          </h2>
          <p className="text-sm md:text-lg text-white/60 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Bridge the gap between academic theory and real-world engineering. Gain hands-on production experience, work on real client software, and launch your tech career.
          </p>
        </div>

        {/* Program Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-sans">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tracks Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">
              Career Tracks
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-sans">
              Choose Your Specialization Track
            </h3>
          </div>
          <p className="text-xs md:text-sm text-white/50 max-w-md">
            All tracks include live project work, daily mentorship standups, code review feedback, and hands-on engineering experience.
          </p>
        </div>

        {/* 6 Specialization Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tracksData.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-gradient-to-b ${track.bgGradient} border border-white/[0.08] backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-full`}
              >
                <div>
                  {/* Badge & Category */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 font-mono px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                      {track.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {track.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors font-sans">
                        {track.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/50 mt-1 font-mono">
                        <span className="flex items-center gap-1"><Clock size={12} /> {track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-6 font-sans">
                    {track.description}
                  </p>

                  {/* Skills tags */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">Core Tech Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] text-white/70 bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply Action */}
                <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between mt-4">
                  <div className="text-[11px] font-mono text-blue-400 font-semibold">
                    🎯 Live Project Track
                  </div>
                  <Button
                    onClick={() => handleOpenModal(track)}
                    size="sm"
                    className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 h-9 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                  >
                    Apply Track <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Roadmap / Program Journey */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-2xl mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">
              Step-By-Step
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white font-sans">
              Your Internship Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="text-4xl font-extrabold text-blue-500/20 font-mono mb-3 group-hover:text-blue-400/50 transition-colors">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-sans">{step.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 border border-blue-500/30 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />
          
          <div className="text-left max-w-xl z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Next Cohort Applications Open
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-white font-sans leading-tight">
              Ready to accelerate your engineering career?
            </h3>
            <p className="text-xs md:text-sm text-white/70 mt-2">
              Limited seats per cohort to ensure dedicated 1-on-1 mentorship. Applications reviewed on a rolling basis.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <Button
              onClick={() => handleOpenModal()}
              className="rounded-full bg-white text-black hover:bg-white/90 font-bold text-sm px-8 h-12 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
            >
              Submit Program Application <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      </div>

      {/* Interactive Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0b0c10] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-50 text-left overflow-hidden font-sans my-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full bg-white/5 border border-white/5 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-2">
                  <GraduationCap size={14} /> Quantum Draft Technologies Internship Portal
                </div>
                <h3 className="text-2xl font-bold text-white">Apply for Skill Training & Internship</h3>
                <p className="text-xs text-white/50 mt-1">
                  Fill in your credentials to apply for our upcoming hands-on engineering cohort.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/70 block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/70 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/70 block mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/70 block mb-1.5">Current Status *</label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full bg-[#121319] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Student / Graduate">College Student / Recent Graduate</option>
                      <option value="Beginner Developer">Beginner / Self-Taught Developer</option>
                      <option value="Working Professional">Working Professional Switching Careers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Specialization Track *</label>
                  <select
                    value={formData.trackId}
                    onChange={(e) => setFormData({ ...formData, trackId: e.target.value })}
                    className="w-full bg-[#121319] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {tracksData.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Portfolio / GitHub / LinkedIn Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Why do you want to join this program?</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your background, career goals, and interest in this track..."
                    value={formData.sop}
                    onChange={(e) => setFormData({ ...formData, sop: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 transition-all"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Internship Application"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default TrainingInternship;
