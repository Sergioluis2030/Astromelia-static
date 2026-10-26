import React from 'react';
import { Flower2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FBF7FF]/90 border-b border-[#EDE6F7]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#2E5D3E] flex items-center justify-center text-white">
            <Flower2 size={20} />
          </div>
          <div className="leading-[1.1]">
            <div
              className="text-[#2E5D3E] font-semibold tracking-[0.14em] text-[15px] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ASTROMELIA
            </div>
            <div className="text-[#9B8AB5] text-[11px] tracking-[0.18em] uppercase font-medium">
              Detalles Personalizados
            </div>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-widest uppercase text-[#5C2E8E]/70 font-medium">
            <a href="#catalogo" className="hover:text-[#5C2E8E] transition">
              Catálogo
            </a>
            <a href="#nosotros" className="hover:text-[#5C2E8E] transition">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-[#5C2E8E] transition">
              Contacto
            </a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrito"
            className="relative ml-2 w-11 h-11 rounded-full bg-white border border-[#EDE6F7] shadow-[0_4px_20px_rgba(92,46,142,0.08)] flex items-center justify-center hover:shadow-[0_8px_24px_rgba(92,46,142,0.15)] transition-all"
          >
            <ShoppingBag size={18} className="text-[#5C2E8E]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5C2E8E] text-white text-[10px] w-5 h-5 rounded-full grid place-items-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
