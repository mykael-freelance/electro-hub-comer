"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, this would submit to an API
      setSubscribed(true);
      setEmail('');
      // Reset the subscribed state after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, new product announcements, and tech tips delivered directly to your inbox.
          </p>
          
          {subscribed ? (
            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}