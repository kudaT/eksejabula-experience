
import { createClient } from '@supabase/supabase-js';

// Use the same values as in src/integrations/supabase/client.ts
const supabaseUrl = "https://iqwbqadqqkdndxdlbwrr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2JxYWRxcWtkbmR4ZGxid3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzM5NTAsImV4cCI6MjA1ODQwOTk1MH0.LgyhHWzSbSK-QnRLkjrL5zRSjeF_182x9JBQnUkPScc";

// Profile Types
export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
  role: 'customer' | 'admin';
  avatar_url: string | null;
  created_at: string;
};

// Product Types
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: 'jersey' | 'beanie' | 'art';
  image_urls: string[];
  customisable: boolean;
  created_at: string;
  stock_quantity: number;
  is_available: boolean;
  average_rating: number | null;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  size: string;
  stock_quantity: number;
  price_override: number | null;
  created_at: string;
};

export type ProductCustomisation = {
  id: string;
  product_id: string;
  label: string;
  price: number;
};

export type ProductReview = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
};

// Cart Types
export type Cart = {
  id: string;
  user_id: string;
  discount_code: string | null;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  custom_text: string | null;
  custom_number: string | null;
  created_at: string;
  updated_at: string;
};

// Wishlist Types
export type Wishlist = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

// Order Types
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

export type OrderEvent = {
  id: string;
  order_id: string;
  status: string;
  notes: string | null;
  created_by: string | null;
  created_at: string;
};

// Shipping Address Types
export type ShippingAddress = {
  id: string;
  user_id: string | null;
  order_id: string | null;
  full_name: string;
  phone_number: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
};

// Marketing Types
export type DiscountCode = {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  usage_limit: number | null;
  used_count: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  responded: boolean;
  created_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  confirmed: boolean;
  created_at: string;
};

// Blog Post Types
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  cover_image: string | null;
  published_at: string;
};

// Admin Types
export type AdminLog = {
  id: string;
  admin_id: string;
  action_type: string;
  target_table: string;
  target_id: string | null;
  details: any;
  created_at: string;
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
        Insert: Omit<Product, 'id' | 'created_at' | 'is_available' | 'average_rating'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'is_available' | 'average_rating'>>;
      };
      product_variants: {
        Row: ProductVariant;
        Insert: Omit<ProductVariant, 'id' | 'created_at'>;
        Update: Partial<Omit<ProductVariant, 'id' | 'created_at'>>;
      };
      product_customisations: {
        Row: ProductCustomisation;
        Insert: Omit<ProductCustomisation, 'id'>;
        Update: Partial<Omit<ProductCustomisation, 'id'>>;
      };
      product_reviews: {
        Row: ProductReview;
        Insert: Omit<ProductReview, 'id' | 'created_at'>;
        Update: Partial<Omit<ProductReview, 'id' | 'created_at'>>;
      };
      carts: {
        Row: Cart;
        Insert: Omit<Cart, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Cart, 'id' | 'created_at' | 'updated_at'>>;
      };
      cart_items: {
        Row: CartItem;
        Insert: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CartItem, 'id' | 'created_at' | 'updated_at'>>;
      };
      wishlists: {
        Row: Wishlist;
        Insert: Omit<Wishlist, 'id' | 'created_at'>;
        Update: Partial<Omit<Wishlist, 'id' | 'created_at'>>;
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
      order_events: {
        Row: OrderEvent;
        Insert: Omit<OrderEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderEvent, 'id' | 'created_at'>>;
      };
      shipping_addresses: {
        Row: ShippingAddress;
        Insert: Omit<ShippingAddress, 'id' | 'created_at'>;
        Update: Partial<Omit<ShippingAddress, 'id' | 'created_at'>>;
      };
      discount_codes: {
        Row: DiscountCode;
        Insert: Omit<DiscountCode, 'id' | 'created_at' | 'used_count'>;
        Update: Partial<Omit<DiscountCode, 'id' | 'created_at'>>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'responded'>;
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>;
      };
      subscribers: {
        Row: Subscriber;
        Insert: Omit<Subscriber, 'id' | 'created_at' | 'confirmed'>;
        Update: Partial<Omit<Subscriber, 'id' | 'created_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
      admin_logs: {
        Row: AdminLog;
        Insert: Omit<AdminLog, 'id' | 'created_at'>;
        Update: Partial<Omit<AdminLog, 'id' | 'created_at'>>;
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
          p_shipping_address?: string; // Optional JSON string of shipping address
        };
        Returns: string; // Returns the order ID
      };
      update_order_status: {
        Args: { 
          p_order_id: string;
          p_status: 'pending' | 'paid' | 'cancelled' | 'shipped';
          p_notes?: string;
        };
        Returns: void;
      };
      does_user_exist_with_email: {
        Args: { email: string };
        Returns: boolean;
      };
      does_user_exist_with_phone: {
        Args: { phone: string };
        Returns: boolean;
      };
    };
  };
}>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'supabase.auth.token',
  }
});

