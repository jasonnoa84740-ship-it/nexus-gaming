"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="nx-cursor"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    />
  );
}