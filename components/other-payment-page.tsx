"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CreditCard,
  Building,
  Smartphone,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OtherPaymentPageProps {
  cart: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onComplete: () => void;
  onUpdateCart: (itemId: number, newQuantity: number) => void;
  onRemoveFromCart: (itemId: number) => void;
}

export default function OtherPaymentPage({
  cart,
  totalPrice,
  onBack,
  onUpdateCart,
  onRemoveFromCart,
}: OtherPaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const createPurchase = async () => {
    setIsProcessing(true);

    const purchaseData = {
      items: cart.map((item) => ({
        id: item.id.toString(),
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchases`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Purchase created:", result);

      if (result?.data?.id) {
        console.log(result.data.id);
        setPreferenceId(result.data.id);
      }
    } catch (error) {
      console.error("Error creating purchase:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    createPurchase();
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Outras Formas de Pagamento</h1>
          <p className="text-muted-foreground">
            Escolha sua forma de pagamento preferida
          </p>
        </div>
      </div>

      {/* Total Amount */}
      <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
        <p className="text-sm text-muted-foreground mb-1">Total a Pagar</p>
        <p className="text-3xl font-bold text-blue-600">
          {formatBRL(totalPrice)}
        </p>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 mt-2">
          {cart.reduce((total, item) => total + item.quantity, 0)} itens
        </Badge>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">
          Métodos de Pagamento Disponíveis
        </h3>
        {preferenceId && (
          <Wallet
            initialization={{
              preferenceId: preferenceId,
            }}
          />
        )}
      </div>

      {selectedMethod && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Você será redirecionado para completar o pagamento
            </p>
            <p className="text-xs text-muted-foreground">
              Após o redirecionamento, siga as instruções na página de pagamento
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
