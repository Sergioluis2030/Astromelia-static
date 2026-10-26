import React from 'react';
import { Sparkles, Heart, Phone, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { handleImageError } from '../../utils/image.util';

export function Hero() {
  const settings = useSettings();
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-8 pt-8 lg:pt-14 pb-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
      <div className="relative">
        <div className="rounded-[28px] overflow-hidden bg-[#EDE6F7] aspect-[4/3.2] lg:aspect-[1.15/1] shadow-[0_20px_60px_rgba(92,46,142,0.18)]">
          <img
            src="/fotos/ARREGLOS_GRANDES_Arreglo Canasta Romance.jpg"
            alt="Canasta de flores Astromelia"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute -bottom-6 -right-2 lg:-right-6 w-[132px] h-[132px] rounded-full bg-[#9B8AB5] text-white grid place-items-center text-center p-4 shadow-[0_12px_30px_rgba(92,46,142,0.3)] rotate-[-8deg]">
          <div className="border border-white/60 rounded-full w-full h-full grid place-items-center">
            <p className="text-[11px] leading-[1.2] tracking-wide font-medium">
              Regala un
              <br />
              detalle a tu
              <br />
              persona
              <br />
              <span className="script text-[18px]">Especial</span>
            </p>
          </div>
        </div>

        <div className="absolute top-6 left-6 bg-white/85 backdrop-blur px-4 py-2 rounded-full text-[11px] tracking-widest uppercase text-[#5C2E8E] font-medium border border-white">
          Envíos Lima • Hoy mismo
        </div>
      </div>

      <div className="lg:pl-8">
        <div className="inline-flex items-center gap-2 bg-[#EDE6F7] text-[#5C2E8E] px-4 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold mb-6">
          <Sparkles size={14} /> Boutique floral desde 2019
        </div>

        <h1 className="text-[42px] lg:text-[62px] leading-[0.95] text-[#5C2E8E]">
          <span className="font-semibold block">Flores Hermosas</span>
          <span className="script text-[52px] lg:text-[70px] text-[#9B8AB5] -mt-2 block">
            Para toda Ocasión
          </span>
        </h1>

        <div className="flex items-center gap-4 my-6">
          <div className="h-[1px] w-16 bg-[#C8A66A]" />
          <Heart size={14} className="text-[#C8A66A] fill-[#C8A66A]" />
          <div className="h-[1px] w-16 bg-[#C8A66A]" />
        </div>

        <p className="text-[#5C2E8E]/70 text-[16px] leading-relaxed max-w-[44ch]">
          Convertimos cada momento en un recuerdo lleno de amor, con arreglos artesanales y detalles pensados para tu persona especial.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href="#catalogo"
            className="h-[48px] px-7 rounded-full bg-[#5C2E8E] text-white text-[13px] tracking-widest uppercase font-medium grid place-items-center shadow-[0_10px_24px_rgba(92,46,142,0.3)] hover:bg-[#4c2577] transition"
          >
            Ordena Ahora
          </a>
          <a
            href="#catalogo"
            className="h-[48px] px-7 rounded-full bg-white border border-[#EDE6F7] text-[#5C2E8E] text-[13px] tracking-widest uppercase font-medium grid place-items-center hover:border-[#9B8AB5] transition"
          >
            Ver Catálogo
          </a>
        </div>

        <div className="mt-10 flex items-center gap-6 text-[12px] text-[#5C2E8E]/60">
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EDE6F7] grid place-items-center">
              <Phone size={12} />
            </span>
            {settings?.phoneDisplay}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#EDE6F7] grid place-items-center">
              <MapPin size={12} />
            </span>
            {settings?.city}
          </span>
        </div>
      </div>
    </section>
  );
}
