import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { useSEO } from "@/hooks/use-seo";
import { services, testimonials, newsItems } from "@/lib/data";
import EMICalculator from "@/components/EMICalculator";
import CTABanner from "@/components/CTABanner";
import HeroSlider from "@/components/HeroSlider";
import FinancialHealthWidget from "@/components/FinancialHealthWidget";
import {
  Shield, Clock, Award, Users, MapPin, Star, ChevronRight,
  Calculator, CreditCard, Landmark, FileText, ArrowRight, Quote
} from "lucide-react";

const CountUpStat = ({ value, label, isLast }: { value: string; label: string; isLast: boolean }) => {
  const { ref, display } = useCountUp(value, 2000);
  return (
    <div className="text-center relative group">
      <p ref={ref as React.RefObject<HTMLParagraphElement>} className="font-stats font-bold text-2xl sm:text-3xl md:text-5xl text-white mb-2 md:mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-500">
        {display}
      </p>
      <div className="w-8 md:w-10 h-1 bg-accent mx-auto mb-2 md:mb-3 rounded-full opacity-50 group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
      <p className="text-slate-400 font-medium tracking-wider uppercase text-[10px] sm:text-xs md:text-sm px-1 sm:px-0 leading-tight">{label}</p>
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
      )}
    </div>
  );
};

