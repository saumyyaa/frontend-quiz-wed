"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";

const correctAnswers = ["Meow-Meow", "ice cream", "yellow", "Infinite"];

export default function Results() {
  const params = useSearchParams();
  const router = useRouter();

  // Get user answers from URL
  const answers = JSON.parse(params.get("ans") || "[]");

  // Score calculation
  const score = answers.filter(
    (ans: string, i: number) => ans === correctAnswers[i]
  ).length;

  const percent = Math.round((score / correctAnswers.length) * 100);

  // Smooth counter state
  const [counter, setCounter] = useState(0);

  // Confetti visibility
  const [showConfetti, setShowConfetti] = useState(true);

  // Client-side mount state to prevent hydration error
  const [mounted, setMounted] = useState(false);

  // Click sound for button
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.4 });

  // Reaction logic
  const isGood = percent >= 60;
  const emoji = isGood ? "😺" : "😿";
  const feedback = isGood ? "Great Job!" : "Keep Practicing!";

  useEffect(() => {
    // Set mounted to true on client side
    setMounted(true);
  }, []);

  useEffect(() => {
    let start = 0;
    const end = percent;
    const duration = 1500;
    const step = 20;

    // Smooth counter animation
    const timer = setInterval(() => {
      start += end / (duration / step);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCounter(Math.floor(start));
    }, step);

    // Turn off confetti after 4 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(confettiTimer);
    };
  }, [percent]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-300 to-cyan-200 p-6 relative overflow-hidden">

      {/* CONFETTI CELEBRATION (no files needed) */}
      {mounted && showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      {/* RESULTS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/40 p-12 rounded-3xl max-w-xl w-full text-center backdrop-blur-xl shadow-2xl relative"
      >
        {/* EMOJI REACTION */}
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {emoji}
        </motion.div>

        {/* FEEDBACK TEXT */}
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-slate-700 mb-6"
        >
          {feedback}
        </motion.h2>

        {/* SMOOTH COUNTER (0 → final %) */}
        <motion.div
          className="text-7xl font-extrabold text-blue-700 mb-10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {counter}%
        </motion.div>

        {/* START AGAIN BUTTON */}
        <button
          onClick={() => {
            playClick();
            router.push("/");
          }}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
        >
          Start Again
        </button>
      </motion.div>
    </main>
  );
}
