
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Helper function to get user profile with correct types
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
    // Set loading true at the start of the auth check
    setLoading(true);
    
    // Handle auth callback from email confirmation
    const handleAuthRedirect = async () => {
      const { hash, search } = window.location;
      
      // Check for error in hash parameters (from OAuth or email link)
      if (hash && hash.includes('error=')) {
        const errorParams = new URLSearchParams(hash.substring(1));
        const errorMessage = errorParams.get('error_description');
        
        if (errorMessage) {
          console.error('Auth error from hash:', errorMessage);
          toast({
            title: 'Authentication Error',
            description: errorMessage.replace(/\+/g, ' '),
            variant: 'destructive',
          });
        }
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate('/auth');
        return;
      } 
      
      // Check for errors in search parameters
      if (search && search.includes('error=')) {
        const errorParams = new URLSearchParams(search);
        const errorMessage = errorParams.get('error_description');
        
        if (errorMessage) {
          console.error('Auth error from search:', errorMessage);
          toast({
            title: 'Authentication Error',
            description: errorMessage.replace(/\+/g, ' '),
            variant: 'destructive',
          });
        }
        
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate('/auth');
      }
    };
    
    handleAuthRedirect();
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.id);
        
        // Update the session state
        setSession(newSession);
        
        // If session exists, fetch the user profile
        if (newSession?.user) {
          // Use setTimeout to avoid potential Supabase auth deadlocks
          setTimeout(() => {
            fetchUserProfile(newSession.user.id);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.id);
      
      // Update the session state
      setSession(currentSession);
      
      // If session exists, fetch the user profile
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      // Cleanup subscription on unmount
      subscription?.unsubscribe();
    };
  }, [toast, navigate]);

  async function fetchUserProfile(userId: string) {
    try {
      setLoading(true);
      const { data, error } = await getUserProfile(userId);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        console.log("User profile fetched:", data);
        setUser(data as Profile);
      } else {
        console.warn("No user profile found for user ID:", userId);
        // Could handle creating a profile here if needed
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
      setLoading(true);
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
    } finally {
      setLoading(false);
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
