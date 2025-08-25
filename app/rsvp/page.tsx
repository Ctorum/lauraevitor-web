"use client";

import { useState } from "react";
import PlantLine from "@/components/plant-line";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useQuery } from "@tanstack/react-query";
import GuestDetails from "@/components/guest-details";
import Animated from "@/components/animated";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import api from "@/services/api.service";
import { Button } from "@/components/ui/button";

async function getGuestData(token: string) {
  const response = await api.get(`/guests/me?invitation_code=${token}`);
  return response.data;
}

export default function Token() {
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
          <section className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="text-red-500 text-xl font-semibold text-center">
              Token inválido ou não encontrado
            </div>
            <p className="text-gray-600 text-center">
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
          <section className="w-full h-full flex items-center justify-center">
            <GuestDetails isLoading={isLoading} guest={guestData} />
          </section>
        </Animated>
      );
    }

    return (
      <Animated from="bottom" to="top">
        <section className="flex-[65%]">
          <InputOTP maxLength={6} onComplete={handleTokenComplete}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <span className="w-12 h-1.5 mx-4 bg-primary rounded-full" />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </section>
      </Animated>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16">
      <Animated
        layout
        className={cn("w-full absolute flex items-center justify-center", {
          "top-64": !guestData && !error,
          "top-28": guestData || isLoading || error,
        })}
      >
        <PlantLine className="w-1/3 absolute left-0 top-1/2 -translate-y-1/2" />
        <h1
          className={cn(
            "text-4xl font-bold italic",
            error ? "text-red-500" : "text-third",
          )}
        >
          {getHeaderText()}
        </h1>
      </Animated>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="popLayout">{renderContent()}</AnimatePresence>
      </div>

      <span className="absolute left-0 bottom-0 w-full h-96 flex items-center justify-between z-[-1]">
        <img
          src="/images/plant.png"
          alt="plant-1"
          className="h-full scale-x-[-1]"
        />
        <img src="/images/plant.png" alt="plant-2" className="h-full" />
      </span>
    </div>
  );
}
