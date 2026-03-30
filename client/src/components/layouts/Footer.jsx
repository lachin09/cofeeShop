import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold tracking-tight mb-6">COFFEE.</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Experience the finest specialty coffee, sustainably sourced and roasted to perfection. 
              Delivered fresh to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="/catalog" className="hover:text-black dark:hover:text-white transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Subscriptions</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Wholesale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 uppercase tracking-widest">
          <p>© 2026 COFFEE CO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
