"use client";

import { useState, useEffect, Component, ReactNode, useRef } from "react";
import { useTheme } from "next-themes";
import { intervalToDuration } from "date-fns";

interface CountdownProps {
  date: string;
}

function calculateTimeLeft(date: string) {
  const now = new Date();
  const target = new Date(date);

  if (target <= now) return {};

  const duration = intervalToDuration({ start: now, end: target });

  return {
    anos: duration.years || 0,
    meses: duration.months || 0,
    dias: duration.days || 0,
    horas: duration.hours || 0,
    minutos: duration.minutes || 0,
    segundos: duration.seconds || 0,
  };
}

export function Countdown({ date }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<Partial<Record<string, number>>>({});
  const { theme } = useTheme();

  useEffect(() => {
    const updateTime = () => setTimeLeft(calculateTimeLeft(date));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [date]);

  if (!timeLeft) {
    return (
      <div className="flex justify-center text-2xl font-script text-[#355A72] dark:text-[#a5b0b8]"></div>
    );
  }

  const timerComponents = Object.entries(timeLeft).map(([key, value]) => {
    if (value === undefined) return null;
    return (
      <CountdownUnit
        key={key}
        value={value}
        label={
          key === "anos" ? "Ano" : key.charAt(0).toUpperCase() + key.slice(1)
        }
      />
    );
  });

  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between max-w-6xl mx-auto">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="w-full text-center text-2xl font-script text-[#355A72] dark:text-[#a5b0b8] py-[6rem]">
          É hora do casamento!
        </span>
      )}
    </div>
  );
}

export function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);
  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setPrevValue(value);
        setFlipping(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  const prevValueStr = String(prevValue).padStart(2, "0");
  const nextValueStr = String(value).padStart(2, "0");

  return (
    <div className="text-center px-2">
      <hr className="relative z-[1000] top-[33px] bg-[white] w-[100%] h-[4px]" />
      <div className="relative w-[80px] h-[60px] [perspective:1000px]">
        {/* Parte de cima fixa */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-10 bg-[#5D719A]">
          <div className="flex items-end justify-center h-full">
            <span className="font-script text-white text-5xl leading-[1] translate-y-[50%]">
              {nextValueStr}
            </span>
          </div>
        </div>

        {/* Parte de baixo fixa */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden z-10 bg-[#5D719A]">
          <div className="flex items-start justify-center h-full">
            <span className="font-script text-white text-5xl leading-[1] -translate-y-[50%]">
              {nextValueStr}
            </span>
          </div>
        </div>

        {/* Flip superior */}
        {flipping && (
          <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-20 bg-[#5D719A] origin-bottom animate-animate_flip_top">
            <div className="flex items-end justify-center h-full">
              <span className="font-script text-white text-5xl leading-[1] translate-y-[50%]">
                {prevValueStr}
              </span>
            </div>
          </div>
        )}

        {/* Flip inferior */}
        {flipping && (
          <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden z-30 bg-[#5D719A] origin-top animate-animate_flip_bottom">
            <div className="flex items-start justify-center h-full">
              <span className="font-script text-white text-5xl leading-[1] -translate-y-[50%]">
                {nextValueStr}
              </span>
            </div>
          </div>
        )}
      </div>
      <p className="font-[Noto_Sans] font-normal text-[1rem] text-[#355A72]">
        {label}
      </p>
    </div>
  );
}
