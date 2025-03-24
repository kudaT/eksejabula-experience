
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
  variant?: 'default' | 'simple' | 'accent';
}

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  className,
  variant = 'default'
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 relative",
        variant === 'default' && "bg-card border shadow-sm",
        variant === 'simple' && "bg-transparent",
        variant === 'accent' && "bg-accent text-accent-foreground",
        className
      )}
    >
      <Quote 
        className={cn(
          "absolute h-8 w-8 -top-4 left-6",
          variant === 'default' && "text-muted-foreground opacity-20",
          variant === 'simple' && "text-muted-foreground opacity-20",
          variant === 'accent' && "text-accent-foreground opacity-30"
        )}
      />
      <div className="pt-2">
        <p className="text-lg leading-relaxed">"{quote}"</p>
        <div className="mt-6 flex items-center">
          {avatar && (
            <img 
              src={avatar} 
              alt={author} 
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
          )}
          <div>
            <p className="font-medium">{author}</p>
            {role && (
              <p className="text-sm text-muted-foreground">{role}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
