
import { Facebook, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialAuthProps {
  isLoading: boolean;
  onSocialAuth: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
}

export function SocialAuth({ isLoading, onSocialAuth }: SocialAuthProps) {
  return (
    <>
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
          onClick={() => onSocialAuth('facebook')}
          disabled={isLoading}
          aria-label="Sign in with Facebook"
        >
          <Facebook className="h-4 w-4 mr-2" aria-hidden="true" />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          className="bg-white text-black hover:bg-gray-100 border-gray-300"
          onClick={() => onSocialAuth('google')}
          disabled={isLoading}
          aria-label="Sign in with Google"
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
          onClick={() => onSocialAuth('apple')}
          disabled={isLoading}
          aria-label="Sign in with Apple"
        >
          <Apple className="h-4 w-4 mr-2" aria-hidden="true" />
          Apple
        </Button>
      </div>
    </>
  );
}