// ----- Authentication helpers -----
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

// ----- Profile helpers -----
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

// ----- Products helpers -----
export const getAllProducts = async () => {
  return supabase
    .from('products')
    .select('*, product_customisations(*), product_variants(*)');
};

export const getProductById = async (id: string) => {
  return supabase
    .from('products')
    .select('*, product_customisations(*), product_variants(*), product_reviews(*)')
    .eq('id', id)
    .single();
};

export const getProductsByCategory = async (category: Product['category']) => {
  return supabase
    .from('products')
    .select('*, product_customisations(*), product_variants(*)')
    .eq('category', category);
};

// ----- Product Variants helpers -----
export const getProductVariants = async (productId: string) => {
  return supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId);
};

export const createProductVariant = async (variant: Omit<ProductVariant, 'id' | 'created_at'>) => {
  return supabase
    .from('product_variants')
    .insert(variant);
};

export const updateProductVariant = async (id: string, updates: Partial<Omit<ProductVariant, 'id' | 'created_at'>>) => {
  return supabase
    .from('product_variants')
    .update(updates)
    .eq('id', id);
};

export const deleteProductVariant = async (id: string) => {
  return supabase
    .from('product_variants')
    .delete()
    .eq('id', id);
};

// ----- Product Reviews helpers -----
export const getProductReviews = async (productId: string) => {
  return supabase
    .from('product_reviews')
    .select('*, profiles(full_name, avatar_url)')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
};

export const getUserReviews = async (userId: string) => {
  return supabase
    .from('product_reviews')
    .select('*, products(name, image_urls)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const createReview = async (review: Omit<ProductReview, 'id' | 'created_at'>) => {
  return supabase
    .from('product_reviews')
    .insert(review);
};

export const updateReview = async (id: string, updates: Partial<Omit<ProductReview, 'id' | 'created_at'>>) => {
  return supabase
    .from('product_reviews')
    .update(updates)
    .eq('id', id);
};

export const deleteReview = async (id: string) => {
  return supabase
    .from('product_reviews')
    .delete()
    .eq('id', id);
};

// ----- Wishlist helpers -----
export const getUserWishlist = async (userId: string) => {
  return supabase
    .from('wishlists')
    .select('*, products(*)')
    .eq('user_id', userId);
};

export const addToWishlist = async (userId: string, productId: string) => {
  return supabase
    .from('wishlists')
    .insert({ user_id: userId, product_id: productId });
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  return supabase
    .from('wishlists')
    .delete()
    .match({ user_id: userId, product_id: productId });
};

export const isProductInWishlist = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('id')
    .match({ user_id: userId, product_id: productId });
  
  return { exists: data && data.length > 0, error };
};

// ----- Cart helpers -----
export const getUserCart = async (userId: string) => {
  // Get or create cart for user
  let { data: cart, error } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code === 'PGRST116') {
    // Cart doesn't exist, create one
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();
      
    if (createError) throw createError;
    cart = newCart;
  } else if (error) {
    throw error;
  }
  
  // Get cart items
  const { data: cartItems, error: itemsError } = await supabase
    .from('cart_items')
    .select(`
      *,
      products(*),
      product_variants(*)
    `)
    .eq('cart_id', cart.id);
    
  if (itemsError) throw itemsError;
  
  return { cart, cartItems };
};

export const addToCart = async (
  cartId: string, 
  productId: string, 
  quantity: number,
  variantId?: string,
  customText?: string,
  customNumber?: string
) => {
  // Check if item already exists in cart
  const { data: existingItems } = await supabase
    .from('cart_items')
    .select('*')
    .match({ 
      cart_id: cartId, 
      product_id: productId,
      ...(variantId ? { variant_id: variantId } : {})
    });
  
  if (existingItems && existingItems.length > 0) {
    // Update existing item
    return supabase
      .from('cart_items')
      .update({ 
        quantity: existingItems[0].quantity + quantity,
        ...(customText !== undefined ? { custom_text: customText } : {}),
        ...(customNumber !== undefined ? { custom_number: customNumber } : {})
      })
      .eq('id', existingItems[0].id);
  }
  
  // Add new item
  return supabase
    .from('cart_items')
    .insert({
      cart_id: cartId,
      product_id: productId,
      quantity,
      ...(variantId ? { variant_id: variantId } : {}),
      ...(customText ? { custom_text: customText } : {}),
      ...(customNumber ? { custom_number: customNumber } : {})
    });
};

