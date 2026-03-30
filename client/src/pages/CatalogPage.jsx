import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/common/Button';
import { Card, CardContent, CardFooter } from '../components/common/Card';
import { t } from '../services/localization';
import { ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: products, loading } = useProducts(activeCategory);
  const addItem = useCartStore(state => state.addItem);

  const categories = ['all', 'coffee', 'equipment', 'sweets'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">{t('nav.catalog')}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl">
            {t('catalog.title')}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-white dark:bg-zinc-800 shadow-sm text-black dark:text-white' 
                  : 'text-zinc-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {t(`catalog.filter.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
          ))
        ) : (
          products.map(product => (
            <Card key={product.id} className="group flex flex-col cursor-pointer" onClick={() => window.location.href = `/product/${product.id}`}>
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>
              </div>
              <CardContent className="flex-1">
                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-medium leading-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  disabled={product.stock === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product);
                  }}
                >
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  {product.stock > 0 ? t('product.add_to_cart') : t('product.out_of_stock')}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
