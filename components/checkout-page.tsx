"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Check, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import PixPaymentPage from "@/components/pix-payment-page"
import OtherPaymentPage from "@/components/other-payment-page"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CheckoutPageProps {
  cart: CartItem[]
  totalPrice: number
  onClose: () => void
  onUpdateCart: (itemId: number, newQuantity: number) => void
  onRemoveFromCart: (itemId: number) => void
}

export default function CheckoutPage({ cart, totalPrice, onClose, onUpdateCart, onRemoveFromCart }: CheckoutPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<"pix" | "other" | null>(null)
  const [currentPage, setCurrentPage] = useState<"checkout" | "pix" | "other" | "success">("checkout")

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const handlePaymentConfirm = () => {
    if (selectedPayment === "pix") {
      setCurrentPage("pix")
    } else if (selectedPayment === "other") {
      setCurrentPage("other")
    }
  }

  const handlePaymentComplete = () => {
    setCurrentPage("success")
  }

  const handleBackToCheckout = () => {
    setCurrentPage("checkout")
    setSelectedPayment(null)
  }

  // Success Page
  if (currentPage === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl text-green-600">Pagamento Aprovado!</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground mb-6">
          Seu pedido foi processado com sucesso. Você receberá uma confirmação por email.
        </p>
        <Button onClick={onClose} className="w-full">
          Continuar Comprando
        </Button>
      </div>
    )
  }

  // PIX Payment Page
  if (currentPage === "pix") {
    return (
      <PixPaymentPage
        cart={cart}
        totalPrice={totalPrice}
        onBack={handleBackToCheckout}
        onComplete={handlePaymentComplete}
        onUpdateCart={onUpdateCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    )
  }

  // Other Payment Page
  if (currentPage === "other") {
    return (
      <OtherPaymentPage
        cart={cart}
        totalPrice={totalPrice}
        onBack={handleBackToCheckout}
        onComplete={handlePaymentComplete}
        onUpdateCart={onUpdateCart}
        onRemoveFromCart={onRemoveFromCart}
      />
    )
  }

  // Main Checkout Page
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="p-0 h-auto">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          Finalizar Compra
        </DialogTitle>
      </DialogHeader>

      {/* Total Amount - Big and Highlighted */}
      <div className="text-center py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
        <p className="text-sm text-muted-foreground mb-2">Total a Pagar</p>
        <p className="text-4xl font-bold text-blue-600 mb-2">{formatBRL(totalPrice)}</p>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {cart.reduce((total, item) => total + item.quantity, 0)} itens
        </Badge>
      </div>

      {/* Order Summary */}
      <Card className="border-secondary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground">{formatBRL(item.price)} cada</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => {
                    if (item.quantity > 1) {
                      onUpdateCart(item.id, item.quantity - 1)
                    } else {
                      onRemoveFromCart(item.id)
                    }
                  }}
                >
                  {item.quantity > 1 ? <Minus className="h-3 w-3" /> : <Trash2 className="h-3 w-3" />}
                </Button>
                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm font-medium w-20 text-right">{formatBRL(item.price * item.quantity)}</div>
            </div>
          ))}
          {cart.length === 0 && <div className="text-center py-4 text-muted-foreground">Seu carrinho está vazio</div>}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Escolha a forma de pagamento</h3>

        {/* PIX Option */}
        <Card
          className={`cursor-pointer transition-all hover:shadow-md border-secondary ${
            selectedPayment === "pix" ? "ring-2 ring-green-500 bg-green-50" : ""
          }`}
          onClick={() => setSelectedPayment("pix")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-700">PIX</h4>
                <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">Desconto 5%</Badge>
                <p className="text-lg font-bold text-green-600 mt-1">{formatBRL(totalPrice * 0.95)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Any Other Option */}
        <Card
          className={`cursor-pointer transition-all hover:shadow-md border-secondary ${
            selectedPayment === "other" ? "ring-2 ring-purple-500 bg-purple-50" : ""
          }`}
          onClick={() => setSelectedPayment("other")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-700">Outras Opções</h4>
                <p className="text-sm text-muted-foreground">Outros métodos de pagamento</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="border-secondary text-purple-700">
                  Redirecionar
                </Badge>
                <p className="text-lg font-bold text-purple-600 mt-1">{formatBRL(totalPrice)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <Button
        onClick={handlePaymentConfirm}
        disabled={!selectedPayment || cart.length === 0}
        className="w-full h-12 text-lg font-semibold"
        size="lg"
      >
        {cart.length === 0
          ? "Adicione itens ao carrinho"
          : selectedPayment === "pix"
            ? `Continuar com PIX - ${formatBRL(totalPrice * 0.95)}`
            : selectedPayment === "other"
              ? `Continuar com Outras Opções`
              : "Selecione uma forma de pagamento"}
      </Button>
    </div>
  )
}
