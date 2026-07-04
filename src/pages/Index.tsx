import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import Achievements from "@/components/Achievements";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Handle scrolling to hashed sections on mount/load
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      // Small timeout to ensure elements are rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-blue-600/30 selection:text-white">
      {/* 1. Premium Hero */}
      <Hero />
      
      {/* 2. Who We Are */}
      <About />
      
      {/* 3. What We Do */}
      <Services />
      
      {/* 4. Why Choose Us */}
      <WhyChooseUs />
      
      {/* 5. Process Timeline */}
      <Process />
      
      {/* 6. Portfolio Showcase */}
      <Projects />
      
      {/* 7. Technologies Marquee */}
      <Technologies />
      
      {/* 8. Target Industries */}
      <Industries />
      
      {/* 9. Testimonials Carousel */}
      <Testimonials />
      
      {/* 10. Achievements Counters */}
      <Achievements />
      
      {/* 11. FAQ Accordion */}
      <FAQ />
      
      {/* 12. Contact Form & Maps */}
      <Contact />
      
      {/* 13. Footer Columns */}
      <Footer />
    </div>
  );
};

export default Index;
