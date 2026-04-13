"use client";

import { motion, Variants } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

// Variasi untuk animasi parent (Kartu Utama)
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15 // Jeda antar kemunculan elemen di dalamnya
        }
    },
};

// Variasi untuk anak-anak elemen di dalam kartu
const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variasi untuk animasi garis memanjang
const lineVariants: Variants = {
    hidden: { width: "0%", opacity: 0 },
    visible: { width: "100%", opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
};

export function DateCard() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 40px rgba(255, 107, 26, 0.15)" }}
            transition={{ duration: 0.3 }}
            className="card-date relative overflow-hidden"
            style={{
                width: "100%",
                maxWidth: "42rem",
                margin: "0 auto clamp(2rem, 5vw, 4rem)",
                borderRadius: "1rem",
                padding: "clamp(1.5rem, 5vw, 3rem)",
                textAlign: "center",
                // Tambahan style border halus untuk mempertegas bentuk kartu
                border: "1px solid rgba(255, 255, 255, 0.05)",
                background: "rgba(10, 10, 10, 0.6)", // Opsional: Memberi kesan kaca/gelap
                backdropFilter: "blur(12px)"
            }}
        >
            {/* Gradient border glow top & bottom dengan animasi */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="card-date-top-glow absolute top-0 left-0 right-0 h-px"
                style={{ transformOrigin: "center" }}
            />
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="card-date-bottom-glow absolute bottom-0 left-0 right-0 h-px"
                style={{ transformOrigin: "center" }}
            />

            {/* Corner accent circles */}
            <div className="card-date-circle-tl absolute top-0 left-0 w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="card-date-circle-br absolute bottom-0 right-0 w-40 h-40 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10">
                {/* Calendar icon - Animasi Floating */}
                <motion.div variants={childVariants} style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="icon-container-calendar flex items-center justify-center relative"
                        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.75rem" }}
                    >
                        {/* Efek glow di balik icon */}
                        <div className="absolute inset-0 rounded-xl bg-orange-500/20 blur-md pointer-events-none" />
                        <CalendarDays size={28} className="icon-calendar relative z-10" strokeWidth={1.3} color="#FF6B1A" />
                    </motion.div>
                </motion.div>

                {/* Title Save The Date dengan Gradien Emas/Oranye */}
                <motion.h2
                    variants={childVariants}
                    className="text-title-date font-semibold"
                    style={{
                        marginBottom: "1rem",
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontStyle: "italic",
                        background: "linear-gradient(135deg, #FFD700 0%, #FF6B1A 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Save The Date
                </motion.h2>

                {/* Date */}
                <motion.p
                    variants={childVariants}
                    className="text-date font-medium"
                    style={{ marginBottom: "0.5rem", fontSize: "clamp(1.125rem, 3vw, 1.5rem)", color: "#ffffff" }}
                >
                    Friday, 22 May 2026
                </motion.p>

                {/* Time */}
                <motion.p
                    variants={childVariants}
                    className="text-time uppercase"
                    style={{ marginBottom: "2rem", letterSpacing: "0.22em", fontSize: "clamp(0.75rem, 2vw, 0.875rem)", color: "rgba(255,255,255,0.7)" }}
                >
                    07:00 PM — Till Drop
                </motion.p>

                {/* Divider Line dengan Animasi */}
                <motion.div variants={childVariants} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", width: "100%" }}>
                    <div className="flex-1 flex justify-end">
                        <motion.div variants={lineVariants} className="divider-line-left h-px w-full max-w-[150px] bg-gradient-to-r from-transparent to-orange-500/50" />
                    </div>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }} className="dot-1 w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} className="dot-2 w-1.5 h-1.5 rounded-full bg-pink-500" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="dot-3 w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>
                    <div className="flex-1 flex justify-start">
                        <motion.div variants={lineVariants} className="divider-line-right h-px w-full max-w-[150px] bg-gradient-to-l from-transparent to-purple-500/50" />
                    </div>
                </motion.div>

                {/* Venue Icon - Animasi Floating */}
                <motion.div variants={childVariants} style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        className="icon-container-map flex items-center justify-center relative"
                        style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem" }}
                    >
                        {/* Efek glow di balik icon */}
                        <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-md pointer-events-none" />
                        <MapPin size={22} className="icon-map relative z-10" strokeWidth={1.3} color="#9B5DE5" />
                    </motion.div>
                </motion.div>

                {/* Venue Name */}
                <motion.p
                    variants={childVariants}
                    className="text-venue font-medium"
                    style={{ marginBottom: "0.5rem", fontSize: "clamp(1rem, 2.5vw, 1.125rem)", color: "#ffffff" }}
                >
                    GMS Sidoarjo
                </motion.p>

                {/* Venue Address */}
                <motion.p
                    variants={childVariants}
                    className="text-address"
                    style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)", lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}
                >
                    Ruko Taman Pinang Indah, Kav. A2, No. 27 - 32, Sidoarjo
                </motion.p>
            </div>
        </motion.div>
    );
}