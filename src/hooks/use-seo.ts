import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function useSEO({ title, description, keywords, ogImage }: SEOProps) {
  useEffect(() => {
    // Determine the full title
    const fullTitle = `${title} | Monik International`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (selector.includes("name=")) {
          element.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] || "");
        } else if (selector.includes("property=")) {
          element.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] || "");
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMetaTag('meta[name="description"]', "content", description);
    
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // Open Graph meta tags for better social sharing
    setMetaTag('meta[property="og:title"]', "content", fullTitle);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:type"]', "content", "website");
    
    if (ogImage) {
      setMetaTag('meta[property="og:image"]', "content", ogImage);
    }
  }, [title, description, keywords, ogImage]);
}
