import React from 'react';

interface FlagProps {
  className?: string;
  size?: number;
}

export const GermanFlag: React.FC<FlagProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 30 18"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="6" fill="#000000" />
    <rect width="30" height="6" y="6" fill="#DD0000" />
    <rect width="30" height="6" y="12" fill="#FFCE00" />
  </svg>
);

export const USFlag: React.FC<FlagProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size * 0.53}
    viewBox="0 0 30 16"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="30" height="16" fill="#B22234" />
    <rect width="30" height="1.23" y="1.23" fill="white" />
    <rect width="30" height="1.23" y="3.69" fill="white" />
    <rect width="30" height="1.23" y="6.15" fill="white" />
    <rect width="30" height="1.23" y="8.61" fill="white" />
    <rect width="30" height="1.23" y="11.08" fill="white" />
    <rect width="30" height="1.23" y="13.54" fill="white" />
    <rect width="12" height="8.61" fill="#3C3B6E" />
    <g fill="white">
      {/* Simplified stars pattern */}
      <circle cx="2" cy="1.5" r="0.3" />
      <circle cx="4" cy="1.5" r="0.3" />
      <circle cx="6" cy="1.5" r="0.3" />
      <circle cx="8" cy="1.5" r="0.3" />
      <circle cx="10" cy="1.5" r="0.3" />
      <circle cx="3" cy="2.8" r="0.3" />
      <circle cx="5" cy="2.8" r="0.3" />
      <circle cx="7" cy="2.8" r="0.3" />
      <circle cx="9" cy="2.8" r="0.3" />
      <circle cx="2" cy="4.1" r="0.3" />
      <circle cx="4" cy="4.1" r="0.3" />
      <circle cx="6" cy="4.1" r="0.3" />
      <circle cx="8" cy="4.1" r="0.3" />
      <circle cx="10" cy="4.1" r="0.3" />
      <circle cx="3" cy="5.4" r="0.3" />
      <circle cx="5" cy="5.4" r="0.3" />
      <circle cx="7" cy="5.4" r="0.3" />
      <circle cx="9" cy="5.4" r="0.3" />
      <circle cx="2" cy="6.7" r="0.3" />
      <circle cx="4" cy="6.7" r="0.3" />
      <circle cx="6" cy="6.7" r="0.3" />
      <circle cx="8" cy="6.7" r="0.3" />
      <circle cx="10" cy="6.7" r="0.3" />
    </g>
  </svg>
);