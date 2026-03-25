import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("monik-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("monik-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("monik-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[400px] z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-white border border-border/60 shadow-2xl rounded-2xl p-4 md:p-5 shadow-primary/10">
        <div className="flex gap-4">
          <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your experience. By browsing, you agree to our{" "}
              <a href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</a>.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={decline} className="flex-1 rounded-xl">
                Decline
              </Button>
              <Button size="sm" onClick={accept} className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
