
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      console.log("Signing in with:", { method: 'email', credential: email, password });
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You have been successfully signed in",
      });
      
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email to confirm your account.",
      });
      
      // Switch to sign in tab
      setActiveTab('signin');
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

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
        }
      });
      
      if (error) throw error;
      
      // The redirect will happen automatically
      toast({
        title: "Redirecting",
        description: `Redirecting to ${provider} for authentication`,
      });
    } catch (error: any) {
      console.error(`Error with ${provider} auth:`, error);
      toast({
        title: "Authentication failed",
        description: error.message || `Failed to authenticate with ${provider}`,
        variant: "destructive",
      });
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
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
            defaultValue="signin" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSignIn}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button variant="link" size="sm" className="px-0 h-auto font-normal text-xs" asChild>
                            <a href="/reset-password">Forgot password?</a>
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="relative w-full mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('google')}
                      disabled={isLoading}
                      className="bg-white text-black hover:bg-gray-100 border-gray-300"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('facebook')}
                      disabled={isLoading}
                      className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('apple')}
                      disabled={isLoading}
                      className="bg-black text-white hover:bg-gray-800 border-none"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.7023 0C15.0371 0.100888 13.0773 1.33511 12.0466 2.88883C11.1249 4.2758 10.3522 6.29855 10.8075 8.2689C12.6352 8.31484 14.5493 7.05592 15.5414 5.4847C16.4538 4.03897 17.1285 2.05878 16.7023 0Z" />
                        <path d="M21.8852 8.13986C20.5464 6.43844 18.6257 5.4303 16.8276 5.4303C14.425 5.4303 13.4053 6.50542 11.8961 6.50542C10.3385 6.50542 8.97539 5.43578 6.9129 5.43578C4.93387 5.43578 2.75832 6.70545 1.40566 8.90079C-0.559598 12.3258 0.0380345 18.6545 3.63839 23.1902C4.83379 24.8357 6.41737 26.6751 8.44091 26.6751C10.327 26.6751 11.0109 25.3673 13.4133 25.3673C15.8167 25.3673 16.4436 26.6751 18.3931 26.6751C20.4161 26.6751 22.1298 24.5914 23.3247 22.9463C24.2276 21.6872 24.5783 21.0781 25.3548 19.5235C20.5826 17.5968 19.9578 10.9129 21.8852 8.13986Z" />
                      </svg>
                      Apple
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSignUp}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            className="pl-10"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5 mt-1">
                          <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 accent-primary"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="text-gray-500">
                            I agree to the{" "}
                            <a href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="relative w-full mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('google')}
                      disabled={isLoading}
                      className="bg-white text-black hover:bg-gray-100 border-gray-300"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('facebook')}
                      disabled={isLoading}
                      className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialAuth('apple')}
                      disabled={isLoading}
                      className="bg-black text-white hover:bg-gray-800 border-none"
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.7023 0C15.0371 0.100888 13.0773 1.33511 12.0466 2.88883C11.1249 4.2758 10.3522 6.29855 10.8075 8.2689C12.6352 8.31484 14.5493 7.05592 15.5414 5.4847C16.4538 4.03897 17.1285 2.05878 16.7023 0Z" />
                        <path d="M21.8852 8.13986C20.5464 6.43844 18.6257 5.4303 16.8276 5.4303C14.425 5.4303 13.4053 6.50542 11.8961 6.50542C10.3385 6.50542 8.97539 5.43578 6.9129 5.43578C4.93387 5.43578 2.75832 6.70545 1.40566 8.90079C-0.559598 12.3258 0.0380345 18.6545 3.63839 23.1902C4.83379 24.8357 6.41737 26.6751 8.44091 26.6751C10.327 26.6751 11.0109 25.3673 13.4133 25.3673C15.8167 25.3673 16.4436 26.6751 18.3931 26.6751C20.4161 26.6751 22.1298 24.5914 23.3247 22.9463C24.2276 21.6872 24.5783 21.0781 25.3548 19.5235C20.5826 17.5968 19.9578 10.9129 21.8852 8.13986Z" />
                      </svg>
                      Apple
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
