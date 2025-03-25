
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL parameters
      const { hash, search } = window.location;
      
      // First, check for error in hash
      if (hash && hash.includes('error=')) {
        const errorParams = new URLSearchParams(hash.substring(1));
        const errorMessage = errorParams.get('error_description');
        
        toast({
          title: 'Authentication Error',
          description: errorMessage ? errorMessage.replace(/\+/g, ' ') : 'An error occurred during authentication',
          variant: 'destructive',
        });
        
        navigate('/sign-in');
        return;
      }
      
      // Check for error in search params
      if (search && search.includes('error=')) {
        const errorParams = new URLSearchParams(search);
        const errorMessage = errorParams.get('error_description');
        
        toast({
          title: 'Authentication Error',
          description: errorMessage ? errorMessage.replace(/\+/g, ' ') : 'An error occurred during authentication',
          variant: 'destructive',
        });
        
        navigate('/sign-in');
        return;
      }
      
      // Process the auth callback
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        toast({
          title: 'Authentication Error',
          description: error.message,
          variant: 'destructive',
        });
        navigate('/sign-in');
      } else if (data?.session) {
        toast({
          title: 'Success',
          description: 'You have been successfully authenticated.',
        });
        navigate('/');
      } else {
        // No session, redirect to sign-in
        navigate('/sign-in');
      }
    };
    
    handleAuthCallback();
  }, [toast, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Processing authentication...</h2>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
