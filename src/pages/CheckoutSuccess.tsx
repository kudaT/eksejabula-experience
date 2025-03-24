import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MetaTags from '@/components/seo/MetaTags';
import { formatCurrency } from '@/lib/utils';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const reference = searchParams.get('reference');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        
        if (!reference && !sessionId) {
          setError('Invalid payment reference');
          setLoading(false);
          return;
        }
        
        // Verify the payment with our backend
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { 
            reference,
            sessionId
          }
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (!data.success) {
          throw new Error(data.message || 'Payment verification failed');
        }
        
        setOrder(data.order);
        
        // Show success toast
        toast({
          title: 'Payment Successful',
          description: 'Your order has been confirmed!',
        });
        
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(err.message || 'Failed to verify payment');
        
        toast({
          variant: 'destructive',
          title: 'Payment Verification Failed',
          description: err.message || 'There was a problem verifying your payment',
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [reference, sessionId, toast]);
  
  const handleContinueShopping = () => {
    navigate('/shop');
  };
  
  const handleViewOrder = () => {
    navigate('/account?tab=orders');
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <MetaTags 
          title="Processing Payment | Eksejabula"
          description="We're processing your payment, please wait..."
        />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Processing Payment</CardTitle>
            <CardDescription>Please wait while we verify your payment</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-10">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <MetaTags 
          title="Payment Failed | Eksejabula"
          description="There was an issue with your payment"
        />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Payment Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>Please try again or contact our support team for assistance.</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <MetaTags 
        title="Order Confirmed | Eksejabula"
        description="Your order has been successfully placed"
      />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-success">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {order && (
            <>
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Order Summary</h3>
                <div className="rounded-md border">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b p-3 last:border-0">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <div className="h-12 w-12 overflow-hidden rounded-md">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between pt-2">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">{formatCurrency(String(order.total))}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleContinueShopping}>Continue Shopping</Button>
          <Button onClick={handleViewOrder}>View Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
