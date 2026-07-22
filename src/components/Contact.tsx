import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Compass, 
  ArrowUpRight, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Zap,
  ChevronDown,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { saveContactMessage } from "@/lib/applicationStorage";

const Contact = () => {
  const { toast } = useToast();
  
  // Clipboard Copied States
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Time & Status States
  const [localTime, setLocalTime] = useState("");
  const [isOfficeOpen, setIsOfficeOpen] = useState(true);

  const emailAddress = "info.quantumdraft@gmail.com";
  const phoneNumber = "+91 89256 47608";
  const whatsappNumber = "918925647608";
  const mapsUrl = "https://maps.google.com/?q=Quantum+Draft+Technologies,+3CQV%2B28,+Tiruppur,+Tamil+Nadu";

  // Clock Update Effect (Asia/Kolkata Timezone)
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setLocalTime(formatter.format(new Date()));

      // Office Hours check (9 AM to 8 PM IST)
      const kolkataTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hours = kolkataTime.getHours();
      setIsOfficeOpen(hours >= 9 && hours < 20);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    toast({
      title: "Email Copied",
      description: `${emailAddress} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/\s+/g, ""));
    setCopiedPhone(true);
    toast({
      title: "Phone Number Copied",
      description: `${phoneNumber} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await saveContactMessage({
        fullName: contactForm.fullName,
        email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
      });

      toast({
        title: "Transmission Transmitted! 🚀",
        description: "Thank you for reaching out. Our node operators will review your inquiry shortly.",
      });

      setContactForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Transmission Error",
        description: "Failed to deliver your message. Please check your network connection.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Direct Routing Nodes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Get in <span className="gradient-text-blue">Touch</span>
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Transmit a digital message directly to our engineering coordinators, or connect via direct channels.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 max-w-6xl mx-auto text-left">
          
          {/* Left Column: Live Status & Quick Nodes */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Operations & Coordinates */}
            <div className="glass-panel p-6 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,.15)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isOfficeOpen ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white/70">
                      {isOfficeOpen ? "OPERATIONS: ACTIVE" : "OPERATIONS: AFTER-HOURS"}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono tracking-wider uppercase">
                    LIVE TELEMETRY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/[0.04] pt-4">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Tiruppur Time (IST)</span>
                    <span className="text-xl font-bold text-white font-mono block mt-1">
                      {localTime || "--:--:-- --"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Response SLA</span>
                    <span className="text-base font-bold text-blue-400 font-mono block mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> &lt; 2 HOURS
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/[0.04] pt-4 flex justify-between items-center text-[9px] text-white/40 font-mono">
                  <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-blue-400 animate-spin-slow" /> 11.1122° N, 77.3544° E</span>
                  <span className="text-blue-400">HQ NODE</span>
                </div>
              </div>
            </div>

            {/* Quick Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              
              {/* WhatsApp Chat Node */}
              <div className="glass-panel p-5 border border-white/[0.06] hover:border-green-500/20 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">WhatsApp</h4>
                    <p className="text-[10px] text-white/50 leading-relaxed mt-1">
                      Direct scoping and instant developer alignment.
                    </p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20QuantumDraft!%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 block"
                >
                  <Button className="w-full h-9 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-lg shadow-green-500/10">
                    Connect Chat <ArrowUpRight size={10} />
                  </Button>
                </a>
              </div>

              {/* Email Inbox Node */}
              <div className="glass-panel p-5 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Email Inbox</h4>
                    <p className="text-[10px] text-white/50 leading-relaxed mt-1">
                      For detailed RFCs, RFP documents, and brief sharing.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1.5">
                  <a href={`mailto:${emailAddress}`} className="flex-1">
                    <Button variant="outline" className="w-full h-9 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-[9px] font-bold uppercase tracking-wider">
                      Compose
                    </Button>
                  </a>
                  <Button 
                    variant="outline"
                    onClick={handleCopyEmail}
                    className="w-9 h-9 p-0 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white shrink-0"
                  >
                    {copiedEmail ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  </Button>
                </div>
              </div>

              {/* Voice Node */}
              <div className="glass-panel p-5 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Voice Node</h4>
                    <p className="text-[10px] text-white/50 leading-relaxed mt-1">
                      Direct consultation calls during active office hours.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1.5">
                  <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="flex-1">
                    <Button variant="outline" className="w-full h-9 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-[9px] font-bold uppercase tracking-wider">
                      Call Now
                    </Button>
                  </a>
                  <Button 
                    variant="outline"
                    onClick={handleCopyPhone}
                    className="w-9 h-9 p-0 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white shrink-0"
                  >
                    {copiedPhone ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  </Button>
                </div>
              </div>

              {/* Location Node */}
              <div className="glass-panel p-5 border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Headquarters</h4>
                    <p className="text-[10px] text-white/50 leading-normal mt-1 line-clamp-2">
                      Tiruppur, Tamil Nadu, India.
                    </p>
                  </div>
                </div>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-4 block">
                  <Button variant="outline" className="w-full h-9 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    Maps <ArrowUpRight size={10} />
                  </Button>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Digital Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />
            
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-2">
                  <Zap size={10} /> Transmission Node
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  Leave a Digital Transmission
                </h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed">
                  Submit project scopes, general business inquires, or engineering questions directly to our nodes.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Sterling"
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="liam@domain.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">Subject Header *</label>
                  <div className="relative">
                    <select
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Inquiry Subject...</option>
                      <option value="AI Solutions Development">Service: AI Solutions</option>
                      <option value="Web Architecture & Development">Service: Web Development</option>
                      <option value="Mobile Application Engineering">Service: Mobile Apps</option>
                      <option value="Cloud Systems & DevOps Scale">Service: Cloud Services</option>
                      <option value="UI/UX Prototyping & Systems">Service: UI/UX Design</option>
                      <option value="API Integration & Automation">Service: Automation & API</option>
                      <option value="Digital Growth & Performance SEO">Service: Digital Marketing</option>
                      <option value="Data Analytics & Warehousing">Service: Data Analytics</option>
                      <option value="Cyber Security Audit & Hardening">Service: Cyber Security</option>
                      <option value="Business Intelligence Pipelines">Service: Business Intelligence</option>
                      <option value="Partnership & Collaboration">Partnership & Collaboration</option>
                      <option value="General Business Inquiry">General Business Inquiry</option>
                      <option value="Other Support / Inquiries">Other / General Inquiries</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/40">
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">Transmission Message Body *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write details of your proposal, tech stack requirements, or message..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-[#08090d] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-white/20 resize-none leading-relaxed"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-8 h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
                >
                  {isSending ? "Transmitting..." : "Send Message"} 
                  <Zap size={12} className={isSending ? "animate-pulse" : ""} />
                </Button>
              </form>
            </div>

          </div>

        </div>

        {/* Social Channels Dock */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Social Directories</span>
          <div className="flex gap-3">
            {[
              { icon: Linkedin, link: "https://www.linkedin.com/in/quantum-draft-5a7201395/", label: "LinkedIn" },
              { icon: Instagram, link: "https://www.instagram.com/quantum.draft?igsh=aWtpYXplZDRzMHVh&utm_source=qr", label: "Instagram" },
              { icon: Twitter, link: "#", label: "Twitter" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.link}
                aria-label={soc.label}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all hover:scale-105"
              >
                <soc.icon size={14} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
