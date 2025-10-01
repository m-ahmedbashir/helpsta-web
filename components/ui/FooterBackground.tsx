'use client';

import { motion } from 'framer-motion';

export function FooterBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-orange-main rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-app-main-1 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"
      />
    </div>
  );
}