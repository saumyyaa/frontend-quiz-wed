"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function TransitionWrapper({
  children,
  keyId,
}: {
  children: React.ReactNode;
  keyId: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
