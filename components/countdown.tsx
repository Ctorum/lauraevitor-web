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
      const totalSeconds = Math.floor(difference / 1000)
      const seconds = totalSeconds % 60
      const totalMinutes = Math.floor(totalSeconds / 60)
      const minutes = totalMinutes % 60
      const totalHours = Math.floor(totalMinutes / 60)
      const hours = totalHours % 24
      const totalDays = Math.floor(totalHours / 24)

      const years = Math.floor(totalDays / 365)
      const remainingDaysAfterYears = totalDays % 365

      const averageDaysInMonth = 30.44
      const months = Math.floor(remainingDaysAfterYears / averageDaysInMonth)
      const remainingDaysAfterMonths = Math.floor(remainingDaysAfterYears % averageDaysInMonth)

      timeLeft = {
        anos: years,
        meses: months,
        dias: remainingDaysAfterMonths,
        horas: hours,
        minutos: minutes,
        segundos: seconds,
      }
    }

    return timeLeft
  }

  const timerComponents = ["anos", "meses", "dias", "horas", "minutos", "segundos"].map((interval) => {
    const value = timeLeft[interval as keyof typeof timeLeft]

    // Only render if the value is defined (countdown is active)
    if (value === undefined) {
      return null
    }

    return (
      <CountdownUnit
        key={interval}
        value={value}
        label={interval === "anos" ? "Ano" : interval.charAt(0).toUpperCase() + interval.slice(1)}
      />
    )
  })

  return (
    <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between max-w-6xl mx-auto">
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
    <div className="text-center px-3 py-2 w-1/3 sm:w-1/3 md:w-auto">
      <div className="backdrop-blur-sm p-2">
        <span className="text-4xl md:text-5xl font-light text-[#859098] dark:text-[#a5b0b8] block">
          {label === "Ano" ? value : String(value).padStart(2, "0")}
        </span>
        <div className="w-12 h-[1px] bg-[#859098]/40 dark:bg-[#a5b0b8]/40 mx-auto my-2"></div>
        <span className="text-xs md:text-sm text-[#859098] dark:text-[#a5b0b8] uppercase tracking-widest">{label}</span>
      </div>
    </div>
  )
}
