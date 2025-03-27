
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TruckIcon, ArrowLeftRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define types
interface ShippingCarrier {
  id: string;
  name: string;
  api_key: string | null;
  base_url: string | null;
  active: boolean;
  created_at: string;
}

interface ShippingRate {
  id: string;
  carrier_id: string;
  origin_zip: string;
  destination_zip: string;
  weight_min: number | null;
  weight_max: number | null;
  rate: number;
  shipping_method: string;
  created_at: string;
}

interface Shipment {
  id: string;
  order_id: string;
  carrier_id: string | null;
  tracking_number: string | null;
  shipping_method: string | null;
  shipping_cost: number | null;
  status: 'pending' | 'in_transit' | 'delivered' | 'returned';
  label_url: string | null;
  estimated_delivery_date: string | null;
  created_at: string;
  orders?: {
    order_number: string | null;
    user_id: string | null;
    profiles?: {
      full_name: string | null;
      email: string | null;
    }
  };
  shipping_carriers?: {
    name: string;
  }
}

interface ReturnExchange {
  id: string;
  order_id: string;
  shipment_id: string | null;
  user_id: string;
  reason: string | null;
  status: 'requested' | 'approved' | 'rejected' | 'processed';
  return_type: 'return' | 'exchange' | null;
  return_shipping_label_url: string | null;
  refund_amount: number | null;
  created_at: string;
  orders?: {
    order_number: string | null;
  };
  profiles?: {
    full_name: string | null;
    email: string | null;
  }
}

const ShippingManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('carriers');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="carriers" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="carriers">Shipping Carriers</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
          </TabsList>
          <TabsContent value="carriers">
            <ShippingCarriersTab />
          </TabsContent>
          <TabsContent value="shipments">
            <ShipmentsTab />
          </TabsContent>
          <TabsContent value="returns">
            <ReturnsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Shipping Carriers Tab
