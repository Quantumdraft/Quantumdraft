import { motion } from "framer-motion";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="container-custom flex-1 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-light font-['Inter'] tracking-tight text-white mb-6">
            Get In <span className="font-bold text-primary">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
            Ready to architect your digital future? Reach out to our team of engineers and designers.
          </p>
        </motion.div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
