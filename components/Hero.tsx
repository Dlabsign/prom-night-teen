"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloralDecoration from "./Floraldecoration";
import PapelPicadoDivider from "./Papelpicadodivider";
import { CalendarDays, MapPin } from "lucide-react";

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

// Varian khusus untuk animasi teks berkilau
const shimmerVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        backgroundPosition: ["0% center", "200% center"] as [string, string],
        transition: {
            opacity: { duration: 0.9, ease: "easeOut" as const },
            y: { duration: 0.9, ease: "easeOut" as const },
            backgroundPosition: {
                repeat: Infinity,
                duration: 4,
                ease: "linear" as const,
            },
        },
    },
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
            {/* --- POSISI FLORAL RESPONSIVE --- */}
            {/* --- POSISI FLORAL DI KEEMPAT SUDUT --- */}
            <motion.div
                style={{ position: "absolute", right: 0, top: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}
            >
                <FloralDecoration position="top-right" size={floralSize} />
            </motion.div>
            <motion.div
                style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}
            >
                <FloralDecoration position="top-left" size={floralSize} />
            </motion.div>
            <motion.div
                style={{ position: "absolute", left: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}
            >
                <FloralDecoration position="bottom-left" size={floralSize} />
            </motion.div>
            <motion.div
                style={{ position: "absolute", right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}
            >
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

            {/* Konten Utama */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {/* Top label - DIPISAHKAN DARI H1 */}
                <motion.p
                    variants={fadeInUp}
                    style={{
                        color: "#FF6B1A",
                        fontFamily: "'Poppins', sans-serif",
                        textShadow: "0 0 20px rgba(255,107,26,0.7)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.35em",
                        fontSize: "clamp(1rem, 3vw, 1.5rem)",
                        marginBottom: "-3rem", // Memberi jarak dengan H1
                    }}
                >
                    ✦ <br /> A Night to Celebrate <br/>
                </motion.p>

                {/* Main title dengan Shimmer Variant */}
                <motion.h1
                    variants={shimmerVariant}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        // Gradien diubah agar memiliki titik kilauan putih/emas terang di tengah dan looping seamless
                        background: "linear-gradient(90deg, #FFD700 0%, #FF6B1A 25%, #FF3CAC 40%, #FFFFFF 50%, #FF3CAC 60%, #FF6B1A 75%, #FFD700 100%)",
                        backgroundSize: "200% auto", // Harus lebih besar agar kilauan bisa bergerak
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 30px rgba(255,107,26,0.35))",
                        fontSize: "clamp(5.3rem, 10vw, 6.5rem)",
                        marginBottom: "8px",
                        fontStyle: "italic",
                    }}
                >
                    Prom Night
                </motion.h1>

                {/* Year badge */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
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
                        Class of 2026
                    </span>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "rgba(100,100,100,0.6)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 4vw, 1.125rem)",

                        lineHeight: 1.6,
                    }}
                >
                    ARMY OF GOD
                </motion.p>
            </motion.div>
        </section>
    );
}