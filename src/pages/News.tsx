import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { newsItems } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { BarChart3, ChevronRight } from "lucide-react";

const categories = ["All", "Company News", "Financial Tips", "Announcements"];

const News = () => {
  useSEO({
    title: "News & Insights",
    description: "Stay updated with the latest company news, financial tips, and announcements from Monik International.",
  });

  const { t } = useLanguage();
  const ref = useScrollReveal();
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? newsItems : newsItems.filter((n) => n.category === category);

  return (
    <div ref={ref}>
      <PageHero
        title="News & Insights"
        subtitle="Stay updated with the latest from Monik International"
        breadcrumbs={[{ label: t("nav.news") }]}
      />

      <section className="py-12 section-fade-in">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 gap-2 mb-8 sm:flex-wrap snap-x scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-none snap-start px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  category === cat
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm scale-105"
                    : "bg-white text-muted-foreground border border-border/60 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <article key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-border/50 flex flex-col">
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col border-t border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">{item.category}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{item.excerpt}</p>
                  <span className="text-accent text-sm font-semibold flex items-center gap-1">
                    {t("news.readMore")} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
