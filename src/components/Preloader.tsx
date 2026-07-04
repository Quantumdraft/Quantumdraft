import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = "hidden";

    // Counter animation
    let current = { val: 0 };
    gsap.to(current, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(current.val));
      },
      onComplete: () => {
        const tl = gsap.timeline();
        
        // Hide counter
        tl.to(counterRef.current, {
          opacity: 0,
          duration: 0.3,
        })
        // Show Text
        .fromTo(textRef.current, {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        // Wait a bit
        .to({}, { duration: 0.5 })
        // Slide up background
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            onComplete();
          }
        });
      }
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white text-black"
    >
      <div 
        ref={counterRef} 
        className="absolute bottom-10 right-10 text-[6vw] font-bold font-['Syne'] leading-none tracking-tighter"
      >
        {progress}%
      </div>
      <h2 
        ref={textRef} 
        className="text-[4vw] md:text-[2vw] font-medium tracking-tight opacity-0 font-['Inter']"
      >
        Engineering Tomorrow, Today.™
      </h2>
    </div>
  );
};

export default Preloader;
