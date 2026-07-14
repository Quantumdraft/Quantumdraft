import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Their team designed and built a stunning, high-converting corporate landing page that perfectly showcases our global export services. It is exceptionally fast, responsive, and has significantly boosted our inbound trade inquiries.",
    author: "Kathir",
    role: "Founder",
    company: "KK Exports Ltd",
    rating: 5,
    initials: "MC"
  },
  {
    quote: "We partnered with them to develop our corporate website and integrated a custom two-wheeler consulting booking system. The booking workflow has streamlined our service slot allocation and consulting leads.",
    author: "Dharaneesh",
    role: "CTO",
    company: "RR Motors Group",
    rating: 5,
    initials: "RS"
  }
];

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="testimonials" className="section-padding bg-[#050505] relative overflow-hidden mesh-gradient-1">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="text-xs font-semibold uppercase text-blue-400 font-sans tracking-wide">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans mb-4">
            Trusted by <span className="gradient-text-blue">Industry Leaders</span>
          </h2>
          <p className="text-base text-white/60 font-sans">
            Here is what our enterprise clients and engineering partners say about our design speed and code quality.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((test) => (
            <motion.div
              key={test.author}
              variants={itemVariants}
              className="group p-8 md:p-10 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-xl hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300 flex flex-col justify-between relative cursor-default"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 text-white/[0.02] group-hover:text-blue-500/[0.02] transition-colors">
                <Quote size={80} />
              </div>

              {/* Stars Rating */}
              <div className="flex gap-1.5 mb-6 relative z-10">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans font-normal italic relative z-10 mb-8">
                "{test.quote}"
              </p>

              {/* Client Info Block */}
              <div className="flex items-center gap-4 border-t border-white/[0.04] pt-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs font-sans">
                  {test.initials}
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {test.author}
                  </h4>
                  <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mt-0.5">
                    {test.role}, <span className="text-white/60 font-semibold">{test.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
