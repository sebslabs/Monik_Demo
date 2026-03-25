import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { Target, Eye, Heart, Lightbulb, Users, Shield, TrendingUp, Award } from "lucide-react";

const milestones = [
  { year: "1998", event: "Founded in Colombo with a vision to serve underbanked communities" },
  { year: "2005", event: "Expanded to 10 branches across Western and Southern provinces" },
  { year: "2012", event: "Launched Gold Loan and Leasing products" },
  { year: "2016", event: "Introduced Sip Sahana children's savings program" },
  { year: "2020", event: "Digital transformation — online applications launched" },
  { year: "2024", event: "30+ branches nationwide, serving 50,000+ clients" },
];

const values = [
  { icon: Heart, title: "Integrity", desc: "Honest, transparent dealings in everything we do" },
  { icon: Users, title: "Community", desc: "Empowering local communities through accessible finance" },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing modern solutions for traditional challenges" },
  { icon: Shield, title: "Trust", desc: "Building lasting relationships through reliability" },
];

const leaders = [
  { name: "Mohan Rajapakse", title: "Chairman & CEO", initials: "MR" },
  { name: "Priya Wickramasinghe", title: "Chief Financial Officer", initials: "PW" },
  { name: "Arjun Nadarajah", title: "Chief Operating Officer", initials: "AN" },
];

const About = () => {
  useSEO({
    title: "About Us",
    description: "Learn about Monik International, our 25+ years of empowering Sri Lankan communities, our core values, and our leadership team.",
    keywords: "about Monik International, financial company history, Sri Lanka finance"
  });
  
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      <PageHero
        title="About Monik International"
        subtitle="25+ years of empowering Sri Lankan communities with accessible financial services"
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Our Story */}
      <section className="py-12 md:py-24 section-fade-in">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Our Story</h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 1998, Monik International began with a simple mission: to bring reliable, 
                accessible financial services to communities that traditional banks overlooked. Starting 
                from a single office in Colombo, we have grown into a nationwide network serving over 
                50,000 clients across Sri Lanka.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey has been one of constant growth and adaptation. From microfinance loans to 
                comprehensive business financing, gold loans, and children's savings programs, we have 
                expanded our offerings while staying true to our community-first approach.
              </p>
            </div>
            <div className="relative pl-8 md:pl-0">
              <div className="absolute left-4 md:left-[21px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent rounded-full" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-6 relative group">
                    <div className="absolute left-[-24px] md:relative md:left-0 w-11 h-11 rounded-full bg-white border-4 border-primary/20 shadow-md flex items-center justify-center shrink-0 z-10 group-hover:bg-primary group-hover:border-primary/40 transition-colors duration-300">
                      <span className="text-xs font-bold text-primary group-hover:text-white transition-colors">{m.year.slice(2)}</span>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex-1 group-hover:shadow-md transition-shadow">
                      <p className="font-stats font-bold text-primary text-xl mb-2">{m.year}</p>
                      <p className="text-muted-foreground leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-24 bg-slate-50 section-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-right -z-10" />
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-border/50 shadow-lg shadow-border/20 hover:-translate-y-1 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To provide accessible, transparent, and innovative financial services that empower 
                individuals and businesses across Sri Lanka to achieve their goals and build a secure future.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-10 border border-border/50 shadow-lg shadow-border/20 hover:-translate-y-1 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be Sri Lanka's most trusted and community-focused financial services provider, 
                driving inclusive economic growth from rural villages to urban centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-24 section-fade-in">
        <div className="container">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground text-center mb-4">Our Core Values</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="group text-center bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <v.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-display font-bold text-xl text-foreground mb-3">{v.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-16 bg-card section-fade-in">
        <div className="container">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground text-center mb-4">Leadership Team</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-10" />
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leaders.map((l, i) => (
              <div key={i} className="group text-center bg-white rounded-3xl p-8 border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6 ring-4 ring-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <span className="font-display font-bold text-3xl text-primary">{l.initials}</span>
                </div>
                <h4 className="font-display font-bold text-xl text-foreground mb-1">{l.name}</h4>
                <p className="text-primary font-medium text-sm">{l.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 section-fade-in">
        <div className="container text-center">
          <h2 className="font-display font-extrabold text-3xl text-foreground mb-4">Awards & Recognition</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-8" />
          <div className="flex flex-wrap justify-center gap-6">
            {["Best Microfinance Provider 2023", "Excellence in Community Banking", "Digital Innovation Award 2022"].map((award, i) => (
              <div key={i} className="flex items-center gap-2 bg-card rounded-lg px-5 py-3 border border-border">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default About;
