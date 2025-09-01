import { Countdown } from "../components/countdown";
import { History } from "../components/history";
import { SectionGallery } from "../components/pictures-gallery";
import Image from "next/image";
import plant from "../public/plant.svg";
import l78 from "../public/images/L_78.jpg";
import logo from "../public/logo.png";
import vlimg from "../public/images/vl-img0.svg";
import plantCircle from "../public/images/plant.svg";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900 flex flex-col items-center justify-center">
      <section className="h-screen w-full bg-[#D9D9D9] dark:bg-gray-900">
        <Image src={l78} alt="L78 Image" className="w-[100%] h-[100%]" />
      </section>
      <section className="relative h-[40rem] md:h-[80rem] w-full py-16 bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <Image
          src={plant}
          alt=""
          className="hidden md:block absolute top-0 left-0"
        />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <h3 className="text-center text-[#355A72] dark:text-[#a5b0b8] uppercase tracking-wider text-sm md:text-base">
              Contagem regressiva para o grande dia
            </h3>
          </div>
          <Countdown date="2026-01-25T10:00:00" />
        </div>
        <Image
          src={plant}
          alt=""
          className="hidden md:block absolute bottom-0 right-0 scale-x-[-1] scale-y-[-1]"
        />
      </section>
      <History />
      <SectionGallery />
      <section className="md:h-[75rem] h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-around mb-[5rem]">
        <div className="items-center hidden md:flex w-full h-full">
          <div className="flex w-[45rem] h-[65%] xl:w-[55rem] xl:h-[75%] 2xl:w-[75rem] 2xl:h-full relative right-[10%] z-[2] before:absolute before:rounded-[100%] before:bg-[#5D94E4] before:bottom-[8%] before:right-[25%] before:w-[100%] before:h-[90%] before:z-[-1]">
            <Image
              src={vlimg}
              alt="Vitor e Laura"
              className="absolute w-[100%] h-[80%] top-[4%] right-[28%]"
            />
            <Image
              src={plantCircle}
              alt="Flores"
              className="w-[100%] h-[100%] absolute top-[1.5%] right-[8%]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[100rem] md:mr-[10rem]">
          <div className="w-full h-full md:lv flex items center justify-center">
            <Image
              src={logo}
              priority={true}
              alt="Logo"
              className="w-full relative z-[2]"
            />
          </div>
          <h2 className="font-bold text-[1.8rem] md:text-[4rem] tracking-[10%] dark:text-[#fff] text-[#355A72] text-center italic mb-[3rem]">
            Compartilhe
            <br />
            do nosso sonho!
          </h2>
          <button className="text-[#fff] md:rounded-[1.8rem] rounded-[1.4rem] border-[0] bg-[#6096E8] w-[18rem] h-[3.6rem] xl:w-[27rem] hover:bg-[#0F5A78] duration-300 font-semibold text-[1.2rem] md:text-[1.5rem] xl:text-[1.8rem] italic">
            Lista de presentes
          </button>
        </div>
      </section>

      <section
        className={`w-full h-dvh flex flex-col items-center justify-center md:items-start md:pl-[6rem] last max-h-[1444px]`}
      >
        <div className="flex flex-col md:justify-start justify-between max-w-[1800px] h-[80%]">
          <h2 className="text-[#355A72] font-bold italic text-[2.5rem] md:text-[5rem] pt-[1.5rem] md:mb-[5.375rem]">
            E ai?
            <br />
            Vamos confirmar
            <br />
            sua presença?
          </h2>
          <button className="text-[#fff] md:rounded-[1.8rem] rounded-[1.4rem] border-[0] bg-[#6096E8] md:w-[22rem] w-[18rem] h-[2.6rem] 2xl:w-[33.75rem] md:h-[4.75rem] md:rounded-[2rem] hover:bg-[#0F5A78] duration-300 font-semibold text-[1.2rem] md:text-[2rem] italic">
            Confirmar presença!
          </button>
        </div>
      </section>
    </div>
  );
}
