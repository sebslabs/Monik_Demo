import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const EMICalculator = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(14);
  const [tenure, setTenure] = useState(24);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const emiVal =
      monthlyRate > 0
        ? (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
          (Math.pow(1 + monthlyRate, tenure) - 1)
        : amount / tenure;
    const totalPay = emiVal * tenure;
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(totalPay - amount),
      totalPayment: Math.round(totalPay),
    };
  }, [amount, rate, tenure]);

  const formatLKR = (n: number) =>
    "LKR " + n.toLocaleString("en-LK");

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-premium border border-border/40">
      <h3 className="font-display font-bold text-xl mb-6 text-foreground">{t("emi.heading")}</h3>

      <div className="space-y-5">
        {/* Amount */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-foreground">{t("emi.amount")}</label>
            <span className="font-stats font-semibold text-primary">{formatLKR(amount)}</span>
          </div>
          <input
            type="range"
            min={25000}
            max={10000000}
            step={25000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>LKR 25,000</span>
            <span>LKR 10,000,000</span>
          </div>
        </div>

        {/* Rate */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-foreground">{t("emi.rate")}</label>
            <span className="font-stats font-semibold text-primary">{rate}%</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="font-medium text-foreground">{t("emi.tenure")}</label>
            <span className="font-stats font-semibold text-primary">{tenure} months</span>
          </div>
          <input
            type="range"
            min={3}
            max={240}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>3 months</span>
            <span>240 months</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-background rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("emi.monthly")}</p>
          <p className="font-stats font-bold text-lg text-primary">{formatLKR(emi)}</p>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("emi.totalInterest")}</p>
          <p className="font-stats font-bold text-lg text-accent">{formatLKR(totalInterest)}</p>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("emi.totalPayment")}</p>
          <p className="font-stats font-bold text-lg text-foreground">{formatLKR(totalPayment)}</p>
        </div>
      </div>

      <Button className="w-full mt-5 shadow-premium py-6 uppercase tracking-wider font-bold" asChild>
        <Link to="/contact">{t("emi.apply")}</Link>
      </Button>
    </div>
  );
};

export default EMICalculator;
