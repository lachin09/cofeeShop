import React, { useEffect } from 'react';
import { Button } from '../components/common/Button';
import { t } from '../services/localization';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SuccessPage = ({ orderId }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="relative mx-auto">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150" />
          <div className="relative w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/20">
            <CheckCircle2 className="w-16 h-16" />
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <h1 className="text-5xl font-bold tracking-tight">{t('success.title')}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
            {t('success.message')}
          </p>
          <div className="inline-block px-6 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-bold uppercase tracking-widest text-zinc-500 mt-4">
            {t('success.order_id', { id: orderId })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/catalog'}>
            {t('success.continue')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
