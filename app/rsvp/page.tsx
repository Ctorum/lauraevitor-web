"use client";

import { useState } from "react";
import PlantLine from "@/components/plant-line";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { useQuery } from "@tanstack/react-query";
import GuestDetails from "@/components/guest-details";
import Animated from "@/components/animated";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import api from "@/services/api.service";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

async function getGuestData(token: string) {
  const response = await api.get(`/guests/me?invitation_code=${token}`);
  return response.data;
}

export default function Token() {
  const isMobile = useIsMobile();

  const [token, setToken] = useState<string>("");

  const {
    data: guestData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guest", token],
    queryFn: () => getGuestData(token),
    enabled: token.length === 6,
    retry: false,
  });

  const handleTokenComplete = (value: string) => {
    setToken(value);
  };

  const getHeaderText = () => {
    if (error) return "Token inválido";
    if (!guestData) return "Deposite aqui o seu token";
    return "Seu perfil";
  };

  const renderContent = () => {
    if (error) {
      return (
        <Animated from="top" to="bottom">
          <section className="w-full h-full flex flex-col items-center justify-center gap-4 px-4">
            <div className="text-red-500 text-lg sm:text-xl font-semibold text-center">
              Token inválido ou não encontrado
            </div>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Por favor, verifique o token e tente novamente.
            </p>
            <Button
              onClick={() => {
                setToken("");
                window.location.reload();
              }}
            >
              Tentar novamente
            </Button>
          </section>
        </Animated>
      );
    }

    if (isLoading || guestData) {
      return (
        <Animated from="top" to="bottom">
          <section className="w-full h-full flex items-center justify-center px-4 py-6">
            <GuestDetails isLoading={isLoading} guest={guestData} />
          </section>
        </Animated>
      );
    }

    return (
      <Animated from="bottom" to="top">
        <section className="flex-[65%] w-full flex justify-center mt-[20%]">
          <InputOTP
            type="url"
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            maxLength={6}
            onComplete={handleTokenComplete}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-20 sm:w-24 sm:h-24" />
              <InputOTPSlot index={1} className="w-12 h-20 sm:w-24 sm:h-24" />
              <InputOTPSlot index={2} className="w-12 h-20 sm:w-24 sm:h-24" />
            </InputOTPGroup>
            <span className="w-8 sm:w-12 h-1.5 mx-2 sm:mx-4 bg-primary rounded-full" />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="w-12 h-20 sm:w-24 sm:h-24" />
              <InputOTPSlot index={4} className="w-12 h-20 sm:w-24 sm:h-24" />
              <InputOTPSlot index={5} className="w-12 h-20 sm:w-24 sm:h-24" />
            </InputOTPGroup>
          </InputOTP>
        </section>
      </Animated>
    );
  };

  return (
    <div className="overflow-hidden w-full min-h-screen px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 sm:gap-16">
      <Animated
        layout
        className={cn(
          "w-full absolute flex flex-col md:flex-row items-center justify-center px-4 z-10 mb-5",
          {
            "top-32 sm:top-64": !guestData && !error,
            "top-6 sm:top-28": guestData || isLoading || error,
          },
        )}
      >
        {(!isMobile || (!guestData && !error)) && (
          <PlantLine
            amount={isMobile ? 5 : 2}
            className="w-full sm:w-1/3 relative md:absolute left-0 top-1/2 -translate-y-1/2"
          />
        )}
        <h1
          className={cn(
            "text-2xl sm:mt-0 sm:text-3xl lg:text-4xl font-bold italic text-center top-[-3rem] md:top-[-1.5rem]",
            `text-[2rem] text-center font-bold italic dark:text-[#fff] text-[#355A72] relative md:absolute z-10 sm:bg-gradient-to-r from-[transparent] via-[#fff] to-[#fff]/100 dark:bg-gradient-to-r dark:from-[#111827]/80 dark:via-[#111827] dark:to-[#111827]/100 bg-clip-padding p-1 ${getHeaderText() === "Seu perfil" ? "top-[5rem]" : ""}`,
            error ? "text-red-500" : "text-third",
          )}
        >
          {getHeaderText()}
        </h1>
      </Animated>

      <div className="flex-1 w-full flex items-center justify-center mt-[10rem] sm:mt-[10rem]">
        <AnimatePresence mode="popLayout">{renderContent()}</AnimatePresence>
      </div>

      <span className="absolute left-0 bottom-[-100%] w-full flex items-end justify-between z-[-1]">
        <img
          src="/images/plant.png"
          alt="plant-1"
          className="w-44 sm:w-80 h-auto scale-x-[-1] opacity-80 sm:opacity-100"
        />
        <img
          src="/images/plant.png"
          alt="plant-2"
          className="w-44 sm:w-80 h-auto opacity-80 sm:opacity-100"
        />
      </span>
    </div>
  );
}
