import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept clicks on same-origin links to handle routing without page reload
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        window.history.pushState({}, '', anchor.href);
        handleLocationChange();
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const renderPage = () => {
    if (path === '/' || path === '/index.html') return <LandingPage />;
    if (path === '/catalog') return <CatalogPage />;
    if (path === '/checkout') return <CheckoutPage />;
    if (path.startsWith('/product/')) {
      const id = path.split('/').pop();
      return <ProductPage id={id} />;
    }
    if (path.startsWith('/success/')) {
      const orderId = path.split('/').pop();
      return <SuccessPage orderId={orderId} />;
    }
    return <LandingPage />;
  };

  return (
    <MainLayout>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
