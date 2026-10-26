import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { FeaturesBar } from '../components/layout/FeaturesBar';
import { CatalogSection } from '../components/catalog/CatalogSection';
import { Footer } from '../components/layout/Footer';
import { ProductModal } from '../components/catalog/ProductModal';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ProductService } from '../services/product.service';

export function HomePage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadCatalog() {
      const [prods, cats] = await Promise.all([
        ProductService.getAllProducts(),
        ProductService.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    }
    loadCatalog();
  }, []);

  // Sincronizar URL /producto/:productId con el modal abierto
  useEffect(() => {
    if (!productId || products.length === 0) {
      setSelectedProduct(null);
      return;
    }
    const found = products.find((p) => p.id === Number(productId));
    setSelectedProduct(found || null);
  }, [productId, products]);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    navigate(`/producto/${product.id}`, { preventScrollReset: true });
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    navigate(`/`, { preventScrollReset: true });
  };

  return (
    <div className="min-h-screen bg-[#FBF7FF] text-[#2B2035] antialiased selection:bg-[#EDE6F7]">
      <Header />
      <Hero />
      <FeaturesBar />
      <CatalogSection
        products={products}
        categories={categories}
        onSelectProduct={handleOpenProduct}
      />
      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={handleCloseProduct}
      />
      <CartDrawer />
    </div>
  );
}
