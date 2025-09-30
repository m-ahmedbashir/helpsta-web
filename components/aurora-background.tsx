'use client';

import React from 'react';

/**
 * Soft “aurora” blobs in the background.
 * Fixed, non-interactive, no layout shift.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base radial wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-main/10 via-white to-main-purple/10" />

      {/* aurora blobs */}
      <div className="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full bg-orange-main/30 blur-[120px]" />
      <div className="absolute top-1/3 -right-24 h-[34rem] w-[34rem] rounded-full bg-main-purple/30 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-gradient-app-main-1/40 to-orange-main/30 blur-[110px]" />
    </div>
  );
}
