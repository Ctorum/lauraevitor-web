"use client"

import { useState, useEffect, Component, ReactNode, useRef } from "react"
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
        <span className="text-2xl font-script text-[#355A72] dark:text-[#a5b0b8]">É hora do casamento!</span>
      )}
    </div>
  )
}

export function CountdownUnit({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value)
  const [flipping, setFlipping] = useState(false)
  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true)
      const timeout = setTimeout(() => {
        setPrevValue(value)
        setFlipping(false)
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [value, prevValue])

  const prevValueStr = String(prevValue).padStart(2, '0')
  const nextValueStr = String(value).padStart(2, '0')

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
              {prevValueStr}
            </span>
          </div>
        </div>

        {/* Flip superior */}
        {flipping && (
          <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-20 bg-[#5D719A] origin-bottom animate-animate_flip_top">
            <div className="flex items-end justify-center h-full">
              <span className="font-script text-white text-5xl leading-[1] translate-y-[50%]">
                {nextValueStr}
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
      <p className="font-[Noto_Sans] font-normal text-[1rem] text-[#355A72]">{label}</p>
    </div>
  )
}