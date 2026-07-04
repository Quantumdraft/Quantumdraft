import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="container-custom flex-1 mb-32">
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-light font-['Inter'] tracking-tight text-white mb-6">
              Who We <span className="font-bold text-primary">Are</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
              We are a collective of engineers, designers, and visionaries building the future of the digital landscape.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-10 md:p-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Quantum Draft was founded on a singular principle: the digital world should not be flat. We believe in engineering cyber-physical ecosystems that provide immersive, engaging, and highly performant experiences.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              By leveraging bleeding-edge technologies like WebGL, advanced physics simulations, and robust cloud architectures, we deliver products that stand out in a saturated market.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-panel p-10">
              <h3 className="text-5xl font-light text-primary mb-2">10+</h3>
              <p className="text-white font-bold tracking-widest uppercase text-sm">Enterprise Deployments</p>
            </div>
            <div className="glass-panel p-10">
              <h3 className="text-5xl font-light text-primary mb-2">100%</h3>
              <p className="text-white font-bold tracking-widest uppercase text-sm">Client Satisfaction</p>
            </div>
            <div className="glass-panel p-10">
              <h3 className="text-5xl font-light text-primary mb-2">24/7</h3>
              <p className="text-white font-bold tracking-widest uppercase text-sm">Continuous Support</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
