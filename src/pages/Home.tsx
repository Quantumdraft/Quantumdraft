import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Hero />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
