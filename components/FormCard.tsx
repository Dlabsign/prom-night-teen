"use client";

import { motion, Variants } from "framer-motion";

interface FormCardProps {
    isYes: boolean | null;
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export default function FormCard({ isYes, formData, onChange, onSubmit, isLoading }: FormCardProps) {
    const fadeVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            key="form"
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
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(100vw, 500px)",
                    height: "min(60vw, 250px)",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(155,93,229,0.08) 0%, transparent 70%)",
                    filter: "blur(50px)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    background: "linear-gradient(145deg, #141420 0%, #1A1A2E 100%)",
                    border: "1px solid rgba(155,93,229,0.2)",
                    borderRadius: "24px",
                    padding: "clamp(32px, 8vw, 44px) clamp(20px, 6vw, 40px)",
                    width: "100%",
                    maxWidth: "440px",
                    boxShadow: "0 0 0 1px rgba(155,93,229,0.05), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", borderRadius: "24px 24px 0 0", background: "linear-gradient(to right, transparent, #9B5DE5, #FF3CAC, #9B5DE5, transparent)", opacity: 0.65 }} />

                <div style={{ position: "absolute", top: "14px", left: "16px", fontSize: "clamp(14px, 4vw, 18px)", opacity: 0.3, color: "#FF3CAC", filter: "drop-shadow(0 0 6px #FF3CAC)" }}>❋</div>
                <div style={{ position: "absolute", top: "14px", right: "16px", fontSize: "clamp(14px, 4vw, 18px)", opacity: 0.3, color: "#9B5DE5", filter: "drop-shadow(0 0 6px #9B5DE5)" }}>❋</div>

                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9B5DE5", textShadow: "0 0 14px rgba(155,93,229,0.6)", marginBottom: "10px", fontWeight: 500, textAlign: "center" }}>
                    ✦ Data Diri ✦
                </p>

                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 6vw, 26px)", fontWeight: 600, marginBottom: "28px", textAlign: "center", background: "linear-gradient(135deg, #FF3CAC 0%, #9B5DE5 50%, #00E5FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 10px rgba(155,93,229,0.3))" }}>
                    Isi Data Dirimu
                </h2>

                <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* Input: Nama */}
                    <input required name="nama" placeholder="Nama Lengkap" value={formData.nama} onChange={onChange} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.25s ease, box-shadow 0.25s ease", width: "100%" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,26,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,26,0.1)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />

                    {/* Input: CG */}
                    <input required name="cg" placeholder="Asal CG" value={formData.cg} onChange={onChange} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.25s ease, box-shadow 0.25s ease", width: "100%" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,26,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,26,0.1)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />


                    {/* TAMBAHAN Input: Email */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
                        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,107,26,0.25))" }} />
                        <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontFamily: "'Poppins', sans-serif", textTransform: "uppercase" }}>Undangan Akan dikirim melalui Gmail</span>
                        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(255,107,26,0.25))" }} />
                    </div>
                    <input required type="email" name="email" placeholder="Pastikan Alamat Email Kamu Benar!" value={formData.email} onChange={onChange} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.25s ease, box-shadow 0.25s ease", width: "100%" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,26,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,107,26,0.1)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />

                    {isYes === false && (
                        <>

                            <input required name="pindahKemana" placeholder="Pindah ke mana?" value={formData.pindahKemana} onChange={onChange} style={{ padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", outline: "none", transition: "border-color 0.25s ease, box-shadow 0.25s ease", width: "100%" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(155,93,229,0.6)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(155,93,229,0.1)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.04em" }}>Ada CG di sana?</label>
                                <select name="adaCgDisana" value={formData.adaCgDisana} onChange={onChange} style={{ padding: "13px 16px", background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", outline: "none", cursor: "pointer", transition: "border-color 0.25s ease", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px", width: "100%" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(155,93,229,0.6)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
                                    <option value="Ya" style={{ background: "#141420" }}>Ya</option>
                                    <option value="Tidak" style={{ background: "#141420" }}>Tidak</option>
                                </select>
                            </div>
                        </>
                    )}
                    <button type="submit" disabled={isLoading} style={{ marginTop: "8px", padding: "14px", background: isLoading ? "rgba(255,107,26,0.3)" : "linear-gradient(135deg, #FF6B1A, #FF3CAC)", border: "none", borderRadius: "12px", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 500, cursor: isLoading ? "not-allowed" : "pointer", letterSpacing: "0.08em", boxShadow: isLoading ? "none" : "0 0 20px rgba(255,107,26,0.35), 0 0 40px rgba(255,60,172,0.15), 0 4px 15px rgba(0,0,0,0.3)", transition: "transform 0.2s ease, opacity 0.2s ease", opacity: isLoading ? 0.6 : 1, width: "100%" }} onMouseEnter={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
                        {isLoading ? "Mengirim Ke Gmail..." : "Submit & Lanjut →"}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}