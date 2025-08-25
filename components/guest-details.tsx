import { GuestEventStatus } from "@/enums/guest-event-status";
import { Guest } from "@/types/guest";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Loader2,
  Mail,
  Phone,
  Ticket,
  Calendar,
  Check,
  X,
  Clock,
} from "lucide-react";
import api from "@/services/api.service";
import { getEventStatusLabel } from "@/lib/get-event-status-label";

async function updateRSVPStatus(
  token: string,
  eventType: string,
  status: GuestEventStatus,
) {
  const response = await api.put(`/guests`, {
    invitationCode: token,
    rsvpStatusFirst: eventType === "first" ? status : undefined,
    rsvpStatusSecond: eventType === "second" ? status : undefined,
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

  const rsvpMutation = useMutation({
    mutationFn: ({
      token,
      eventType,
      status,
    }: {
      token: string;
      eventType: string;
      status: GuestEventStatus;
    }) => updateRSVPStatus(token, eventType, status),
    onSuccess: (data, variables) => {
      setCelebratingEvent(variables.eventType);
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 min-w-[25rem] max-w-2xl mx-auto">
        <div className="border-b border-gray-100 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-2" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="grid gap-4">
            <div className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-10 w-full mt-2" />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!guest) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 min-w-[25rem] max-w-2xl mx-auto">
      <div className="border-b border-gray-100 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
            {guest.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {guest.name}
            </h2>
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${guest.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                {guest.email}
              </a>
              <a
                href={`tel:${guest.phone}`}
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                {guest.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          Detalhes do Convite
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Código de Convite:
            </span>
            <code className="bg-white px-3 py-1 rounded font-mono text-sm text-gray-800 border">
              {guest.invitationCode}
            </code>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Eventos
        </h3>
        <div className="grid gap-4">
          <motion.div
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
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
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="font-medium text-gray-700">Primeiro Evento</span>
              <motion.span
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${getStatusBadgeColor(guest.rsvpStatusFirst)}`}
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
                  {getStatusIcon(guest.rsvpStatusFirst)}
                </motion.span>
                {getEventStatusLabel(guest.rsvpStatusFirst)}
              </motion.span>
            </div>
            {guest.rsvpStatusFirst === GuestEventStatus.PENDING && (
              <Button
                onClick={() =>
                  handleConfirmPresence("first", GuestEventStatus.CONFIRMED)
                }
                disabled={rsvpMutation.isPending}
                className="mt-2 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                size="lg"
              >
                {rsvpMutation.isPending &&
                rsvpMutation.variables?.eventType === "first" ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Loader2 className="animate-spin h-4 w-4" />
                    Confirmando...
                  </motion.span>
                ) : (
                  "Confirmar presença para o Primeiro Evento"
                )}
              </Button>
            )}
          </motion.div>
          <motion.div
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
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
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="font-medium text-gray-700">Segundo Evento</span>
              <motion.span
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${getStatusBadgeColor(guest.rsvpStatusSecond)}`}
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
                  {getStatusIcon(guest.rsvpStatusSecond)}
                </motion.span>
                {getEventStatusLabel(guest.rsvpStatusSecond)}
              </motion.span>
            </div>
            {guest.rsvpStatusSecond === GuestEventStatus.PENDING && (
              <Button
                onClick={() =>
                  handleConfirmPresence("second", GuestEventStatus.CONFIRMED)
                }
                disabled={true}
                //disabled={rsvpMutation.isPending}
                className="mt-2 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                size="lg"
              >
                {rsvpMutation.isPending &&
                rsvpMutation.variables?.eventType === "second" ? (
                  <motion.span
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Loader2 className="animate-spin h-4 w-4" />
                    Confirmando...
                  </motion.span>
                ) : (
                  "Confirmar presença para o Segundo Evento"
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
