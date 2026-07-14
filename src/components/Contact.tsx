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
  Clock, 
  Sparkles, 
  Zap 
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  
  // Clipboard Copied States
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Direct Routing Nodes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Get in <span className="gradient-text-blue">Touch</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            Choose a communication node below to connect directly with our engineering and design offices.
          </p>
        </div>

        {/* 3-Column Grid of Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left items-stretch mb-12">
          
          {/* Node 1: Live Status & Clock */}
          <div className="glass-panel p-6 sm:p-8 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isOfficeOpen ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/70">
                    {isOfficeOpen ? "OFFICE OPERATIONS: ACTIVE" : "OFFICE OPERATIONS: AFTER-HOURS"}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono tracking-wider uppercase">
                  STATUS
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-white/[0.04] pt-6">
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Tiruppur Time (IST)</span>
                  <span className="text-2xl font-bold text-white font-mono block mt-1">
                    {localTime || "--:--:-- --"}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Response SLA</span>
                  <span className="text-lg font-bold text-blue-400 font-mono block mt-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400 inline" /> &lt; 2 HOURS
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-[11px] text-white/50 leading-relaxed border-t border-white/[0.04] pt-4">
              Our core engineering team operates in India Standard Time (IST). We respond to queries within 2 hours during operational windows.
            </div>
          </div>

          {/* Node 2: Primary Channel - WhatsApp Priority Line */}
          <div className="glass-panel p-6 sm:p-8 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-green-500/20 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-green-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[8px] font-mono uppercase tracking-wider font-bold">
                  PRIMARY LINE
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">WhatsApp Sync</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Connect directly with our solutions lead for quick project scoping, pricing details, and instant developer allocation.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hello%20QuantumDraft!%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank" 
                rel="noreferrer"
                className="w-full"
              >
                <Button className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/10">
                  Launch WhatsApp Chat <ArrowUpRight size={12} />
                </Button>
              </a>
              <div className="text-center">
                <span className="text-xs font-semibold text-white/50 font-mono tracking-wider">
                  {phoneNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Node 3: Direct Email Card */}
          <div className="glass-panel p-6 sm:p-8 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono tracking-wider uppercase">
                  INBOX
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Email Portal</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Send project briefs, partnership offers, or general technical inquiries to our engineering mailbox.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <a href={`mailto:${emailAddress}`} className="text-xs font-semibold text-white hover:text-blue-400 transition-colors block break-all font-mono">
                  {emailAddress}
                </a>
              </div>
              <div className="flex gap-2">
                <a href={`mailto:${emailAddress}`} className="flex-1">
                  <Button variant="outline" className="w-full h-11 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-xs font-semibold uppercase tracking-wider">
                    Compose Mail
                  </Button>
                </a>
                <Button 
                  variant="outline"
                  onClick={handleCopyEmail}
                  className="w-11 h-11 p-0 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white shrink-0"
                >
                  {copiedEmail ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Node 4: Voice Call Card */}
          <div className="glass-panel p-6 sm:p-8 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono tracking-wider uppercase">
                  VOICE
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Voice Line</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Call our operational voice line for direct consultations or queries during active IST office hours.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="text-xs font-semibold text-white hover:text-blue-400 transition-colors block font-mono">
                  {phoneNumber}
                </a>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="flex-1">
                  <Button variant="outline" className="w-full h-11 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-xs font-semibold uppercase tracking-wider">
                    Call Now
                  </Button>
                </a>
                <Button 
                  variant="outline"
                  onClick={handleCopyPhone}
                  className="w-11 h-11 p-0 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white shrink-0"
                >
                  {copiedPhone ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Node 5: Headquarters Address */}
          <div className="glass-panel p-6 sm:p-8 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono tracking-wider uppercase">
                  LOCATION
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Office Location</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Our core engineering headquarters and project coordination operations node.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-xs font-semibold text-white/80 leading-relaxed font-sans min-h-[44px]">
                Quantum Draft Technologies, 3CQV+28, Tiruppur, Tamil Nadu, India
              </p>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="block w-full">
                <Button variant="outline" className="w-full h-11 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  Open Google Maps <ArrowUpRight size={12} />
                </Button>
              </a>
            </div>
          </div>

          {/* Node 6: Visual Coordinates Map Telemetry */}
          <div className="glass-panel p-6 sm:p-8 h-64 relative overflow-hidden flex flex-col justify-between border border-white/[0.06] group/map hover:border-blue-500/20 transition-all duration-300">
            {/* Dot Grid Map Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,.15)_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Radar Sweeper Visual Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.03] to-blue-500/0 w-1/2 h-full skew-x-12 -translate-x-full group-hover/map:translate-x-[250%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Glowing Pulse Node Indicator */}
            <div className="absolute left-[65%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="absolute w-16 h-16 rounded-full bg-blue-500/10 animate-ping border border-blue-500/20" />
              <span className="absolute w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 animate-pulse" />
              <span className="w-3 h-3 rounded-full bg-blue-400 shadow-md shadow-blue-500" />
            </div>

            {/* Map Header */}
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
                <span className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-widest">Active Node Telemetry</span>
              </div>
            </div>

            {/* Map Address & Coordinates */}
            <div className="space-y-4 text-left relative z-10">
              <div>
                <span className="text-[8px] font-mono uppercase tracking-widest text-white/40 block">Tiruppur HQ</span>
                <div className="text-[10px] text-white/40 font-mono mt-1">11.1122° N, 77.3544° E // Quantum Draft</div>
              </div>
            </div>

            {/* Location telemetry coordinates footer */}
            <div className="text-[9px] text-white/40 font-mono border-t border-white/[0.04] pt-2 flex justify-between">
              <span>NODE://ACTIVE</span>
              <span className="text-blue-400">ONLINE</span>
            </div>
          </div>

        </div>

        {/* Social Channels Dock */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
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
