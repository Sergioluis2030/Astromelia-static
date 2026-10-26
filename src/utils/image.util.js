export const DEFAULT_PRODUCT_IMAGE = '/placeholder-flower.svg';

/**
 * Maneja el evento onError en etiquetas <img> para evitar el icono de imagen rota (404).
 * Reemplaza automáticamente la fuente con la imagen predeterminada de Astromelia.
 */
export function handleImageError(event, fallback = DEFAULT_PRODUCT_IMAGE) {
  if (event?.currentTarget && !event.currentTarget.src.endsWith(fallback)) {
    event.currentTarget.onerror = null; // Previene bucles de error
    event.currentTarget.src = fallback;
  }
}
