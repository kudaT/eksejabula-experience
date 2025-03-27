import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { FileText, Eye, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Define types for our order data
interface OrderItem {
  id: string;
  product_id: string | null;
  quantity: number;
  custom_text: string | null;
  custom_number: string | null;
  customisation_price: number | null;
  products?: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  user_id: string | null;
  total_price: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  created_at: string;
  order_items: OrderItem[];
  order_number: string | null;
  profiles?: {
    full_name: string | null;
    email: string | null;
    phone_number: string | null;
  };
  shipments?: Array<{
    id: string;
    tracking_number: string | null;
    status: string;
  }>;
}

interface ShippingCarrier {
  id: string;
  name: string;
}

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShipmentDialogOpen, setIsShipmentDialogOpen] = useState(false);
  const [carriers, setCarriers] = useState<ShippingCarrier[]>([]);
  const [newShipment, setNewShipment] = useState({
    carrier_id: '',
    tracking_number: '',
    shipping_method: 'standard',
    shipping_cost: 0,
    estimated_delivery_date: ''
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch orders with React Query
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles(full_name, email, phone_number),
          order_items(
            *,
            products:product_id(name, price)
          ),
          shipments(id, tracking_number, status)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Order[];
    }
  });

  // Fetch shipping carriers
  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const { data, error } = await supabase
          .from('shipping_carriers')
          .select('id, name')
          .eq('active', true);
        
        if (error) throw error;
        setCarriers(data || []);
      } catch (error) {
        console.error('Error fetching carriers:', error);
      }
    };

    fetchCarriers();
  }, []);

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Success notification
      toast({
        title: 'Order status updated',
        description: `Order status changed to ${newStatus}`,
      });

      // Update the selected order if it's currently viewed
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      // Refresh the orders list
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: 'Could not update the order status. Please try again.',
      });
    }
  };

  // View Order Details
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Create Shipment for Order
  const handleCreateShipment = async () => {
    if (!selectedOrder) return;
    if (!newShipment.carrier_id) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please select a shipping carrier.'
      });
      return;
    }

    try {
      // Generate a tracking number if not provided
      const trackingNumber = newShipment.tracking_number || 
        `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const { data, error } = await supabase
        .from('shipments')
        .insert({
          order_id: selectedOrder.id,
          carrier_id: newShipment.carrier_id,
          tracking_number: trackingNumber,
          shipping_method: newShipment.shipping_method,
          shipping_cost: newShipment.shipping_cost,
          status: 'pending',
          estimated_delivery_date: newShipment.estimated_delivery_date || null
        })
        .select();

      if (error) throw error;

      // Also update the order status to shipped if it's not already
      if (selectedOrder.status !== 'shipped') {
        await handleUpdateOrderStatus(selectedOrder.id, 'shipped' as Order['status']);
      }

      toast({
        title: 'Shipment created',
        description: `Shipment created with tracking number: ${trackingNumber}`
      });

      setIsShipmentDialogOpen(false);
      
      // Reset shipment form
      setNewShipment({
        carrier_id: '',
        tracking_number: '',
        shipping_method: 'standard',
        shipping_cost: 0,
        estimated_delivery_date: ''
      });

      // Refresh the orders list
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating shipment',
        description: 'Could not create the shipment. Please try again.'
      });
    }
  };

  // Generate Invoice (placeholder functionality)
  const handleGenerateInvoice = (order: Order) => {
    // This would typically connect to a PDF generation service
    toast({
      title: 'Invoice Generated',
      description: `Invoice for order ${order.order_number || order.id.substring(0, 8)}... has been generated.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No orders found</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.order_number || order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {order.profiles?.full_name || 'Unknown'}
                      <div className="text-xs text-muted-foreground">
                        {order.profiles?.email || 'No email'}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>${order.total_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {order.shipments && order.shipments.length > 0 ? (
                        <span className="text-xs">
                          {order.shipments.length} shipment(s)
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not shipped</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateInvoice(order)}
                        >
                          <FileText className="h-4 w-4 mr-1" /> Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Order Information</h3>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-muted-foreground">Order #:</span> {selectedOrder.order_number || selectedOrder.id}
                      </div>
                      <div><span className="text-muted-foreground">Date:</span> {formatDate(selectedOrder.created_at)}</div>
                      <div>
                        <span className="text-muted-foreground">Status:</span> 
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Customer Information</h3>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-muted-foreground">Name:</span> {selectedOrder.profiles?.full_name || 'N/A'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span> {selectedOrder.profiles?.email || 'N/A'}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span> {selectedOrder.profiles?.phone_number || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded p-4">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Customization</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.order_items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.products?.name || 'Unknown Product'}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            ${(item.products?.price || 0).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.custom_text || item.custom_number
                              ? (
                                <div>
                                  {item.custom_text && <div>Text: {item.custom_text}</div>}
                                  {item.custom_number && <div>Number: {item.custom_number}</div>}
                                  {item.customisation_price && item.customisation_price > 0 && 
                                    <div className="text-xs text-muted-foreground">
                                      (+${item.customisation_price.toFixed(2)})
                                    </div>
                                  }
                                </div>
                              )
                              : 'None'
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">Total:</TableCell>
                        <TableCell className="text-right font-medium">
                          ${selectedOrder.total_price.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Shipment Information (if exists) */}
                {selectedOrder.shipments && selectedOrder.shipments.length > 0 && (
                  <div className="border rounded p-4">
                    <h3 className="font-medium mb-2">Shipment Information</h3>
                    <div className="text-sm space-y-1">
                      {selectedOrder.shipments.map((shipment, index) => (
                        <div key={shipment.id} className="flex justify-between items-center py-1">
                          <div>
                            <span className="font-medium">Shipment #{index + 1}:</span> {shipment.tracking_number || 'No tracking'}
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => 
                      handleUpdateOrderStatus(selectedOrder.id, value as Order['status'])
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleGenerateInvoice(selectedOrder)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Invoice
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        setIsShipmentDialogOpen(true);
                      }}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Create Shipment
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Shipment Dialog */}
        <Dialog open={isShipmentDialogOpen} onOpenChange={setIsShipmentDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create Shipment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="carrier">Shipping Carrier *</Label>
                <Select
                  value={newShipment.carrier_id}
                  onValueChange={(value) => setNewShipment({...newShipment, carrier_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map(carrier => (
                      <SelectItem key={carrier.id} value={carrier.id}>
                        {carrier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input
                  id="tracking"
                  placeholder="Enter tracking number (optional)"
                  value={newShipment.tracking_number}
                  onChange={(e) => setNewShipment({...newShipment, tracking_number: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to generate automatically
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="method">Shipping Method</Label>
                <Select
                  value={newShipment.shipping_method}
                  onValueChange={(value) => setNewShipment({...newShipment, shipping_method: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="overnight">Overnight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cost">Shipping Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="Enter shipping cost"
                  value={newShipment.shipping_cost.toString()}
                  onChange={(e) => setNewShipment({...newShipment, shipping_cost: parseFloat(e.target.value)})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="delivery-date">Estimated Delivery Date</Label>
                <Input
                  id="delivery-date"
                  type="date"
                  value={newShipment.estimated_delivery_date}
                  onChange={(e) => setNewShipment({...newShipment, estimated_delivery_date: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsShipmentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateShipment}>
                Create Shipment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
