
import { createClient } from '@supabase/supabase-js';

// Public facing Supabase URL and anon key - safe to include in client code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Types for your Supabase database
export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  role: 'customer' | 'admin';
  avatar_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: 'jersey' | 'beanie' | 'art';
  image_urls: string[];
  customisable: boolean;
  created_at: string;
};

export type ProductCustomisation = {
  id: string;
  product_id: string;
  label: string;
  price: number;
};

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'paid' | 'cancelled' | 'shipped';
  total_price: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  custom_text: string | null;
  custom_number: string | null;
  customisation_price: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  cover_image: string | null;
  published_at: string;
};

export const supabase = createClient<{
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      product_customisations: {
        Row: ProductCustomisation;
        Insert: Omit<ProductCustomisation, 'id'>;
        Update: Partial<Omit<ProductCustomisation, 'id'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id'>;
        Update: Partial<Omit<OrderItem, 'id'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
    };
    Functions: {
      promote_to_admin: {
        Args: { user_id: string };
        Returns: void;
      };
      create_order: {
        Args: { 
          p_user_id: string; 
          p_items: string; // JSON string of order items
        };
        Returns: string; // Returns the order ID
      };
    };
  };
}>(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  return supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
};

export const signInWithPhone = async (phone: string, password: string) => {
  return supabase.auth.signInWithPassword({ phone, password });
};

export const signUpWithPhone = async (phone: string, password: string, fullName: string) => {
  return supabase.auth.signUp({ 
    phone, 
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
};

export const signInWithOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
  return supabase.auth.signInWithOAuth({ provider });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return supabase.auth.getUser();
};

export const getCurrentSession = async () => {
  return supabase.auth.getSession();
};

// Products helpers
export const getAllProducts = async () => {
  return supabase
    .from('products')
    .select('*, product_customisations(*)');
};

export const getProductById = async (id: string) => {
  return supabase
    .from('products')
    .select('*, product_customisations(*)')
    .eq('id', id)
    .single();
};

export const getProductsByCategory = async (category: Product['category']) => {
  return supabase
    .from('products')
    .select('*, product_customisations(*)')
    .eq('category', category);
};

// Orders helpers
export const createOrder = async (userId: string, items: { 
  product_id: string;
  quantity: number;
  custom_text?: string;
  custom_number?: string;
  customisation_price?: number;
}[]) => {
  return supabase.rpc('create_order', {
    p_user_id: userId,
    p_items: JSON.stringify(items),
  });
};

export const getUserOrders = async (userId: string) => {
  return supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

// Blog helpers
export const getAllPublishedBlogPosts = async () => {
  return supabase
    .from('blog_posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });
};

export const getBlogPostBySlug = async (slug: string) => {
  return supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
};

// Profile helpers
export const getUserProfile = async (userId: string) => {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
};

export const updateUserProfile = async (userId: string, updates: Partial<Profile>) => {
  return supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
};
