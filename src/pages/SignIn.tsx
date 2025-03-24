
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Mail, Phone, Eye, EyeOff, Lock, Facebook, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'signin';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      console.log('Signing in with:', {
        method: loginMethod,
        credential: loginMethod === 'email' ? email : phone,
        password,
        rememberMe
      });
      setIsLoading(false);
      
      // Redirect to home or dashboard in a real app
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      console.log('Registering with:', {
        name,
        method: loginMethod,
        credential: loginMethod === 'email' ? email : phone,
        password,
      });
      setIsLoading(false);
      
      // Show success or redirect in a real app
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social authentication
    setTimeout(() => {
      console.log(`Authenticating with ${provider}`);
      setIsLoading(false);
      
      // Redirect after social auth in a real app
    }, 1500);
  };

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
              <form onSubmit={handleSignIn} className="space-y-6">
                {/* Auth Method Selector */}
                <div className="flex border rounded-md p-1">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 text-sm font-medium py-2 rounded-md transition-colors",
                      loginMethod === 'email' 
                        ? "bg-foreground text-background" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 text-sm font-medium py-2 rounded-md transition-colors",
                      loginMethod === 'phone' 
                        ? "bg-foreground text-background" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setLoginMethod('phone')}
                  >
                    Phone
                  </button>
                </div>
                
                {/* Email/Phone Input */}
                {loginMethod === 'email' ? (
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
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+27 71 234 5678"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                
                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-accent hover:underline"
                    >
                      Forgot password?
                    </Link>
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
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
                    onClick={() => handleSocialAuth('facebook')}
                    disabled={isLoading}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-black hover:bg-gray-100 border-gray-300"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isLoading}
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
                    className="bg-black text-white hover:bg-gray-800 border-none"
                    onClick={() => handleSocialAuth('apple')}
                    disabled={isLoading}
                  >
                    <Apple className="h-4 w-4 mr-2" />
                    Apple
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="animate-fade-in">
              <form onSubmit={handleRegister} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                {/* Auth Method Selector */}
                <div className="flex border rounded-md p-1">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 text-sm font-medium py-2 rounded-md transition-colors",
                      loginMethod === 'email' 
                        ? "bg-foreground text-background" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 text-sm font-medium py-2 rounded-md transition-colors",
                      loginMethod === 'phone' 
                        ? "bg-foreground text-background" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setLoginMethod('phone')}
                  >
                    Phone
                  </button>
                </div>
                
                {/* Email/Phone Input */}
                {loginMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+27 71 234 5678"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                
                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-password"
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
                  <Checkbox id="terms" className="mt-1" required />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or register with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
                    onClick={() => handleSocialAuth('facebook')}
                    disabled={isLoading}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-black hover:bg-gray-100 border-gray-300"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isLoading}
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
                    className="bg-black text-white hover:bg-gray-800 border-none"
                    onClick={() => handleSocialAuth('apple')}
                    disabled={isLoading}
                  >
                    <Apple className="h-4 w-4 mr-2" />
                    Apple
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
