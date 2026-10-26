import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { buildProductWhatsAppUrl } from '../../utils/whatsapp.util';
import { DEFAULT_PRODUCT_IMAGE, handleImageError } from '../../utils/image.util';

export function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    mensaje: "",
  });

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const rawImages = product.images?.length ? product.images : [product.image];
  const images = rawImages.filter(Boolean).length > 0 ? rawImages.filter(Boolean) : [DEFAULT_PRODUCT_IMAGE];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-[#2B2035]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="w-full max-w-[980px] bg-[#FBF7FF] h-full overflow-auto shadow-[-20px_0_60px_rgba(0,0,0,0.2)] rounded-l-[24px] flex flex-col lg:flex-row">
        {/* Columna Izquierda: Galería + Cuidados */}
        <div className="lg:w-[54%] bg-white p-5 lg:p-7 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              aria-label="Volver"
              className="w-9 h-9 rounded-full bg-[#FBF7FF] border border-[#EDE6F7] grid place-items-center"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[11px] tracking-widest uppercase bg-[#EDE6F7] text-[#5C2E8E] px-3 py-1 rounded-full font-semibold">
              {product.category}
            </span>
          </div>

          <div className="rounded-[18px] overflow-hidden bg-[#EDE6F7] aspect-[1/1] relative">
            <img
              src={images[activeImageIndex] || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handlePrevImage}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 grid place-items-center shadow"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Siguiente imagen"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 grid place-items-center shadow"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-[72px] h-[72px] rounded-[14px] overflow-hidden border-2 ${
                  activeImageIndex === idx ? "border-[#5C2E8E]" : "border-transparent"
                } bg-[#EDE6F7]`}
              >
                <img
                  src={imgUrl || DEFAULT_PRODUCT_IMAGE}
                  alt={`${product.name} vista ${idx + 1}`}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-[#FBF7FF] border border-[#EDE6F7] rounded-[14px] p-3">
              <div className="text-[#9B8AB5] uppercase tracking-widest font-semibold">
                Cuidados
              </div>
              <div className="mt-1 text-[#5C2E8E]/70">{product.cuidados}</div>
            </div>
            <div className="bg-[#FBF7FF] border border-[#EDE6F7] rounded-[14px] p-3">
              <div className="text-[#9B8AB5] uppercase tracking-widest font-semibold">
                Ocasión
              </div>
              <div className="mt-1 text-[#5C2E8E]/70">{product.ocasion}</div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Información, Cantidad y Formulario WhatsApp */}
        <div className="lg:w-[46%] p-6 lg:p-8 flex flex-col">
          <h2 className="text-[30px] leading-none font-semibold text-[#5C2E8E]">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mt-3">
            <div className="text-[26px] font-semibold text-[#2E5D3E]">
              S/ {product.price}
            </div>
            <div
              className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${
                product.stock < 4
                  ? "bg-[#FFF0F0] text-[#9a2a2a]"
                  : "bg-[#E9F6EC] text-[#2E5D3E]"
              }`}
            >
              {product.stock} disponibles
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-[#5C2E8E]/70">
            {product.desc}
          </p>

          <div className="mt-6 bg-white rounded-[16px] border border-[#EDE6F7] p-4">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#5C2E8E]">
              Incluye
            </div>
            <ul className="mt-2 space-y-1.5">
              {product.incluye.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-[13px] text-[#5C2E8E]/80"
                >
                  <span className="text-[#C8A66A]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="text-[11px] tracking-widest uppercase font-semibold text-[#5C2E8E] mb-2">
              Cantidad
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white border border-[#EDE6F7] rounded-full h-10 px-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full hover:bg-[#EDE6F7] grid place-items-center"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-[14px] font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-8 h-8 rounded-full hover:bg-[#EDE6F7] grid place-items-center"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-[12px] text-[#5C2E8E]/60">
                Total:{" "}
                <b className="text-[#2E5D3E]">S/ {product.price * quantity}</b>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#EDE6F7] pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#5C2E8E]">
                Datos para la entrega
              </span>
              <span className="text-[11px] text-[#9B8AB5]">Opcional</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Nombre de quien recibe / envía"
                className="h-10 px-4 rounded-full bg-white border border-[#EDE6F7] text-[13px] outline-none focus:border-[#5C2E8E] transition"
              />
              <input
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                placeholder="Teléfono de contacto"
                className="h-10 px-4 rounded-full bg-white border border-[#EDE6F7] text-[13px] outline-none focus:border-[#5C2E8E] transition"
              />
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                title="Fecha deseada de entrega"
                className="h-10 px-4 rounded-full bg-white border border-[#EDE6F7] text-[13px] outline-none focus:border-[#5C2E8E] transition text-[#2B2035]"
              />
              <input
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({ ...formData, mensaje: e.target.value })
                }
                placeholder="Dedicatoria para la tarjeta"
                className="h-10 px-4 rounded-full bg-white border border-[#EDE6F7] text-[13px] outline-none focus:border-[#5C2E8E] transition"
              />
            </div>
            <p className="text-[11px] text-[#5C2E8E]/60 mt-2">
              Estos datos se adjuntarán automáticamente en tu mensaje de WhatsApp.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => addToCart(product, quantity)}
              className="h-12 rounded-full bg-white border border-[#5C2E8E] text-[#5C2E8E] text-[12px] tracking-widest uppercase font-semibold hover:bg-[#EDE6F7] transition"
            >
              Añadir al carrito
            </button>
            <a
              href={buildProductWhatsAppUrl(product, quantity, formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-full bg-[#2E5D3E] text-white text-[12px] tracking-widest uppercase font-medium grid place-items-center gap-1 hover:bg-[#244a31] shadow-[0_6px_20px_rgba(46,93,62,0.25)] transition"
            >
              <span className="flex items-center gap-2">
                <MessageCircle size={15} /> Pedir por WhatsApp
              </span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="mt-6 lg:hidden h-11 rounded-full border border-[#EDE6F7] text-[12px] tracking-widest uppercase"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
