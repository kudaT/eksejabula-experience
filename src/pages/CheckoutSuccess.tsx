
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import MetaTags from '@/components/seo/MetaTags';

interface OrderDetails {
  id: string;
  status: string;
  total_price: number;
  created_at: string;
}

const CheckoutSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get order ID from URL query parameter
  const query = new URLSearchParams(location.search);
  const orderId = query.get('order_id');
  const reference = query.get('reference');
  
  useEffect(() => {
    // If no order ID is provided, redirect to home
    if (!orderId) {
      navigate('/');
      return;
    }
    
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id, status, total_price, created_at')
          .eq('id', orderId)
          .single();
        
        if (orderError) {
          throw new Error('Order not found');
        }
        
        setOrder(orderData);
        
        // If payment reference is present and order status is still pending,
        // verify the payment by calling verification endpoint
        if (reference && orderData.status === 'pending') {
          await supabase.functions.invoke('payment-verify', {
            body: { reference, orderId }
          });
          
          // Refresh order data to get updated status
          const { data: updatedOrder } = await supabase
            .from('orders')
            .select('id, status, total_price, created_at')
            .eq('id', orderId)
            .single();
            
          if (updatedOrder) {
            setOrder(updatedOrder);
          }
        }
        
        // Show success toast
        toast({
          title: "Order Confirmed",
          description: "Thank you for your purchase!",
        });
        
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast({
          title: "Error Verifying Payment",
          description: "There was an issue confirming your payment.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [orderId, reference, navigate, toast]);

  return (
    <Layout>
      <MetaTags
        title="Order Confirmation | Eksejabula"
        description="Thank you for your purchase at Eksejabula. Your order has been confirmed."
        type="website"
      />
      
      <div className="container max-w-4xl py-16 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
              <h2 className="text-2xl font-bold mb-2">Confirming Your Order</h2>
              <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
            </div>
          ) : order ? (
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
              <p className="text-xl mb-6">Your order has been confirmed</p>
              
              <div className="bg-gray-50 rounded-md p-4 w-full mb-6">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-medium">{orderId?.substring(0, 8).toUpperCase()}</p>
                
                <div className="my-3 border-t border-gray-200"></div>
                
                <p className="text-sm text-muted-foreground mb-1">Order Status</p>
                <p className="font-medium capitalize">{order.status}</p>
                
                <div className="my-3 border-t border-gray-200"></div>
                
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="font-medium">R{parseFloat(order.total_price).toFixed(2)}</p>
              </div>
              
              <p className="text-muted-foreground mb-6">
                A confirmation email has been sent to your email address.
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/shop')}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
                <Button onClick={() => navigate('/account/orders')}>
                  View Order
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
              <p className="mb-6">We couldn't find the order you're looking for.</p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;
