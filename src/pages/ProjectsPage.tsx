import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "Rackprcas",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    link: "https://rackprcas.in",
    year: "2024"
  },
  {
    title: "KK Exports",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2000&auto=format&fit=crop",
    link: "https://kkexps.com",
    year: "2023"
  },
  {
    title: "RR Motors",
    category: "Display",
    image: "https://images.unsplash.com/photo-1503376712351-1f2ce9c09c13?q=80&w=2000&auto=format&fit=crop",
    link: "https://motors.org.in",
    year: "2023"
  },
  {
    title: "Nexus Hub",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    link: "#",
    year: "2024"
  }
];

const HorizontalScrollGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {projects.map((project, idx) => (
            <a 
              key={idx} 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="group relative h-[60vh] w-[80vw] md:w-[60vw] lg:w-[40vw] overflow-hidden rounded-2xl bg-black/50 border border-white/10 shrink-0 shadow-2xl block cursor-pointer"
            >
              {/* Image with subtle hover zoom */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-between opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex justify-between items-start">
                  <div className="px-4 py-1 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm text-white text-xs font-bold tracking-widest uppercase">
                    {project.category}
                  </div>
                  <div className="text-white font-light text-xl">
                    {project.year}
                  </div>
                </div>

                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-6xl font-['Inter'] font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32">
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-light font-['Inter'] tracking-tight text-white mb-6">
            Selected <span className="font-bold text-primary">Works</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-['Inter'] leading-relaxed max-w-2xl">
            Scroll down to explore our interactive gallery of digital ecosystems and premium web applications.
          </p>
        </motion.div>
      </div>

      <HorizontalScrollGallery />
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
