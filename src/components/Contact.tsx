import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Updated handleSubmit with API integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-6 border-l-4 border-primary shadow-card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Email Us</h3>
                  <a
                    href="mailto:info.quantumdraft@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors font-['Inter',sans-serif]"
                  >
                    info.quantumdraft@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-accent shadow-card">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Location</h3>
                  <p className="text-muted-foreground font-['Inter',sans-serif]">
                    KPR Incubation Hub
                    <br />
                    Coimbatore, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-secondary shadow-card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Call Us</h3>
                  <a
                    href="tel:+918925647608"
                    className="text-muted-foreground hover:text-primary transition-colors font-['Inter',sans-serif]"
                  >
                    +91 8925647608
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 shadow-card">
              <h3 className="font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/quantum-draft-5a7201395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Linkedin className="w-5 h-5 text-background" />
                </a>
                <a
                  href="https://www.instagram.com/quantum.draft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5 text-background" />
                </a>
                <a
                  href="https://twitter.com/quantumdraft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Twitter className="w-5 h-5 text-background" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6 shadow-card">
              <h3 className="font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Business Hours</h3>
              <p className="text-muted-foreground text-sm font-['Inter',sans-serif]">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
