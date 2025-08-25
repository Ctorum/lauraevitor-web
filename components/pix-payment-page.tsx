"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CartItem } from "@/lib/types";

interface PixPaymentPageProps {
  cart: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onPaymentComplete: () => void;
  onUpdateCart: (itemId: string, newQuantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export default function PixPaymentPage({
  cart,
  totalPrice,
  onBack,
  onPaymentComplete,
  onUpdateCart,
  onRemoveFromCart,
}: PixPaymentPageProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [processingPayment, setProcessingPayment] = useState(false);

  const pixCode =
    "00020126960014br.gov.bcb.pix01364a907b14-ecd3-45f7-baa4-ee44df8da6720234Presente Casamento - Laura e Vitor5204000053039865802BR5925Vitor Hugo Cabral Rezende6009Sao Paulo62160512VitorRezende63046A0D";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Optionally handle timeout, e.g., redirect or show message
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy PIX code:", err);
    }
  };

  const handleConfirmPayment = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <DialogHeader className="pb-4 border-b">
        <DialogTitle className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-0 h-auto"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          Pagar com PIX
        </DialogTitle>
        <DialogDescription>
          Escaneie o QR Code ou copie e cole o código PIX para finalizar seu
          pagamento.
        </DialogDescription>
      </DialogHeader>

      <div className="flex-grow overflow-y-auto py-6 space-y-6 text-center">
        <Card className="max-w-sm mx-auto border-secondary">
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Valor Total:</span>
              <span className="font-bold text-primary">
                {formatBRL(totalPrice)}
              </span>
            </div>
            <Separator />

            <Button
              onClick={handleCopyPixCode}
              className="w-full mt-2"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" /> Código Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" /> Copiar Código PIX
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground mt-4">
          Após o pagamento, clique em "Confirmar Pagamento" abaixo.
        </div>
      </div>

      <DialogFooter className="pt-4 border-t flex-col sm:flex-col sm:space-x-0 sm:space-y-2">
        <Button
          onClick={handleConfirmPayment}
          className="w-full text-lg py-6"
          disabled={processingPayment}
        >
          {processingPayment ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
            </>
          ) : (
            "Confirmar Pagamento"
          )}
        </Button>
        <Button variant="ghost" onClick={onBack} className="w-full">
          Voltar
        </Button>
      </DialogFooter>
    </div>
  );
}
