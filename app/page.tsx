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
import QuestionCard from "@/components/PertanyaanCard"; // Sesuai dengan import barumu

// Firebase
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type FlowStep = "cover" | "question" | "form" | "enjoy" | "main";

export default function Home() {
  const [step, setStep] = useState<FlowStep>("cover");
  const [isYes, setIsYes] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TAMBAHAN: Menambahkan state email
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
  const handleInputChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Simpan ke database Firebase (Sama seperti sebelumnya)
      const customId = `${formData.nama.toLowerCase().replace(/\s+/g, '_')}_${formData.cg.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;
      await setDoc(doc(db, "rsvp_responses", customId), {
        ...formData,
        is_staying: isYes,
        created_at: serverTimestamp(),
      });

      // 2. KIRIM EMAIL OTOMATIS (Memanggil API Route)
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Kirim semua data form beserta status Yes/No ke API
        body: JSON.stringify({
          ...formData,
          isYes: isYes
        }),
      });

      // 3. Transisi Halaman (Lanjut ke Enjoy)
      setStep("enjoy");
      setTimeout(() => setStep("main"), 3000);

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem saat menyimpan atau mengirim email.");
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