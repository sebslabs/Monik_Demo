import { useState } from "react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { jobListings } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Heart, Gift, MapPin, Briefcase, ChevronDown, Send, X } from "lucide-react";

const benefits = [
  { icon: GraduationCap, title: "Training & Development", desc: "Continuous learning programs and professional certifications" },
  { icon: TrendingUp, title: "Career Growth", desc: "Clear progression paths with merit-based promotions" },
  { icon: Heart, title: "Community Impact", desc: "Make a real difference in Sri Lankan communities" },
  { icon: Gift, title: "Benefits Package", desc: "Competitive salary, health insurance, and annual bonuses" },
];

const Careers = () => {
  useSEO({
    title: "Careers",
    description: "Join Monik International and build your career. Explore open positions in finance, technology, and management across Sri Lanka.",
    keywords: "Monik jobs, finance careers Sri Lanka, banking jobs"
  });
  
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", position: "", district: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 3000);
  };

  return (
    <div ref={ref}>
      <PageHero
        title="Build Your Career With Us"
        subtitle="Join a team that's making financial services accessible to every Sri Lankan"
        breadcrumbs={[{ label: t("nav.careers") }]}
      />

      {/* Benefits */}
      <section className="py-12 md:py-16 section-fade-in">
        <div className="container">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground text-center mb-4">Why Work With Us</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="group bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <b.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-display font-bold text-xl text-foreground mb-3">{b.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 md:py-16 bg-card section-fade-in">
        <div className="container max-w-3xl">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Open Positions</h2>
          <div className="w-20 h-1.5 bg-accent rounded-full mb-8" />
          <div className="space-y-4">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-foreground/75 font-medium">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary/50" />{job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary/50" />{job.location}</span>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider text-[10px] font-bold">{job.type}</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0 transition-all duration-300 ${expandedJob === job.id ? "bg-primary text-white rotate-180" : "bg-primary/5 text-primary group-hover:bg-primary/10"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-border/50 pt-5 bg-slate-50/50 animate-fade-up">
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">{job.description}</p>
                    <h4 className="font-display font-bold text-foreground text-lg mb-3">Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map((r, i) => (
                        <li key={i} className="text-foreground/80 flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                          <span className="leading-relaxed">{r}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="cta" size="lg" className="shadow-lg shadow-primary/20 hover:-translate-y-0.5" onClick={() => { setShowForm(true); setFormData((f) => ({ ...f, position: job.title })); }}>
                      <Send className="w-4 h-4 mr-2" /> Apply Now
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-foreground">Apply for {formData.position}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-whatsapp" />
                </div>
                <h4 className="font-display font-bold text-foreground mb-2">Application Submitted!</h4>
                <p className="text-muted-foreground text-sm">We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input required placeholder="Phone (+94)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <textarea placeholder="Cover Letter (optional)" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <Button type="submit" variant="cta" className="w-full">Submit Application</Button>
              </form>
            )}
          </div>
        </div>
      )}

      <CTABanner />
    </div>
  );
};

export default Careers;
