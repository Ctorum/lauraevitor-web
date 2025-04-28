"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface CountdownProps {
  date: string
}

export function Countdown({ date }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  function calculateTimeLeft() {
    const difference = +new Date(date) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null
    }

    return (
      <CountdownUnit
        key={interval}
        value={timeLeft[interval as keyof typeof timeLeft]}
        label={interval.charAt(0).toUpperCase() + interval.slice(1)}
      />
    )
  })

  return (
    <div className="flex justify-center space-x-8 md:space-x-12">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-2xl font-script text-[#859098] dark:text-[#a5b0b8]">É hora do casamento!</span>
      )}
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="backdrop-blur-sm p-2">
        <span className="text-4xl md:text-5xl font-light text-[#859098] dark:text-[#a5b0b8] block">{value}</span>
        <div className="w-12 h-[1px] bg-[#859098]/40 dark:bg-[#a5b0b8]/40 mx-auto my-2"></div>
        <span className="text-xs md:text-sm text-[#859098] dark:text-[#a5b0b8] uppercase tracking-widest">{label}</span>
      </div>
    </div>
  )
}
