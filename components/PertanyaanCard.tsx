"use client";

import { motion, Variants } from "framer-motion";

interface QuestionCardProps {
    onAnswer: (answer: boolean) => void;
}

export default function QuestionCard({ onAnswer }: QuestionCardProps) {
    const fadeVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            key="question"
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
                padding: "16px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(100vw, 600px)",
                    height: "min(50vw, 300px)",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(255,107,26,0.1) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                }}
            />

            {[
                { top: "15%", left: "10%", color: "#FFD700" },
                { top: "20%", right: "8%", color: "#FF3CAC" },
                { bottom: "25%", left: "6%", color: "#9B5DE5" },
                { bottom: "18%", right: "12%", color: "#00E5FF" },
            ].map((s, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        ...s,
                        fontSize: "clamp(14px, 4vw, 18px)",
                        opacity: 0.5,
                        filter: `drop-shadow(0 0 6px ${s.color})`,
                        color: s.color,
                        pointerEvents: "none",
                    }}
                >
                    ✦
                </div>
            ))}

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    background: "linear-gradient(145deg, #141420 0%, #1A1A2E 100%)",
                    border: "1px solid rgba(255,107,26,0.2)",
                    borderRadius: "24px",
                    padding: "clamp(32px, 8vw, 48px) clamp(20px, 6vw, 56px)",
                    textAlign: "center",
                    maxWidth: "420px",
                    width: "100%",
                    boxShadow: "0 0 0 1px rgba(255,107,26,0.05), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, height: "1px",
                        borderRadius: "24px 24px 0 0",
                        background: "linear-gradient(to right, transparent, #FF6B1A, #FFD700, #FF3CAC, transparent)",
                        opacity: 0.6,
                    }}
                />

                <div style={{ position: "absolute", top: "14px", left: "16px", fontSize: "clamp(16px, 4vw, 20px)", opacity: 0.35, color: "#FF6B1A", filter: "drop-shadow(0 0 6px #FF6B1A)" }}>✿</div>
                <div style={{ position: "absolute", top: "14px", right: "16px", fontSize: "clamp(16px, 4vw, 20px)", opacity: 0.35, color: "#FFD700", filter: "drop-shadow(0 0 6px #FFD700)" }}>✿</div>

                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#FF6B1A", textShadow: "0 0 16px rgba(255,107,26,0.6)", marginBottom: "16px", fontWeight: 500 }}>
                    ✦ RSVP ✦
                </p>

                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 6vw, 28px)", fontWeight: 600, marginBottom: "32px", lineHeight: 1.4, background: "linear-gradient(135deg, #FFD700 0%, #FF6B1A 50%, #FF3CAC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 12px rgba(255,107,26,0.25))" }}>
                    are you a graduate?
                </h2>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                        onClick={() => onAnswer(false)}
                        style={{ padding: "12px clamp(24px, 6vw, 36px)", background: "linear-gradient(135deg, #FF6B1A, #FF3CAC)", border: "none", borderRadius: "100px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 500, cursor: "pointer", boxShadow: "0 0 20px rgba(255,107,26,0.4), 0 0 40px rgba(255,60,172,0.2), 0 4px 15px rgba(0,0,0,0.3)", transition: "transform 0.2s ease, box-shadow 0.2s ease", flex: "1 1 auto", maxWidth: "180px" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => onAnswer(true)}
                        style={{ padding: "12px clamp(24px, 6vw, 36px)", background: "transparent", border: "1px solid rgba(255,107,26,0.5)", borderRadius: "100px", color: "#FF6B1A", fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 500, cursor: "pointer", boxShadow: "0 0 12px rgba(255,107,26,0.1), inset 0 0 12px rgba(255,107,26,0.03)", transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease", flex: "1 1 auto", maxWidth: "180px" }}
                        onMouseEnter={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.background = "rgba(255,107,26,0.12)"; btn.style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { const btn = e.currentTarget as HTMLButtonElement; btn.style.background = "transparent"; btn.style.transform = "scale(1)"; }}
                    >
                        No
                    </button>
                </div>
            </div>
        </motion.div>
    );
}