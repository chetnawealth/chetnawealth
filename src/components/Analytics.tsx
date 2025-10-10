import { useEffect } from 'react';

// Extend window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const Analytics = () => {
  useEffect(() => {
    // Only load analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics 4 (replace with your tracking ID)
      const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual tracking ID
      
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);

      // Track page views
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default Analytics;
