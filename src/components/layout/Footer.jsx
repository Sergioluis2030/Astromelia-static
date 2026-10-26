import React from 'react';
import { Flower2, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export function Footer() {
  const settings = useSettings();
  return (
    <footer id="contacto" className="bg-[#2B2035] text-white/80 mt-10">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#C8A66A] grid place-items-center text-[#2B2035]">
              <Flower2 size={18} />
            </div>
            <div>
              <div className="tracking-[0.18em] font-semibold text-[14px]">
                ASTROMELIA
              </div>
              <div className="text-[10px] tracking-widest uppercase opacity-60">
                Detalles Personalizados
              </div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed opacity-70 max-w-[32ch]">
            Flores de estación, arreglos artesanales y entregas con amor en todo Lima. Hecho a mano, con corazón.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition"
            >
              <Instagram size={14} />
            </a>
            <a
              href={`https://wa.me/${settings?.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        <div className="text-[13px] space-y-2">
          <div className="text-white font-semibold tracking-widest uppercase text-[11px] mb-3">
            Contacto Lima
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={14} className="text-[#C8A66A] shrink-0" />
            <span>{settings?.address}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Phone size={14} className="text-[#C8A66A] shrink-0" />
            <span>
              {settings?.phoneDisplay} • {settings?.schedule}
            </span>
          </div>
          <div className="opacity-60 text-[12px] mt-2">
            Entregas el mismo día • Pago contra entrega, Yape, Plin
          </div>
        </div>

        <div className="text-[13px]">
          <div className="text-white font-semibold tracking-widest uppercase text-[11px] mb-3">
            Detalles dorados
          </div>
          <p className="opacity-60 leading-relaxed">
            Cada pedido incluye tarjeta escrita a mano, cuidados impresos y garantía de frescura de 5 días. Si algo no florece como esperas, lo reponemos.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8A66A]/20 text-[#C8A66A] text-[11px] tracking-widest uppercase">
            Hecho con amor en Lima
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-[11px] tracking-widest uppercase opacity-50">
        © {new Date().getFullYear()} Astromelia • Detalles Personalizados • Lima Perú
      </div>
    </footer>
  );
}
