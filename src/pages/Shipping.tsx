
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Shipping Information | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Shipping Information</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          We're committed to getting your order to you as quickly and safely as possible. Here's everything you need to know about our shipping policies.
        </p>
        
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Domestic Shipping (South Africa)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipping Method</TableHead>
                    <TableHead>Estimated Delivery</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Standard Shipping</TableCell>
                    <TableCell>3-5 business days</TableCell>
                    <TableCell className="text-right">R75</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Express Shipping</TableCell>
                    <TableCell>1-2 business days</TableCell>
                    <TableCell className="text-right">R150</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Free Shipping</TableCell>
                    <TableCell>3-5 business days</TableCell>
                    <TableCell className="text-right">Free on orders over R1000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <p className="mt-4 text-sm text-muted-foreground">
                * Delivery times are estimates and not guaranteed. Delivery may take longer for remote areas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>International Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Estimated Delivery</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Africa (excluding South Africa)</TableCell>
                    <TableCell>7-14 business days</TableCell>
                    <TableCell className="text-right">R350</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Europe</TableCell>
                    <TableCell>10-15 business days</TableCell>
                    <TableCell className="text-right">R550</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>North America</TableCell>
                    <TableCell>10-15 business days</TableCell>
                    <TableCell className="text-right">R550</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Asia</TableCell>
                    <TableCell>12-18 business days</TableCell>
                    <TableCell className="text-right">R600</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Australia & New Zealand</TableCell>
                    <TableCell>12-18 business days</TableCell>
                    <TableCell className="text-right">R650</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rest of World</TableCell>
                    <TableCell>14-21 business days</TableCell>
                    <TableCell className="text-right">R700</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="mt-6 space-y-4 text-sm">
                <p>
                  <strong>Important Notes on International Shipping:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Delivery times are estimates and do not include customs processing times, which can vary significantly by country.</li>
                  <li>International customers may be subject to customs fees, import duties, and taxes, which are the responsibility of the recipient.</li>
                  <li>Tracking information will be provided for all international shipments.</li>
                  <li>Free international shipping is available on orders over R3000.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Shipping FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">When will my order ship?</h3>
                <p className="text-muted-foreground">Orders are usually processed within 1-2 business days. You will receive a shipping confirmation email with tracking information once your order has shipped.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Can I change my shipping address after placing an order?</h3>
                <p className="text-muted-foreground">Address changes can only be accommodated if the order has not yet been processed. Please contact our customer service team immediately if you need to change your shipping address.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Do you ship to P.O. boxes?</h3>
                <p className="text-muted-foreground">Yes, we can ship to P.O. boxes for standard shipping within South Africa. International and express shipments require a physical address.</p>
              </div>
              
              <div>
                <h3 className="font-medium">What if my package is lost or damaged?</h3>
                <p className="text-muted-foreground">Please contact our customer service team within 14 days of the expected delivery date if your package is lost or arrives damaged. We will work with the shipping carrier to resolve the issue.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <p className="mt-8 text-center text-muted-foreground">
          For any other shipping questions, please <a href="/contact" className="underline font-medium">contact our support team</a>.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
