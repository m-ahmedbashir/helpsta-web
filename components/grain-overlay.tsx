'use client';

import React from 'react';

/**
 * Subtle film grain on top of the aurora.
 * Uses a tiny inline SVG pattern for zero network cost.
 */
export function GrainOverlay() {
  const noise =
    "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0.08'/></feComponentTransfer></filter>\
<rect width='100%' height='100%' filter='url(%23n)'/>\
</svg>\")";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: noise as unknown as string,
        mixBlendMode: 'multiply',
      }}
    />
  );
}
