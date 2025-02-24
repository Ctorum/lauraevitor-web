import { Countdown } from "@/components/countdown"
import { DecorativeBorder } from "@/components/decorative-border"
import { Heart, Flower, BellRing } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden relative">
      <DecorativeBorder />
      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="mb-8 animate-float">
          <Flower className="inline-block text-pink-400 h-12 w-12" />
        </div>
        <h1 className="mb-4 text-5xl font-extrabold text-gray-800 sm:text-6xl md:text-7xl font-script">
          Vitor <span className="text-pink-500">&</span> Laura
        </h1>
        <p className="mb-8 text-2xl text-gray-600 font-serif">Vão se casar!</p>
        <div className="mb-12">
          <Countdown date="2026-01-21T00:00:00" />
        </div>
        <div className="mb-16">
          <h2 className="mb-2 text-3xl font-bold text-gray-800 font-serif">Reserve a Data</h2>
          <p className="text-2xl text-pink-600 font-script">21 de Janeiro de 2026</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-lg border border-pink-100 transition-transform hover:scale-105">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 font-serif">Mais Informações em Breve</h2>
          <p className="text-gray-600">
            Estamos ansiosos para compartilhar mais detalhes sobre nosso dia especial com você!
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <BellRing className="h-6 w-6 text-pink-400" />
            <Heart className="h-6 w-6 text-pink-400" />
            <BellRing className="h-6 w-6 text-pink-400" />
          </div>
        </div>
        <div className="mt-16 flex justify-center animate-pulse">
          <Heart className="h-12 w-12 text-pink-500" />
        </div>
      </div>
    </main>
  )
}

