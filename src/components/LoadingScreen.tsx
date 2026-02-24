import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "@/assets/quantum-draft-logo.png";

const LoadingScreen = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Initial entrance
        tl.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        tl.fromTo(
            logoRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
            "-=0.3"
        );

        tl.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );

        // Continuous pulsing effect after entrance
        gsap.to(logoRef.current, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070a]"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <img
                    ref={logoRef}
                    src={logo}
                    alt="Quantum Draft Logo"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10"
                />
            </div>
            <div
                ref={textRef}
                className="mt-8 text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-tight"
            >
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Quantum Draft
                </span>
            </div>
            <div className="mt-4 flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
        </div>
    );
};

export default LoadingScreen;
