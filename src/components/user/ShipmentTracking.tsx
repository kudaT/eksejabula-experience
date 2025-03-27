
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Shipment {
  id: string;
  order_id: string;
  tracking_number: string | null;
  shipping_method: string | null;
  status: string;
  estimated_delivery_date: string | null;
  created_at: string;
  shipping_carriers?: {
    name: string;
  }
}

interface Order {
  id: string;
  order_number: string | null;
  total_price: number;
  status: string;
  created_at: string;
  shipments?: Shipment[];
}

const ShipmentTracking = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returnType, setReturnType] = useState<'return' | 'exchange'>('return');

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          total_price,
          status,
          created_at,
          shipments (
            id,
            tracking_number,
            shipping_method,
            status,
            estimated_delivery_date,
            shipping_carriers (name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching orders',
        description: 'Could not load your orders. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestReturn = async () => {
    if (!selectedOrder) return;
    
    if (!returnReason.trim()) {
      toast({
        variant: 'destructive',
        title: 'Return reason required',
        description: 'Please provide a reason for your return or exchange.'
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Authentication required',
          description: 'You must be logged in to request a return.'
        });
        return;
      }

      const { error } = await supabase
        .from('returns_exchanges')
        .insert({
          order_id: selectedOrder.id,
          user_id: user.id,
          reason: returnReason,
          return_type: returnType,
          status: 'requested'
        });

      if (error) throw error;

      toast({
        title: 'Return requested',
        description: 'Your return request has been submitted successfully.'
      });

      setReturnReason('');
      setReturnType('return');
      setIsReturnOpen(false);
    } catch (error) {
      console.error('Error requesting return:', error);
      toast({
        variant: 'destructive',
        title: 'Error requesting return',
        description: 'Could not submit your return request. Please try again.'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': 
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': 
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': 
      case 'returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders & Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any orders yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.order_number || order.id.substring(0, 8)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.shipments && order.shipments.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsTrackingOpen(true);
                          }}
                        >
                          Track
                        </Button>
                      )}
                      {['delivered', 'shipped'].includes(order.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsReturnOpen(true);
                          }}
                        >
                          Request Return
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Tracking Dialog */}
        <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Shipment Tracking</DialogTitle>
            </DialogHeader>
            {selectedOrder && selectedOrder.shipments && selectedOrder.shipments.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Order Number</p>
                    <p>{selectedOrder.order_number || selectedOrder.id.substring(0, 8)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Order Date</p>
                    <p>{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedOrder.shipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Shipment Details</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Carrier</p>
                        <p>{shipment.shipping_carriers?.name || 'Not specified'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Tracking Number</p>
                        <p>{shipment.tracking_number || 'Not available'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Shipping Method</p>
                        <p>{shipment.shipping_method || 'Standard'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Estimated Delivery</p>
                        <p>
                          {shipment.estimated_delivery_date 
                            ? new Date(shipment.estimated_delivery_date).toLocaleDateString() 
                            : 'Not specified'}
                        </p>
                      </div>
                    </div>

                    {shipment.tracking_number && shipment.shipping_carriers?.name && (
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            // This would be replaced with actual carrier tracking URL
                            const carrierUrls: Record<string, string> = {
                              'USPS': 'https://tools.usps.com/go/TrackConfirmAction?tLabels=',
                              'FedEx': 'https://www.fedex.com/apps/fedextrack/?tracknumbers=',
                              'UPS': 'https://www.ups.com/track?tracknum='
                            };
                            
                            const baseUrl = carrierUrls[shipment.shipping_carriers?.name] || 
                              'https://www.google.com/search?q=';
                            
                            window.open(`${baseUrl}${shipment.tracking_number}`, '_blank');
                          }}
                        >
                          Track with Carrier
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Return Request Dialog */}
        <Dialog open={isReturnOpen} onOpenChange={setIsReturnOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Request Return or Exchange</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="return-type">Return Type</Label>
                <Select 
                  value={returnType}
                  onValueChange={(value) => setReturnType(value as 'return' | 'exchange')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select return type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="return">Return for Refund</SelectItem>
                    <SelectItem value="exchange">Exchange for Another Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="return-reason">Reason for Return</Label>
                <Textarea
                  id="return-reason"
                  placeholder="Please tell us why you're returning this item..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  rows={4}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReturnOpen(false)}>Cancel</Button>
                <Button onClick={requestReturn}>Submit Request</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShipmentTracking;
