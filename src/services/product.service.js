import { PRODUCTS_MOCK, CATEGORIES_MOCK } from '../mocks/products.mock';
import { DEFAULT_PRODUCT_IMAGE } from '../utils/image.util';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
const BASE_URL = import.meta.env.BASE_URL || '/';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/**
 * Normaliza las URLs de las fotos para resolver rutas relativas (/uploads/...) hacia el servidor backend
 * y rutas estáticas (/fotos/...) considerando la base de GitHub Pages
 */
function normalizeImageUrl(url) {
  if (!url) return DEFAULT_PRODUCT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/fotos/') || url.startsWith('/placeholder-')) {
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    return `${BASE_URL}${cleanPath}`;
  }
  return `${BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Formatea un producto de la base de datos para garantizar compatibilidad con el frontend
 */
function normalizeProduct(p) {
  if (!p) return null;
  const image = normalizeImageUrl(p.image) || DEFAULT_PRODUCT_IMAGE;
  let images = Array.isArray(p.images) && p.images.length > 0
    ? p.images.map(normalizeImageUrl)
    : [image];

  let incluye = p.incluye;
  if (typeof incluye === 'string') {
    try {
      incluye = JSON.parse(incluye);
    } catch {
      incluye = incluye.split(',').map((s) => s.trim());
    }
  }
  if (!Array.isArray(incluye)) {
    incluye = [];
  }

  return {
    ...p,
    id: Number(p.id),
    name: p.name,
    price: Number(p.price),
    stock: Number(p.stock),
    desc: p.desc || p.description || '',
    cuidados: p.cuidados || 'Mantener en agua fresca y lugar ventilado.',
    ocasion: p.ocasion || 'Toda ocasión',
    category: p.category || 'Arreglos',
    incluye,
    image,
    images,
  };
}

/**
 * Servicio de productos conectado a la base de datos PostgreSQL real (puerto 3002)
 */
export const ProductService = {
  async getAllProducts() {
    if (USE_MOCK) {
      console.info('🌸 Usando datos mock locales (VITE_USE_MOCK=true)');
      return Promise.resolve(PRODUCTS_MOCK.map(normalizeProduct));
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} al obtener productos`);
      }
      const data = await response.json();
      const list = Array.isArray(data) ? data : (data.data || []);
      return list.map(normalizeProduct);
    } catch (err) {
      console.error('❌ Error conectando a la API de productos:', err.message);
      // Fallback elegante a datos mock en caso de desconexión momentánea
      return PRODUCTS_MOCK.map(normalizeProduct);
    }
  },

  async getProductById(id) {
    const numericId = Number(id);
    if (USE_MOCK) {
      const found = PRODUCTS_MOCK.find((p) => p.id === numericId) || null;
      return Promise.resolve(normalizeProduct(found));
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${numericId}`);
      if (!response.ok) {
        throw new Error(`Producto ${numericId} no encontrado`);
      }
      const data = await response.json();
      const item = data.data || data;
      return normalizeProduct(item);
    } catch (err) {
      console.error(`❌ Error obteniendo producto ${numericId}:`, err.message);
      const fallback = PRODUCTS_MOCK.find((p) => p.id === numericId) || null;
      return normalizeProduct(fallback);
    }
  },

  async getCategories() {
    if (USE_MOCK) {
      return Promise.resolve([...CATEGORIES_MOCK]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories?format=names`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} al obtener categorías`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      }
      if (data.data && Array.isArray(data.data)) {
        return ['Todos', ...data.data.map((c) => c.name)];
      }
      return [...CATEGORIES_MOCK];
    } catch (err) {
      console.error('❌ Error conectando a la API de categorías:', err.message);
      return [...CATEGORIES_MOCK];
    }
  }
};
