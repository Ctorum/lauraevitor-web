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
import { Input } from "./ui/input";
import { InputMask } from "@react-input/mask";
import { cn } from "@/lib/utils";

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
    const [celebratingEvent, setCelebratingEvent] = useState<string | null>(
        null,
    );

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
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-2xl mx-auto">
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
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-2xl mx-auto">
            <div className="border-b border-gray-100 pb-4 sm:pb-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                        {guest.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                            {guest.name}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-100 flex flex-col gap-2 pb-6 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Seus dados
                </h3>
                <span className="relative text-primary hover:text-blue-800 transition-colors text-xs sm:text-sm truncate">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex-shrink-0" />
                    <Input defaultValue={guest.email} className="pl-8 pb-2.5" />
                    <Button
                        size="sm"
                        className="absolute right-0.5 top-1/2 -translate-y-1/2"
                    >
                        Salvar
                    </Button>
                </span>
                <span className="relative text-primary hover:text-blue-800 transition-colors text-xs sm:text-sm truncate">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex-shrink-0" />
                    <InputMask
                        showMask
                        mask="+55 (__) _ ____-____"
                        replacement={{ _: /\d/ }}
                        defaultValue={guest.phone}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "pl-8 pb-2.5",
                        )}
                    />
                    <Button
                        size="sm"
                        className="absolute right-0.5 top-1/2 -translate-y-1/2"
                    >
                        Salvar
                    </Button>
                </span>
            </div>

            <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                    Detalhes do Convite
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                            Código de Convite:
                        </span>
                        <code className="bg-white px-2 sm:px-3 py-1 rounded font-mono text-xs sm:text-sm text-gray-800 border self-start sm:self-auto">
                            {guest.invitationCode}
                        </code>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Eventos
                </h3>
                <div className="grid gap-3 sm:gap-4">
                    <motion.div
                        className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
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
                                                x:
                                                    Math.cos(
                                                        (i * 45 * Math.PI) /
                                                            180,
                                                    ) * 100,
                                                y:
                                                    Math.sin(
                                                        (i * 45 * Math.PI) /
                                                            180,
                                                    ) * 100,
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
                            <span className="font-medium text-gray-700 text-sm sm:text-base">
                                Primeiro Evento
                            </span>
                            <motion.span
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 self-start sm:self-auto ${getStatusBadgeColor(guest.rsvpStatusFirst)}`}
                                animate={
                                    guest.rsvpStatusFirst ===
                                        GuestEventStatus.CONFIRMED &&
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
                                        guest.rsvpStatusFirst ===
                                            GuestEventStatus.CONFIRMED &&
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
                                    handleConfirmPresence(
                                        "first",
                                        GuestEventStatus.CONFIRMED,
                                    )
                                }
                                disabled={rsvpMutation.isPending}
                                className="mt-2 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full text-xs sm:text-sm"
                                size="default"
                            >
                                {rsvpMutation.isPending &&
                                rsvpMutation.variables?.eventType ===
                                    "first" ? (
                                    <motion.span
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Loader2 className="animate-spin h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="hidden sm:inline">
                                            Confirmando...
                                        </span>
                                        <span className="sm:hidden">
                                            Confirmando...
                                        </span>
                                    </motion.span>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">
                                            Confirmar presença para o Primeiro
                                            Evento
                                        </span>
                                        <span className="sm:hidden">
                                            Confirmar Primeiro Evento
                                        </span>
                                    </>
                                )}
                            </Button>
                        )}
                    </motion.div>
                    <motion.div
                        className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors relative overflow-hidden"
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
                                                x:
                                                    Math.cos(
                                                        (i * 45 * Math.PI) /
                                                            180,
                                                    ) * 100,
                                                y:
                                                    Math.sin(
                                                        (i * 45 * Math.PI) /
                                                            180,
                                                    ) * 100,
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
                            <span className="font-medium text-gray-700 text-sm sm:text-base">
                                Segundo Evento
                            </span>
                            <motion.span
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 self-start sm:self-auto ${getStatusBadgeColor(guest.rsvpStatusSecond)}`}
                                animate={
                                    guest.rsvpStatusSecond ===
                                        GuestEventStatus.CONFIRMED &&
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
                                        guest.rsvpStatusSecond ===
                                            GuestEventStatus.CONFIRMED &&
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
                        {guest.rsvpStatusSecond ===
                            GuestEventStatus.PENDING && (
                            <Button
                                onClick={() =>
                                    handleConfirmPresence(
                                        "second",
                                        GuestEventStatus.CONFIRMED,
                                    )
                                }
                                disabled={true}
                                //disabled={rsvpMutation.isPending}
                                className="mt-2 relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full text-xs sm:text-sm"
                                size="default"
                            >
                                {rsvpMutation.isPending &&
                                rsvpMutation.variables?.eventType ===
                                    "second" ? (
                                    <motion.span
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Loader2 className="animate-spin h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="hidden sm:inline">
                                            Confirmando...
                                        </span>
                                        <span className="sm:hidden">
                                            Confirmando...
                                        </span>
                                    </motion.span>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">
                                            Confirmar presença para o Segundo
                                            Evento
                                        </span>
                                        <span className="sm:hidden">
                                            Confirmar Segundo Evento
                                        </span>
                                    </>
                                )}
                            </Button>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
