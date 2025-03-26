
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/context/AuthContext";
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
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBlog from "./pages/admin/AdminBlog";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Unauthorized from "./pages/Unauthorized";
import UserDashboard from "./pages/UserDashboard";

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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Analytics gaId="G-XXXXXXXXXX" plausibleDomain="eksejabula.com" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/los-vega" element={<Layout><LosVega /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
            
            {/* User Dashboard - Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><UserDashboard /></Layout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>
            
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
