import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const webPackages = [
    {
      name: "Basic",
      price: "₹9,999",
      features: ["3-4 pages", "Responsive design", "SEO setup", "Basic support", "1 month maintenance"]
    },
    {
      name: "Standard",
      price: "₹19,999",
      features: ["6-8 dynamic pages", "CMS integration", "Advanced SEO", "Priority support", "3 months maintenance"],
      popular: true
    },
    {
      name: "Premium",
      price: "₹34,999",
      features: ["E-commerce ready", "Chatbot integration", "Analytics dashboard", "24/7 support", "6 months maintenance"]
    },
    {
      name: "Enterprise",
      price: "₹59,999+",
      features: ["Full web app", "Custom automation", "Cloud hosting", "Dedicated support", "12 months maintenance"]
    }
  ];

  const marketingPackages = [
    {
      name: "Starter",
      price: "₹7,999/mo",
      features: ["Basic SEO", "Social media setup", "2 posts/week", "Monthly reports", "Email support"]
    },
    {
      name: "Growth",
      price: "₹14,999/mo",
      features: ["Targeted ads", "Chatbot automation", "5 posts/week", "Weekly analytics", "Priority support"],
      popular: true
    },
    {
      name: "Pro Brand",
      price: "₹29,999/mo",
      features: ["Advanced ads", "Full automation", "Daily posting", "Real-time analytics", "Influencer tie-ups"]
    },
    {
      name: "Elite Enterprise",
      price: "Custom",
      features: ["360° AI marketing", "Web automation", "Custom strategy", "Dedicated manager", "Full integration"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const PricingCard = ({ pkg, index }: { pkg: any; index: number }) => (
    <div
      className={`glass-card p-8 hover:scale-105 transition-all duration-300 ${
        pkg.popular ? "border-2 border-primary glow-primary" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {pkg.popular && (
        <div className="gradient-accent text-center py-1 px-4 rounded-full text-sm font-semibold mb-4 inline-block">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
      <div className="text-3xl font-bold mb-6 text-primary">{pkg.price}</div>
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
          <Button
            onClick={scrollToContact}
            variant="gradient"
            className={pkg.popular ? "w-full shadow-[0_0_20px_rgba(45,212,191,0.3)]" : "w-full"}
          >
            Request Quote
          </Button>
    </div>
  );

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options to suit businesses of all sizes
          </p>
        </div>

        {/* Web Development Packages */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Website Development Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {webPackages.map((pkg, index) => (
              <PricingCard key={index} pkg={pkg} index={index} />
            ))}
          </div>
        </div>

        {/* Digital Marketing Packages */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Digital Marketing Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingPackages.map((pkg, index) => (
              <PricingCard key={index} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
