"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Check, Download, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface PixPaymentPageProps {
  cart: CartItem[]
  totalPrice: number
  onBack: () => void
  onComplete: () => void
  onUpdateCart: (itemId: number, newQuantity: number) => void
  onRemoveFromCart: (itemId: number) => void
}

export default function PixPaymentPage({
  cart,
  totalPrice,
  onBack,
  onComplete,
  onUpdateCart,
  onRemoveFromCart,
}: PixPaymentPageProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const pixKey =
    "00020126580014br.gov.bcb.pix013636c4b8e5-4d8a-4b5c-9f2e-1a2b3c4d5e6f520400005303986540" +
    (totalPrice * 0.95).toFixed(2) +
    "5802BR5925LOJA EXEMPLO LTDA6009SAO PAULO62070503***6304"

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Pagamento PIX</h1>
          <p className="text-muted-foreground">Escaneie o QR Code ou copie a chave PIX</p>
        </div>
      </div>

      {/* Timer */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-orange-700 mb-1">Tempo restante para pagamento</p>
          <p className="text-2xl font-bold text-orange-600">{formatTime(timeLeft)}</p>
        </CardContent>
      </Card>

      {/* Total Amount */}
      <div className="text-center py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
        <p className="text-sm text-muted-foreground mb-1">Total</p>
        <p className="text-3xl font-bold text-green-600">{formatBRL(totalPrice * 0.95)}</p>
        <Badge className="bg-green-100 text-green-800 mt-2">Sem taxa pros noivinhos</Badge>
      </div>

      {/* Order Summary */}
      <Card className="border-secondary">
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
                      onUpdateCart(item.id, item.quantity - 1)
                    } else {
                      onRemoveFromCart(item.id)
                    }
                  }}
                >
                  {item.quantity > 1 ? <Minus className="h-2 w-2" /> : <Trash2 className="h-2 w-2" />}
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
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                  item.price * item.quantity,
                )}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* QR Code */}
      <Card className="border-secondary">
        <CardHeader>
          <CardTitle className="text-center">QR Code PIX</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="w-64 h-64 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-gray-200 relative">
            {/* Simulated QR Code pattern */}
            <div className="w-56 h-56 bg-black relative">
              <div className="absolute inset-2 bg-white"></div>
              <div className="absolute top-2 left-2 w-12 h-12 bg-black"></div>
              <div className="absolute top-2 right-2 w-12 h-12 bg-black"></div>
              <div className="absolute bottom-2 left-2 w-12 h-12 bg-black"></div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-white"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-white"></div>
              {/* Random pattern simulation */}
              <div className="absolute top-8 left-16 w-2 h-2 bg-black"></div>
              <div className="absolute top-12 left-20 w-2 h-2 bg-black"></div>
              <div className="absolute top-16 left-12 w-2 h-2 bg-black"></div>
              <div className="absolute top-20 left-24 w-2 h-2 bg-black"></div>
              <div className="absolute top-24 left-16 w-2 h-2 bg-black"></div>
              <div className="absolute top-28 left-20 w-2 h-2 bg-black"></div>
              <div className="absolute top-32 left-14 w-2 h-2 bg-black"></div>
              <div className="absolute top-36 left-22 w-2 h-2 bg-black"></div>
              <div className="absolute top-40 left-18 w-2 h-2 bg-black"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Abra o app do seu banco e escaneie o código QR</p>
          <Button variant="outline" className="mb-4 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Baixar QR Code
          </Button>
        </CardContent>
      </Card>

      {/* PIX Key */}
      <Card className="border-secondary">
        <CardHeader>
          <CardTitle>Chave PIX Copia e Cola</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-3 rounded-lg mb-3 break-all text-sm font-mono text-primary">{pixKey}</div>
          <Button onClick={copyPixKey} className="w-full bg-transparent" variant="outline">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Chave PIX
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-secondary">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Como pagar com PIX:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Abra o app do seu banco</li>
            <li>2. Escolha a opção PIX</li>
            <li>3. Escaneie o QR Code ou cole a chave</li>
            <li>4. Confirme os dados e finalize o pagamento</li>
            <li>5. O pagamento será processado instantaneamente</li>
          </ol>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={onComplete} className="flex-1" size="lg">
          Já Paguei
        </Button>
        <Button variant="outline" onClick={onBack} size="lg">
          Voltar
        </Button>
      </div>
    </div>
  )
}
