"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  date: string;
}

export function Countdown({ date }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <CountdownUnit
        key={interval}
        value={timeLeft[interval as keyof typeof timeLeft]}
        label={interval.charAt(0).toUpperCase() + interval.slice(1)}
      />
    );
  });

  return (
    <div className="flex justify-center space-x-4">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-2xl font-script text-pink-500">
          É hora do casamento!
        </span>
      )}
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="rounded-full bg-gradient-to-br from-pink-100 to-pink-200 p-4 w-24 h-24 flex items-center justify-center shadow-md">
        <span className="text-3xl font-bold text-pink-600">{value}</span>
      </div>
      <span className="mt-2 text-sm text-gray-600 font-serif">{label}</span>
    </div>
  );
}
