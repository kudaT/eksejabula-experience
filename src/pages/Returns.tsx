
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Returns & Refunds | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Returns & Refunds</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          We want you to be completely satisfied with your purchase. If you're not, we're here to help.
        </p>
        
        <Tabs defaultValue="returns" className="w-full mb-8">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="returns">Return Policy</TabsTrigger>
            <TabsTrigger value="refunds">Refund Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="returns">
            <Card>
              <CardHeader>
                <CardTitle>Our Return Policy</CardTitle>
                <CardDescription>Guidelines for returning items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Eligibility</h3>
                  <p className="text-muted-foreground">
                    Items may be returned within 30 days of purchase if they meet the following criteria:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Unworn and unwashed</li>
                    <li>Original tags attached</li>
                    <li>In original packaging</li>
                    <li>Free from signs of wear, tear, or damage</li>
                    <li>Not on final sale or marked as non-returnable</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Non-Returnable Items</h3>
                  <p className="text-muted-foreground">
                    The following items cannot be returned:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Items marked as "Final Sale"</li>
                    <li>Custom or personalized products</li>
                    <li>Digital downloads or gift cards</li>
                    <li>Items with removed tags or altered in any way</li>
                    <li>Intimates and swimwear for hygiene reasons</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Return Shipping</h3>
                  <p className="text-muted-foreground">
                    Customers are responsible for return shipping costs unless the return is due to a defect, damage, or our error. We recommend using a trackable shipping service as we cannot be responsible for items lost in transit.
                  </p>
                </div>
                
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    All return requests must be initiated through your account or by contacting customer service before sending any items back.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="refunds">
            <Card>
              <CardHeader>
                <CardTitle>Refund Process</CardTitle>
                <CardDescription>How and when refunds are issued</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Processing Time</h3>
                  <p className="text-muted-foreground">
                    Once we receive your returned item(s), we will inspect them to ensure they meet our return policy requirements. Refunds are typically processed within 5-7 business days after inspection.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Refund Methods</h3>
                  <p className="text-muted-foreground">
                    Refunds will be issued to the original payment method used for the purchase:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Credit/Debit Card: 3-5 business days to appear on your statement</li>
                    <li>PayPal: 1-3 business days</li>
                    <li>Store Credit: Immediately available in your account</li>
                    <li>Bank Transfer: 5-7 business days</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Partial Refunds</h3>
                  <p className="text-muted-foreground">
                    We may issue partial refunds in the following cases:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Items returned outside the 30-day window but within 45 days</li>
                    <li>Items with signs of light wear or missing packaging</li>
                    <li>Items on sale after purchase (only the difference will be refunded)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Exchanges</h3>
                  <p className="text-muted-foreground">
                    If you need a different size or color, we recommend placing a new order and returning the original item for a refund to ensure you get the replacement item as quickly as possible.
                  </p>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Tracking Your Refund</AlertTitle>
                  <AlertDescription>
                    You will receive an email notification once your refund has been processed. If you haven't received your refund within the expected timeframe, please check your spam folder or contact our customer service team.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Return an Item</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <strong>Start a Return</strong>
                <p className="text-muted-foreground">Log in to your account and find the order you want to return. Click on "Start Return" or contact our customer service team.</p>
              </li>
              <li>
                <strong>Select Items & Reason</strong>
                <p className="text-muted-foreground">Choose which items you want to return and select a reason for the return.</p>
              </li>
              <li>
                <strong>Print Return Label</strong>
                <p className="text-muted-foreground">Print the return shipping label (if provided) or use your preferred shipping method.</p>
              </li>
              <li>
                <strong>Package Your Return</strong>
                <p className="text-muted-foreground">Place the items back in their original packaging if possible, including all tags and accessories.</p>
              </li>
              <li>
                <strong>Ship Your Return</strong>
                <p className="text-muted-foreground">Drop off your package at the designated shipping carrier.</p>
              </li>
              <li>
                <strong>Track Your Refund</strong>
                <p className="text-muted-foreground">You will receive email updates as your return is processed and refunded.</p>
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <p className="text-center text-muted-foreground">
          Have questions about returns or refunds? <a href="/contact" className="underline font-medium">Contact our support team</a>.
        </p>
      </div>
    </div>
  );
};

export default Returns;
