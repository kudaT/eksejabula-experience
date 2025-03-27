
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import OrderManagement from '@/components/admin/OrderManagement';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dashboard statistics chart data
const generateMockChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    sales: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 3000) + 500,
  }));
};

const AdminExtended = () => {
  const { toast } = useToast();
  const [chartData, setChartData] = useState(generateMockChartData());
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalProducts: 0, 
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total number of users
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total number of products
        const { count: productCount, error: productError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total number of orders
        const { count: orderCount, error: orderError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });
        
        // Fetch total revenue
        const { data: revenueData, error: revenueError } = await supabase
          .from('orders')
          .select('total_price')
          .eq('status', 'paid');
        
        if (userError || productError || orderError || revenueError) {
          throw new Error("Error fetching stats");
        }
        
        const totalRevenue = revenueData 
          ? revenueData.reduce((sum, order) => sum + order.total_price, 0)
          : 0;
        
        setStatsData({
          totalUsers: userCount || 0,
          totalProducts: productCount || 0,
          totalOrders: orderCount || 0,
          totalRevenue
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast({
          variant: 'destructive',
          title: 'Error loading statistics',
          description: 'Could not load dashboard statistics. Please try again later.'
        });
      }
    };
    
    fetchStats();
    
    // Generate new chart data every 5 minutes to simulate live data
    const interval = setInterval(() => {
      setChartData(generateMockChartData());
    }, 300000);
    
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Extended Admin Dashboard</h1>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+5 new products this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statsData.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales ($)" />
                <Bar dataKey="visitors" fill="#10b981" name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Management Section */}
      <OrderManagement />
    </div>
  );
};

export default AdminExtended;
