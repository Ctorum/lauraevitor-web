"use client";

import { BranchIcon } from "./branch-icon";
import Image from "next/image";
import vl from "../public/veame-laurao.svg";
import PlantLine from "./plant-line";
import { useEffect, useState } from "react";

export function History() {
  const [val, setVal] = useState(0);
  const [screenSize, setScreenSize] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize > 2100) {
      setVal(3);
    } else if (screenSize) {
      setVal(Math.floor(screenSize / 239.4 / 2));
    }
  }, [screenSize]);

  return (
    <section className="h-50rem flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 text-center w-full">
      <div className="mb-[7.375rem] relative w-full flex flex-row items-center justify-center">
        <PlantLine
          amount={val}
          className="hidden md:flex overflow-hidden absolute z-[1] bottom-[-2.5rem] left-[-2rem]"
        />
        <h2 className="text-[2rem] font-bold italic dark:text-[#fff] text-[#355A72] absolute z-10 bg-gradient-to-r from-[transparent] via-[#fff] to-[#fff]/100 dark:bg-gradient-to-r dark:from-[#111827]/80 dark:via-[#111827] dark:to-[#111827]/100 bg-clip-padding p-[4rem]">
          NOSSA HISTÓRIA
        </h2>
      </div>
      <div className="w-full pl-[6rem] flex justify-start">
        <p className="text-left font-medium text-lg md:text-3xl text-[#355A72] dark:text-[#A1AFD1] hidden md:block">
        Nos conhecemos ainda no ensino médio, onde formávamos parte de um verdadeiro<br /> “quarteto fantástico” — dividindo trabalhos, risadas e muitos momentos<br /> inesquecíveis. Com o passar do tempo, nossa amizade só se fortaleceu, mesmo que<br /> estivéssemos em fases diferentes quando o assunto era o amor.
        </p>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row items-center px-[6rem]">
        <div className="flex items-center justify-center w-[20rem] mt-[5rem] md:w-[70%] md:mt-[0] md:mr-[5rem] text-left font-medium text-lg md:text-3xl">
          <div className="w-full">
            <h3 className="hidden md:block mb-[3rem] text-[#355A72] dark:text-[#6096E8] font-bold text-[2rem]">O Reencontro Inesperado</h3>
            <p className="hidden md:block text-[#355A72] dark:text-[#A1AFD1] text-justify md:text-left">
              Depois da formatura, a vida nos levou por<br className="hidden md:block"/> caminhos distintos, e acabamos nos afastando.<br className="hidden md:block"/> Cinco anos se passaram até que,<br className="hidden md:block"/> inesperadamente, um simples “Oiee” nas redes<br className="hidden md:block"/> sociais do Vitor reacendeu uma conexão<br className="hidden md:block"/> especial. A partir dali, as conversas se<br className="hidden md:block"/> tornaram constantes, leves e cheias de<br className="hidden md:block"/> afinidade. Logo marcamos nosso primeiro<br className="hidden md:block"/> encontro e passamos horas apenas<br className="hidden md:block"/> conversando. No segundo encontro, trocamos<br className="hidden md:block"/> nosso primeiro beijo, e cerca de um mês<br className="hidden md:block"/> depois, no dia 9 de março, começamos a<br className="hidden md:block"/> namorar. Uma nova história de amor havia<br className="hidden md:block"/> começado.
            </p>
            <div>
              <p className="block md:hidden mb-[3rem] text-[#355A72] dark:text-[#A1AFD1]">Nos conhecemos ainda no ensino médio, onde formávamos parte de um verdadeiro<br /> “quarteto fantástico” — dividindo trabalhos, risadas e muitos momentos<br /> inesquecíveis. Com o passar do tempo, nossa amizade só se fortaleceu, mesmo que<br /> estivéssemos em fases diferentes quando o assunto era o amor.</p>
              <h3 className="block md:hidden mb-[3rem] text-[#355A72] dark:text-[#6096E8] font-bold text-xl md:text-[2rem]">O Reencontro Inesperado</h3>
              <p className="block md:hidden text-[#355A72] dark:text-[#A1AFD1] text-justify md:text-left mb-[3rem]">
                Depois da formatura, a vida nos levou por<br className="hidden md:block"/> caminhos distintos, e acabamos nos afastando.<br className="hidden md:block"/> Cinco anos se passaram até que,<br className="hidden md:block"/> inesperadamente, um simples “Oiee” nas redes<br className="hidden md:block"/> sociais do Vitor reacendeu uma conexão<br className="hidden md:block"/> especial. A partir dali, as conversas se<br className="hidden md:block"/> tornaram constantes, leves e cheias de<br className="hidden md:block"/> afinidade. Logo marcamos nosso primeiro<br className="hidden md:block"/> encontro e passamos horas apenas<br className="hidden md:block"/> conversando. No segundo encontro, trocamos<br className="hidden md:block"/> nosso primeiro beijo, e cerca de um mês<br className="hidden md:block"/> depois, no dia 9 de março, começamos a<br className="hidden md:block"/> namorar. Uma nova história de amor havia<br className="hidden md:block"/> começado.
              </p>
              <h3 className="block md:hidden mb-[3rem] text-[#355A72] dark:text-[#6096E8] font-bold text-xl md:text-[2rem]">O Próximo Capítulo</h3>
              <p className="block md:hidden text-[#355A72] dark:text-[#A1AFD1] mb-[3rem]">Exatamente um ano depois, no mesmo dia, dissemos “sim” a um novo capítulo: o noivado. E agora, com os corações transbordando amor e gratidão, nos preparamos para viver o dia mais esperado das nossas vidas: o nosso casamento!</p>
              <p className="block md:hidden text-[#355A72] dark:text-[#A1AFD1] font-bold italic mb-[5rem]">Seja bem-vindo(a) a esse momento tão especial da nossa história. 💕</p>
            </div>
          </div>
        </div>

        <div
          className={`md:w-[50.125rem] md:h-[48.75rem] w-[24rem] h-[22.75rem] img-cs`}
          >
          <Image
            src={vl}
            alt="Vitor e Laura"
            className="w-[100%] h-[20.75rem] md:w-[56.125rem] md:h-[54.75rem]"
            />
        </div>
      </div>
      <div className="flex w-full flex-col text-left font-medium text-lg md:text-3xl pl-[6rem]">
        <div className="w-[70%] hidden md:flex md:flex-col">
          <h3 className="mb-[3rem] text-[#355A72] dark:text-[#6096E8] font-bold text-[2rem]">O Próximo Capítulo</h3>
          <p className="text-[#355A72] dark:text-[#A1AFD1] mb-[5rem]">Exatamente um ano depois, no mesmo dia, dissemos “sim” a um novo capítulo: o noivado. E agora, com os corações transbordando amor e gratidão, nos preparamos para viver o dia mais esperado das nossas vidas: o nosso casamento!</p>

          <p className="text-[#355A72] dark:text-[#A1AFD1] font-bold italic mb-[5rem]">Seja bem-vindo(a) a esse momento tão especial da nossa história. 💕</p>
        </div>
      </div>
    </section>
  );
}