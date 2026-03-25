import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Banknote, Briefcase, User, Coins, Car, PiggyBank, Home } from "lucide-react";
import monikLogo from "@/assets/monik-logo.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const serviceLinks = [
  { to: "/services/microfinance-loans", icon: Banknote, label: "Microfinance Loans" },
  { to: "/services/business-loans", icon: Briefcase, label: "Business Loans" },
  { to: "/services/personal-loans", icon: User, label: "Personal / Consumer Loans" },
  { to: "/services/gold-loans", icon: Coins, label: "Gold Loans" },
  { to: "/services/leasing", icon: Car, label: "Leasing" },
  { to: "/services/sip-sahana", icon: PiggyBank, label: "Sip Sahana" },
  { to: "/services/mortgage-loans", icon: Home, label: "Mortgage Loans" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const langs: Array<{ code: "en" | "si" | "ta"; label: string }> = [
    { code: "en", label: "EN" },
    { code: "si", label: "සි" },
    { code: "ta", label: "த" },
  ];

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/branches", label: t("nav.branches") },
    { to: "/news", label: t("nav.news") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border/40" : "bg-white/90 backdrop-blur-md shadow-sm border-b border-border/20"
      )}
    >
      <div className="container px-4 md:px-8 mx-auto flex items-center justify-between transition-all duration-300 h-16 lg:h-24">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={monikLogo} alt="Monik International" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "text-primary bg-primary/5"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname.startsWith("/services")
                  ? "text-primary bg-primary/5"
                  : "text-foreground/70 hover:text-primary hover:bg-primary/5"
              )}
            >
              {t("nav.services")}
              <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-border p-3 animate-fade-up">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <s.icon className="w-4 h-4 text-primary" />
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-semibold transition-colors",
                location.pathname === link.to
                  ? "text-primary bg-primary/5"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher - Hidden on mobile */}
          <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden text-xs">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={cn(
                  "px-2 py-1.5 font-medium transition-colors",
                  language === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/5"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Button variant="default" size="sm" className="hidden sm:flex shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 px-6 py-5 rounded-md font-bold text-[13px] uppercase tracking-wider" asChild>
            <Link to="/contact">Open Account</Link>
          </Button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground focus:outline-none hover:bg-black/5 rounded-md transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-t border-border shadow-2xl animate-fade-up max-h-[85vh] overflow-y-auto">
          <div className="container px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">{t("nav.services")}</p>
              {serviceLinks.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-foreground/70 hover:text-primary"
                >
                  <s.icon className="w-4 h-4 text-primary" />
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border mt-2 space-y-4">
              {/* Mobile Language Switcher */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Language</p>
                <div className="flex items-center gap-2">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                        language === l.code
                          ? "bg-primary text-primary-foreground border-primary"
                          : "text-foreground hover:bg-primary/5 border-border"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button variant="default" className="w-full shadow-premium py-6 uppercase tracking-wider font-bold" asChild>
                <Link to="/contact">Open Account</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
