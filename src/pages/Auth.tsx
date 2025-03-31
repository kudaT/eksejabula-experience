
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SignInForm } from '@/components/auth/SignInForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createTestUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-users');
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Test users created',
        description: 'Admin: admin@eksejabula.co.za / Admin123$\nUser: user@eksejabula.co.za / User123$',
      });
    } catch (error) {
      console.error('Error creating test users:', error);
      toast({
        title: 'Error creating test users',
        description: 'Please try again or check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Helmet>
        <title>Sign In | Eksejabula</title>
      </Helmet>
      
      <div className="container flex-1 flex items-center justify-center py-8 md:py-12">
        <Card className="w-full max-w-md shadow-lg">
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
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <SocialAuth 
                isLoading={isLoading}
                onSocialAuth={async (provider) => {
                  setIsLoading(true);
                  try {
                    let { data, error };
                    
                    if (provider === 'google') {
                      ({ data, error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                          redirectTo: `${window.location.origin}/auth-callback`,
                        },
                      }));
                    } else if (provider === 'facebook') {
                      ({ data, error } = await supabase.auth.signInWithOAuth({
                        provider: 'facebook',
                        options: {
                          redirectTo: `${window.location.origin}/auth-callback`,
                        },
                      }));
                    } else if (provider === 'apple') {
                      ({ data, error } = await supabase.auth.signInWithOAuth({
                        provider: 'apple',
                        options: {
                          redirectTo: `${window.location.origin}/auth-callback`,
                        },
                      }));
                    }
                    
                    if (error) throw error;
                    
                  } catch (error) {
                    console.error(`Error signing in with ${provider}:`, error);
                    toast({
                      title: 'Social sign in failed',
                      description: error.message || 'Please try again or use another method.',
                      variant: 'destructive',
                    });
                    setIsLoading(false);
                  }
                }}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 w-full"
              onClick={createTestUsers}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              ) : null}
              Create Test Users
            </Button>
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
