import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone } from "lucide-react";

const CTABanner = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-900 relative overflow-hidden">
      {/* Premium Gradient Geometric pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-bl from-primary/40 via-primary/10 to-transparent blur-3xl opacity-50 transform rotate-12" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[60%] h-[120%] rounded-full bg-gradient-to-tr from-accent/30 via-accent/5 to-transparent blur-3xl opacity-40 transform -rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-slate-900/80 to-slate-900 opacity-80" />
      </div>
      
      <div className="container py-20 md:py-28 text-center relative z-10">
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white mb-6 drop-shadow-md">
          {t("cta.heading")}
        </h2>
        <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(var(--accent),0.3)]" />
        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("cta.sub")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button variant="cta" size="lg" className="h-14 px-10 text-lg shadow-[0_0_30px_rgba(var(--accent),0.3)] hover:shadow-[0_0_40px_rgba(var(--accent),0.5)] transition-shadow duration-300" asChild>
            <Link to="/contact">{t("cta.book")}</Link>
          </Button>
          <Button size="lg" className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300" asChild>
            <a href="tel:+94112345678">
              <Phone className="w-5 h-5 mr-2" />
              {t("cta.call")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
