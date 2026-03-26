import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      const message = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Category:* ${formData.category}%0A*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/918925647608?text=${message}`;
      
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
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Space_Grotesk',sans-serif] font-semibold">Let's Connect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Inter',sans-serif]">
            Ready to transform your digital presence? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card p-8 shadow-card h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-8 font-['Space_Grotesk',sans-serif]">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 font-['Space_Grotesk',sans-serif]">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 font-['Space_Grotesk',sans-serif]">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 font-['Space_Grotesk',sans-serif]">
                  Interest Area
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-background/50 border-white/10 h-11">
                    <SelectValue placeholder="What are you looking for?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10 backdrop-blur-xl">
                    <SelectItem value="Website Development">Website Development</SelectItem>
                    <SelectItem value="UI/UX, Branding & Design">UI/UX, Branding & Design</SelectItem>
                    <SelectItem value="E-Commerce Solutions">E-Commerce Solutions</SelectItem>
                    <SelectItem value="Automation & Integration">Automation & Integration</SelectItem>
                    <SelectItem value="Innovation Lab">Innovation Lab</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 font-['Space_Grotesk',sans-serif]">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full text-primary-foreground font-black py-6"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="glass-card p-6 border-l-4 border-primary shadow-card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 font-['Space_Grotesk',sans-serif]">Email Us</h3>
                  <a href="mailto:info.quantumdraft@gmail.com" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    info.quantumdraft@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-accent shadow-card">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 font-['Space_Grotesk',sans-serif]">Location</h3>
                  <p className="text-muted-foreground text-sm">
                    KPR Incubation Hub, Coimbatore, TN
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-secondary shadow-card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 font-['Space_Grotesk',sans-serif]">Call Us</h3>
                  <a href="tel:+918925647608" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    +91 8925647608
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 shadow-card">
                <h3 className="font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Follow Us</h3>
                <div className="flex gap-4">
                  {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-lg gradient-button flex items-center justify-center hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-background" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 shadow-card">
                <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Hours</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Mon-Fri: 9AM - 6PM<br />
                  Sat: 10AM - 4PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
