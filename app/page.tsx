"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import PapelPicadoDivider from "@/components/Papelpicadodivider";
import { DateCard } from "@/components/InvitationCard";

export default function Home() {
  // --- STATE & REFS (logic unchanged) ---
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- AUDIO LOGIC (unchanged) ---
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio autoplay failed:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "#0A0A0F",
        // Subtle noise-like gradient texture
        backgroundImage:
          "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(255,107,26,0.04) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 50% 110%, rgba(155,93,229,0.05) 0%, transparent 50%)",
      }}
    >
      {/* Selection color */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500&display=swap');
        ::selection {
          background: rgba(255,107,26,0.35);
          color: #fff;
        }
        body {
          background: #0A0A0F;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Audio element (logic unchanged) */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Cover key="cover" onOpen={handleOpenInvitation} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative pb-32"
          >
            {/* ===== HERO ===== */}
            <Hero />

            {/* ===== MAIN CARDS ===== */}

            <div style={{ margin: ".45rem 0" }}>
              <PapelPicadoDivider />
            </div>
            <DateCard />
            {/* <InvitationCard /> */}
            {/* ===== FOOTER ===== */}
         
            {/* ===== MUSIC PLAYER ===== */}
            <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
          </motion.div>
        )}
      </AnimatePresence>
    </main >
  );
}