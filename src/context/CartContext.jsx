import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.p.id === product.id);
      if (index >= 0) {
        const updated = [...prev];
        const nextQty = Math.min(product.stock, updated[index].q + quantity);
        updated[index] = { ...updated[index], q: nextQty };
        return updated;
      }
      return [...prev, { p: product, q: quantity }];
    });
    setIsCartOpen(true);
  };

  const decrementItem = (index) => {
    setCart((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, q: Math.max(1, item.q - 1) } : item
      )
    );
  };

  const incrementItem = (index) => {
    setCart((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, q: Math.min(item.p.stock, item.q + 1) } : item
      )
    );
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.p.price * item.q, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.q, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        decrementItem,
        incrementItem,
        removeItem,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return context;
}
