
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Helper function to get user profile
async function getUserProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
}

type AuthContextType = {
  session: Session | null;
  user: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle auth callback from email confirmation
    const handleAuthRedirect = async () => {
      const { hash } = window.location;
      
      if (hash && hash.includes('error=')) {
        const errorParams = new URLSearchParams(hash.substring(1));
        const errorMessage = errorParams.get('error_description');
        
        if (errorMessage) {
          toast({
            title: 'Authentication Error',
            description: errorMessage.replace(/\+/g, ' '),
            variant: 'destructive',
          });
        }
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate('/sign-in');
      } else if (hash && hash.includes('access_token=')) {
        // Process the successful auth callback
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          toast({
            title: 'Authentication Error',
            description: error.message,
            variant: 'destructive',
          });
        } else if (data?.user) {
          toast({
            title: 'Success',
            description: 'You have been successfully signed in.',
          });
          navigate('/');
        }
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };
    
    handleAuthRedirect();
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.id);
        setSession(session);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  async function fetchUserProfile(userId: string) {
    try {
      setLoading(true);
      const { data, error } = await getUserProfile(userId);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user profile. Please refresh the page.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const isAdmin = user?.role === 'admin';

  const value = {
    session,
    user,
    loading,
    isAdmin,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
