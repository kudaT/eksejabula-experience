
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { SignInForm } from '@/components/auth/SignInForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'signin';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSignIn = async (email: string, password: string, rememberMe: boolean) => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Signing in with:", { method: 'email', credential: email, password, rememberMe });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You have been successfully signed in",
      });
      
      // Redirect to home page after successful sign in
      navigate('/');
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: "Authentication failed",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email to confirm your account.",
      });
      
      // If signup was successful and email confirmation is not required
      if (data?.user && !data?.user?.identities?.[0]?.identity_data?.email_verified) {
        // Login the user automatically
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (!signInError) {
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          // Switch to sign in tab
          setActiveTab('signin');
        }
      } else {
        // Switch to sign in tab
        setActiveTab('signin');
      }
    } catch (error: any) {
      console.error('Error registering:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If already authenticated, don't render the sign-in form
  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 pb-12 flex items-center justify-center">
      <div className="container px-4 md:px-6 flex flex-col lg:flex-row w-full lg:max-w-5xl">
        {/* Left Side - Image/Brand */}
        <div className="lg:w-1/2 lg:pr-8 pb-12 lg:pb-0 animate-fade-in order-2 lg:order-1">
          <div className="rounded-xl overflow-hidden h-64 lg:h-full bg-secondary mb-8 lg:mb-0">
            <img 
              src="/lovable-uploads/ab316598-d3f2-4574-abf9-ce094d74122e.png"
              alt="Eksejabula" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Right Side - Authentication Form */}
        <div className="lg:w-1/2 lg:pl-8 animate-slide-in-right order-1 lg:order-2">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-display font-medium mb-2">
              {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === 'signin' 
                ? 'Sign in to your Eksejabula account to continue'
                : 'Join the Eksejabula community today'
              }
            </p>
          </div>
          
          <Tabs 
            defaultValue={initialTab} 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="animate-fade-in">
              <SignInForm 
                isLoading={isLoading}
                onSignIn={handleSignIn}
              />
            </TabsContent>
            
            <TabsContent value="register" className="animate-fade-in">
              <RegisterForm
                isLoading={isLoading}
                onRegister={handleRegister}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
