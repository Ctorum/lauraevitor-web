import { GuestEventStatus } from "@/enums/guest-event-status";
import { Guest } from "@/types/guest";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Loader2,
  Mail,
  Phone,
  Ticket,
  Calendar,
  Check,
  X,
  Clock,
  Pencil,
} from "lucide-react";
import api from "@/services/api.service";
import { getEventStatusLabel } from "@/lib/get-event-status-label";
import { Input } from "./ui/input";
import { InputMask } from "@react-input/mask";
import { cn } from "@/lib/utils";
import Animated from "./animated";

async function updateGuestDetails(token: string, data: Partial<Guest>) {
  console.log(data);
  const response = await api.put(`/guests`, {
    ...data,
    invitationCode: token,
  });

  return response.data;
}

interface GuestDetailsProps {
  guest?: Guest;
  onConfirmRSVP?: (eventType: "first" | "second") => void;
  isLoading?: boolean;
}

export default function GuestDetails({
  guest,
  onConfirmRSVP,
  isLoading = false,
}: GuestDetailsProps) {
  const queryClient = useQueryClient();
  const [celebratingEvent, setCelebratingEvent] = useState<string | null>(null);
  const [celebratingDataUpdate, setCelebratingDataUpdate] = useState<
    string | null
  >(null);

  const [name, setName] = useState<string | null>(guest?.name || null);
  const [email, setEmail] = useState<string | null>(guest?.email || null);
  const [phone, setPhone] = useState<string | null>(guest?.phone || null);
  const originalNameRef = useRef<string | null>(guest?.name || null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Check if name has been changed from original and saved
  const hasNameChanged =
    guest?.name !== originalNameRef.current &&
    guest?.name !== null &&
    guest?.name !== "";

  const dataMutation = useMutation({
    mutationFn: ({ token, data }: { token: string; data: Partial<Guest> }) =>
      updateGuestDetails(token, data),
    onSuccess: (data, variables) => {
      setCelebratingDataUpdate("data");
      setTimeout(() => {
        setCelebratingDataUpdate(null);
      }, 1500);
      queryClient.invalidateQueries({
        queryKey: ["guest", guest?.invitationCode],
      });
    },
    onError: (error, variables, context) => {
      console.error(error);
    },
  });
  const rsvpMutation = useMutation({
    mutationFn: ({
      token,
      eventType,
      status,
    }: {
      token: string;
      eventType: string;
      status: GuestEventStatus;
    }) =>
      updateGuestDetails(token, {
        rsvpStatusFirst: eventType === "first" ? status : undefined,
        rsvpStatusSecond: eventType === "second" ? status : undefined,
      }),
    onSuccess: (data, variables) => {
      setCelebratingEvent(data.rsvpStatusFirst ? "first" : "second");
      setTimeout(() => {
        setCelebratingEvent(null);
      }, 2000);
      queryClient.invalidateQueries({
        queryKey: ["guest", guest?.invitationCode],
      });
    },
    onError: (error) => {
      console.error("Failed to update RSVP:", error);
    },
  });

  const getStatusBadgeColor = (status: GuestEventStatus) => {
    switch (status) {
      case GuestEventStatus.CONFIRMED:
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case GuestEventStatus.DECLINED:
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case GuestEventStatus.PENDING:
        return "bg-amber-50 text-amber-700 border border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  const getStatusIcon = (status: GuestEventStatus) => {
    switch (status) {
      case GuestEventStatus.CONFIRMED:
        return <Check className="w-4 h-4" />;
      case GuestEventStatus.DECLINED:
        return <X className="w-4 h-4" />;
      case GuestEventStatus.PENDING:
        return <Clock className="w-4 h-4" />;
      default:
        return "?";
    }
  };

  const handleConfirmPresence = (
    eventType: "first" | "second",
    status: GuestEventStatus,
  ) => {
    if (guest) {
      rsvpMutation.mutate({
        token: guest.invitationCode,
        eventType,
        status,
      });
    }

    if (onConfirmRSVP) {
      onConfirmRSVP(eventType);
    }
  };

  const handleUpdateGuestData = (field: string, value: string) => {
    if (guest) {
      dataMutation.mutate({
        token: guest.invitationCode,
        data: {
          [field]: value,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-80 h-[80dvh] sm:w-full sm:max-w-4xl mx-auto">
        <div className="border-b border-gray-100 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 sm:h-8 w-32 sm:w-48 mb-2" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
                <Skeleton className="h-3 sm:h-4 w-20 sm:w-28" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-3 sm:mb-4" />
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
              <Skeleton className="h-6 sm:h-8 w-16 sm:w-24" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-5 sm:h-6 w-16 sm:w-24 mb-3 sm:mb-4" />
          <div className="grid gap-3 sm:gap-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 transform transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
                <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
              </div>
              <Skeleton className="h-8 sm:h-10 w-full mt-2" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 transform transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
                <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
              </div>
              <Skeleton className="h-8 sm:h-10 w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!guest) return null;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-4xl mx-auto dark:bg-[#1B2A49]"
      animate={
        celebratingDataUpdate === "data"
          ? {
              scale: [1, 1.02, 1],
              backgroundColor: [
                "rgb(255 255 255)",
                "rgb(240 253 244)",
                "rgb(255 255 255)",
              ],
            }
          : {}
      }
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {celebratingDataUpdate === "data" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-4 right-4 pointer-events-none flex items-center justify-center z-50"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 0.6, repeat: 1 }}
              className="text-4xl"
            >
              ✅
            </motion.div>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                }}
                className="absolute text-lg"
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-gray-100 pb-4 sm:pb-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-14 sm:pt-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
            {guest.name.charAt(0).toUpperCase()}
          </div>
          <span className="relative sm:flex-1">
            <Input
              className={cn(
                "dark:bg-[transparent] dark:text-gray-300 flex-1 w-80 sm:w-96 h-16 !text-lg font-bold text-gray-900 truncate border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                {
                  "pr-20": name !== guest?.name && name && name !== "",
                },
              )}
              onChange={(e) => setName(e.target.value)}
              defaultValue={guest?.name}
              placeholder="Seu nome completo..."
              value={name!}
              ref={nameInputRef}
            />

            <AnimatePresence>
              {name !== guest?.name && name && name !== "" ? (
                <Animated
                  from="right"
                  to="right"
                  className="z-10 !absolute !right-0 !top-1/2 !-translate-y-1/2"
                >
                  <Button
                    size="sm"
                    onClick={() => handleUpdateGuestData("name", name)}
                    disabled={dataMutation.isPending}
                  >
                    {dataMutation.isPending ? (
                      <Loader2 className="animate-spin h-3 w-3" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                </Animated>
              ) : (
                <Animated
                  from="right"
                  to="right"
                  className="absolute !right-3 !top-1/2 !-translate-y-1/2"
                  onClick={() => {
                    nameInputRef?.current?.focus();
                  }}
                >
                  <Pencil className="w-5 h-5 text-orange-500" />
                </Animated>
              )}
            </AnimatePresence>
          </span>
        </div>
      </div>

      <motion.div
        className="border-b border-gray-100 flex flex-col gap-2 pb-6 mb-6"
        animate={
          celebratingDataUpdate === "data"
            ? {
                scale: [1, 1.01, 1],
              }
            : {}
        }
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 dark:text-gray-300">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 dark:text-gray-300" />
          Seus dados
        </h3>
        <span className="relative text-primary hover:text-blue-800 transition-colors text-xs sm:text-sm truncate">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex-shrink-0 dark:text-gray-300" />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={guest?.email}
            placeholder="Seu melhor e-mail..."
            value={email!}
            className="pl-8 pb-2.5 dark:text-gray-300"
          />
          {email !== guest?.email && email && email !== "" && (
            <Button
              size="sm"
              className="z-10 absolute right-0.5 top-1/2 transform -translate-y-1/2"
              onClick={() => handleUpdateGuestData("email", email)}
              disabled={dataMutation.isPending}
            >
              {dataMutation.isPending ? (
                <Loader2 className="animate-spin h-3 w-3" />
              ) : (
                "Salvar"
              )}
            </Button>
          )}
        </span>
        <span className="relative text-primary hover:text-blue-800 transition-colors text-xs sm:text-sm truncate">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex-shrink-0 dark:text-gray-300" />
          <InputMask
            showMask
            mask="+55 (__) _ ____-____"
            replacement={{ _: /\d/ }}
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={guest?.phone}
            placeholder="Seu melhor número..."
            value={phone!}
            className={cn(
              "dark:text-gray-300 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "pl-8 pb-2.5",
            )}
          />
          {phone !== guest?.phone && phone && phone !== "" && (
            <Button
              size="sm"
              className="z-10 absolute right-0.5 top-1/2 transform -translate-y-1/2"
              onClick={() => handleUpdateGuestData("phone", phone)}
              disabled={dataMutation.isPending}
            >
              {dataMutation.isPending ? (
                <Loader2 className="animate-spin h-3 w-3" />
              ) : (
                "Salvar"
              )}
            </Button>
          )}
        </span>
      </motion.div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 dark:text-gray-300">
          <Ticket className="w-4 h-4 sm:w-5 sm:h-5 dark:text-gray-300" />
          Detalhes do Convite
        </h3>
        <div className="bg-gray-50 dark:bg-background rounded-lg p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              Código de Convite:
            </span>
            <code className="bg-white dark:bg-background px-2 sm:px-3 py-1 rounded font-mono text-xs sm:text-sm text-gray-800 dark:text-gray-300 border self-start sm:self-auto">
              {guest.invitationCode}
            </code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 dark:text-gray-300">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 dark:text-gray-300" />
          Teremos a alegria da sua presença?
        </h3>
        <div className="grid gap-3 sm:gap-4">
          <motion.div
            className="dark:bg-background bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
            animate={
              celebratingEvent === "first"
                ? {
                    scale: [1, 1.02, 1],
                    backgroundColor: [
                      "rgb(249 250 251)",
                      "rgb(240 253 244)",
                      "rgb(249 250 251)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {celebratingEvent === "first" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                  <div className="text-6xl">🎉</div>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={{
                        x: Math.cos((i * 45 * Math.PI) / 180) * 100,
                        y: Math.sin((i * 45 * Math.PI) / 180) * 100,
                        opacity: 0,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                      }}
                      className="absolute text-2xl"
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 relative z-10">
              <span className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                Primeira Confirmação
              </span>
              <motion.span
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 self-start sm:self-auto ${getStatusBadgeColor(guest.rsvpStatusFirst!)}`}
                animate={
                  guest.rsvpStatusFirst === GuestEventStatus.CONFIRMED &&
                  celebratingEvent === "first"
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  animate={
                    guest.rsvpStatusFirst === GuestEventStatus.CONFIRMED &&
                    celebratingEvent === "first"
                      ? {
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {getStatusIcon(guest.rsvpStatusFirst!)}
                </motion.span>
                {getEventStatusLabel(guest.rsvpStatusFirst!)}
              </motion.span>
            </div>
          </motion.div>
          <motion.div
            className="dark:bg-background bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
            animate={
              celebratingEvent === "second"
                ? {
                    scale: [1, 1.02, 1],
                    backgroundColor: [
                      "rgb(249 250 251)",
                      "rgb(240 253 244)",
                      "rgb(249 250 251)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {celebratingEvent === "second" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                  <div className="text-6xl">🎉</div>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={{
                        x: Math.cos((i * 45 * Math.PI) / 180) * 100,
                        y: Math.sin((i * 45 * Math.PI) / 180) * 100,
                        opacity: 0,
                        scale: 0.5,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                      }}
                      className="absolute text-2xl"
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 relative z-10">
              <span className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                Segunda Confirmação
              </span>
              <motion.span
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 self-start sm:self-auto ${getStatusBadgeColor(guest.rsvpStatusSecond!)} dark:text-gray-300`}
                animate={
                  guest.rsvpStatusSecond === GuestEventStatus.CONFIRMED &&
                  celebratingEvent === "second"
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  animate={
                    guest.rsvpStatusSecond === GuestEventStatus.CONFIRMED &&
                    celebratingEvent === "second"
                      ? {
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {getStatusIcon(guest.rsvpStatusSecond!)}
                </motion.span>
                {getEventStatusLabel(guest.rsvpStatusSecond!)}
              </motion.span>
            </div>
            {guest.rsvpStatusSecond === GuestEventStatus.PENDING && (
              <div className="mt-2 flex flex-col gap-2">
                {!hasNameChanged && (
                  <div className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2 sm:p-3 flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Por favor, atualize seu nome acima antes de confirmar sua
                      presença.
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      handleConfirmPresence(
                        "second",
                        GuestEventStatus.CONFIRMED,
                      )
                    }
                    disabled={rsvpMutation.isPending || !hasNameChanged}
                    className="flex-1 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    size="default"
                    title={!hasNameChanged ? "Atualize seu nome primeiro" : ""}
                  >
                    {rsvpMutation.isPending &&
                    rsvpMutation.variables.eventType === "second" &&
                    rsvpMutation.variables.status ===
                      GuestEventStatus.CONFIRMED ? (
                      <motion.span
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Loader2 className="animate-spin h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline dark:text-gray-300">
                          Confirmando...
                        </span>
                        <span className="sm:hidden dark:text-gray-300">
                          Confirmando...
                        </span>
                      </motion.span>
                    ) : (
                      <>
                        <span className="hidden sm:inline dark:text-gray-300">
                          Confirmar presença
                        </span>
                        <span className="sm:hidden dark:text-gray-300">
                          Confirmar presença
                        </span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() =>
                      handleConfirmPresence("second", GuestEventStatus.DECLINED)
                    }
                    disabled={rsvpMutation.isPending}
                    variant="outline"
                    className="flex-1 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    size="default"
                  >
                    {rsvpMutation.isPending &&
                    rsvpMutation.variables.eventType === "second" &&
                    rsvpMutation.variables.status ===
                      GuestEventStatus.DECLINED ? (
                      <motion.span
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Loader2 className="animate-spin h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Recusando...</span>
                        <span className="sm:hidden">Recusando...</span>
                      </motion.span>
                    ) : (
                      <>
                        <span className="hidden sm:inline">
                          Infelizmente não
                        </span>
                        <span className="sm:hidden">Infelizmente não</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
