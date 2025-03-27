
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader, 
  TableHead,
  TableRow 
} from '@/components/ui/table';
import { Loader2, Package, ShoppingBag, Users, FileText, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import type { Product, Profile, BlogPost } from '@/lib/supabase-client';

interface ExtendedProduct extends Product {
  media_urls?: string[];
  stock?: number;
}

interface ExtendedBlogPost extends BlogPost {
  media_urls?: string[];
}

const AdminExtended = () => {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [blogPosts, setBlogPosts] = useState<ExtendedBlogPost[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingBlogPost, setIsAddingBlogPost] = useState(false);
  const [productFiles, setProductFiles] = useState<File[]>([]);
  const [blogFiles, setBlogFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [newProduct, setNewProduct] = useState<Partial<ExtendedProduct>>({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category: 'jersey',
    image_urls: [],
  });

  const [newBlogPost, setNewBlogPost] = useState<Partial<ExtendedBlogPost>>({
    title: '',
    content: '',
    cover_image: '',
    slug: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You don't have access to this page",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    const fetchExtendedAdminData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch blog posts
        const { data: blogPostsData, error: blogPostsError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        // Fetch users
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;
        if (blogPostsError) throw blogPostsError;
        if (usersError) throw usersError;

        setProducts(productsData || []);
        setBlogPosts(blogPostsData || []);
        setUsers(usersData || []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load admin data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExtendedAdminData();
  }, [toast, navigate, isAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'product' | 'blog') => {
    const { name, value } = e.target;
    
    if (type === 'product') {
      setNewProduct(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'stock_quantity' ? parseFloat(value) : value,
      }));
    } else {
      setNewBlogPost(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setNewProduct(prev => ({
      ...prev,
      category: value as Product['category'],
    }));
  };

  const handleFileUpload = async (files: File[], bucket: 'products' | 'blog') => {
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${bucket}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);
          
        uploadedUrls.push(urlData.publicUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: 'Upload Error',
          description: `Failed to upload ${file.name}`,
          variant: 'destructive',
        });
      }
    }
    
    return uploadedUrls;
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || newProduct.price === undefined) {
      toast({
        title: 'Invalid product',
        description: 'Please complete all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingProduct(true);
    try {
      // Upload files if any
      let imageUrls: string[] = [];
      if (productFiles.length > 0) {
        imageUrls = await handleFileUpload(productFiles, 'products');
      }
      
      // Prepare data for insert
      const productData = {
        ...newProduct,
        image_urls: imageUrls,
      };
      
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select();

      if (error) throw error;

      toast({
        title: 'Product added',
        description: 'The product has been added successfully',
      });

      if (data && data.length > 0) {
        setProducts([data[0], ...products]);
      }

      setNewProduct({
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        category: 'jersey',
        image_urls: [],
      });
      setProductFiles([]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error',
        description: 'Failed to add product',
        variant: 'destructive',
      });
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleAddBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.content) {
      toast({
        title: 'Invalid blog post',
        description: 'Please complete all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingBlogPost(true);
    try {
      // Generate slug if not provided
      if (!newBlogPost.slug) {
        const slug = newBlogPost.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
        newBlogPost.slug = slug;
      }
      
      // Upload files if any
      let coverImage = '';
      if (blogFiles.length > 0) {
        const uploadedUrls = await handleFileUpload(blogFiles, 'blog');
        if (uploadedUrls.length > 0) {
          coverImage = uploadedUrls[0];
        }
      }
      
      // Prepare data for insert
      const blogData = {
        ...newBlogPost,
        cover_image: coverImage,
      };
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([blogData])
        .select();

      if (error) throw error;

      toast({
        title: 'Blog post added',
        description: 'The blog post has been added successfully',
      });

      if (data && data.length > 0) {
        setBlogPosts([data[0], ...blogPosts]);
      }

      setNewBlogPost({
        title: '',
        content: '',
        cover_image: '',
        slug: '',
      });
      setBlogFiles([]);
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to add blog post',
        variant: 'destructive',
      });
    } finally {
      setIsAddingBlogPost(false);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, stock_quantity: newStock } 
          : product
      ));
      
      toast({
        title: 'Stock updated',
        description: 'The product stock has been updated',
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      toast({
        title: 'Error',
        description: 'Failed to update stock',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'customer' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: newRole } 
          : user
      ));
      
      toast({
        title: 'User role updated',
        description: `User role changed to ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Extended Admin Dashboard</h1>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Total products in inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Management Section */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Management</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => handleInputChange(e, 'product')}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description || ''}
                    onChange={(e) => handleInputChange(e, 'product')}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.price || ''}
                      onChange={(e) => handleInputChange(e, 'product')}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock_quantity">Stock Quantity</Label>
                    <Input
                      id="stock_quantity"
                      name="stock_quantity"
                      type="number"
                      min="0"
                      value={newProduct.stock_quantity || ''}
                      onChange={(e) => handleInputChange(e, 'product')}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newProduct.category || 'jersey'}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jersey">Jersey</SelectItem>
                      <SelectItem value="beanie">Beanie</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="productImages">Product Images</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="productImages"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          setProductFiles(Array.from(e.target.files));
                        }
                      }}
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Upload one or more product images</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleAddProduct} disabled={isAddingProduct}>
                  {isAddingProduct && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No products found</TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        className="w-20"
                        value={product.stock_quantity || 0}
                        onChange={(e) => handleUpdateStock(
                          product.id,
                          parseInt(e.target.value)
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blog Post Management Section */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blog Post Management</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Blog Post</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Blog Post</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Blog Post Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newBlogPost.title}
                    onChange={(e) => handleInputChange(e, 'blog')}
                    placeholder="Enter blog post title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug (URL path)</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={newBlogPost.slug}
                    onChange={(e) => handleInputChange(e, 'blog')}
                    placeholder="enter-slug-or-leave-blank"
                  />
                  <p className="text-xs text-muted-foreground">Leave blank to auto-generate from title</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={newBlogPost.content || ''}
                    onChange={(e) => handleInputChange(e, 'blog')}
                    placeholder="Enter blog post content"
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="blogImage">Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="blogImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setBlogFiles([e.target.files[0]]);
                        }
                      }}
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleAddBlogPost} disabled={isAddingBlogPost}>
                  {isAddingBlogPost && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Blog Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No blog posts found</TableCell>
                </TableRow>
              ) : (
                blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.slug}</TableCell>
                    <TableCell>{formatDate(post.published_at || '')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No users found</TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name || 'Unknown'}</TableCell>
                    <TableCell>{user.email || 'No email'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleUpdateUserRole(user.id, value as 'customer' | 'admin')}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminExtended;
