import React from 'react';
import { Button } from '../components/common/Button';
import { Card, CardContent, CardFooter } from '../components/common/Card';
import { t } from '../services/localization';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const LandingPage = () => {
  const { data: products, loading } = useProducts('coffee');
  const addItem = useCartStore(state => state.addItem);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => window.location.href = '/catalog'}>
              {t('nav.catalog')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">{t('catalog.title')}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl">
              Carefully curated beans from around the world, roasted in small batches to preserve their unique profiles.
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/catalog'}>
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-3xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
            ))
          ) : (
            featuredProducts.map(product => (
              <Card key={product.id} className="group cursor-pointer" onClick={() => window.location.href = `/product/${product.id}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardContent>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-widest">{product.category}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                  >
                    <ShoppingBag className="mr-2 w-4 h-4" />
                    {t('product.add_to_cart')}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
