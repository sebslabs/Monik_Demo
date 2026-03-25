import { useParams, Link } from "react-router-dom";
import { services } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";
import EMICalculator from "@/components/EMICalculator";
import CTABanner from "@/components/CTABanner";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { Check, ChevronDown, FileText } from "lucide-react";
import { useState } from "react";

import serviceMicrofinance from "@/assets/service-microfinance.png";
import serviceBusiness from "@/assets/service-business.png";
import servicePersonal from "@/assets/service-personal.png";
import serviceGold from "@/assets/service-gold.png";
import serviceLeasing from "@/assets/service-leasing.png";
import serviceSipsahana from "@/assets/service-sipsahana.png";
import serviceMortgage from "@/assets/service-mortgage.png";

import bannerMicrofinance from "@/assets/banner-microfinance.jpg";
import bannerBusiness from "@/assets/banner-business.jpg";
import bannerPersonal from "@/assets/banner-personal.jpg";
import bannerGold from "@/assets/banner-gold.jpg";
import bannerLeasing from "@/assets/banner-leasing.jpg";
import bannerSipsahana from "@/assets/banner-sipsahana.jpg";
import bannerMortgage from "@/assets/banner-mortgage.jpg";

const serviceImages: Record<string, string> = {
  "microfinance-loans": serviceMicrofinance,
  "business-loans": serviceBusiness,
  "personal-loans": servicePersonal,
  "gold-loans": serviceGold,
  "leasing": serviceLeasing,
  "sip-sahana": serviceSipsahana,
  "mortgage-loans": serviceMortgage,
};

const serviceBanners: Record<string, string> = {
  "microfinance-loans": bannerMicrofinance,
  "business-loans": bannerBusiness,
  "personal-loans": bannerPersonal,
  "gold-loans": bannerGold,
  "leasing": bannerLeasing,
  "sip-sahana": bannerSipsahana,
  "mortgage-loans": bannerMortgage,
};

const ServicePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const service = services.find((s) => s.id === id);

  useSEO({
    title: service ? service.title : "Service Not Found",
    description: service ? service.description : "View our premium financial services.",
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Service not found. <Link to="/" className="text-accent">Go home</Link></p>
      </div>
    );
  }

  const bannerImage = serviceBanners[service.id];

  return (
    <div ref={ref}>
      {/* Full-width Hero Banner */}
      {bannerImage && (
        <section className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden">
          <img
            src={bannerImage}
            alt={`${service.title} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/80 via-[hsl(var(--primary))]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end pb-10 md:pb-14">
            <div className="container">
              <h1 className="font-display font-extrabold text-2xl md:text-5xl text-white mb-3 drop-shadow-lg" style={{ lineHeight: 1.1 }}>
                {service.title}
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-2xl drop-shadow">{service.description}</p>
            </div>
          </div>
        </section>
      )}

      {!bannerImage && (
        <PageHero
          title={service.title}
          subtitle={service.description}
          breadcrumbs={[{ label: t("nav.services"), to: "/" }, { label: service.title }]}
        />
      )}



      {/* Features */}
      <section className="py-16 md:py-24 section-fade-in bg-slate-50">
        <div className="container">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4 text-center">Key Features</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.features.map((f, i) => (
              <div key={i} className="group flex items-start gap-4 bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-300">
                  <Check className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-foreground/80 font-medium leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-card section-fade-in">
        <div className="container max-w-3xl">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Eligibility Criteria</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-8" />
          <div className="space-y-3">
            {service.eligibility.map((e, i) => (
              <div key={i} className="flex items-center gap-3 bg-background rounded-lg p-4 border border-border">
                <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-stats font-bold text-xs">{i + 1}</span>
                <p className="text-foreground text-sm">{e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 section-fade-in">
        <div className="container max-w-3xl">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Documents Required</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-8" />
          <div className="space-y-2">
            {service.documents.map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <p className="text-foreground text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI */}
      <section className="py-16 bg-card section-fade-in">
        <div className="container max-w-2xl">
          <EMICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 section-fade-in">
        <div className="container max-w-3xl">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-8" />
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Loan Application Form */}
      <section className="py-16 bg-white section-fade-in border-t border-border/40" id="apply">
        <div className="container max-w-4xl">
          <div className="bg-slate-50/50 rounded-3xl p-8 md:p-12 shadow-inner border border-border/50">
            <LoanApplicationForm serviceName={service.title} />
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-display font-semibold text-foreground text-sm pr-4">{question}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1">
          <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
