import { 
  Heart, 
  GraduationCap, 
  DollarSign, 
  ShoppingBag, 
  Factory, 
  Home, 
  Truck, 
  Utensils, 
  Landmark, 
  Rocket 
} from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  { name: "Healthcare", icon: Heart, desc: "Secure HIPAA-ready patient charts, scheduling portals, and laboratory management code." },
  { name: "Education", icon: GraduationCap, desc: "Sleek online course management portals, interactive LMS platforms, and grading structures." },
  { name: "Finance", icon: DollarSign, desc: "Encrypted payment gateways, stock tracking interfaces, and transaction ledger dashboards." },
  { name: "Retail", icon: ShoppingBag, desc: "Global B2B and B2C online shopping systems, automated shipping engines, and inventory metrics." },
  { name: "Manufacturing", icon: Factory, desc: "Assembly line logging software, industrial hardware telemetry, and automated supply chains." },
  { name: "Real Estate", icon: Home, desc: "Property registry catalogs, agent booking portals, and geolocated map matching systems." },
  { name: "Logistics", icon: Truck, desc: "Fleet location tracking dashboards, routes optimization calculators, and cargo sensors loggers." },
  { name: "Hospitality", icon: Utensils, desc: "Table reservation booking systems, menu catalogs, and guest feedback metrics databases." },
  { name: "Government", icon: Landmark, desc: "Secure public registries, state portal dashboards, and high-security file systems code." },
  { name: "Startups", icon: Rocket, desc: "Rapid MVP coding sprints, scale-ready serverless backends, and investor demo landing pages." }
];

const Industries = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="industries" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-2">
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Sectors</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Industries We <span className="gradient-text-blue">Empower</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            We adapt our core capabilities to address the unique compliance, operational, and user requirements of distinct sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                variants={itemVariants}
                className="group p-6 rounded-xl bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 flex flex-col justify-between cursor-default min-h-[200px]"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/5 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-white/40 leading-normal font-sans font-normal">
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Industries;
