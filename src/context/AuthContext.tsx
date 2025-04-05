
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Helper function to get user profile with correct types
async function getUserProfile(userId: string) {
  try {
    console.log('Getting user profile for:', userId);
    
    // Use direct query to avoid RLS recursion
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    console.log('Profile query result:', { data, error });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return { data: null, error };
  }
}

// Helper function to check if user is admin directly using the is_admin() function
async function checkIsAdmin() {
  try {
    const { data, error } = await supabase.rpc('is_admin');
    console.log('is_admin RPC result:', { data, error });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

type AuthContextType = {
  session: Session | null;
  user: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create local storage key for tracking limited profile toast
const LIMITED_PROFILE_TOAST_SHOWN = 'limited_profile_toast_shown';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to refresh user profile data
  const refreshUserProfile = async () => {
    if (session?.user) {
      await fetchUserProfile(session.user.id);
    }
  };

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
        console.log('Auth state changed:', event, newSession?.user?.email);
        
        // Update the session state
        setSession(newSession);
        
        // Handle auth events
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Route based on role if we have a user
          if (newSession?.user) {
            // Use setTimeout to avoid potential Supabase auth deadlocks
            setTimeout(() => {
              fetchUserProfile(newSession.user.id);
              
              // Check if we're on the auth page, and redirect if needed
              if (window.location.pathname === '/auth') {
                navigate('/');
              }
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          navigate('/auth');
        } else {
          // If the user exists but we're not handling a specific event
          if (newSession?.user) {
            // Use setTimeout to avoid potential Supabase auth deadlocks
            setTimeout(() => {
              fetchUserProfile(newSession.user.id);
            }, 0);
          } else {
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
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
      console.log('Fetching user profile for:', userId);
      setLoading(true);
      
      // Check admin status directly using the server-side function
      const adminStatus = await checkIsAdmin();
      console.log('Admin status from RPC:', adminStatus);
      setIsAdmin(adminStatus);
      
      // Try to get the user's metadata from auth first (as a fallback)
      const { data: authData } = await supabase.auth.getUser();
      const userMeta = authData?.user?.user_metadata;
      
      // Then try to fetch the profile data
      const { data, error } = await getUserProfile(userId);
      
      if (error) {
        console.error('Error fetching profile:', error);
        // Create a fallback profile from auth metadata if profile fetch fails
        if (userMeta) {
          const fallbackProfile: Profile = {
            id: userId,
            full_name: userMeta.full_name as string || null,
            email: authData?.user?.email || null,
            phone_number: authData?.user?.phone || null,
            role: adminStatus ? 'admin' : 'customer',
            avatar_url: userMeta.avatar_url as string || null,
            created_at: new Date().toISOString(),
          };
          
          setUser(fallbackProfile);
          
          // Check if we've shown the limited profile toast before
          const toastShown = localStorage.getItem(LIMITED_PROFILE_TOAST_SHOWN);
          
          if (!toastShown) {
            toast({
              title: 'Limited Profile Access',
              description: 'Using basic profile information. Some features may be limited.',
              variant: 'default',
            });
            
            // Mark toast as shown
            localStorage.setItem(LIMITED_PROFILE_TOAST_SHOWN, 'true');
          }
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch user profile. Please refresh the page.',
            variant: 'destructive',
          });
        }
      } else if (data) {
        console.log('Profile data loaded:', data);
        // Override role if admin status is true from the RPC check
        const updatedProfile = {
          ...data,
          role: adminStatus ? 'admin' : data.role
        } as Profile;
        
        setUser(updatedProfile);
        
        // Show admin welcome toast if user is an admin
        if (adminStatus) {
          console.log('Admin user detected:', updatedProfile);
          toast({
            title: 'Admin Access',
            description: 'Welcome! You have full access to all features and admin capabilities.',
            variant: 'default',
          });
        }
      } else {
        // Could handle creating a profile here if needed
        toast({
          title: 'Profile Not Found',
          description: 'Your user profile could not be found.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
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
      setIsAdmin(false);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  console.log('Current user role status:', { isAdmin, role: user?.role });

  const value = {
    session,
    user,
    loading,
    isAdmin,
    signOut,
    refreshUserProfile,
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
