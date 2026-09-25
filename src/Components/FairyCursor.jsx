import { useEffect, useRef, useState } from "react";

const FairyCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      const target = event.target;

      setHovering(
        target.closest(
          "a, button, input, textarea, select, [role='button']"
        ) !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;

    const animate = () => {
      current.current.x +=
        (mouse.current.x - current.current.x) * 0.18;

      current.current.y +=
        (mouse.current.y - current.current.y) * 0.18;

      const { x, y } = current.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Fairy Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-xl transition-transform duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(190,255,0,0.35) 0%, rgba(190,255,0,0.12) 35%, transparent 70%)",
        }}
      />

      {/* Glowing Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          hovering
            ? "scale-[1.7] border-lime-300 shadow-[0_0_25px_rgba(190,255,0,0.8),inset_0_0_12px_rgba(190,255,0,0.25)]"
            : "border-lime-300/80 shadow-[0_0_15px_rgba(190,255,0,0.55),inset_0_0_8px_rgba(190,255,0,0.15)]"
        }`}
      />

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300 shadow-[0_0_8px_rgba(190,255,0,1),0_0_18px_rgba(190,255,0,0.8)]"
      />

      {/* Blinking Fairy Spark */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-lime-200 opacity-70"
        style={{
          animationDuration: "1.5s",
        }}
      />
    </>
  );
};

export default FairyCursor;