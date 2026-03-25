import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import monikLogo from "@/assets/monik-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { services } from "@/lib/data";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <img src={monikLogo} alt="Monik International" className="h-8 md:h-10 brightness-0 invert mx-auto md:mx-0" />
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm mx-auto md:mx-0">
              Premium microfinance, business loans, and leasing solutions across Sri Lanka with transparent, fast, and secure digital processes.
            </p>
            <div className="flex gap-3 mb-8 justify-center md:justify-start">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            {/* Trust Badges Minimal */}
            <div className="flex items-center gap-4 text-xs font-semibold text-footer-foreground/60 uppercase tracking-wider">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div>Secure 256-bit</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent"></div>Regulated</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wider text-accent">{t("footer.services")}</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="text-sm text-footer-foreground/70 hover:text-accent transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wider text-accent">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: t("nav.about") },
                { to: "/branches", label: t("nav.branches") },
                { to: "/careers", label: t("nav.careers") },
                { to: "/gallery", label: t("nav.gallery") },
                { to: "/news", label: t("nav.news") },
                { to: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-footer-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm mb-4 uppercase tracking-wider text-accent">{t("footer.contactUs")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-footer-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                No. 42, Galle Road, Colombo 03, Sri Lanka
              </li>
              <li className="flex items-center gap-2 text-sm text-footer-foreground/70">
                <Phone className="w-4 h-4 shrink-0" />
                +94 11 234 5678
              </li>
              <li className="flex items-center gap-2 text-sm text-footer-foreground/70">
                <Mail className="w-4 h-4 shrink-0" />
                info@monikinternational.lk
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-footer-foreground/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-footer-foreground/50">
          <p>{t("footer.copyright")}</p>
          <p>{t("footer.central")}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-footer-foreground transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-footer-foreground transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
