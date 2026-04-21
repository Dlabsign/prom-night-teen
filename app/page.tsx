"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Import Komponen Modular
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import PapelPicadoDivider from "@/components/Papelpicadodivider";
import { DateCard } from "@/components/InvitationCard";
import FormCard from "@/components/FormCard";
import EnjoyCard from "@/components/EnjoyCard";
import QuestionCard from "@/components/PertanyaanCard";

// Import Firebase
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type FlowStep = "cover" | "question" | "form" | "enjoy" | "main";

export default function Home() {
  const [step, setStep] = useState<FlowStep>("cover");
  const [isYes, setIsYes] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    cg: "",
    pindahKemana: "",
    adaCgDisana: "Tidak",
  });

  // Audio Logic
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Event Handlers
  const handleOpenInvitation = () => { setStep("question"); setIsPlaying(true); };
  const handleAnswer = (answer: boolean) => { setIsYes(answer); setStep("form"); };

  // PERBAIKAN: Mengganti tipe 'any' menjadi tipe bawaan React agar lebih aman (Typescript best practice)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // --- 1. CEK EMAIL DI FIREBASE DENGAN ERROR HANDLING JARINGAN ---
      let querySnapshot;
      try {
        const q = query(
          collection(db, "rsvp_responses"),
          where("email", "==", formData.email)
        );
        querySnapshot = await getDocs(q);
      } catch (networkError: any) {
        // Menangkap error khusus jika internet mati atau akses ke Firestore diblokir
        if (networkError.message?.includes("10 seconds") || networkError.message?.includes("offline")) {
          alert("Gagal terhubung ke database. Pastikan koneksi internet stabil dan matikan AdBlocker/VPN, lalu coba lagi.");
          setIsLoading(false);
          return;
        }
        throw networkError; // Lempar error lain ke blok catch utama di bawah
      }

      if (!querySnapshot.empty) {
        alert("Email ini sudah digunakan untuk RSVP sebelumnya. Silakan gunakan email lain.");
        setIsLoading(false);
        return;
      }

      // --- 2. SIMPAN KE FIREBASE ---
      const customId = `${formData.nama.toLowerCase().replace(/\s+/g, '_')}_${formData.cg.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
      await setDoc(doc(db, "rsvp_responses", customId), {
        ...formData,
        is_staying: isYes,
        created_at: serverTimestamp(),
      });

      // --- 3. KIRIM KE GOOGLE SHEETS (VIA APPS SCRIPT) ---
      const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
      if (sheetUrl) {
        fetch(sheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({
            ...formData,
            isYes: isYes
          }),
          mode: 'no-cors'
        }).catch(err => console.error("Gagal kirim ke Sheets:", err));
      }

      // --- 4. KIRIM EMAIL OTOMATIS VIA API ---
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, isYes: isYes }),
      }).catch(err => console.error("Gagal mengirim email:", err));

      // --- 5. TRANSISI HALAMAN SUKSES ---
      setStep("enjoy");
      setTimeout(() => setStep("main"), 3000);

    } catch (error: any) {
      console.error(error);
      alert("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0A0A0F]">
      <audio ref={audioRef} src="/music2.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {step === "cover" && <Cover key="cover" onOpen={handleOpenInvitation} />}

        {step === "question" && <QuestionCard key="q" onAnswer={handleAnswer} />}

        {step === "form" && (
          <FormCard
            key="f"
            isYes={isYes}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {step === "enjoy" && <EnjoyCard key="e" isYes={isYes} />}

        {step === "main" && (
          <motion.div key="main" initial={{ opacity: .7 }} animate={{ opacity: 1 }} className="pb-32">
            <Hero />
            <div className="my-2"><PapelPicadoDivider /></div>
            <DateCard />
            <MusicPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}