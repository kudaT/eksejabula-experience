
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SignInForm } from '@/components/auth/SignInForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-muted/30" style={{backgroundImage: `url('/lovable-uploads/ab316598-d3f2-4574-abf9-ce094d74122e.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Helmet>
        <title>Sign In | Eksejabula</title>
      </Helmet>
      
      <div className="container flex-1 flex items-center justify-center py-8 md:py-12">
        <Card className="w-full max-w-md shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Link to="/" className="inline-block mx-auto mb-4">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span className="text-xl font-bold">Eksejabula</span>
              </div>
            </Link>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="mt-0">
                <SignInForm 
                  isLoading={isLoading} 
                  onSignIn={async (email, password, rememberMe) => {
                    setIsLoading(true);
                    try {
                      console.log('Signing in with:', { method: 'email', credential: email, password });
                      const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                      });
                      
                      if (error) throw error;
                      
                      toast({
                        title: "Sign in successful",
                        description: "Welcome back! You've been successfully signed in.",
                      });
                      
                      // Redirect to home page
                      navigate('/');
                      
                    } catch (error) {
                      console.error('Error signing in:', error);
                      toast({
                        title: 'Sign in failed',
                        description: error.message || 'Please check your credentials and try again.',
                        variant: 'destructive',
                      });
                    } finally {
                      setIsLoading(false);
                    }
                  }} 
                />
              </TabsContent>
              
              <TabsContent value="register" className="mt-0">
                <RegisterForm 
                  isLoading={isLoading}
                  onRegister={async (name, email, password) => {
                    setIsLoading(true);
                    try {
                      const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                          data: {
                            full_name: name,
                          },
                        },
                      });
                      
                      if (error) throw error;
                      
                      toast({
                        title: 'Registration successful',
                        description: 'Your account has been created. Please check your email for confirmation.',
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
                        }
                      }
                      
                    } catch (error) {
                      console.error('Error registering:', error);
                      toast({
                        title: 'Registration failed',
                        description: error.message || 'Please try again with different credentials.',
                        variant: 'destructive',
                      });
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-xs text-muted-foreground text-center mt-4">
              By signing in, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
