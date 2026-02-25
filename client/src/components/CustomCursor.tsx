import { useState, useEffect, useCallback } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-grow]")) {
        setHovering(true);
      }
    };
    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-grow]")) {
        setHovering(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [onMouseMove]);

  if (!visible) return null;

  const size = hovering ? 48 : 32;

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        width: size,
        height: size,
        transition: "width 0.2s ease, height 0.2s ease",
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
