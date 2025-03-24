
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, Package, Heart, Bell, LogOut, CreditCard, User,
  ChevronRight, Eye, EyeOff, Lock, Mail, Phone, Camera, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample order history data
const orders = [
  { 
    id: 'ORD-123456', 
    date: '2023-10-12', 
    status: 'Delivered', 
    total: 848, 
    items: [
      { name: 'Los Vega Jersey - Blue', price: 599, quantity: 1 },
      { name: 'Premium Beanie - Black', price: 249, quantity: 1 },
    ]
  },
  { 
    id: 'ORD-123457', 
    date: '2023-09-28', 
    status: 'Processing', 
    total: 599, 
    items: [
      { name: 'Los Vega Jersey - Red', price: 599, quantity: 1 },
    ]
  },
  { 
    id: 'ORD-123458', 
    date: '2023-08-15', 
    status: 'Delivered', 
    total: 349, 
    items: [
      { name: 'Street Art Print', price: 349, quantity: 1 },
    ]
  },
];

// Sample wishlist data
const wishlistItems = [
  { 
    id: '1', 
    name: 'Los Vega Limited Edition Jersey', 
    price: 799, 
    imageUrl: 'https://images.unsplash.com/photo-1566677914817-56426959ae9c',
    category: 'Jerseys',
    inStock: true,
  },
  { 
    id: '2', 
    name: 'Premium Beanie - Grey', 
    price: 249, 
    imageUrl: 'https://images.unsplash.com/photo-1578020190125-f4f7c26f4cff',
    category: 'Beanies',
    inStock: false,
  },
  { 
    id: '3', 
    name: 'Urban Photography Print', 
    price: 379, 
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968',
    category: 'Art',
    inStock: true,
  },
];

