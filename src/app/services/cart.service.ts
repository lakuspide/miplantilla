import { Injectable, signal, computed } from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  totalPrice = computed(() => {
    return this.items().reduce((total, item) => {
      // Parse price string like "24.00 €" or "$ 120.000" to number
      // Extract numbers, dots and commas
      const match = item.price.match(/[\d.,]+/);
      let priceNum = 0;
      if (match) {
        let numStr = match[0];
        // If it has both dots and commas, assume the last one is the decimal separator
        if (numStr.includes('.') && numStr.includes(',')) {
           const lastDot = numStr.lastIndexOf('.');
           const lastComma = numStr.lastIndexOf(',');
           if (lastComma > lastDot) {
             numStr = numStr.replace(/\./g, '').replace(',', '.');
           } else {
             numStr = numStr.replace(/,/g, '');
           }
        } else if (numStr.includes(',')) {
           // If only comma, check if it's used as decimal (e.g. 24,00)
           const parts = numStr.split(',');
           if (parts.length === 2 && parts[1].length <= 2) {
             numStr = numStr.replace(',', '.');
           } else {
             numStr = numStr.replace(/,/g, '');
           }
        }
        priceNum = parseFloat(numStr);
      }
      return total + (priceNum * item.quantity);
    }, 0);
  });

  totalItems = computed(() => {
    return this.items().reduce((total, item) => total + item.quantity, 0);
  });

  addItem(item: MenuItem, quantity: number) {
    this.items.update(current => {
      const existing = current.find(i => i.id === item.id);
      if (existing) {
        return current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...current, { ...item, quantity }];
    });
  }

  removeItem(itemId: string) {
    this.items.update(current => current.filter(i => i.id !== itemId));
  }

  updateQuantity(itemId: string, delta: number) {
    this.items.update(current => {
      return current.map(i => {
        if (i.id === itemId) {
          const newQuantity = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQuantity };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  }
  
  clearCart() {
    this.items.set([]);
  }
}
