"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import CheckoutPage from "./checkout-page"

interface ShoppingItem {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
}

interface CartItem extends ShoppingItem {
  quantity: number
}

const shoppingItems: ShoppingItem[] = [
  {
    id: 1,
    name: "Fresh Bananas",
    price: 14.99,
    description:
      "Organic bananas, perfect for smoothies, Organic bananas, perfect for smoothies, Organic bananas, perfect for smoothies, Organic bananas, perfect for smoothies, Organic bananas, perfect for smoothies",
    category: "Fruits",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Whole Milk",
    price: 17.49,
    description: "Fresh whole milk, 1 gallon",
    category: "Dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Sourdough Bread",
    price: 24.99,
    description: "Artisan sourdough bread, freshly baked",
    category: "Bakery",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    price: 29.99,
    description: "Dozen free-range eggs from local farm",
    category: "Dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 19.99,
    description: "Fresh organic baby spinach leaves",
    category: "Vegetables",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 32.49,
    description: "Plain Greek yogurt, high protein",
    category: "Dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Avocados",
    price: 9.99,
    description: "Ripe avocados, perfect for toast",
    category: "Fruits",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Chicken Breast",
    price: 44.99,
    description: "Boneless skinless chicken breast",
    category: "Meat",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ShoppingListCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const addToCart = (item: ShoppingItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
        )
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== itemId)
      }
    })
  }

  const getItemQuantity = (itemId: number) => {
    const cartItem = cart.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Fruits: "bg-orange-100 text-orange-800",
      Dairy: "bg-blue-100 text-blue-800",
      Bakery: "bg-yellow-100 text-yellow-800",
      Vegetables: "bg-green-100 text-green-800",
      Meat: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
          <p className="text-muted-foreground mt-2">Add items to your cart and manage your shopping list</p>
        </div>
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogTrigger asChild>
            <Card className="w-full sm:w-auto cursor-pointer hover:shadow-md transition-shadow border-secondary">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-semibold">
                      {getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"}
                    </div>
                    <div className="text-muted-foreground">{formatBRL(getTotalPrice())}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-full sm:max-w-md max-h-[90vh] overflow-y-auto border-secondary">
            <CheckoutPage
              cart={cart}
              totalPrice={getTotalPrice()}
              onClose={() => setIsCheckoutOpen(false)}
              onUpdateCart={(itemId, newQuantity) => {
                setCart((prevCart) =>
                  prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
                )
              }}
              onRemoveFromCart={(itemId) => {
                setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shoppingItems.map((item) => {
          const quantity = getItemQuantity(item.id)
          return (
            <Card key={item.id} className="overflow-hidden flex flex-col h-full border-secondary">
              <div className="aspect-square relative">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                <Badge className={`absolute top-2 right-2 ${getCategoryColor(item.category)}`} variant="secondary">
                  {item.category}
                </Badge>
              </div>
              <CardHeader className="pb-3 flex-grow">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <span className="text-lg font-bold text-primary">{formatBRL(item.price)}</span>
                </div>
                <CardDescription className="text-sm line-clamp-3">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                {quantity === 0 ? (
                  <Button onClick={() => addToCart(item)} className="w-full">
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold px-4">{quantity} in cart</span>
                    <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {cart.length > 0 && (
        <Card className="mt-8 border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                  </div>
                  <span className="font-semibold">{formatBRL(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 text-lg font-bold border-t">
                <span>Total:</span>
                <span>{formatBRL(getTotalPrice())}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