// Sample user data
const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+27 71 234 5678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  address: {
    street: '123 Main Street',
    city: 'Cape Town',
    postal: '8001',
    country: 'South Africa'
  }
};

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    street: userData.address.street,
    city: userData.address.city,
    postal: userData.address.postal,
    country: userData.address.country,
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    orderUpdates: true,
    newsletter: true,
    promotions: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', formState);
    setIsEditing(false);
    // In a real app, you would save the data to the server
  };
  
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Changing password');
    // Reset the password fields after submission
    setFormState(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    // In a real app, you would save the data to the server
  };

  const handleRemoveWishlistItem = (id: string) => {
    console.log('Removing item from wishlist:', id);
    // In a real app, you would remove the item from the wishlist
  };

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  orientation="vertical" 
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-rows-5 h-auto">
                    <TabsTrigger 
                      value="profile" 
                      className="justify-start py-3 px-4 data-[state=active]:bg-secondary"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      className="justify-start py-3 px-4 data-[state=active]:bg-secondary"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger 
                      value="wishlist" 
                      className="justify-start py-3 px-4 data-[state=active]:bg-secondary"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start py-3 px-4 data-[state=active]:bg-secondary"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="payment" 
                      className="justify-start py-3 px-4 data-[state=active]:bg-secondary"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Methods
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 animate-fade-in">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile" className="mt-0 space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-display font-medium">Profile</h1>
                    <p className="text-muted-foreground">
                      Manage your personal information and preferences
                    </p>
                  </div>
                  <Button 
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          <div className="relative w-24 h-24">
                            <Avatar className="w-24 h-24">
                              <AvatarImage 
                                src={userData.avatar} 
                                alt={userData.name} 
                                className="object-cover"
                              />
                              <AvatarFallback className="text-2xl">
                                {userData.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {isEditing && (
                              <div className="absolute bottom-0 right-0">
                                <Button 
                                  size="icon" 
                                  variant="secondary" 
                                  className="h-8 w-8 rounded-full"
                                >
                                  <Camera className="h-4 w-4" />
                                  <span className="sr-only">Change avatar</span>
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={formState.name}
                                  onChange={handleInputChange}
                                  readOnly={!isEditing}
                                  className={!isEditing ? "bg-secondary/50" : ""}
                                />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                    className={cn(
                                      "pl-10",
                                      !isEditing ? "bg-secondary/50" : ""
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formState.phone}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                    className={cn(
                                      "pl-10",
                                      !isEditing ? "bg-secondary/50" : ""
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium mb-3">Shipping Address</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="street">Street Address</Label>
                              <Input
                                id="street"
                                name="street"
                                value={formState.street}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-secondary/50" : ""}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                name="city"
                                value={formState.city}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-secondary/50" : ""}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="postal">Postal Code</Label>
                              <Input
                                id="postal"
                                name="postal"
                                value={formState.postal}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-secondary/50" : ""}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Input
                                id="country"
                                name="country"
                                value={formState.country}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? "bg-secondary/50" : ""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSavePassword}>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="current-password"
                              name="currentPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10"
                              value={formState.currentPassword}
                              onChange={handleInputChange}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                              id="new-password"
                              name="newPassword"
                              type="password"
                              placeholder="••••••••"
                              value={formState.newPassword}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                              id="confirm-password"
                              name="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              value={formState.confirmPassword}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <Button type="submit">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0 space-y-8">
                <div>
                  <h1 className="text-2xl font-display font-medium">Order History</h1>
                  <p className="text-muted-foreground">
                    View and track your orders
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Orders</CardTitle>
                    <CardDescription>
                      Track the status of your recent orders and view order details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'}>
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>R{order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    View Details
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                        <p className="mt-1 text-muted-foreground">
                          You haven't placed any orders yet.
                        </p>
                        <Button asChild className="mt-4">
                          <Link to="/shop">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wishlist" className="mt-0 space-y-8">
                <div>
                  <h1 className="text-2xl font-display font-medium">Wishlist</h1>
                  <p className="text-muted-foreground">
                    Manage your saved items
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      Items you have saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="border rounded-md overflow-hidden"
                          >
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <p className="font-medium">R{item.price.toFixed(2)}</p>
                              </div>
                              <div className="mt-3 flex justify-between items-center">
                                <Badge variant={item.inStock ? 'outline' : 'secondary'}>
                                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                                </Badge>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleRemoveWishlistItem(item.id)}
                                  >
                                    Remove
                                  </Button>
                                  <Button 
                                    size="sm"
                                    disabled={!item.inStock}
                                  >
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                        <p className="mt-1 text-muted-foreground">
                          Save items to your wishlist for later.
                        </p>
                        <Button asChild className="mt-4">
                          <Link to="/shop">Explore Products</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-8">
                <div>
                  <h1 className="text-2xl font-display font-medium">Notifications</h1>
                  <p className="text-muted-foreground">
                    Manage your notification preferences
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Notification Channels</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email-notifications" className="cursor-pointer">Email Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about your activity
                              </p>
                            </div>
                            <Switch 
                              id="email-notifications" 
                              checked={notifications.email}
                              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="sms-notifications" className="cursor-pointer">SMS Notifications</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive text messages about your activity
                              </p>
                            </div>
                            <Switch 
                              id="sms-notifications" 
                              checked={notifications.sms}
                              onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Notification Types</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="order-updates" className="cursor-pointer">Order Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Notifications about your order status
                              </p>
                            </div>
                            <Switch 
                              id="order-updates" 
                              checked={notifications.orderUpdates}
                              onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="newsletter" className="cursor-pointer">Newsletter</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive our weekly newsletter
                              </p>
                            </div>
                            <Switch 
                              id="newsletter" 
                              checked={notifications.newsletter}
                              onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="promotions" className="cursor-pointer">Promotions</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive promotions and special offers
                              </p>
                            </div>
                            <Switch 
                              id="promotions" 
                              checked={notifications.promotions}
                              onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="w-full sm:w-auto">
                      Save Preferences
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-0 space-y-8">
                <div>
                  <h1 className="text-2xl font-display font-medium">Payment Methods</h1>
                  <p className="text-muted-foreground">
                    Manage your payment information
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Payment Methods</CardTitle>
                    <CardDescription>
                      Add and manage your payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-secondary/50 rounded-md p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-foreground text-background rounded p-2 mr-4">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                          </div>
                        </div>
                        <Badge className="bg-accent">Default</Badge>
                      </div>
                      
                      <div className="rounded-md p-4 flex justify-between items-center border">
                        <div className="flex items-center">
                          <div className="bg-secondary rounded p-2 mr-4">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ending in 8888</p>
                            <p className="text-sm text-muted-foreground">Expires 08/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
