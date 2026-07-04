import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Linkedin, Instagram, Twitter, Compass, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const rawMessage = `*New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Category:* ${formData.category}\n*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/918925647608?text=${encodeURIComponent(rawMessage)}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Redirecting to WhatsApp",
        description: "Your message has been formatted for WhatsApp.",
      });
      
      setFormData({ name: "", email: "", category: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background Glow */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Initialize Your <span className="gradient-text-blue">Project</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            Ready to scale your digital ecosystem? Reach out to our engineering office or complete the form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Modern Contact Form */}
          <div className="glass-panel p-8 md:p-10 text-left relative overflow-hidden">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-8 font-sans">
              Send a Transmission
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2 font-mono">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className="bg-white/[0.01] border border-white/[0.06] focus:border-blue-500 h-12 text-white placeholder:text-white/20 rounded-xl"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2 font-mono">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="bg-white/[0.01] border border-white/[0.06] focus:border-blue-500 h-12 text-white placeholder:text-white/20 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2 font-mono">
                  Required Capability
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-white/[0.01] border border-white/[0.06] h-12 text-white rounded-xl focus:border-blue-500">
                    <SelectValue placeholder="Select target service" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0C] border-white/10 text-white font-sans rounded-xl">
                    <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                    <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Automation & API">Automation & API</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Other">Other Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2 font-mono">
                  Project Details
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your architecture requirements..."
                  rows={4}
                  className="bg-white/[0.01] border border-white/[0.06] focus:border-blue-500 text-white placeholder:text-white/20 rounded-xl"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-500/20"
              >
                Send Message <Send size={14} />
              </Button>
            </form>
          </div>

          {/* Right Column: Contact Details + Custom Vector Map Visualizer */}
          <div className="space-y-8 text-left font-sans">
            
            {/* Business Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl space-y-1">
                <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Email</span>
                <a href="mailto:info.quantumdraft@gmail.com" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                  info.quantumdraft@gmail.com
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl space-y-1">
                <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Phone</span>
                <a href="tel:+918925647608" className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                  +91 89256 47608
                </a>
              </div>

              <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl space-y-2">
                <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest uppercase block">Office Location</span>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">
                    KPR Incubation Hub, Coimbatore, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Vector Map Graphic Placeholder */}
            <div className="glass-panel p-8 h-80 relative overflow-hidden flex flex-col justify-between border border-white/[0.06]">
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
                <div className="text-xl font-bold text-white font-sans uppercase">Coimbatore Office</div>
                <div className="text-[10px] text-white/40 font-mono">11.0183° N, 76.9558° E // KPR Hub</div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Social Channels</span>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, link: "#" },
                  { icon: Instagram, link: "#" },
                  { icon: Twitter, link: "#" }
                ].map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.link}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 flex items-center justify-center text-white/70 transition-all hover:scale-105"
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
