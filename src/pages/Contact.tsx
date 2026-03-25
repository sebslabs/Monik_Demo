import { useState } from "react";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { services, sriLankanDistricts } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with Monik International for inquiries, feedback, or financial consultation. Find our head office details and contact info.",
  });
  
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", service: "", district: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div ref={ref}>
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out for any inquiries or consultations."
        breadcrumbs={[{ label: t("nav.contact") }]}
      />

      <section className="py-12 md:py-24 section-fade-in">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-display font-extrabold text-2xl text-foreground mb-2">Send Us a Message</h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              {submitted ? (
                <div className="bg-card rounded-xl p-8 border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Our team will get back to you within 24 hours.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder="Phone (+94)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Service Interested In</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                    <select required value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Your District</option>
                      {sriLankanDistricts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <textarea required placeholder="Your Message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  <p className="text-xs text-muted-foreground">By submitting, you agree to our Privacy Policy and Terms of Service.</p>
                  <Button type="submit" variant="cta" size="lg" className="w-full">Send Message</Button>
                </form>
              )}

              <a
                href="https://wa.me/94112345678?text=Hello!%20I'd%20like%20to%20inquire%20about%20Monik%20International's%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 h-12 md:h-14 rounded-lg border-2 border-[#25D366] text-[#25D366] font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp Instead
              </a>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-display font-extrabold text-2xl text-foreground mb-2">Contact Information</h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-6" />
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-border/50 shadow-xl shadow-primary/5 space-y-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[100px] -z-0" />
                
                <div className="flex items-start gap-5 relative z-10 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-lg mb-1">Head Office</p>
                    <p className="text-muted-foreground leading-relaxed">No. 42, Galle Road, Colombo 03, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-lg mb-1">Phone</p>
                    <p className="text-muted-foreground leading-relaxed">+94 11 234 5678 (Main)<br/>+94 11 234 5679 (Hotline)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-lg mb-1">Email</p>
                    <p className="text-muted-foreground leading-relaxed">info@monikinternational.lk<br/>support@monikinternational.lk</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 relative z-10 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Clock className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-lg mb-1">Business Hours</p>
                    <p className="text-muted-foreground leading-relaxed">Mon-Fri: 8:30 AM - 5:00 PM<br/>Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border h-72">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=79.84%2C6.91%2C79.88%2C6.94&layer=mapnik&marker=6.9271%2C79.8612"
                  className="w-full h-full"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
