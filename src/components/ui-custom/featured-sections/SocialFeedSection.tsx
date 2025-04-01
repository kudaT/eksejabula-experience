
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InstagramFeed from '@/components/ui-custom/InstagramFeed';

const SocialFeedSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Follow Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the Eksejabula community on Instagram.
          </p>
        </div>
        
        <InstagramFeed postCount={6} />
        
        <div className="text-center mt-10">
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <a 
              href="https://www.instagram.com/eksejabula?igsh=cndqOW8zczNwdTM4&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              Follow @eksejabula
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialFeedSection;
