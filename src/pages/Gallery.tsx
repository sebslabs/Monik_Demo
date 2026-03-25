import { useState } from "react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/use-seo";
import { Maximize2, X } from "lucide-react";

// Placeholder images
const galleryCategories = ["All", "Events", "Branches", "Community", "Awards"];

const galleryImages = [
  { id: 1, category: "Events", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", title: "Annual General Meeting 2023" },
  { id: 2, category: "Community", src: "https://images.unsplash.com/photo-1593113589914-009c95b3990a?auto=format&fit=crop&q=80&w=800", title: "Rural Development Program" },
  { id: 3, category: "Branches", src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800", title: "Colombo Head Office" },
  { id: 4, category: "Awards", src: "https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=800", title: "Best Microfinance Provider" },
  { id: 5, category: "Community", src: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800", title: "Financial Literacy Workshop" },
  { id: 6, category: "Events", src: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800", title: "Staff Leadership Retreat" },
  { id: 7, category: "Branches", src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800", title: "Galle Branch Opening" },
  { id: 8, category: "Awards", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800", title: "Excellence in Banking" },
  { id: 9, category: "Events", src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800", title: "New Year Celebrations" },
];

const Gallery = () => {
  useSEO({
    title: "Gallery",
    description: "Explore the Monik Life. View our community events, award ceremonies, and branch inaugurations.",
  });
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{src: string, title: string} | null>(null);
  const { t } = useLanguage();
  const ref = useScrollReveal();

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div ref={ref} className="min-h-screen">
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through our milestones, community engagements, and the events that shape Monik International."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <section className="py-16 md:py-24 section-fade-in">
        <div className="container">
          
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground text-center mb-4">Life at Monik</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-12" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-primary/5 text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-100 aspect-[4/3] shadow-md border border-border/50 animate-fade-up"
                onClick={() => setLightboxImage({src: image.src, title: image.title})}
              >
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 shadow-lg">
                      {image.category}
                    </span>
                    <h3 className="text-white font-display font-bold text-xl mb-1">{image.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-3 font-medium">
                      <Maximize2 className="w-4 h-4" /> View Full Image
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-10 md:py-20 text-muted-foreground">
              No images found for this category.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="max-w-5xl w-full max-h-[90vh] relative mt-8"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.title} 
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white font-display font-bold text-2xl">{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      <CTABanner />
    </div>
  );
};

export default Gallery;
