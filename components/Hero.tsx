"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // PERBAIKAN: Import komponen Image Next.js
import FloralDecoration from "./Floraldecoration";
import PapelPicadoDivider from "./Papelpicadodivider";

interface StarDot {
    id: number;
    width: string;
    height: string;
    left: string;
    top: string;
    color: string;
    duration: number;
    delay: number;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

export default function Hero() {
    const [floralSize, setFloralSize] = useState(280);
    const [dots, setDots] = useState<StarDot[]>([]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setFloralSize(140);
            } else {
                setFloralSize(280);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const colors = ["#FFD700", "#FF6B1A", "#00E5FF", "#FF3CAC", "#9B5DE5"];

        const generatedDots = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            color: colors[i % 5],
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 3,
        }));
        setDots(generatedDots);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            style={{
                position: "relative",
                textAlign: "center",
                padding: "clamp(4rem, 0vw, 10rem) 1.5rem",
                overflow: "hidden",
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {/* --- POSISI FLORAL DI KEEMPAT SUDUT --- */}
            <motion.div style={{ position: "absolute", right: 0, top: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}>
                <FloralDecoration position="top-right" size={floralSize} />
            </motion.div>
            <motion.div style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}>
                <FloralDecoration position="top-left" size={floralSize} />
            </motion.div>
            <motion.div style={{ position: "absolute", left: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}>
                <FloralDecoration position="bottom-left" size={floralSize} />
            </motion.div>
            <motion.div style={{ position: "absolute", right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}>
                <FloralDecoration position="bottom-right" size={floralSize} />
            </motion.div>
            {/* ------------------------------------------- */}

            {/* Ambient glow blobs */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "clamp(300px, 80vw, 600px)",
                    height: "clamp(150px, 40vw, 300px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse at center, rgba(255,107,26,0.12) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "25%",
                    width: "clamp(200px, 50vw, 400px)",
                    height: "clamp(100px, 25vw, 200px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    background: "radial-gradient(ellipse at center, rgba(155,93,229,0.1) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Star field dots */}
            {dots.map((dot) => (
                <motion.div
                    key={dot.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: dot.width,
                        height: dot.height,
                        left: dot.left,
                        top: dot.top,
                        background: dot.color,
                        boxShadow: `0 0 10px ${dot.color}`,
                    }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: dot.duration, delay: dot.delay }}
                />
            ))}

            {/* Konten Utama */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* Top label */}
                {/* <motion.p
                    variants={fadeInUp}
                    style={{
                        color: "#FF6B1A",
                        fontFamily: "'Poppins', sans-serif",
                        textShadow: "0 0 20px rgba(255,107,26,0.7)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.35em",
                        fontSize: "clamp(1rem, 3vw, 1.5rem)",
                        marginBottom: "1.5rem", 
                    }}
                >
                    ✦ <br /> A Night to Celebrate <br />
                </motion.p> */}

                {/* PERBAIKAN: Title diubah menjadi Gambar Responsive */}
                <motion.div
                    variants={fadeInUp}
                    style={{
                        position: "relative",
                        width: "100%",
                        // maxWidth akan menahan ukuran logo maksimal 600px di laptop, dan minimal 250px di HP
                        maxWidth: "clamp(250px, 60vw, 600px)",
                        marginBottom: "16px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src="/logo.png"
                        alt="Prom Night Logo"
                        width={600}
                        height={250}
                        priority // Flag Next.js agar gambar hero diload paling pertama (LCP)
                        style={{
                            width: "100%",
                            height: "auto", // Menjaga proporsi gambar tidak gepeng
                            objectFit: "contain",
                            filter: "drop-shadow(0 0 20px rgba(255,107,26,0.35))", // Efek kilau tetap ada di belakang logo
                        }}
                    />
                </motion.div>

                {/* Year badge */}
                {/* <motion.div
                    variants={fadeInUp}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                    }}
                >
                    <span
                        style={{
                            border: "1px solid rgba(255,215,0,0.4)",
                            color: "#FFD700",
                            background: "rgba(255,215,0,0.05)",
                            boxShadow: "0 0 20px rgba(255,215,0,0.15), inset 0 0 10px rgba(255,215,0,0.05)",
                            fontFamily: "'Poppins', sans-serif",
                            textShadow: "0 0 10px rgba(255,215,0,0.5)",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            padding: "0.375rem 1.5rem",
                            borderRadius: "9999px",
                            fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
                        }}
                    >
                        Army Of God
                    </span>
                </motion.div> */}

                {/* Subtitle */}
                <motion.p
                    variants={fadeInUp}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "rgba(196, 196, 196, 0.6)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 4vw, 1.125rem)",
                        lineHeight: 1.6,
                        marginTop: "24px",
                    }}
                >
                    Scroll Down
                </motion.p>
            </motion.div>
        </section>
    );
}