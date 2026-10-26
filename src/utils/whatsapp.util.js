import { CONTACT_INFO } from '../mocks/products.mock';
import { SettingsService } from '../services/settings.service';

function getActivePhone() {
  const settings = SettingsService.getCurrentSettings();
  return settings?.whatsappNumber || CONTACT_INFO.whatsappNumber || '51936519907';
}

/**
 * Genera el link de WhatsApp para pedir un producto directamente desde el modal.
 */
export function buildProductWhatsAppUrl(product, quantity = 1, customerData = {}) {
  const phone = getActivePhone();
  const nombre = customerData.nombre?.trim() || "Por coordinar";
  const telefono = customerData.telefono?.trim() || "Por coordinar";
  const fecha = customerData.fecha?.trim() || "Por coordinar";
  const mensaje = customerData.mensaje?.trim() || "Sin dedicatoria";
  const total = ((product?.price || 0) * quantity).toFixed(2);

  const text = 
`🌸 *PEDIDO ASTROMELIA - BOUTIQUE FLORAL* 🌸

📋 *Detalle del Pedido:*
• *Producto:* ${product?.name}
• *Cantidad:* ${quantity}
• *Precio unitario:* S/ ${product?.price}
• *Total a pagar:* S/ ${total}

👤 *Datos para la Entrega:*
• *Nombre:* ${nombre}
• *Teléfono:* ${telefono}
• *Fecha de entrega:* ${fecha}

💌 *Mensaje para la Tarjeta:*
"${mensaje}"

¡Hola Astromelia! Deseo confirmar este pedido y coordinar los detalles de pago y entrega. Muchas gracias ✨`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Genera el link de WhatsApp para pedir todo el carrito de compras.
 */
export function buildCartWhatsAppUrl(cartItems = [], totalAmount = 0) {
  const phone = getActivePhone();
  const itemsSummary = cartItems
    .map((item) => `• ${item.p.name} x${item.q} (S/ ${(item.p.price * item.q).toFixed(2)})`)
    .join("\n");

  const text = 
`🌸 *PEDIDO ASTROMELIA - CARRITO DE COMPRAS* 🌸

📋 *Productos Seleccionados:*
${itemsSummary}

💰 *Total a pagar:* S/ ${totalAmount}

¡Hola Astromelia! Deseo coordinar el pago y la entrega de los productos de mi carrito. Muchas gracias ✨`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
