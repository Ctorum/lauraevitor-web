"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CheckoutPage from "./checkout-page";

import { ShoppingItem, CartItem } from "@/lib/types";

export default function ShoppingListCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoppingItems = async () => {
      try {
        setLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${BASE_URL}/gifts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedItems: ShoppingItem[] = data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
        }));
        setShoppingItems(formattedItems);
      } catch (e: any) {
        setError(e.message || "Failed to fetch shopping items");
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingItems();
  }, []);

  const addToCart = (item: ShoppingItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
    });
  };

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
          <p className="text-muted-foreground mt-2">
            Add items to your cart and manage your shopping list
          </p>
        </div>
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogTrigger asChild>
            <Card className="w-full sm:w-auto cursor-pointer hover:shadow-md transition-shadow border-secondary">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-semibold">
                      {getTotalItems()}{" "}
                      {getTotalItems() === 1 ? "item" : "itens"}
                    </div>
                    <div className="text-muted-foreground">
                      {formatBRL(getTotalPrice())}
                    </div>
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
              onUpdateCart={(itemId: string, newQuantity: number) => {
                setCart((prevCart) =>
                  prevCart.map((item) =>
                    item.id === itemId
                      ? { ...item, quantity: newQuantity }
                      : item,
                  ),
                );
              }}
              onRemoveFromCart={(itemId: string) => {
                setCart((prevCart) =>
                  prevCart.filter((item) => item.id !== itemId),
                );
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading && <p>Loading items...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && shoppingItems.length === 0 && (
          <p>No items found.</p>
        )}
        {!loading &&
          !error &&
          shoppingItems.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <Card
                key={item.id}
                className="overflow-hidden flex flex-col h-full border-secondary"
              >
                <div className="aspect-square relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3 flex-grow">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <span className="text-lg font-bold text-primary">
                      {formatBRL(item.price)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  {quantity === 0 ? (
                    <Button onClick={() => addToCart(item)} className="w-full">
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold px-4">
                        {quantity} in cart
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
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
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {formatBRL(item.price * item.quantity)}
                  </span>
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
  );
}
