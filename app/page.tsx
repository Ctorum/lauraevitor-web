import { Countdown } from "../components/countdown";
import { History } from "../components/history";
import { SectionGallery } from "../components/pictures-gallery"
import Image from "next/image";
import plant from "../public/plant.svg";
import logo from '../public/logo.png'
import vlimg from '../public/images/vl-img0.svg'
import plantCircle from '../public/images/plant.svg'

export default function Home() {
  const vlimg2 = ''

  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900 flex flex-col items-center justify-center">
      <section className="h-screen w-full relative bg-[#D9D9D9] dark:bg-gray-900" />
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <Image src={plant} alt="" className="absolute top-[100vh]" />
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
      <SectionGallery/>
      <section className="h-[75rem] w-full flex flex-col md:flex-row items-center justify-center md:justify-around mb-[5rem]">
        <div className="hidden md:flex w-full h-full max-w-[1080px]">
          <div className="flex w-[75rem] h-full relative left-0 z-[2] before:absolute before:rounded-[100%] before:bg-[#5D94E4] before:bottom-[8%] before:right-[25%] before:w-[100%] before:h-[90%] before:z-[-1]">
            <Image src={vlimg} alt="Vitor e Laura" className="absolute w-[100%] h-[80%] top-[4%] right-[15%]"/>
            <Image src={plantCircle} alt="Vitor e Laura" className="w-[100%] h-[100%] absolute top-[1.5%] right-[8%]"/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[100rem] bg-[red] md:mr-[10rem]">
          <div className="w-full h-[100%] md:lv">
            <Image src={logo} alt="Logo" className="w-full relative z-[2] md:w-[37.75rem]"/>
          </div>
          <h2 className="font-bold text-[2.5rem] md:text-[4rem] tracking-[10%] text-[#355A72] text-center italic mb-[3rem]">Compartilhe<br/>do nosso sonho!</h2>
          <button className="text-[#fff] md:rounded-[1.8rem] rounded-[1.4rem] border-[0] bg-[#6096E8] md:w-[22rem] w-[18rem] h-[3.6rem] hover:bg-[#0F5A78] duration-300 font-semibold text-[1.2rem] md:text-[2rem] italic">Lista de presentes</button>
        </div>
      </section>
      
      <section className={`w-full h-dvh flex flex-col items-center md:items-start gap-[20rem] pl-[6rem] last max-h-[1444px]`}>
        <div className="max-w-[1800px] max-h-[1400px]">
        <h2 className="text-[#355A72] font-bold italic text-[2.5rem] md:text-[5rem] pt-[1.5rem] md:mb-[5.375rem]">E ai?<br />
        Vamos confirmar<br />
        sua presença?</h2>
        <button className="text-[#fff] md:rounded-[1.8rem] rounded-[1.4rem] border-[0] bg-[#6096E8] md:w-[22rem] w-[18rem] h-[2.6rem] md:w-[33.75rem] md:h-[4.75rem] md:rounded-[2rem] hover:bg-[#0F5A78] duration-300 font-semibold text-[1.2rem] md:text-[2rem] italic">Confirmar presença!</button>
        </div>
      </section>
    </div>
  );
}
