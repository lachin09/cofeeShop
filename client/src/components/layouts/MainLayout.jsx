import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useCartStore } from '../../store/useCartStore';
import { t } from '../../services/localization';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../common/Button';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice, getLoyaltyPoints } = useCartStore();
  const [langVersion, setLangVersion] = useState(0);

  useEffect(() => {
    const handleLangChange = () => setLangVersion(v => v + 1);
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 shadow-2xl">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-900">
              <h2 className="text-xl font-semibold">{t('cart.title')}</h2>
              <Button variant="ghost" size="sm" onClick={() => setCartOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p>{t('cart.empty')}</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{item.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full">
                          <button 
                            className="p-1 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-l-full transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            className="p-1 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-r-full transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          className="text-zinc-400 hover:text-red-500 transition-colors"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-zinc-500">{t('cart.total')}</span>
                  <span className="text-2xl font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="bg-white dark:bg-zinc-950 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-900 mb-6 text-xs text-center">
                  {t('cart.points_earned', { points: getLoyaltyPoints() })}
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setCartOpen(false);
                    window.location.href = '/checkout';
                  }}
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple ShoppingBag icon since it's used in empty state
const ShoppingBag = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};
