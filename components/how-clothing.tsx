"use client"

import PlantLine from "./plant-line";
import veste from '../public/images/veste.png'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HowClothing() {
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
    
    return(
        <div className="flex flex-col justify-center w-full">
        <div className="pt-[15rem] flex flex-col items-center justify-center">
            <div className="mb-[7.375rem]  relative w-full flex flex-row items-center justify-center">
                <PlantLine
                amount={val}
                className="hidden md:flex overflow-hidden absolute z-[1] bottom-[-2.5rem] left-[-2rem]"
                />
                <h2 className="text-[2rem] text-center font-bold italic dark:text-[#fff] text-[#355A72] absolute z-10 bg-gradient-to-r from-[transparent] via-[#fff] to-[#fff]/100 dark:bg-gradient-to-r dark:from-[#111827]/80 dark:via-[#111827] dark:to-[#111827]/100 bg-clip-padding p-[4rem]">
                Código de Vestimenta
                </h2>
            </div>
            <div className="w-full px-[3rem] md:flex md:justify-between relative max-w-[1920px]">
                <Image src={veste} alt="" className="hidden md:block absolute inset-0 left-[22%] size-[50rem]"/>
                <div className="md:w-[30rem]">
                    <h3 className="text-2xl text-[#355A72] dark:text-[#A1AFD1] font-bold italic mb-[5rem]">Homens: Esporte fino </h3>
                    <h3 className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-bold mb-[3rem]">Elementos-chave:</h3>
                    <ul className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium mb-[3rem]">
                        <li>Calças de sarja ou alfaiataria. </li>
                        <li>Camisas (lisas ou com padrões discretos), com ou sem gravata. </li>
                        <li>Blazer opcional, que adiciona um toque de sofisticação. </li>
                        <li>Sapatos fechados, como sapatos sociais ou mocassins. </li>
                    </ul>
                    <h3 className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-bold mb-[3rem]">O que evitar:</h3>
                    <ul className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium mb-[3rem]">
                        <li>Roupas muito casuais, como jeans, camisetas e tênis de academia.</li>
                        <li>Estampas muito chamativas ou cores contrastantes. </li>
                        <li>BRoupas com tecidos esportivos. </li>
                    </ul>
                    <h3 className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-bold mb-[3rem]">Dicas adicionais:</h3>
                    <p className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium">Preste atenção aos tecidos, que devem ser mais sofisticados. </p>
                    <p className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium">Acessórios como relógios, cintos e joias discretas podem complementar o visual. </p>
                    <p className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium mb-[3rem]">Equilibre cores e texturas para criar um look elegante e harmonioso.</p>
                </div>
                <div className="md:w-[30rem]">
                    <h3 className="text-2xl text-[#355A72] dark:text-[#A1AFD1] font-bold italic mb-[5rem]">Mulheres: Modesta</h3>
                    <h3 className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-medium mb-[3rem]">Cobertura adequada: </h3>
                    <p className="text-lg text-[#355A72] dark:text-[#A1AFD1] font-medium">Evitar roupas apertadas e transparentes:<br />
                        Opte por tecidos que não marquem o corpo e que não revelem a roupa íntima.</p>
                    <h3 className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-bold mb-[3rem]">Decotes discretos:</h3>
                    <p className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-medium mb-[3rem]">Evite decotes profundos e opte por blusas com decotes mais fechados.</p>
                    <p className="text-xl text-[#355A72] dark:text-[#A1AFD1] font-bold italic pb-[6rem]">Se possível fuja um pouco da paleta do<br /> (off white) e (nada de branco).</p>
                </div>
            </div>
        </div>
        </div>
    )
}