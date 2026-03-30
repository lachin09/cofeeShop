import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { supabase } from '../services/supabase';

export const useProducts = (categorySlug = 'all') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inventory = useCartStore(state => state.inventory);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            categories (
              slug
            )
          `);

        if (categorySlug !== 'all') {
          query = query.eq('categories.slug', categorySlug);
        }

        const { data: products, error } = await query;

        if (error) throw error;

        const transformedProducts = products
          .filter(p => categorySlug === 'all' || p.categories?.slug === categorySlug)
          .map(p => ({
            id: p.id,
            name: p.name,
            category: p.categories?.slug || 'other',
            price: parseFloat(p.price),
            roast: p.roast_level,
            grind: p.grind_type,
            description: p.description,
            image: p.image_url,
            stock: p.stock_quantity
          }));

        setData(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, inventory]);

  return { data, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data: p, error } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              slug
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        if (p) {
          setProduct({
            id: p.id,
            name: p.name,
            category: p.categories?.slug || 'other',
            price: parseFloat(p.price),
            roast: p.roast_level,
            grind: p.grind_type,
            description: p.description,
            image: p.image_url,
            stock: p.stock_quantity
          });
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
