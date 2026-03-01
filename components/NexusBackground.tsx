"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LOGO_SRC = "/ng-logo.jpg";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function NexusBackground() {
  const reduceMotion = useReducedMotion();
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMx((e.clientX - cx) / cx);
      setMy((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: rand(5, 95),
      top: rand(8, 92),
      size: rand(2, 5),
      dur: rand(8, 16),
      driftX: rand(-40, 40),
      driftY: rand(-30, 30),
      delay: rand(0, 4),
      opacity: rand(0.18, 0.5),
    }));
  }, []);

  const bgParallax = reduceMotion
    ? {}
    : { transform: `translate3d(${mx * 16}px, ${my * 16}px, 0)` };

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0016] via-[#06000d] to-black" />

      {/* Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 620px at 50% 10%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(800px 600px at 18% 42%, rgba(99,102,241,0.20), transparent 60%), radial-gradient(900px 700px at 82% 55%, rgba(236,72,153,0.14), transparent 60%)",
        }}
      />

      {/* Parallax layer */}
      <div className="absolute inset-0" style={bgParallax}>
        {/* Logo watermark + rotation */}
        {reduceMotion ? (
          <div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "min(980px, 92vw)",
              height: "min(980px, 92vw)",
              backgroundImage: `url(${LOGO_SRC})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              opacity: 0.18, // ✅ visible partout
              filter:
                "saturate(1.25) contrast(1.15) drop-shadow(0 0 35px rgba(168,85,247,0.22))",
              mixBlendMode: "screen",
            }}
          />
        ) : (
          <motion.div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
            style={{ width: "min(980px, 92vw)", height: "min(980px, 92vw)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${LOGO_SRC})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                opacity: 0.18,
                filter:
                  "saturate(1.25) contrast(1.15) drop-shadow(0 0 35px rgba(168,85,247,0.22))",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.22), transparent 62%)",
              }}
            />
          </motion.div>
        )}

        {/* Scanline */}
        {!reduceMotion && (
          <motion.div
            className="absolute left-0 right-0 h-40"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: ["-20%", "120%"], opacity: [0, 0.35, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(168,85,247,0.25), rgba(99,102,241,0.18), transparent)",
              filter: "blur(10px)",
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* Particles */}
        {!reduceMotion &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                background: "rgba(255,255,255,1)",
                opacity: p.opacity,
                boxShadow: "0 0 18px rgba(168,85,247,0.35)",
              }}
              animate={{
                x: [0, p.driftX, 0],
                y: [0, p.driftY, 0],
                opacity: [p.opacity, Math.min(0.75, p.opacity + 0.18), p.opacity],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}

        {/* Animated blobs */}
        {!reduceMotion && (
          <>
            <motion.div
              className="absolute -top-44 -left-44 h-[560px] w-[560px] rounded-full blur-3xl"
              style={{ background: "rgba(168,85,247,0.26)" }}
              animate={{ x: [0, 48, 0], y: [0, 34, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[18%] -right-56 h-[620px] w-[620px] rounded-full blur-3xl"
              style={{ background: "rgba(99,102,241,0.22)" }}
              animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-260px] left-[28%] h-[720px] w-[720px] rounded-full blur-3xl"
              style={{ background: "rgba(236,72,153,0.14)" }}
              animate={{ x: [0, 60, 0], y: [0, -28, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.45\"/></svg>')",
        }}
      />
    </div>
  );
}