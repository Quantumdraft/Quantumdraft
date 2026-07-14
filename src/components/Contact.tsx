import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Linkedin, Instagram, Twitter, Compass, ArrowUpRight, Copy, Check, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = "info.quantumdraft@gmail.com";
  const phoneNumber = "+91 89256 47608";
  const whatsappNumber = "918925647608";
  const mapsUrl = "https://maps.google.com/?q=Quantum+Draft+Technologies,+3CQV%2B28,+Tiruppur,+Tamil+Nadu";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    toast({
      title: "Email Copied",
      description: "info.quantumdraft@gmail.com has been copied to clipboard.",
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/\s+/g, ""));
    setCopiedPhone(true);
    toast({
      title: "Phone Number Copied",
      description: "+918925647608 has been copied to clipboard.",
    });
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background Glow */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Get in Touch with <span className="gradient-text-blue">Our Team</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            Ready to scale your digital ecosystem? Reach out to our engineering office through any of our direct channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Direct Communication Hub */}
          <div className="flex flex-col gap-6 justify-between h-full">
            
            {/* Primary Channel: WhatsApp */}
            <div className="glass-panel p-6 sm:p-8 text-left relative overflow-hidden flex flex-col justify-between h-full border border-blue-500/10 group transition-all duration-300 hover:border-blue-500/30">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                    Primary Line
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider font-sans">
                    Immediate WhatsApp Sync
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-sans">
                    Connect directly with our engineering and solutions lead for project scoping, pricing details, and instant developer allocation.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hello%20QuantumDraft!%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto flex-1"
                >
                  <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20">
                    Launch WhatsApp Chat <ArrowUpRight size={14} />
                  </Button>
                </a>
                <span className="text-sm font-semibold text-white/50 font-mono tracking-wider">
                  {phoneNumber}
                </span>
              </div>
            </div>

            {/* Grid of Secondary Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Card */}
              <div className="glass-panel p-6 text-left relative overflow-hidden flex flex-col justify-between border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Email Address</span>
                    <a href={`mailto:${emailAddress}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors block break-all">
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <a href={`mailto:${emailAddress}`} className="flex-1">
                    <Button variant="outline" className="w-full h-10 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-[10px] font-bold uppercase tracking-widest">
                      Compose
                    </Button>
                  </a>
                  <Button 
                    variant="outline"
                    onClick={handleCopyEmail}
                    className="w-10 h-10 p-0 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white"
                  >
                    {copiedEmail ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>

              {/* Voice Card */}
              <div className="glass-panel p-6 text-left relative overflow-hidden flex flex-col justify-between border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Voice Line</span>
                    <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="text-sm font-semibold text-white hover:text-blue-400 transition-colors block">
                      {phoneNumber}
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="flex-1">
                    <Button variant="outline" className="w-full h-10 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white text-[10px] font-bold uppercase tracking-widest">
                      Call Now
                    </Button>
                  </a>
                  <Button 
                    variant="outline"
                    onClick={handleCopyPhone}
                    className="w-10 h-10 p-0 rounded-lg bg-white/[0.02] border-white/10 hover:bg-white/[0.06] text-white/60 hover:text-white"
                  >
                    {copiedPhone ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </Button>
                </div>
              </div>

            </div>

            {/* System Status / Response SLA Badge */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-white/40 tracking-wider">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>OFFICE SYSTEM STATUS: ONLINE</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>RESPONSE SLA &lt; 2H</span>
              </div>
            </div>

          </div>

          {/* Right Column: Physical Presence, Custom Vector Map, Socials */}
          <div className="flex flex-col gap-6 justify-between h-full">
            
            {/* Physical Location Card */}
            <div className="glass-panel p-6 sm:p-8 text-left relative overflow-hidden flex flex-col justify-between border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono">Headquarters</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Office Location</span>
                  <p className="text-sm font-semibold text-white/80 leading-relaxed font-sans">
                    Quantum Draft Technologies, 3CQV+28, Tiruppur, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="block w-full">
                  <Button variant="outline" className="w-full h-11 rounded-xl bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:text-white text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
                    Open in Google Maps <ArrowUpRight size={12} />
                  </Button>
                </a>
              </div>
            </div>

            {/* Premium Vector Map Graphic */}
            <div className="glass-panel p-6 sm:p-8 h-64 sm:h-72 relative overflow-hidden flex flex-col justify-between border border-white/[0.06]">
              {/* Abstract Dot Matrix Map Background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,.15)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
              
              {/* Glowing Coordinate Indicator */}
              <div className="absolute left-[60%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="absolute w-12 h-12 rounded-full bg-blue-500/10 animate-ping border border-blue-500/30" />
                <span className="absolute w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 animate-pulse" />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-md shadow-blue-500" />
              </div>

              {/* Map Metadata Header */}
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
                  <span className="text-[10px] text-white/40 font-mono font-bold uppercase tracking-widest">Global Node coordinates</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono">HQ Active</span>
              </div>

              {/* Coordinate Metrics Footer */}
              <div className="space-y-1 text-left relative z-10">
                <div className="text-lg font-bold text-white font-sans uppercase">Tiruppur Office</div>
                <div className="text-[10px] text-white/40 font-mono">11.1122° N, 77.3544° E // Quantum Draft</div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] flex flex-col sm:flex-row gap-4 items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">Social Channels</span>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, link: "#", label: "LinkedIn" },
                  { icon: Instagram, link: "#", label: "Instagram" },
                  { icon: Twitter, link: "#", label: "Twitter" }
                ].map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.link}
                    aria-label={soc.label}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all hover:scale-105"
                  >
                    <soc.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
