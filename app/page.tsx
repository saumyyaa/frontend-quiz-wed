"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TransitionWrapper from "./components/TransitionWrapper";
import SoundButton from "./components/SoundButton";
import useSound from "use-sound";

type Question = {
  question: string;
  options: string[];
  correct: string;
};

const quizData: Question[] = [
  {
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correct: "Meow-Meow",
  },
  {
    question: "What would you probably find in your fridge?",
    options: ["shoes", "ice cream", "books"],
    correct: "ice cream",
  },
  {
    question: "What color are bananas?",
    options: ["blue", "yellow", "red"],
    correct: "yellow",
  },
  {
    question: "How many stars are in the sky?",
    options: ["Infinite", "100", "Two"],
    correct: "Infinite",
  },
];

export default function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<(string | null)[]>(
    Array(quizData.length).fill(null)
  );

  const [playCorrect] = useSound("/sounds/correct.mp3", { volume: 0.5, preload: true });
  const [playWrong] = useSound("/sounds/wrong.mp3", { volume: 0.5, preload: true });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.4, preload: true });

  const current = quizData[index];
  const isLast = index === quizData.length - 1;

  const selectOption = (option: string) => {
    const copy = [...selected];
    copy[index] = option;
    setSelected(copy);

    // Play sound asynchronously without blocking
    if (option === current.correct) playCorrect();
    else playWrong();
  };

  const next = () => {
    if (!isLast) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const submit = () => {
    // Navigate immediately, play sound asynchronously
    router.push("/result?ans=" + encodeURIComponent(JSON.stringify(selected)));
    setTimeout(() => playClick(), 0);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-sky-300 to-cyan-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-[32px] p-12"
      >
        {/* TITLE */}
        <h1 className="text-center text-5xl font-serif text-slate-700 mb-4">
          Test Your Knowledge
        </h1>

        <p className="text-center text-sm bg-blue-50/80 px-5 py-2 rounded-full w-fit mx-auto mb-10 text-slate-600">
          Answer all questions to see your results
        </p>

        {/* PROGRESS BAR */}
        <div className="flex justify-center gap-3 mb-8">
          {quizData.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-20 rounded-full ${
                i <= index ? "bg-slate-800" : "bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* QUESTION + OPTIONS */}
        <TransitionWrapper keyId={index}>
          <div>
            <div className="bg-white rounded-xl px-6 py-4 mb-6 text-center font-medium shadow-md border border-slate-200 text-lg text-slate-700">
              {index + 1}. {current.question}
            </div>

            <div className="space-y-4">
              {current.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => selectOption(opt)}
                  className={`w-full py-4 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                    selected[index] === opt
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white hover:bg-blue-50 border border-slate-200 shadow-sm"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
        </TransitionWrapper>

        {/* NAVIGATION */}
        <div className="mt-10 flex justify-end gap-4">
          {!isLast && (
            <SoundButton onClick={prev} disabled={index === 0}>
              ←
            </SoundButton>
          )}

          {isLast ? (
            <button
              onClick={submit}
              disabled={!selected[index]}
              className={`px-6 py-2 rounded-xl shadow font-medium transition-all duration-200 cursor-pointer ${
                !selected[index]
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              }`}
            >
              Submit
            </button>
          ) : (
            <SoundButton onClick={next} disabled={!selected[index]}>
              →
            </SoundButton>
          )}
        </div>

        {/* BEST OF LUCK + PAW (only on first question) */}
        {index === 0 && (
          <div className="absolute bottom-6 left-6 relative">
            <motion.img
              src="/images/best-of-luck.png"
              className="w-40 z-20 absolute -top-14 -left-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            <motion.img
              src="/images/paw.gif"
              className="w-24 z-10 relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
          </div>
        )}
      </motion.div>
    </main>
  );
}
