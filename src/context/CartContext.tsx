"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart, Product } from "@/types/woocommerce";
import { fetchCart, addItem, removeItem, updateItemQuantity, createEmptyCart } from "@/lib/woocommerce/cart";

interface CartContextType {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (key: string) => Promise<void>;
  updateQuantity: (key: string, qty: number) => Promise<void>;
  isUpdating: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(createEmptyCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Initial fetch on mount
    fetchCart().then(setCart).catch(console.error);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addToCart = async (product: Product, quantity: number = 1) => {
    setIsUpdating(true);
    try {
      const updated = await addItem(product, quantity);
      setCart(updated);
      setIsCartOpen(true); // Smoothly slide open cart drawer upon addition
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeFromCart = async (key: string) => {
    setIsUpdating(true);
    try {
      const updated = await removeItem(key);
      setCart(updated);
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateQuantity = async (key: string, qty: number) => {
    setIsUpdating(true);
    try {
      const updated = await updateItemQuantity(key, qty);
      setCart(updated);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const clearCart = () => {
    setCart(createEmptyCart());
    if (typeof window !== "undefined") {
      localStorage.removeItem("noire_cart_data");
    }
  };

  const refreshCart = async () => {
    setIsUpdating(true);
    try {
      const refreshed = await fetchCart();
      setCart(refreshed);
    } catch (err) {
      console.error("Failed to refresh cart:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isUpdating,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        openSearch,
        closeSearch,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
