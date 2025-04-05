
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import Analytics from "@/components/analytics/Analytics";
import Index from "./pages/Index";
import LosVega from "./pages/LosVega";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminExtended from "./pages/admin/AdminExtended";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBlog from "./pages/admin/AdminBlog";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Unauthorized from "./pages/Unauthorized";
import UserDashboard from "./pages/UserDashboard";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SizeGuide from "./pages/SizeGuide";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Analytics gaId="G-XXXXXXXXXX" plausibleDomain="eksejabula.com" />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/shop" element={<Layout><Shop /></Layout>} />
              <Route path="/los-vega" element={<Layout><LosVega /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
              <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              
              {/* Help & Information Pages */}
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
              <Route path="/returns" element={<Layout><Returns /></Layout>} />
              <Route path="/size-guide" element={<Layout><SizeGuide /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
              <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth-callback" element={<AuthCallback />} />
              <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
              
              {/* User Dashboard - Protected for customers */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Layout><UserDashboard /></Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes - Protected for admin role only */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']} redirectTo="/unauthorized">
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="extended" element={<AdminExtended />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="blog" element={<AdminBlog />} />
              </Route>

              {/* Conditional redirects */}
              <Route path="/account" element={
                <ProtectedRoute>
                  {/* This will automatically redirect based on user role */}
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
