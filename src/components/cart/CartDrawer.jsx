import React from 'react';
import { X, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { buildCartWhatsAppUrl } from '../../utils/whatsapp.util';
import { DEFAULT_PRODUCT_IMAGE, handleImageError } from '../../utils/image.util';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    decrementItem,
    incrementItem,
    removeItem,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        className="flex-1 bg-[#2B2035]/30 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="w-full max-w-[420px] bg-white h-full shadow-[-20px_0_60px_rgba(0,0,0,0.2)] rounded-l-[24px] flex flex-col">
        <div className="p-6 flex items-center justify-between border-b border-[#EDE6F7]">
          <h3 className="text-[20px] font-semibold text-[#5C2E8E]">
            Tu carrito ({totalItems})
          </h3>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-full bg-[#FBF7FF] border border-[#EDE6F7] grid place-items-center"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EDE6F7] grid place-items-center text-[#9B8AB5] mb-4">
                <ShoppingBag />
              </div>
              <p className="text-[#5C2E8E]/60 text-[13px]">
                Tu carrito está vacío.
                <br />
                Agrega un detalle hermoso.
              </p>
              <a
                href="#catalogo"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 inline-block px-5 h-9 rounded-full bg-[#5C2E8E] text-white text-[11px] tracking-widest uppercase grid place-items-center"
              >
                Ver catálogo
              </a>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.p.id}
                className="flex gap-3 bg-[#FBF7FF] border border-[#EDE6F7] rounded-[16px] p-3"
              >
                <img
                  src={item.p.image || DEFAULT_PRODUCT_IMAGE}
                  alt={item.p.name}
                  onError={handleImageError}
                  className="w-16 h-16 rounded-[12px] object-cover"
                />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[#5C2E8E] leading-tight">
                    {item.p.name}
                  </div>
                  <div className="text-[12px] text-[#2E5D3E] font-semibold">
                    S/ {item.p.price} x {item.q}
                  </div>
                  <div className="flex gap-1 mt-1 items-center">
                    <button
                      onClick={() => decrementItem(idx)}
                      className="w-6 h-6 rounded-full bg-white border grid place-items-center"
                    >
                      <Minus size={10} />
                    </button>
                    <button
                      onClick={() => incrementItem(idx)}
                      className="w-6 h-6 rounded-full bg-white border grid place-items-center"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => removeItem(idx)}
                      className="ml-auto text-[11px] text-[#9a2a2a]"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#EDE6F7] bg-[#FBF7FF] rounded-t-[20px]">
            <div className="flex justify-between text-[13px] mb-3">
              <span className="opacity-60">Subtotal</span>
              <span className="font-semibold text-[#5C2E8E]">S/ {subtotal}</span>
            </div>
            <div className="flex justify-between text-[13px] mb-5">
              <span className="opacity-60">Envío Lima</span>
              <span className="text-[#2E5D3E]">Calculado por WhatsApp</span>
            </div>
            <a
              href={buildCartWhatsAppUrl(cart, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-full bg-[#2E5D3E] text-white grid place-items-center text-[12px] tracking-widest uppercase font-medium hover:bg-[#244a31] transition"
            >
              Pedir por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="mt-3 w-full h-10 rounded-full border border-[#EDE6F7] text-[11px] tracking-widest uppercase"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
