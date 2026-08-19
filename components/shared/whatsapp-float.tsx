"use client";

import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

/** Floating WhatsApp contact button. */
export function WhatsAppFloat({ number, label }: { number: string; label: string }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    `Hello ${label} — I'd like to discuss an engineering project.`,
  )}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="no-print fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-forest-500 text-white shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="animate-pulse-soft absolute inset-0 rounded-full bg-forest-500/40" aria-hidden />
      <SiWhatsapp className="relative size-6" fill="currentColor" strokeWidth={0} />
    </motion.a>
  );
}
