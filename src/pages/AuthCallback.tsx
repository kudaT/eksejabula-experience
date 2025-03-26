
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL parameters
        const { hash, search } = window.location;
        console.log("Auth callback - URL hash:", hash);
        console.log("Auth callback - URL search:", search);
        
        // First, check for error in hash (OAuth providers often use hash fragments)
        if (hash && hash.includes('error=')) {
          const errorParams = new URLSearchParams(hash.substring(1));
          const errorMessage = errorParams.get('error_description');
          
          setError(errorMessage || 'Authentication failed');
          toast({
            title: 'Authentication Error',
            description: errorMessage ? errorMessage.replace(/\+/g, ' ') : 'An error occurred during authentication',
            variant: 'destructive',
          });
          
          setTimeout(() => navigate('/auth'), 2000);
          return;
        }
        
        // Check for error in search params (Email magic links often use query params)
        if (search && search.includes('error=')) {
          const errorParams = new URLSearchParams(search);
          const errorMessage = errorParams.get('error_description');
          
          setError(errorMessage || 'Authentication failed');
          toast({
            title: 'Authentication Error',
            description: errorMessage ? errorMessage.replace(/\+/g, ' ') : 'An error occurred during authentication',
            variant: 'destructive',
          });
          
          setTimeout(() => navigate('/auth'), 2000);
          return;
        }
        
        // Process the auth callback to exchange auth code for session
        // This is only needed explicitly if the URL contains a code and Supabase hasn't processed it
        if ((hash && hash.includes('access_token=')) || (search && search.includes('code='))) {
          console.log("Processing auth callback with access token or code");
        }
        
        // Check if we have a session (Supabase will handle the auth code exchange automatically)
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          toast({
            title: 'Authentication Error',
            description: error.message,
            variant: 'destructive',
          });
          setTimeout(() => navigate('/auth'), 2000);
        } else if (data?.session) {
          console.log("Authentication successful, session established");
          toast({
            title: 'Success',
            description: 'You have been successfully authenticated.',
          });
          setTimeout(() => navigate('/'), 1000);
        } else {
          // No session, redirect to sign-in
          console.warn("No session found after auth callback");
          setError('No session established');
          setTimeout(() => navigate('/auth'), 2000);
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        setError('Unexpected authentication error');
        toast({
          title: 'Authentication Error',
          description: 'An unexpected error occurred during authentication.',
          variant: 'destructive',
        });
        setTimeout(() => navigate('/auth'), 2000);
      } finally {
        setIsProcessing(false);
      }
    };
    
    handleAuthCallback();
  }, [toast, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-2">
          {error ? 'Authentication Failed' : 'Processing Authentication...'}
        </h2>
        <p className="text-muted-foreground mb-4">
          {error 
            ? `Error: ${error}. Redirecting you to sign in...` 
            : 'Please wait while we complete your authentication.'}
        </p>
        
        {isProcessing && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
