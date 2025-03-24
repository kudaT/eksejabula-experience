
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface PaystackCheckoutProps {
  orderId: string;
  amount: number;
  email: string;
  onSuccess?: (reference: string) => void;
  onError?: (error: Error) => void;
}

const PaystackCheckout = ({ 
  orderId, 
  amount, 
  email, 
  onSuccess, 
  onError 
}: PaystackCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { toast } = useToast();

  const initiatePayment = async () => {
    try {
      setLoading(true);
      setPaymentStatus('processing');
      
      // Call our Supabase Edge Function to initiate payment
      const { data, error } = await supabase.functions.invoke('payment-initiate', {
        body: {
          orderId,
          amount,
          email,
          callbackUrl: `${window.location.origin}/checkout/success?order_id=${orderId}`
        }
      });

      if (error) {
        throw new Error(`Payment initialization failed: ${error.message}`);
      }

      if (!data?.success || !data?.data?.authorization_url) {
        throw new Error('Invalid payment response');
      }

      // Redirect to Paystack hosted payment page
      window.location.href = data.data.authorization_url;

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast({
        title: "Payment Error",
        description: error.message || "Could not initiate payment. Please try again.",
        variant: "destructive"
      });
      
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Display different content based on payment status
  const renderContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-medium">Processing your payment...</p>
            <p className="text-muted-foreground">Please do not close this page.</p>
          </div>
        );
        
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium">Payment Successful!</p>
            <p className="text-muted-foreground mb-4">Your order has been placed.</p>
            <Button
              onClick={() => navigate('/account/orders')}
              className="mt-2"
            >
              View My Orders
            </Button>
          </div>
        );
        
      case 'error':
        return (
          <div className="text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium">Payment Failed</p>
            <p className="text-muted-foreground mb-4">There was an issue processing your payment.</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/cart')}
              >
                Return to Cart
              </Button>
              <Button
                variant="default"
                onClick={initiatePayment}
              >
                Try Again
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <p className="text-lg font-medium mb-6">Total: R{amount.toFixed(2)}</p>
            <Button
              onClick={initiatePayment}
              disabled={loading}
              className="w-full py-6 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay with Paystack'
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Your payment is secure and encrypted.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Payment</h3>
      {renderContent()}
    </div>
  );
};

export default PaystackCheckout;
