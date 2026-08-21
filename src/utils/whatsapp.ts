import { CartItem, Product, ShippingInfo } from '../types';

export const WHATSAPP_NUMBER = '923094083549';
export const WHATSAPP_DISPLAY_NUMBER = '03094083549';
export const WHATSAPP_INTL_NUMBER = '+92 309 4083549';

export interface OrderDetailsForWhatsApp {
  orderId: string;
  shippingInfo: ShippingInfo;
  cartItems: CartItem[];
  subtotal: number;
  deliveryMethod: 'standard' | 'express';
  deliveryPrice: number;
  discountAmount: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'wallet';
}

export function generateOrderWhatsAppMessage(order: OrderDetailsForWhatsApp): string {
  const itemsText = order.cartItems
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.product.netWeight})\n   Quantity: ${item.quantity} × Rs. ${item.product.price.toLocaleString()} = Rs. ${(
          item.product.price * item.quantity
        ).toLocaleString()}`
    )
    .join('\n\n');

  const paymentText =
    order.paymentMethod === 'cod'
      ? 'Cash on Delivery (COD)'
      : order.paymentMethod === 'card'
      ? 'Credit / Debit Card'
      : 'Easypaisa / JazzCash Mobile Wallet';

  const deliveryText =
    order.deliveryMethod === 'express' ? 'Express Delivery (1-2 Days)' : 'Standard Delivery (3-5 Days)';

  return `🌿 *NEW ORDER - PURE HARVEST ORGANIC* 🌿
━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* ${order.orderId}
👤 *Customer Name:* ${order.shippingInfo.fullName}
📞 *Phone Number:* ${order.shippingInfo.phone}
✉️ *Email:* ${order.shippingInfo.email || 'N/A'}
📍 *Delivery Address:* 
${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} (${order.shippingInfo.postalCode})

🛒 *ORDERED ITEMS (${order.cartItems.length}):*
━━━━━━━━━━━━━━━━━━━━
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* Rs. ${order.subtotal.toLocaleString()}
🚚 *Shipping (${deliveryText}):* Rs. ${order.deliveryPrice.toLocaleString()}
🏷️ *Discount:* ${order.discountAmount > 0 ? `− Rs. ${order.discountAmount.toLocaleString()}` : 'Rs. 0'}
✨ *NET TOTAL:* Rs. ${order.total.toLocaleString()}

💳 *Payment Method:* ${paymentText}
━━━━━━━━━━━━━━━━━━━━
🌱 *Please confirm my order dispatch & delivery schedule. Thank you!*`;
}

export function generateProductWhatsAppMessage(product: Product, quantity: number = 1): string {
  return `🌿 *PRODUCT INQUIRY / QUICK ORDER* 🌿
━━━━━━━━━━━━━━━━━━━━
Assalam-o-Alaikum, I want to order the following product from *Pure Harvest Organic*:

📦 *Product:* ${product.name}
⚖️ *Net Weight:* ${product.netWeight}
🔢 *Quantity:* ${quantity}
💵 *Price:* Rs. ${(product.price * quantity).toLocaleString()} (Rs. ${product.price.toLocaleString()} each)
🏷️ *Category:* ${product.category}

Please confirm availability and how I can place my order. Thank you!`;
}

export function openWhatsAppChat(message: string, number: string = WHATSAPP_NUMBER) {
  const encodedText = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
