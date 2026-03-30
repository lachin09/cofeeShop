import React from 'react';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/common/Button';
import { t } from '../services/localization';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const ProductPage = ({ id }) => {
  const { product, loading } = useProduct(id);
  const addItem = useCartStore(state => state.addItem);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />
        <div className="space-y-8">
          <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
          <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full" />
          <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h2 className="text-3xl font-bold">Product not found</h2>
      <Button variant="ghost" onClick={() => window.location.href = '/catalog'} className="mt-8">
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Catalog
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <Button 
        variant="ghost" 
        onClick={() => window.location.href = '/catalog'} 
        className="mb-12"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        {t('nav.catalog')}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
        <div className="space-y-8">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
                {product.category}
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-3xl font-medium text-zinc-600 dark:text-zinc-400">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 border-y border-zinc-100 dark:border-zinc-900 py-8">
              {product.roast && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    {t('product.roast')}
                  </h4>
                  <p className="text-lg font-medium">{product.roast}</p>
                </div>
              )}
              {product.grind && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    {t('product.grind')}
                  </h4>
                  <p className="text-lg font-medium">{product.grind}</p>
                </div>
              )}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  Stock
                </h4>
                <p className="text-lg font-medium">{t('product.stock', { count: product.stock })}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                size="lg" 
                className="w-full h-16 text-lg" 
                disabled={product.stock === 0}
                onClick={() => addItem(product)}
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                {t('product.add_to_cart')}
              </Button>
              <p className="text-center text-xs text-zinc-400">
                Free shipping on orders over $50
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col items-center text-center space-y-3">
              <ShieldCheck className="w-6 h-6 text-zinc-400" />
              <span className="text-xs font-medium uppercase tracking-widest">Quality Guaranteed</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Truck className="w-6 h-6 text-zinc-400" />
              <span className="text-xs font-medium uppercase tracking-widest">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <RefreshCcw className="w-6 h-6 text-zinc-400" />
              <span className="text-xs font-medium uppercase tracking-widest">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
