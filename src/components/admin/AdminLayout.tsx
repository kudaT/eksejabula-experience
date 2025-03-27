
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Package, Users, ShoppingBag, FileText, 
  ChevronLeft, Menu, Home, Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: Home,
      exact: true,
    },
    {
      name: 'Extended Dashboard',
      href: '/admin/extended',
      icon: Settings,
      exact: true,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: 'Blog Posts',
      href: '/admin/blog',
      icon: FileText,
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-20 left-4 z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Admin Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                Welcome, {user?.full_name || 'Admin'}
              </p>
            </div>
            <nav className="space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    isActive(item.href, item.exact)
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 h-screen transform bg-white shadow-sm transition-all duration-300 ease-in-out md:translate-x-0 pt-16",
          sidebarOpen ? "w-64" : "w-20",
          "hidden md:block border-r"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 relative">
          <h2 className={cn("font-semibold transition-opacity", 
            sidebarOpen ? "opacity-100" : "opacity-0"
          )}>
            Admin Panel
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute right-4"
          >
            <ChevronLeft className={cn(
              "h-5 w-5 transition-transform",
              !sidebarOpen && "rotate-180"
            )} />
          </Button>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                isActive(item.href, item.exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100",
                !sidebarOpen && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", sidebarOpen && "mr-3")} />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pt-20 transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        <div className="container py-6 px-4 md:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
