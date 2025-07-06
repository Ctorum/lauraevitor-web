import Header from "../components/header"
import { Countdown } from "../components/countdown"
import { BranchIcon } from "../components/branch-icon"
import { History } from "../components/history"
import Image from "next/image"
import plant from '../public/plant.svg'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900">
      <Header />

      {/* Hero Section with Background */}
      <main>

        <section className="h-screen w-full relative bg-[#D9D9D9] dark:bg-gray-900">
        
        </section>

        {/* Countdown Section - Now below the hero section */}
        <section className="w-full py-16 bg-white dark:bg-gray-900">
          <Image src={plant} alt="" className="absolute top-[100vh]"/>
          <div className="container mx-auto px-4 mt-[26.5rem]">
            <div className="flex items-center justify-center mb-8">
              <h3 className="text-center text-[#355A72] dark:text-[#a5b0b8] uppercase tracking-wider text-sm md:text-base">
                Contagem regressiva para o grande dia
              </h3>
            </div>
            <Countdown date="2026-01-25T10:00:00" />
          </div>
        </section>
      <History />
      </main>

    </div>
  )
}
