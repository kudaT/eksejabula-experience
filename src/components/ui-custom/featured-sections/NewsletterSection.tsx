
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { subscribeToNewsletter } from '@/lib/utils';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setEmail('');
        setSubmitMessage(result.message);
      } else {
        setSubmitMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-foreground text-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Join Our Community
          </h2>
          <p className="text-background/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new releases, and creative inspiration.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
            <Button 
              className="bg-white text-foreground hover:bg-white/90"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          {submitMessage && (
            <p className="mt-4 text-sm text-background/90">{submitMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
