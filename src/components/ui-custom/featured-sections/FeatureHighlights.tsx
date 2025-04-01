
import React from 'react';
import { TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';

const FeatureHighlights = () => {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">Why Eksejabula?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're more than just a brand. We're a lifestyle built on quality, creativity, and community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-medium mb-3">Unique Designs</h3>
          <p className="text-muted-foreground">
            Every product is crafted with creativity and attention to detail, ensuring you stand out from the crowd.
          </p>
        </div>
        
        <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-medium mb-3">Premium Quality</h3>
          <p className="text-muted-foreground">
            We use only the highest quality materials to ensure our products last and maintain their beauty.
          </p>
        </div>
        
        <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-medium mb-3">Sustainable Practices</h3>
          <p className="text-muted-foreground">
            Our commitment to the environment means responsible production and minimal waste.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
