import React from 'react';
import { ChevronRight } from 'lucide-react';
import { DEFAULT_PRODUCT_IMAGE, handleImageError } from '../../utils/image.util';

export function ProductCard({ product, onSelect }) {
  return (
    <article
      onClick={() => onSelect(product)}
      className="group bg-white rounded-[18px] overflow-hidden border border-[#EDE6F7] shadow-[0_8px_30px_rgba(92,46,142,0.06)] hover:shadow-[0_16px_40px_rgba(92,46,142,0.12)] transition-all cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[1.15/1] overflow-hidden bg-[#EDE6F7]">
        <img
          src={product.image || DEFAULT_PRODUCT_IMAGE}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold text-[#5C2E8E]">
          {product.category}
        </div>
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
            product.stock < 4
              ? "bg-[#FFF0F0] text-[#9a2a2a]"
              : "bg-[#E9F6EC] text-[#2E5D3E]"
          }`}
        >
          {product.stock} en stock
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[18px] font-semibold text-[#5C2E8E] leading-tight">
          {product.name}
        </h3>
        <p className="text-[12px] text-[#5C2E8E]/50 mt-1 line-clamp-2">
          {product.desc}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <div className="text-[12px] text-[#9B8AB5] tracking-widest uppercase font-medium">
              Precio
            </div>
            <div className="text-[20px] font-semibold text-[#2E5D3E]">
              S/ {product.price}
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#FBF7FF] border border-[#EDE6F7] grid place-items-center group-hover:bg-[#5C2E8E] group-hover:text-white transition">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </article>
  );
}
