import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/common/Button';
import { t } from '../services/localization';
import { ShoppingBag, CreditCard, Truck, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, checkout } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await checkout(formData);
    if (result.success) {
      window.location.href = `/success/${result.orderId}`;
    } else {
      alert(`Checkout failed: ${result.error}`);
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-zinc-300" />
        </div>
        <h2 className="text-3xl font-bold">{t('cart.empty')}</h2>
        <Button onClick={() => window.location.href = '/catalog'}>
          {t('nav.catalog')}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Form Section */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{t('checkout.title')}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Please provide your shipping information.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                  {t('checkout.name')}
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                  {t('checkout.address')}
                </label>
                <textarea
                  required
                  name="address"
                  rows="3"
                  placeholder="123 Coffee St, Bean City"
                  className="w-full p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">
                  {t('checkout.phone')}
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">{t('checkout.delivery_options')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900 flex items-center space-x-4">
                  <Truck className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-xs text-zinc-500">2-4 business days • Free</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 opacity-50 cursor-not-allowed flex items-center space-x-4">
                  <Truck className="w-5 h-5 text-zinc-400" />
                  <div>
                    <p className="font-medium">Express</p>
                    <p className="text-xs text-zinc-500">Next day • $15.00</p>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full h-16 text-lg" disabled={loading} type="submit">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <CreditCard className="mr-2 w-5 h-5" />
                  {t('checkout.pay')}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="lg:sticky lg:top-32 h-fit bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 lg:p-12 space-y-8">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-2xl font-bold pt-4">
              <span>{t('cart.total')}</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
