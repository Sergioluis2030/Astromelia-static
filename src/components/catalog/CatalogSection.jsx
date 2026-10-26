import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

// 5 filas de 3 productos = 15 productos por página
const ITEMS_PER_PAGE = 15;

export function CatalogSection({ products = [], categories = [], onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Todos") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startCount = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <section id="catalogo" className="max-w-[1240px] mx-auto px-6 lg:px-8 py-14 lg:py-20 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="script text-[28px] text-[#C8A66A]">Catálogo artesanal</p>
          <h2 className="text-[34px] lg:text-[42px] text-[#5C2E8E] leading-none font-semibold -mt-1">
            Elige tu detalle perfecto
          </h2>
          <p className="text-[13px] text-[#5C2E8E]/60 mt-3 max-w-[52ch]">
            Cada arreglo es armado a mano con flores de estación. Precios en soles peruanos, fotos reales y stock actualizado.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`h-9 px-5 rounded-full text-[12px] tracking-widest uppercase font-medium border transition ${
                selectedCategory === cat
                  ? "bg-[#5C2E8E] text-white border-[#5C2E8E] shadow-[0_6px_16px_rgba(92,46,142,0.25)]"
                  : "bg-white border-[#EDE6F7] text-[#5C2E8E]/70 hover:border-[#9B8AB5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-[#5C2E8E]/60 text-[14px]">
          No se encontraron productos disponibles en esta categoría por el momento.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-[12px] text-[#5C2E8E]/60 mb-5 px-1">
            <span>
              Mostrando <b className="text-[#5C2E8E]">{startCount}–{endCount}</b> de <b className="text-[#5C2E8E]">{filteredProducts.length}</b> arreglos florales
            </span>
            {totalPages > 1 && (
              <span className="hidden sm:inline-block bg-[#EDE6F7] text-[#5C2E8E] px-3 py-1 rounded-full font-medium text-[11px] uppercase tracking-wider">
                Página {currentPage} de {totalPages}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>

          {/* Barra de paginación */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-[#EDE6F7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[12px] text-[#5C2E8E]/60">
                Página <b className="text-[#5C2E8E]">{currentPage}</b> de <b className="text-[#5C2E8E]">{totalPages}</b>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Página anterior"
                  className="h-10 px-3.5 rounded-full border border-[#EDE6F7] bg-white text-[#5C2E8E] text-[12px] font-medium flex items-center gap-1 disabled:opacity-35 disabled:cursor-not-allowed hover:border-[#5C2E8E] transition"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full text-[13px] font-semibold transition ${
                      currentPage === pageNum
                        ? "bg-[#5C2E8E] text-white shadow-[0_4px_12px_rgba(92,46,142,0.3)]"
                        : "bg-white border border-[#EDE6F7] text-[#5C2E8E]/80 hover:border-[#9B8AB5]"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente"
                  className="h-10 px-3.5 rounded-full border border-[#EDE6F7] bg-white text-[#5C2E8E] text-[12px] font-medium flex items-center gap-1 disabled:opacity-35 disabled:cursor-not-allowed hover:border-[#5C2E8E] transition"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="hidden md:inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-[#5C2E8E] font-semibold hover:underline"
                >
                  <Sparkles size={14} className="text-[#C8A66A]" /> Ver siguientes {Math.min(ITEMS_PER_PAGE, filteredProducts.length - endCount)} productos
                </button>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
