import { useState, useMemo, useCallback } from "react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import BranchMap from "@/components/BranchMap";
import { branches, provinces } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { MapPin, Phone, Clock, ExternalLink, Search, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const Branches = () => {
  useSEO({
    title: "Our Branches",
    description: "Find a Monik International branch near you. We have over 30 branches across Sri Lanka ready to assist with your financial needs.",
    keywords: "Monik branches, find financial branch Sri Lanka, branch locations"
  });
  
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<(typeof branches)[0] | null>(null);

  const handleBranchSelect = useCallback((branch: (typeof branches)[0]) => {
    setSelectedBranch(branch);
  }, []);

  const filtered = useMemo(() => {
    return branches.filter((b) => {
      const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.address.toLowerCase().includes(search.toLowerCase()) || b.district.toLowerCase().includes(search.toLowerCase());
      const matchProvince = !province || b.province === province;
      return matchSearch && matchProvince;
    });
  }, [search, province]);

  return (
    <div ref={ref}>
      <PageHero
        title="Find a Branch Near You"
        subtitle="Visit any of our 30+ branches across Sri Lanka"
        breadcrumbs={[{ label: t("nav.branches") }]}
      />

      {/* Filters */}
      <section className="py-6 md:py-8 sticky top-[64px] lg:top-[80px] z-30 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-2xl shadow-lg border border-border/50">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by branch name, city, or district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
              />
            </div>
            <div className="w-px bg-border/50 hidden sm:block my-2" />
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="px-4 py-3 rounded-xl bg-transparent text-foreground focus:outline-none sm:w-[220px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_16px_center] bg-no-repeat font-medium"
            >
              <option value="">All Provinces</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 bg-card section-fade-in">
        <div className="container">
          <h2 className="font-display font-extrabold text-2xl text-foreground mb-6 flex items-center gap-2">
            <Map className="w-6 h-6 text-primary" />
            Branch Map
          </h2>
          <div className="rounded-xl overflow-hidden border border-border h-[320px] md:h-[480px]">
            <BranchMap
              branches={filtered}
              selectedBranch={selectedBranch}
              onMarkerClick={handleBranchSelect}
            />
          </div>
          <p className="text-muted-foreground text-xs mt-3">Click a branch card below or a map pin to view details.</p>
        </div>
      </section>

      {/* Branch Grid */}
      <section className="py-12 section-fade-in">
        <div className="container">
          <p className="text-muted-foreground font-medium mb-8">{filtered.length} branches found</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b, i) => (
              <div
                key={i}
                className={`group bg-white rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
                  selectedBranch?.name === b.name
                    ? "border-primary ring-4 ring-primary/10 shadow-xl scale-[1.02] bg-primary/5"
                    : "border-border/60 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1"
                }`}
                onClick={() => handleBranchSelect(b)}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedBranch?.name === b.name ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  {selectedBranch?.name === b.name && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Selected</span>
                  )}
                </div>
                
                <h3 className="font-display font-bold text-xl text-foreground mb-4">{b.name}</h3>
                
                <div className="space-y-3 text-sm text-foreground/75 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/50" />
                    <span className="leading-relaxed">{b.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 shrink-0 text-primary/50" />
                    <span className="font-medium">{b.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 shrink-0 mt-0.5 text-primary/50" />
                    <span>{b.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                  <a
                    href={`https://maps.google.com/?q=${b.lat},${b.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Directions <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No branches found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
};

export default Branches;
