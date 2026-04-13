"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Equalizer bars */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-end gap-1 mb-1"
            style={{ height: "20px" }}
          >
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                animate={{ height: ["4px", `${8 + bar * 4}px`, "4px"] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + bar * 0.1,
                  delay: bar * 0.12,
                  ease: "easeInOut",
                }}
                className="w-1 rounded-t-full"
                style={{
                  background: ["#FF6B1A", "#FFD700", "#FF3CAC", "#9B5DE5"][bar - 1],
                  boxShadow: `0 0 6px ${["#FF6B1A", "#FFD700", "#FF3CAC", "#9B5DE5"][bar - 1]}`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggle}
        aria-label="Toggle music"
        className="relative w-14 h-14 flex items-center justify-center rounded-full"
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, #FF6B1A, #FF3CAC)"
            : "linear-gradient(135deg, #9B5DE5, #00E5FF)",
          boxShadow: isPlaying
            ? "0 0 20px rgba(255,107,26,0.5), 0 0 40px rgba(255,60,172,0.3), 0 4px 15px rgba(0,0,0,0.3)"
            : "0 0 20px rgba(155,93,229,0.5), 0 0 40px rgba(0,229,255,0.2), 0 4px 15px rgba(0,0,0,0.3)",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Pulse ring */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              background: "transparent",
              border: "2px solid rgba(255,107,26,0.5)",
            }}
          />
        )}
        {isPlaying ? (
          <Pause size={22} fill="white" color="white" />
        ) : (
          <Music size={22} color="white" />
        )}
      </motion.button>
    </div>
  );
}