const ShippingCarriersTab = () => {
  const { toast } = useToast();
  const [carriers, setCarriers] = useState<ShippingCarrier[]>([]);
  const [newCarrier, setNewCarrier] = useState({
    name: '',
    api_key: '',
    base_url: '',
    active: true
  });
  const [isAddingCarrier, setIsAddingCarrier] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCarriers();
  }, []);

  const fetchCarriers = async () => {
    try {
      const { data, error } = await supabase
        .from('shipping_carriers')
        .select('*')
        .order('name');

      if (error) throw error;
      setCarriers(data || []);
    } catch (error) {
      console.error('Error fetching carriers:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching carriers',
        description: 'Could not load shipping carriers. Please try again.'
      });
    }
  };

  const handleAddCarrier = async () => {
    if (!newCarrier.name) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Carrier name is required.'
      });
      return;
    }

    setIsAddingCarrier(true);
    try {
      const { data, error } = await supabase
        .from('shipping_carriers')
        .insert([newCarrier])
        .select();

      if (error) throw error;
      
      toast({
        title: 'Carrier added',
        description: `${newCarrier.name} has been added successfully.`
      });

      setCarriers([...(data || []), ...carriers]);
      setNewCarrier({
        name: '',
        api_key: '',
        base_url: '',
        active: true
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding carrier:', error);
      toast({
        variant: 'destructive',
        title: 'Error adding carrier',
        description: 'Could not add the carrier. Please try again.'
      });
    } finally {
      setIsAddingCarrier(false);
    }
  };

  const toggleCarrierStatus = async (carrier: ShippingCarrier) => {
    try {
      const { error } = await supabase
        .from('shipping_carriers')
        .update({ active: !carrier.active })
        .eq('id', carrier.id);

      if (error) throw error;
      
      setCarriers(carriers.map(c => 
        c.id === carrier.id ? { ...c, active: !c.active } : c
      ));

      toast({
        title: 'Carrier updated',
        description: `${carrier.name} is now ${!carrier.active ? 'active' : 'inactive'}.`
      });
    } catch (error) {
      console.error('Error updating carrier:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating carrier',
        description: 'Could not update the carrier status. Please try again.'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Shipping Carriers</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Carrier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shipping Carrier</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Carrier Name *</Label>
                <Input
                  id="name"
                  value={newCarrier.name}
                  onChange={(e) => setNewCarrier({ ...newCarrier, name: e.target.value })}
                  placeholder="e.g., USPS, FedEx, UPS"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api_key">API Key</Label>
                <Input
                  id="api_key"
                  value={newCarrier.api_key || ''}
                  onChange={(e) => setNewCarrier({ ...newCarrier, api_key: e.target.value })}
                  placeholder="API key for integration"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="base_url">API Base URL</Label>
                <Input
                  id="base_url"
                  value={newCarrier.base_url || ''}
                  onChange={(e) => setNewCarrier({ ...newCarrier, base_url: e.target.value })}
                  placeholder="e.g., https://api.carrier.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCarrier} disabled={isAddingCarrier}>
                {isAddingCarrier ? 'Adding...' : 'Add Carrier'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Base URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carriers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No carriers found</TableCell>
            </TableRow>
          ) : (
            carriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell className="font-medium">{carrier.name}</TableCell>
                <TableCell>
                  {carrier.api_key 
                    ? `${carrier.api_key.substring(0, 8)}...` 
                    : 'Not configured'}
                </TableCell>
                <TableCell>{carrier.base_url || 'Not configured'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    carrier.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {carrier.active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCarrierStatus(carrier)}
                  >
                    {carrier.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Shipments Tab
const ShipmentsTab = () => {
  const { toast } = useToast();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          *,
          orders(order_number, user_id, profiles:user_id(full_name, email)),
          shipping_carriers(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching shipments',
        description: 'Could not load shipments. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateShipmentStatus = async (shipmentId: string, status: Shipment['status']) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ status })
        .eq('id', shipmentId);

      if (error) throw error;
      
      setShipments(shipments.map(s => 
        s.id === shipmentId ? { ...s, status } : s
      ));

      toast({
        title: 'Shipment updated',
        description: `Shipment status changed to ${status}.`
      });
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating shipment',
        description: 'Could not update the shipment status. Please try again.'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewShipmentDetails = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Shipments</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Tracking #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No shipments found</TableCell>
              </TableRow>
            ) : (
              shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.orders?.order_number || 'N/A'}</TableCell>
                  <TableCell>
                    {shipment.orders?.profiles?.full_name || 'Unknown'}
                    <div className="text-xs text-muted-foreground">
                      {shipment.orders?.profiles?.email || 'No email'}
                    </div>
                  </TableCell>
                  <TableCell>{shipment.shipping_carriers?.name || 'N/A'}</TableCell>
                  <TableCell>{shipment.tracking_number || 'Not assigned'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewShipmentDetails(shipment)}
                      >
                        View
                      </Button>
                      <Select
                        value={shipment.status}
                        onValueChange={(value) => updateShipmentStatus(
                          shipment.id,
                          value as Shipment['status']
                        )}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_transit">In Transit</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="returned">Returned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Shipment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order Number</p>
                  <p>{selectedShipment.orders?.order_number || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Customer</p>
                  <p>{selectedShipment.orders?.profiles?.full_name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedShipment.orders?.profiles?.email || 'No email'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Carrier</p>
                  <p>{selectedShipment.shipping_carriers?.name || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tracking Number</p>
                  <p>{selectedShipment.tracking_number || 'Not assigned'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Shipping Method</p>
                  <p>{selectedShipment.shipping_method || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedShipment.status)}`}>
                    {selectedShipment.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p>{selectedShipment.estimated_delivery_date 
                    ? new Date(selectedShipment.estimated_delivery_date).toLocaleDateString() 
                    : 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Shipping Cost</p>
                  <p>{selectedShipment.shipping_cost 
                    ? `$${selectedShipment.shipping_cost.toFixed(2)}` 
                    : 'Not specified'}
                  </p>
                </div>
              </div>
              
              {selectedShipment.label_url && (
                <div className="pt-4">
                  <Button asChild>
                    <a href={selectedShipment.label_url} target="_blank" rel="noopener noreferrer">
                      View Shipping Label
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Returns Tab
const ReturnsTab = () => {
  const { toast } = useToast();
  const [returns, setReturns] = useState<ReturnExchange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReturn, setSelectedReturn] = useState<ReturnExchange | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('returns_exchanges')
        .select(`
          *,
          orders(order_number),
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReturns(data || []);
    } catch (error) {
      console.error('Error fetching returns:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching returns',
        description: 'Could not load returns and exchanges. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateReturnStatus = async (returnId: string, status: ReturnExchange['status']) => {
    try {
      const { error } = await supabase
        .from('returns_exchanges')
        .update({ status })
        .eq('id', returnId);

      if (error) throw error;
      
      setReturns(returns.map(r => 
        r.id === returnId ? { ...r, status } : r
      ));

      toast({
        title: 'Return updated',
        description: `Return status changed to ${status}.`
      });
    } catch (error) {
      console.error('Error updating return:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating return',
        description: 'Could not update the return status. Please try again.'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewReturnDetails = (returnItem: ReturnExchange) => {
    setSelectedReturn(returnItem);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Returns & Exchanges</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No returns or exchanges found</TableCell>
              </TableRow>
            ) : (
              returns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell>{returnItem.orders?.order_number || 'N/A'}</TableCell>
                  <TableCell>
                    {returnItem.profiles?.full_name || 'Unknown'}
                    <div className="text-xs text-muted-foreground">
                      {returnItem.profiles?.email || 'No email'}
                    </div>
                  </TableCell>
                  <TableCell>{returnItem.return_type || 'Not specified'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(returnItem.status)}`}>
                      {returnItem.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(returnItem.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewReturnDetails(returnItem)}
                      >
                        View
                      </Button>
                      <Select
                        value={returnItem.status}
                        onValueChange={(value) => updateReturnStatus(
                          returnItem.id,
                          value as ReturnExchange['status']
                        )}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="requested">Requested</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="processed">Processed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Return Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Return/Exchange Details</DialogTitle>
          </DialogHeader>
          {selectedReturn && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order Number</p>
                  <p>{selectedReturn.orders?.order_number || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Customer</p>
                  <p>{selectedReturn.profiles?.full_name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedReturn.profiles?.email || 'No email'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Type</p>
                  <p>{selectedReturn.return_type || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReturn.status)}`}>
                    {selectedReturn.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Date Requested</p>
                  <p>{new Date(selectedReturn.created_at).toLocaleString()}</p>
                </div>
                {selectedReturn.refund_amount && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Refund Amount</p>
                    <p>${selectedReturn.refund_amount.toFixed(2)}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Reason</p>
                <p className="border p-3 rounded-md">
                  {selectedReturn.reason || 'No reason provided'}
                </p>
              </div>
              
              {selectedReturn.return_shipping_label_url && (
                <div className="pt-4">
                  <Button asChild>
                    <a 
                      href={selectedReturn.return_shipping_label_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Return Shipping Label
                    </a>
                  </Button>
                </div>
              )}
              
              {selectedReturn.status === 'requested' && (
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => {
                      updateReturnStatus(selectedReturn.id, 'approved');
                      setIsDialogOpen(false);
                    }}
                  >
                    Approve Return
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      updateReturnStatus(selectedReturn.id, 'rejected');
                      setIsDialogOpen(false);
                    }}
                  >
                    Reject Return
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShippingManagement;
