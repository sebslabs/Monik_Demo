import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight, ChevronLeft, Shield, Award, Users, Landmark } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    image: heroSlide1,
    headingKey: "hero.heading",
    subKey: "hero.sub",
    alt: "Sri Lankan family outside a modern finance branch",
  },
  {
    image: heroSlide2,
    headingKey: "hero.heading2",
    subKey: "hero.sub2",
    alt: "Small business owner thriving with financial support",
  },
  {
    image: heroSlide3,
    headingKey: "hero.heading3",
    subKey: "hero.sub3",
    alt: "Beautiful Sri Lankan countryside landscape",
  },
];

const HeroSlider = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              {/* Image */}
              <div className="relative h-[560px] md:h-[680px] lg:h-[760px]">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="container px-4 md:px-6">
                  <div className="max-w-3xl animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm text-primary-foreground font-medium mb-4 md:mb-6 shadow-xl">
                      <Landmark className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                      {t("hero.badge")}
                    </div>
                    <h1
                      className="font-display font-extrabold text-3xl leading-[1.15] sm:text-4xl md:text-5xl lg:text-[4rem] md:leading-[1.1] text-white mb-3 md:mb-5 tracking-tight drop-shadow-md max-w-[100vw]"
                      style={{ textWrap: "balance" }}
                    >
                      {t(slide.headingKey)}
                    </h1>
                    <p className="text-white/90 text-sm md:text-xl leading-relaxed mb-6 md:mb-10 max-w-xl font-light">
                      {t(slide.subKey)}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold uppercase tracking-wider shadow-premium hover:shadow-premium-hover transition-all h-12 md:h-14 px-4 md:px-8 rounded-md w-full sm:w-auto text-xs md:text-sm"
                        asChild
                      >
                        <Link to="/contact">{t("hero.cta1")}</Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/40 text-white hover:bg-white/10 hover:border-white/80 active:scale-[0.98] transition-all h-12 md:h-14 px-4 md:px-8 font-bold uppercase tracking-wider rounded-md w-full sm:w-auto text-xs md:text-sm"
                        asChild
                      >
                        <Link to="/services/microfinance-loans">
                          {t("hero.cta2")}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    {/* Trust badges */}
                    <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-4 mt-6 md:mt-0">
                      {[
                        { icon: Shield, label: t("hero.trust1") },
                        { icon: Award, label: t("hero.trust2") },
                        { icon: Users, label: t("hero.trust3") },
                      ].map((badge, j) => (
                        <div key={j} className="flex items-center gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm text-primary-foreground/90 font-medium">
                          <badge.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-accent" />
                          {badge.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 items-center justify-center text-primary-foreground hover:bg-white/25 transition-colors active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 items-center justify-center text-primary-foreground hover:bg-white/25 transition-colors active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-8 bg-accent"
                : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
