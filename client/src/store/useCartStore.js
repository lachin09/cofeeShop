import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  inventory: {
    '1': 10, // Ethiopia Yirgacheffe
    '2': 5,  // V60 Dripper
    '3': 20, // Chocolate Cookie
    '4': 8,  // Chemex
    '5': 15, // Brazil Santos
    '6': 12, // Cinnamon Roll
  },

  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  addItem: (product, quantity = 1) => {
    const { cartItems, inventory } = get();
    const currentStock = inventory[product.id] || 0;
    const existingItem = cartItems.find(item => item.id === product.id);
    const totalQuantity = (existingItem?.quantity || 0) + quantity;

    if (totalQuantity > currentStock) {
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

  updateQuantity: (productId, quantity) => {
    const { inventory } = get();
    if (quantity > inventory[productId]) return;
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
    // 1 point for every 10 currency units spent on coffee products
    const coffeeTotal = get().cartItems
      .filter(item => item.category === 'coffee')
      .reduce((total, item) => total + item.price * item.quantity, 0);
    return Math.floor(coffeeTotal / 10);
  },

  checkout: async () => {
    const { cartItems, inventory } = get();
    
    // Simulate stock deduction
    const newInventory = { ...inventory };
    cartItems.forEach(item => {
      newInventory[item.id] -= item.quantity;
    });

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ inventory: newInventory, cartItems: [] });
        resolve({ success: true, orderId: Math.floor(Math.random() * 1000000) });
      }, 1000);
    });
  }
}));
