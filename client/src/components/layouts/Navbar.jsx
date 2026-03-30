import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { Button } from '../common/Button';
import { useCartStore } from '../../store/useCartStore';
import { t, getLanguage, setLanguage } from '../../services/localization';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState(getLanguage());
  const cartItemsCount = useCartStore(state => state.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  const setCartOpen = useCartStore(state => state.setCartOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleLangChange = () => setCurrentLang(getLanguage());
    window.addEventListener('languageChange', handleLangChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('languageChange', handleLangChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'uk' : 'en';
    setLanguage(newLang);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-zinc-200/20 dark:border-zinc-800/20 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold tracking-tight dark:text-white">
          COFFEE.
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t('nav.home')}
          </a>
          <a href="/catalog" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t('nav.catalog')}
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="p-2">
            <Globe className="w-5 h-5" />
            <span className="ml-2 uppercase text-xs">{currentLang}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="p-2">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white dark:bg-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </Button>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
