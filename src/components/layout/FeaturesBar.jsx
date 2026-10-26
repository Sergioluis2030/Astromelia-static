import React from 'react';
import { Flower2, Sparkles, Gift, CalendarHeart } from 'lucide-react';

const FEATURES = [
  { icon: Flower2, label: "Ramos", sub: "Frescos diarios" },
  { icon: Sparkles, label: "Arreglos", sub: "Diseño boutique" },
  { icon: Gift, label: "Regalos", sub: "Flores + delicias" },
  { icon: CalendarHeart, label: "Eventos", sub: "Bodas & más" },
];

export function FeaturesBar() {
  return (
    <div id="nosotros" className="bg-[#B8A6CD] text-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-4 flex flex-wrap justify-between gap-4 lg:gap-0">
        {FEATURES.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center">
                <IconComponent size={18} />
              </div>
              <div className="leading-tight">
                <div className="font-semibold tracking-wide text-[13px] uppercase">
                  {item.label}
                </div>
                <div className="text-[11px] opacity-80">{item.sub}</div>
              </div>
            </div>
          );
        })}

        <div className="hidden lg:flex items-center gap-2 text-[11px] tracking-widest uppercase bg-white/15 px-4 py-2 rounded-full">
          Entrega hoy en 90 min
        </div>
      </div>
    </div>
  );
}
