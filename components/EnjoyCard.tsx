"use client";

import { motion, Variants } from "framer-motion";

interface EnjoyCardProps {
  isYes: boolean | null;
}

export default function EnjoyCard({ isYes }: EnjoyCardProps) {
  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      key="enjoy"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow - color depends on answer */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background: isYes
            ? "radial-gradient(ellipse at center, rgba(255,107,26,0.12) 0%, transparent 65%)"
            : "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating sparkles */}
      {[
        { top: "18%", left: "14%", color: "#FFD700", size: "22px" },
        { top: "22%", right: "12%", color: "#FF3CAC", size: "18px" },
        { top: "68%", left: "10%", color: "#9B5DE5", size: "16px" },
        { top: "72%", right: "16%", color: "#00E5FF", size: "20px" },
        { top: "42%", left: "6%", color: "#FF6B1A", size: "14px" },
        { top: "38%", right: "8%", color: "#FFD700", size: "14px" },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, ease: "easeInOut" }}
          style={{
            position: "absolute",
            ...s,
            color: s.color,
            fontSize: s.size,
            filter: `drop-shadow(0 0 8px ${s.color})`,
            pointerEvents: "none",
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Pre-label */}


        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 10vw, 72px)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            background: isYes
              ? "linear-gradient(135deg, #FFD700 0%, #FF6B1A 50%, #FF3CAC 100%)"
              : "linear-gradient(135deg, #00E5FF 0%, #3B82F6 50%, #9B5DE5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: isYes
              ? "drop-shadow(0 0 30px rgba(255,107,26,0.4))"
              : "drop-shadow(0 0 30px rgba(59,130,246,0.4))",
          }}
        >
          Welcome To...
         
        </motion.h1>

        {/* Glowing dots row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "32px",
          }}
        >
          {(isYes
            ? ["#FFD700", "#FF6B1A", "#FF3CAC", "#FF6B1A", "#FFD700"]
            : ["#00E5FF", "#3B82F6", "#9B5DE5", "#3B82F6", "#00E5FF"]
          ).map((c, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.18 }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: c,
                boxShadow: `0 0 8px ${c}`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}