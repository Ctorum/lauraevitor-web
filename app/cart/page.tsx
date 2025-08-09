"use client";

import Header from "@/components/header";
import { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
  inCart: boolean;
}

interface CartItem extends Item {
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("wishlist-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist-cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        ),
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Seu Carrinho
        </h1>
        <div className="bg-card rounded-lg shadow-md border border-border p-4 sm:p-6">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Seu carrinho está vazio.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80 text-secondary-foreground"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-base w-8 text-center text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80 text-secondary-foreground"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="ml-2 text-destructive hover:text-destructive/80"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mt-6 flex justify-between items-center">
                <span className="font-medium text-lg text-foreground">
                  Total:
                </span>
                <span className="font-bold text-xl text-primary">
                  R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}