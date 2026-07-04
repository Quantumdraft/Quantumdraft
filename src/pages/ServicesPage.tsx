import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Globe } from "lucide-react";
import Footer from "@/components/Footer";

const services = [
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
    title: "Core Web Development",
    desc: "High-performance web applications built for speed and reliability, utilizing the latest frontend frameworks.",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Security Protocols",
    desc: "Enterprise-grade security measures embedded directly into the architecture of your digital products.",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: <Cpu className="w-12 h-12 text-primary" />,
    title: "Data Processing",
    desc: "Optimized backend architectures designed to handle millions of requests with minimal latency.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <Globe className="w-12 h-12 text-primary" />,
    title: "Global CDN Integration",
    desc: "Lightning-fast content delivery anywhere in the world, ensuring a seamless experience for your global audience.",
    color: "from-orange-500/20 to-red-500/20"
  }
];

// Reusable Tilt Card Component
const TiltCard = ({ service, index }: { service: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 5, 
        rotateY: 5, 
        z: 50 
      }}
      className={`glass-panel p-10 cursor-pointer relative overflow-hidden group h-[400px] flex flex-col justify-center`}
      style={{ perspective: 1000 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="relative z-10">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {service.icon}
        </div>
        <h4 className="text-3xl font-bold font-['Inter'] text-white mb-4 group-hover:text-primary transition-colors">
          {service.title}
        </h4>
        <p className="text-white/70 text-lg font-['Inter'] leading-relaxed group-hover:text-white transition-colors">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="container-custom flex-1 mb-32">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-light font-['Inter'] tracking-tight text-white mb-6">
              Our <span className="font-bold text-primary">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
              Immersive, interactive, and intelligent digital ecosystems crafted for the modern web. Hover to explore our capabilities.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ perspective: 2000 }}>
          {services.map((service, idx) => (
            <TiltCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
