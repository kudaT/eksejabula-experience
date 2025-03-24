
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    plausible: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  // Optional Google Analytics Measurement ID
  gaId?: string;
  // Optional Plausible site domain
  plausibleDomain?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ 
  gaId = 'G-XXXXXXXXXX',
  plausibleDomain = 'eksejabula.com' 
}) => {
  const location = useLocation();
  
  // Initialize Google Analytics
  useEffect(() => {
    if (gaId) {
      // Load the Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
      
      // Initialize gtag
      window.gtag = function() {
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        send_page_view: false // We'll send page views manually
      });
    }
    
    return () => {
      // Clean up script if component unmounts
      if (gaId) {
        const script = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
        if (script) {
          document.head.removeChild(script);
        }
      }
    };
  }, [gaId]);
  
  // Initialize Plausible
  useEffect(() => {
    if (plausibleDomain) {
      const script = document.createElement('script');
      script.src = 'https://plausible.io/js/script.js';
      script.dataset.domain = plausibleDomain;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [plausibleDomain]);
  
  // Track page views
  useEffect(() => {
    // Google Analytics page view tracking
    if (window.gtag && gaId) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search
      });
    }
    
    // Plausible tracking
    if (window.plausible) {
      window.plausible('pageview');
    }
  }, [location, gaId]);
  
  return null; // This component doesn't render anything
};

// Event tracking functions
export const trackEvent = (
  eventName: string, 
  eventParams?: Record<string, any>
) => {
  // Google Analytics event tracking
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  
  // Plausible event tracking
  if (window.plausible) {
    window.plausible(eventName, { props: eventParams });
  }
};

// Common e-commerce events
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  quantity: number;
}) => {
  trackEvent('add_to_cart', {
    currency: 'ZAR',
    value: product.price * product.quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: product.quantity,
      item_category: product.category
    }]
  });
};

export const trackPurchase = (order: {
  id: string;
  value: number;
  tax?: number;
  shipping?: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }>;
}) => {
  trackEvent('purchase', {
    transaction_id: order.id,
    value: order.value,
    tax: order.tax,
    shipping: order.shipping,
    currency: 'ZAR',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category
    }))
  });
};

export default Analytics;
