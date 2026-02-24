import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Innovation from "@/components/Innovation";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
      <div className="bg-black text-white text-center p-2 text-sm font-mono border-b border-gray-800">
        Backend Status: {dbStatus}
      </div>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Innovation />
      <WhyChooseUs />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
