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
  onComplete,
  onUpdateCart,
  onRemoveFromCart,
}: OtherPaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string)
  }, [])

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

      {/* Order Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Itens do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-1 text-sm">
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 bg-transparent"
                  onClick={() => {
                    if (item.quantity > 1) {
                      onUpdateCart(item.id, item.quantity - 1);
                    } else {
                      onRemoveFromCart(item.id);
                    }
                  }}
                >
                  {item.quantity > 1 ? (
                    <Minus className="h-2 w-2" />
                  ) : (
                    <Trash2 className="h-2 w-2" />
                  )}
                </Button>
                <span className="w-6 text-center text-xs">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0 bg-transparent"
                  onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                >
                  <Plus className="h-2 w-2" />
                </Button>
              </div>
              <span className="w-16 text-right font-medium text-xs">
                {formatBRL(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">
          Métodos de Pagamento Disponíveis
        </h3>
        <Wallet initialization={{ preferenceId: "1102314820-13892f13-c6d6-4f0b-9b0a-8ce17880b851" }} />
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