export const updateCartItem = async (id: string, updates: Partial<Omit<CartItem, 'id' | 'created_at' | 'updated_at'>>) => {
  return supabase
    .from('cart_items')
    .update(updates)
    .eq('id', id);
};

export const removeCartItem = async (id: string) => {
  return supabase
    .from('cart_items')
    .delete()
    .eq('id', id);
};

export const clearCart = async (cartId: string) => {
  return supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId);
};

// ----- Order helpers -----
export const createOrder = async (
  userId: string, 
  items: Array<{
    product_id: string;
    quantity: number;
    custom_text?: string;
    custom_number?: string;
    customisation_price?: number;
  }>,
  shippingAddress?: {
    full_name: string;
    phone_number: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    province: string;
    postal_code: string;
  }
) => {
  return supabase.rpc('create_order', {
    p_user_id: userId,
    p_items: JSON.stringify(items),
    ...(shippingAddress ? { p_shipping_address: JSON.stringify(shippingAddress) } : {})
  });
};

export const getUserOrders = async (userId: string) => {
  return supabase
    .from('orders')
    .select(`
      *,
      order_items(*, products(*)),
      shipping_addresses(*),
      order_events(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

export const getOrderById = async (orderId: string) => {
  return supabase
    .from('orders')
    .select(`
      *,
      order_items(*, products(*)),
      shipping_addresses(*),
      order_events(*)
    `)
    .eq('id', orderId)
    .single();
};

export const updateOrderStatus = async (
  orderId: string, 
  status: 'pending' | 'paid' | 'cancelled' | 'shipped',
  notes?: string
) => {
  return supabase.rpc('update_order_status', {
    p_order_id: orderId,
    p_status: status,
    ...(notes ? { p_notes: notes } : {})
  });
};

// ----- Shipping Address helpers -----
export const getUserAddresses = async (userId: string) => {
  return supabase
    .from('shipping_addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });
};

export const createAddress = async (address: Omit<ShippingAddress, 'id' | 'created_at'>) => {
  // If setting as default, unset any existing default
  if (address.is_default && address.user_id) {
    await supabase
      .from('shipping_addresses')
      .update({ is_default: false })
      .eq('user_id', address.user_id)
      .eq('is_default', true);
  }
  
  return supabase
    .from('shipping_addresses')
    .insert(address);
};

export const updateAddress = async (id: string, updates: Partial<Omit<ShippingAddress, 'id' | 'created_at'>>) => {
  // If setting as default, unset any existing default
  if (updates.is_default && updates.user_id) {
    await supabase
      .from('shipping_addresses')
      .update({ is_default: false })
      .eq('user_id', updates.user_id)
      .eq('is_default', true)
      .neq('id', id);
  }
  
  return supabase
    .from('shipping_addresses')
    .update(updates)
    .eq('id', id);
};

export const deleteAddress = async (id: string) => {
  return supabase
    .from('shipping_addresses')
    .delete()
    .eq('id', id);
};

// ----- Discount Code helpers -----
export const getActiveDiscountCodes = async () => {
  return supabase
    .from('discount_codes')
    .select('*')
    .eq('active', true)
    .is('expires_at', null)
    .or('expires_at.gt.now()');
};

export const getDiscountByCode = async (code: string) => {
  return supabase
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .eq('active', true)
    .or('expires_at.is.null,expires_at.gt.now()')
    .single();
};

// ----- Marketing helpers -----
export const submitContactForm = async (name: string, email: string, message: string) => {
  return supabase
    .from('contact_messages')
    .insert({ name, email, message });
};

export const subscribeToNewsletter = async (email: string) => {
  return supabase
    .from('subscribers')
    .insert({ email });
};

// ----- Blog helpers -----
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

// ----- Admin helpers -----
export const getAdminLogs = async (limit = 50) => {
  return supabase
    .from('admin_logs')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false })
    .limit(limit);
};

export const getAdminLogsByTable = async (tableName: string, limit = 50) => {
  return supabase
    .from('admin_logs')
    .select('*, profiles(full_name)')
    .eq('target_table', tableName)
    .order('created_at', { ascending: false })
    .limit(limit);
};

// ----- Storage helpers -----
export const uploadProductImage = async (file: File, productId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, {
      upsert: true,
    });
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(data.path);
    
  return publicUrl;
};

export const uploadBlogImage = async (file: File, postId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${postId}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('blog')
    .upload(fileName, file, {
      upsert: true,
    });
    
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('blog')
    .getPublicUrl(data.path);
    
  return publicUrl;
};

export const deleteStorageFile = async (bucket: 'products' | 'models' | 'blog', path: string) => {
  return supabase.storage
    .from(bucket)
    .remove([path]);
};
