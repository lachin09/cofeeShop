import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';

const products = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    category: 'coffee',
    price: 18.50,
    roast: 'Light',
    grind: 'Whole Bean',
    description: 'Floral notes with a citrus finish.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'V60 Coffee Dripper',
    category: 'equipment',
    price: 25.00,
    description: 'Perfect for pour-over coffee.',
    image: 'https://images.unsplash.com/photo-1544787210-22da78604374?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Dark Chocolate Cookie',
    category: 'sweets',
    price: 3.50,
    description: 'Rich dark chocolate with sea salt.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Chemex 6-Cup',
    category: 'equipment',
    price: 45.00,
    description: 'Iconic glass coffee maker.',
    image: 'https://images.unsplash.com/photo-1517088455889-bfa75135412c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'Brazil Santos',
    category: 'coffee',
    price: 15.00,
    roast: 'Medium',
    grind: 'Whole Bean',
    description: 'Nutty and chocolatey flavors.',
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    name: 'Cinnamon Roll',
    category: 'sweets',
    price: 4.25,
    description: 'Freshly baked with cream cheese icing.',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400',
  }
];

export const useProducts = (category = 'all') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const inventory = useCartStore(state => state.inventory);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      let filtered = products.map(p => ({
        ...p,
        stock: inventory[p.id] || 0
      }));
      
      if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
      }
      
      setData(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [category, inventory]);

  return { data, loading };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const inventory = useCartStore(state => state.inventory);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const p = products.find(item => item.id === id);
      if (p) {
        setProduct({
          ...p,
          stock: inventory[id] || 0
        });
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [id, inventory]);

  return { product, loading };
};
