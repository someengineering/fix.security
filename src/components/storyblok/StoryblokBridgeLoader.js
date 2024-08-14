'use client'; // Ensure this component runs on the client side

import { useEffect } from 'react';

const StoryblokBridgeLoader = () => {
  useEffect(() => {
    // Only load the Storyblok Bridge if we're in the Storyblok Visual Editor
    if (window.location.search.includes('_storyblok')) {
      const script = document.createElement('script');
      script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {};

      return () => {
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return null;
};

export default StoryblokBridgeLoader;
