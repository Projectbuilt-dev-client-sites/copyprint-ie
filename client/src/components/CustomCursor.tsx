import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-grow]")) setHovering(true);
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-grow]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [visible]);

  const size = hovering ? 48 : 32;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed"
      style={{
        left: -100,
        top: -100,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease",
        zIndex: 2147483647,
        display: visible ? "block" : "none",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 48 48" className="w-full h-full">
        <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="#32373c" strokeWidth="0.5" />
        <circle cx="24" cy="24" r={hovering ? 5 : 3.5} fill="#e53e3e" style={{ transition: "r 0.2s ease" }} />
      </svg>
    </div>
  );
}
