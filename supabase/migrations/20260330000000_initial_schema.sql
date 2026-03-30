-- Supabase Migration Script for Coffee Shop Application
-- This script sets up the necessary tables, security policies, and mock data.

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to categories"
    ON public.categories FOR SELECT
    USING (true);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    stock_quantity INTEGER DEFAULT 0 NOT NULL,
    roast_level TEXT, -- For coffee category
    grind_type TEXT, -- For coffee category
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to products"
    ON public.products FOR SELECT
    USING (true);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow public to create orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- 4. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own order items"
    ON public.order_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.orders
        WHERE orders.id = order_items.order_id
        AND (orders.user_id = auth.uid() OR orders.customer_email = auth.jwt()->>'email')
    ));

CREATE POLICY "Allow public to create order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

-- 5. Helper Function to update stock on order
CREATE OR REPLACE FUNCTION public.handle_new_order_item()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_item_created
    AFTER INSERT ON public.order_items
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_order_item();

-- 6. Seed Mock Data
DO $$
DECLARE
    coffee_cat_id UUID;
    equip_cat_id UUID;
    sweet_cat_id UUID;
BEGIN
    -- Insert Categories
    INSERT INTO public.categories (name, slug)
    VALUES ('Coffee', 'coffee'), ('Equipment', 'equipment'), ('Sweets', 'sweets')
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO coffee_cat_id;

    SELECT id INTO equip_cat_id FROM public.categories WHERE slug = 'equipment';
    SELECT id INTO sweet_cat_id FROM public.categories WHERE slug = 'sweets';

    -- Insert Products
    INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity, roast_level, grind_type)
    VALUES
    ('Ethiopia Yirgacheffe', 'Floral notes with a citrus finish.', 18.50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', coffee_cat_id, 10, 'Light', 'Whole Bean'),
    ('Brazil Santos', 'Nutty and chocolatey flavors.', 15.00, 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=400', coffee_cat_id, 15, 'Medium', 'Whole Bean'),
    ('V60 Coffee Dripper', 'Perfect for pour-over coffee.', 25.00, 'https://images.unsplash.com/photo-1544787210-22da78604374?auto=format&fit=crop&q=80&w=400', equip_cat_id, 5, NULL, NULL),
    ('Chemex 6-Cup', 'Iconic glass coffee maker.', 45.00, 'https://images.unsplash.com/photo-1517088455889-bfa75135412c?auto=format&fit=crop&q=80&w=400', equip_cat_id, 8, NULL, NULL),
    ('Dark Chocolate Cookie', 'Rich dark chocolate with sea salt.', 3.50, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400', sweet_cat_id, 20, NULL, NULL),
    ('Cinnamon Roll', 'Freshly baked with cream cheese icing.', 4.25, 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=400', sweet_cat_id, 12, NULL, NULL);

END $$;
