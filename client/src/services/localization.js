const translations = {
  en: {
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.cart': 'Cart',
    'hero.title': 'The Art of Coffee',
    'hero.subtitle': 'Meticulously sourced beans, expertly roasted for the perfect cup.',
    'catalog.title': 'Discover our collection',
    'catalog.filter.all': 'All',
    'catalog.filter.coffee': 'Coffee',
    'catalog.filter.equipment': 'Equipment',
    'catalog.filter.sweets': 'Sweets',
    'product.add_to_cart': 'Add to Cart',
    'product.stock': 'In stock: {count}',
    'product.out_of_stock': 'Out of stock',
    'product.roast': 'Roast Level',
    'product.grind': 'Grind Type',
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.points_earned': 'You will earn {points} bonus points',
    'checkout.title': 'Delivery Details',
    'checkout.delivery_options': 'Delivery options',
    'checkout.name': 'Full Name',
    'checkout.address': 'Shipping Address',
    'checkout.phone': 'Phone Number',
    'checkout.pay': 'Complete Order',
    'success.title': 'Thank You!',
    'success.message': 'Your order has been placed successfully.',
    'success.order_id': 'Order ID: #{id}',
    'success.continue': 'Continue Shopping',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.catalog': 'Каталог',
    'nav.cart': 'Кошик',
    'hero.title': 'Мистецтво Кави',
    'hero.subtitle': 'Ретельно підібрані зерна, майстерно обсмажені для ідеальної чашки.',
    'catalog.title': 'Відкрийте нашу колекцію',
    'catalog.filter.all': 'Все',
    'catalog.filter.coffee': 'Кава',
    'catalog.filter.equipment': 'Обладнання',
    'catalog.filter.sweets': 'Солодощі',
    'product.add_to_cart': 'Додати до кошика',
    'product.stock': 'В наявності: {count}',
    'product.out_of_stock': 'Немає в наявності',
    'product.roast': 'Рівень обсмаження',
    'product.grind': 'Тип помелу',
    'cart.title': 'Ваш кошик',
    'cart.empty': 'Ваш кошик порожній',
    'cart.total': 'Разом',
    'cart.checkout': 'Оформити замовлення',
    'cart.points_earned': 'Ви отримаєте {points} бонусних балів',
    'checkout.title': 'Деталі доставки',
    'checkout.delivery_options': 'Варіанти доставки',
    'checkout.name': 'Повне ім\'я',
    'checkout.address': 'Адреса доставки',
    'checkout.phone': 'Номер телефону',
    'checkout.pay': 'Завершити замовлення',
    'success.title': 'Дякуємо!',
    'success.message': 'Ваше замовлення успішно оформлено.',
    'success.order_id': 'Номер замовлення: #{id}',
    'success.continue': 'Продовжити покупки',
  }
};

let currentLang = 'en';

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLang = lang;
    window.dispatchEvent(new Event('languageChange'));
  }
};

export const getLanguage = () => currentLang;

export const t = (key, params = {}) => {
  let text = translations[currentLang][key] || key;
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
};
