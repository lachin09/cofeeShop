import { create } from 'zustand';
import { supabase } from '../services/supabase';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  inventory: {}, // Will be populated from DB or handled by DB triggers

  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  addItem: (product, quantity = 1) => {
    const { cartItems } = get();
    const existingItem = cartItems.find(item => item.id === product.id);
    const totalQuantity = (existingItem?.quantity || 0) + quantity;

    if (totalQuantity > product.stock) {
      alert('Not enough stock available');
      return;
    }

    if (existingItem) {
      set({
        cartItems: cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      });
    } else {
      set({ cartItems: [...cartItems, { ...product, quantity }] });
    }
  },

  removeItem: (productId) => {
    set(state => ({
      cartItems: state.cartItems.filter(item => item.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity, stock) => {
    if (quantity > stock) return;
    if (quantity < 1) return;

    set(state => ({
      cartItems: state.cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => set({ cartItems: [] }),

  getTotalPrice: () => {
    return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getLoyaltyPoints: () => {
    const coffeeTotal = get().cartItems
      .filter(item => item.category === 'coffee')
      .reduce((total, item) => total + item.price * item.quantity, 0);
    return Math.floor(coffeeTotal / 10);
  },

  checkout: async (customerData) => {
    const { cartItems, getTotalPrice, clearCart } = get();
    
    try {
      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: customerData.name,
          customer_email: customerData.email,
          customer_phone: customerData.phone,
          shipping_address: customerData.address,
          total_amount: getTotalPrice(),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Stock deduction is handled by the DB trigger 'on_order_item_created'

      clearCart();
      return { success: true, orderId: order.id };
    } catch (error) {
      console.error('Checkout error:', error);
      return { success: false, error: error.message };
    }
  }
}));
