import Header from "../components/header"
import { Countdown } from "../components/countdown"
import { BranchIcon } from "../components/branch-icon"
import { ComingSoon } from "../components/coming-soon"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900 font-script">
      {/* <Header /> */}

      {/* Hero Section with Background */}
      <div className="h-screen w-full relative bg-white dark:bg-gray-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-hero bg-no-repeat bg-top">
          <div className="text-6xl md:text-7xl lg:text-8xl font-script text-white mb-4">Laura</div>
          <div className="text-6xl md:text-7xl lg:text-8xl font-script text-white mb-4">& Vitor</div>
          <div className="text-2xl md:text-3xl text-white font-serif mb-8">25.01.2026</div>
        </div>
      </div>

      {/* Countdown Section - Now below the hero section */}
      <div className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <h3 className="text-center text-[#859098] dark:text-[#a5b0b8] uppercase tracking-wider text-sm md:text-base">
              Contagem regressiva para o grande dia
            </h3>
            <BranchIcon className="w-10 h-auto opacity-80 ml-4" />
          </div>
          <Countdown date="2026-01-25T10:00:00" />
        </div>
      </div>

      {/* Coming Soon Section */}
      <ComingSoon />
    </div>
  )
}
