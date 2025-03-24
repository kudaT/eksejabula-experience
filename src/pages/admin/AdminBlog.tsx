
import { useState, useEffect } from 'react';
import { 
  Search, Plus, Pencil, Trash2, Eye, FileText, Save, 
  Upload, X 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { BlogPost } from '@/lib/supabase-client';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load blog posts. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      (post.content || '').toLowerCase().includes(searchLower) ||
      post.slug.toLowerCase().includes(searchLower)
    );
  });

  const openCreateDialog = () => {
    setEditingPost({
      title: '',
      slug: '',
      content: '',
      cover_image: '',
      published_at: new Date().toISOString(),
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If title is changing, also update the slug (only if slug is empty or auto-generated)
    if (name === 'title' && (!editingPost?.slug || editingPost.slug === generateSlug(editingPost?.title || ''))) {
      setEditingPost((prev) => 
        prev ? { ...prev, title: value, slug: generateSlug(value) } : null
      );
    } else {
      setEditingPost((prev) => 
        prev ? { ...prev, [name]: value } : null
      );
    }
  };

  const handleSubmit = async () => {
    if (!editingPost || !editingPost.title || !editingPost.slug) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if slug is unique (for new posts)
      if (!editingPost.id) {
        const { data: existingPost } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', editingPost.slug)
          .single();
          
        if (existingPost) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'A post with this slug already exists. Please use a different slug.',
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Create or update post
      if (editingPost.id) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: editingPost.title,
            slug: editingPost.slug,
            content: editingPost.content,
            cover_image: editingPost.cover_image,
            published_at: editingPost.published_at,
          })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post updated successfully',
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: editingPost.title,
            slug: editingPost.slug,
            content: editingPost.content,
            cover_image: editingPost.cover_image,
            published_at: editingPost.published_at,
          });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Blog post created successfully',
        });
      }

      // Refresh posts list
      await fetchPosts();
      closeDialog();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save blog post. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });

      // Update local state
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete blog post. Please try again.',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blog posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery 
            ? 'No blog posts match your search' 
            : 'No blog posts found. Create your first post!'}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell>{formatDate(post.published_at)}</TableCell>
                  <TableCell>
                    <Badge variant={post.published_at ? 'default' : 'outline'}>
                      {post.published_at ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(post)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Post Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {editingPost?.id ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={editingPost?.title || ''}
                onChange={handleInputChange}
                placeholder="Enter post title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug * (URL path)</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  name="slug"
                  value={editingPost?.slug || ''}
                  onChange={handleInputChange}
                  placeholder="enter-post-slug"
                  className="font-mono"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (editingPost?.title) {
                      setEditingPost({
                        ...editingPost,
                        slug: generateSlug(editingPost.title),
                      });
                    }
                  }}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cover_image">Cover Image URL</Label>
              <Input
                id="cover_image"
                name="cover_image"
                value={editingPost?.cover_image || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              {editingPost?.cover_image && (
                <div className="mt-2 relative">
                  <img
                    src={editingPost.cover_image}
                    alt="Cover preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setEditingPost({...editingPost, cover_image: ''})}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={editingPost?.content || ''}
                onChange={handleInputChange}
                placeholder="Write your blog post content here..."
                rows={10}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              )}
              <Save className="mr-2 h-4 w-4" />
              {editingPost?.id ? 'Update Post' : 'Publish Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
