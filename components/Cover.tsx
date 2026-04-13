"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloralDecoration from "./Floraldecoration";

interface CoverProps {
    onOpen: () => void;
}

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

export default function Cover({ onOpen }: CoverProps) {
    const [dots, setDots] = useState<StarDot[]>([]);

    // STATE UNTUK RESPONSIVE BUNGA
    const [floralSize, setFloralSize] = useState(280);

    useEffect(() => {
        // 1. Logika untuk memantau ukuran layar (Responsive JS)
        const handleResize = () => {
            // Jika layar HP (< 768px), ukuran bunga jadi 140. Jika laptop, 280.
            if (window.innerWidth < 768) {
                setFloralSize(140);
            } else {
                setFloralSize(280);
            }
        };

        // Panggil sekali saat pertama kali render
        handleResize();

        // Tambahkan event listener saat ukuran layar berubah
        window.addEventListener("resize", handleResize);

        // 2. Logika untuk generate bintang
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

        // Cleanup listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 24px",
                overflow: "hidden",
                backgroundColor: "#0a0a0a" // Warna background dasar (soft cream)
            }}
        >
            {/* Background ambient glows */}
            <div
                style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    pointerEvents: "none",
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,26,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(155,93,229,0.08) 0%, transparent 60%)",
                }}
            />

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

            {/* Star field dots */}
            {dots.map((dot) => (
                <motion.div
                    key={dot.id}
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        pointerEvents: "none",
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

            {/* Kontainer utama teks */}
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
                {/* Top label (Menggunakan CLAMP untuk responsive font) */}
                <p
                    style={{
                        color: "#FF6B1A",
                        fontFamily: "'Poppins', sans-serif",
                        textShadow: "0 0 20px rgba(255,107,26,0.7)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.35em",
                        fontSize: "clamp(1.3rem, 3vw, 1.5rem)", // Teks mengecil di HP
                        marginBottom: "-1.2rem",
                    }}
                >
                    Hai AOG'ers
                </p>

                {/* Cover title (Menggunakan CLAMP untuk responsive font) */}
                <h1
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #FFD700 0%, #FF6B1A 45%, #FF3CAC 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 30px rgba(255,107,26,0.35))",
                        fontSize: "clamp(3rem, 10vw, 5.5rem)", // Otomatis menyesuaikan layar HP ke Laptop
                        marginBottom: "8px",
                    }}
                >
                    You Are Invited
                </h1>


                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpen}
                    style={{
                        position: "relative",
                        fontFamily: "'Poppins', sans-serif",
                        background: "linear-gradient(135deg, #FF6B1A, #FF3CAC)",
                        color: "white",
                        boxShadow: "0 0 25px rgba(255,107,26,0.45), 0 0 60px rgba(255,60,172,0.2), 0 4px 20px rgba(0,0,0,0.4)",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                        padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)", // Padding fluid
                        borderRadius: "9999px",
                        overflow: "hidden",
                        marginTop: "1rem",
                    }}
                >
                    {/* Shimmer overlay */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            borderRadius: "9999px",
                            pointerEvents: "none",
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)"
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                    />
                    Open Invitation
                </motion.button>
            </motion.div>
        </motion.div>
    );
}