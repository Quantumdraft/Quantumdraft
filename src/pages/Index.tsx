import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import QuantumField from "@/components/QuantumField";

import { useEffect, useState } from "react";

const Index = () => {
  const [dbStatus, setDbStatus] = useState<string>("Checking DB connection...");

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed");
      })
      .then((data) => setDbStatus(`✅ DB Connected! Found ${data.length} users.`))
      .catch(() => setDbStatus("❌ DB Connection Failed (Backend might not be running)"));
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChooseUs />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
