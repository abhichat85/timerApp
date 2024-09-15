import React from 'react';

export default function AnalogClock({ time, size = 200 }) {
  const seconds = time.second + time.millisecond / 1000;
  const minutes = time.minute + seconds / 60;
  const hours = time.hour % 12 + minutes / 60;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="10"
          x2="50"
          y2="15"
          transform={`rotate(${i * 30} 50 50)`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="25"
        transform={`rotate(${hours * 30} 50 50)`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        transform={`rotate(${minutes * 6} 50 50)`}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        transform={`rotate(${seconds * 6} 50 50)`}
        stroke="red"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}