const Index = () => {
  useSEO({
    title: "Smart Financial Solutions for Sri Lanka",
    description: "Monik International offers premium microfinance, business loans, gold loans, and leasing solutions across Sri Lanka with transparent, fast, and secure digital processes.",
    keywords: "loans Sri Lanka, microfinance, business loans, gold loans, leasing, Monik International"
  });
  
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const stats = [
    { value: "25+", label: t("stats.years") },
    { value: "50,000+", label: t("stats.clients") },
    { value: "LKR 10Bn+", label: t("stats.assets") },
    { value: "30+", label: t("stats.branches") },
  ];

  const whyItems = [
    { icon: MapPin, title: t("why.local"), desc: t("why.localDesc") },
    { icon: Clock, title: t("why.fast"), desc: t("why.fastDesc") },
    { icon: Shield, title: t("why.transparent"), desc: t("why.transparentDesc") },
    { icon: Users, title: t("why.support"), desc: t("why.supportDesc") },
  ];

  return (
    <div ref={revealRef} className="bg-background overflow-x-hidden">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Quick Actions Bar (Banking App Style for Mobile) */}
      <div className="relative z-20 -mt-6 md:-mt-12 mb-12 md:mb-24 px-2 sm:px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-xl shadow-premium py-5 px-2 md:p-6 border border-border/40 grid grid-cols-4 gap-1 sm:gap-4 md:gap-6">
            {[
              { icon: CreditCard, label: "Apply Loan", desc: "Get funds quickly", link: "/services/personal-loans" },
              { icon: Calculator, label: "Calculator", desc: "Calculate payments", link: "#calculator" },
              { icon: FileText, label: "Latest Rates", desc: "View current rates", link: "/news" },
              { icon: MapPin, label: "Find Branch", desc: "Locate a branch", link: "/branches" }
            ].map((action, i) => (
              <Link 
                key={i} 
                to={action.link} 
                className="group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-4 p-1 md:p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300 text-primary group-hover:text-white shadow-sm md:shadow-none">
                  <action.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex flex-col justify-center flex-1 w-full mx-auto md:mx-0">
                  <h4 className="font-display font-bold text-foreground text-[11px] leading-tight sm:text-xs md:text-base group-hover:text-primary transition-colors max-w-[75px] md:max-w-none mx-auto md:mx-0 break-words">{action.label}</h4>
                  <p className="text-muted-foreground text-xs hidden md:block mt-1">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-12 md:py-20 section-fade-in bg-slate-50">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-foreground mb-4">
              {t("services.heading")}
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("services.sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group relative bg-white rounded-lg p-6 md:p-8 border border-border/60 hover:border-transparent overflow-hidden min-h-[260px] md:min-h-[300px] flex flex-col justify-end shadow-sm hover:shadow-premium-hover transition-all duration-500"
              >
                {/* Background image - fully revealed on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Dark/Primary Gradient Overlay on hover for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-20" />

                {/* Content */}
                <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white/20 transition-colors duration-500 backdrop-blur-sm">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 md:mb-3 group-hover:text-white transition-colors duration-500">{service.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 md:mb-6 group-hover:text-white/90 transition-colors duration-500 hidden sm:block">{service.description}</p>
                  <span className="text-accent text-xs md:text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-500 group-hover:text-white mt-auto">
                    {t("services.learnMore")} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services/microfinance-loans">{t("services.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="bg-footer py-12 md:py-20 section-fade-in relative overflow-hidden">
        {/* Abstract dark map/pattern background */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-primary/5" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, i) => (
              <CountUpStat key={i} value={stat.value} label={stat.label} isLast={i === stats.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-32 section-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left -z-10" />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-foreground mb-4">
                {t("why.heading")}
              </h2>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed">{t("why.sub")}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {whyItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Digital Process) */}
      <section className="py-16 md:py-32 section-fade-in bg-white">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display font-extrabold text-2xl md:text-5xl text-foreground mb-4">
              Simple. Fast. Digital.
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4 md:px-0">
              Get the financing you need in three simple steps, without the traditional banking hassle.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-1 bg-primary/10 rounded-full" />
            <div className="hidden md:block absolute top-[45px] left-[15%] w-[35%] h-1 bg-primary rounded-full" />
            
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: Shield, title: "1. Apply Online", desc: "Fill out our secure, 2-minute digital application." },
                { icon: Clock, title: "2. Quick Approval", desc: "Our AI-driven system processes your request instantly." },
                { icon: Landmark, title: "3. Receive Funds", desc: "Cash is deposited directly into your bank account." }
              ].map((step, i) => (
                <div key={i} className="relative text-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-white rounded-full border-4 border-primary/10 flex items-center justify-center mb-4 md:mb-6 relative z-10 group-hover:border-primary/30 transition-all duration-500 shadow-sm group-hover:shadow-premium">
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 md:mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed px-4 md:px-0">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="calculator" className="py-16 md:py-32 bg-slate-50 section-fade-in border-t border-border/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-xs md:text-sm text-primary font-bold mb-6">
                <Calculator className="w-4 h-4" /> Try Our Calculator
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-5xl text-foreground mb-4 md:mb-6 leading-tight">
                Plan Your Finances <span className="text-primary">With Confidence</span>
              </h2>
              <div className="w-20 h-1.5 bg-accent rounded-full mb-6" />
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                Use our intuitive EMI calculator to estimate your monthly installments. Adjust the loan amount, interest rate, and terms to find a repayment plan that perfectly suits your budget.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Transparent calculations with no hidden fees",
                  "Flexible tenure options up to 60 months",
                  "Instant estimates to help your planning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium text-sm md:text-base">
                    <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-xl" asChild>
                <Link to="/contact">Apply Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3 scale-105 -z-10" />
              <div className="bg-white rounded-3xl shadow-xl shadow-border/50 p-2 md:p-6 border border-border/60">
                <EMICalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 md:py-24 section-fade-in">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-foreground mb-4">
              {t("news.heading")}
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsItems.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to="/news"
                className="group bg-card rounded-xl overflow-hidden card-lift border border-border"
              >
                <div className="h-44 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">{t("news.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials (Animated & Premium UI) */}
      <section className="py-16 md:py-32 section-fade-in bg-slate-50 relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16 animate-fade-up">
            <h2 className="font-display font-extrabold text-2xl md:text-5xl text-foreground mb-4 md:mb-6">
              {t("testimonials.heading")}
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-xl p-6 md:p-8 border border-border/40 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
              >
                <Quote className="absolute top-6 right-8 w-16 h-16 text-primary/5 -z-0 rotate-180 transition-transform group-hover:scale-110 duration-500" />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8 text-yellow-500">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-8 leading-relaxed line-clamp-4 relative z-10">"{item.quote}"</p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xl ring-2 ring-white shadow-md">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">{item.name}</h4>
                      <p className="text-sm text-primary font-medium">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Health Check */}
      <section className="py-16 md:py-24 section-fade-in bg-white border-t border-border/40">
        <div className="container max-w-5xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-display font-extrabold text-2xl md:text-5xl text-foreground mb-4">
              Check Your Financial Health
            </h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4 md:px-0">
              Get an instant assessment of your financial standing and see how you can improve your score with Monik.
            </p>
          </div>
          <FinancialHealthWidget />
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default Index;
