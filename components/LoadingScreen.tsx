"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface LoadingScreenProps {
  onComplete: () => void;
  /** total time before exit in ms */
  duration?: number;
}

export function LoadingScreen({ onComplete, duration = 1300 }: LoadingScreenProps) {
  const t = useTranslations("loading");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(onComplete, duration);
    return () => clearTimeout(id);
  }, [onComplete, duration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Subtle animated blobs (GPU-cheap) */}
      {!prefersReduced && (
        <>
          <motion.div
            className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-main-purple/5 blur-3xl opacity-60"
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-orange-main/5 blur-3xl opacity-60"
            animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Brand wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-main-purple"
        >
          {t("brand")}
        </motion.h1>

        {/* Tagline with a gentle shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="mt-3 text-gray-600 text-lg md:text-xl"
        >
          <span className="bg-gradient-to-r from-main-purple/70 via-main-purple to-main-purple/70 bg-clip-text text-transparent [background-size:200%_100%] animate-[shimmer_1.6s_ease_infinite]">
            {t("tagline")}
          </span>
        </motion.p>

        {/* Minimal spinner ring */}
        {!prefersReduced && (
          <motion.div
            aria-label={t("preparing")}
            className="mt-10 h-10 w-10"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="rgba(67,53,167,0.15)"
                strokeWidth="3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                fill="none"
                stroke="url(#g)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FFA500" /> {/* orange-main-ish */}
                  <stop offset="100%" stopColor="#8B5CF6" /> {/* gradient-app-main-1-ish */}
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}
