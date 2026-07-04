import { useRef, useEffect } from "react";

export const useTilt = (active = true, intensity = 12) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      // Calculate angles based on mouse distance from center
      const angleX = (yc - y) / intensity;
      const angleY = (x - xc) / intensity;

      el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    const handleMouseLeave = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [active, intensity]);

  return ref;
};
