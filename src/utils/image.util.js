const BASE = import.meta.env.BASE_URL || '/';
export const DEFAULT_PRODUCT_IMAGE = `${BASE}placeholder-flower.svg`;

/**
 * Maneja el evento onError en etiquetas <img> para evitar el icono de imagen rota (404).
 * Reemplaza automáticamente la fuente con la imagen predeterminada de Astromelia.
 */
export function handleImageError(event, fallback = DEFAULT_PRODUCT_IMAGE) {
  if (event?.currentTarget && !event.currentTarget.src.endsWith('placeholder-flower.svg')) {
    event.currentTarget.onerror = null; // Previene bucles de error
    event.currentTarget.src = fallback;
  }
}
