import React from 'react';
import { motion } from 'framer-motion';

const DbSmashIcon = ({ className = "w-10 h-10", animate = false }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animate ? { y: [0, -10, 0] } : {}}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="50%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hammer */}
      <g stroke="url(#silverGradient)" strokeWidth="5" fill="none">
        <path
          d="M200 100 L280 180 M240 140 L320 60"
          stroke="url(#silverGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <rect x="260" y="160" width="60" height="20" rx="4" fill="url(#silverGradient)" />
      </g>

      {/* ER Diagram Elements */}
      <g stroke="url(#silverGradient)" strokeWidth="8" fill="none">
        {/* Entity Rectangles */}
        <rect x="180" y="220" width="80" height="50" rx="4" />
        <rect x="280" y="220" width="80" height="50" rx="4" />
        <rect x="230" y="300" width="80" height="50" rx="4" />
        {/* Relationship Lines */}
        <line x1="260" y1="245" x2="280" y2="245" />
        <line x1="270" y1="270" x2="270" y2="300" />
        {/* Diamond for Relationship */}
        <path
          d="M260 245 L270 255 L280 245 L270 235 Z"
          fill="url(#silverGradient)"
          filter="url(#glow)"
        />
      </g>

      {/* Smash Effect (Ripple) */}
      <circle
        cx="270"
        cy="280"
        r="50"
        stroke="url(#silverGradient)"
        strokeOpacity="0.1"
        strokeWidth="3"
        animate={animate ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

export default DbSmashIcon;