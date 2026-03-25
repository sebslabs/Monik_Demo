import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp, TrendingDown, ShieldCheck, AlertTriangle,
  PiggyBank, Wallet, CreditCard, BarChart3, ChevronRight, CheckCircle2
} from "lucide-react";

interface Metrics {
  score: number;
  savingsRatio: number;
  debtToIncome: number;
  balance: number;
}

const getGrade = (score: number) => {
  if (score >= 80) return { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-100", hex: "#059669" };
  if (score >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-100", hex: "#2563eb" };
  if (score >= 40) return { label: "Fair", color: "text-amber-600", bg: "bg-amber-100", hex: "#d97706" };
  return { label: "Needs Improvement", color: "text-red-600", bg: "bg-red-100", hex: "#dc2626" };
};

const FinancialHealthWidget = () => {
  const { t } = useLanguage();
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [debt, setDebt] = useState("");

  const metrics = useMemo<Metrics | null>(() => {
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    const sav = parseFloat(savings) || 0;
    const dbt = parseFloat(debt) || 0;
    if (inc <= 0) return null;

    const savingsRatio = (sav / inc) * 100;
    const debtToIncome = (dbt / inc) * 100;
    const balance = inc - exp - dbt;

    // Score: savings ratio (40pts), debt-to-income (40pts), balance positive (20pts)
    let score = 0;
    score += Math.min(savingsRatio / 20 * 40, 40); // 20%+ savings = full marks
    score += Math.max(0, (1 - debtToIncome / 50)) * 40; // 0% debt = full, 50%+ = 0
    score += balance > 0 ? 20 : Math.max(0, 20 + (balance / inc) * 20);

    return {
      score: Math.round(Math.max(0, Math.min(100, score))),
      savingsRatio: Math.round(savingsRatio),
      debtToIncome: Math.round(debtToIncome),
      balance: Math.round(balance),
    };
  }, [income, expenses, savings, debt]);

  const grade = metrics ? getGrade(metrics.score) : null;

  const formatLKR = (val: number) => {
    if (Math.abs(val) > 999999) return `${(Math.abs(val) / 1000000).toFixed(1)}M`;
    if (Math.abs(val) > 999) return `${(Math.abs(val) / 1000).toFixed(1)}k`;
    return Math.abs(val).toString();
  };

  return (
    <div className="bg-white rounded-xl border border-border/40 overflow-hidden shadow-premium group flex flex-col lg:flex-row">
      
      {/* Left Column: Form Section */}
      <div className="flex-1 p-6 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl text-foreground leading-tight">Financial Health Check</h3>
            <p className="text-muted-foreground text-sm font-medium mt-1">Free instant assessment tool</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Monthly Income</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Wallet className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                placeholder="LKR 150,000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-input rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Monthly Expenses</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                placeholder="LKR 80,000"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-input rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Monthly Savings</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiggyBank className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                placeholder="LKR 30,000"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-input rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Monthly Debt</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                type="number"
                placeholder="LKR 20,000"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
                className="pl-10 h-12 bg-slate-50 border-input rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <p>Your data is completely secure and is not stored on our servers.</p>
        </div>
      </div>

      {/* Right Column: Dynamic Results Section */}
      <div className="w-full lg:w-5/12 bg-slate-50 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-border flex flex-col items-center justify-center relative">
        
        {!metrics || !grade ? (
          <div className="text-center w-full py-12 px-4">
            <div className="w-20 h-20 rounded-full bg-border/50 flex items-center justify-center mx-auto mb-5 border-4 border-white shadow-sm">
              <BarChart3 className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h4 className="font-display font-bold text-lg text-foreground mb-2">Awaiting Your Details</h4>
            <p className="text-muted-foreground text-sm max-w-[240px] mx-auto">Fill in the fields on the left to instantly generate your financial health score.</p>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col justify-center animate-fade-in-up">
            
            <div className="text-center mb-8 relative">
              <h4 className="font-display font-bold text-lg text-foreground mb-6">Your Score Assessment</h4>
              
              {/* Score Chart */}
              <div className="relative w-44 h-44 mx-auto mb-6 shrink-0">
                <svg className="w-44 h-44 -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-slate-200" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={grade.hex}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${metrics.score * 2.64} 264`}
                    style={{ transition: "stroke-dasharray 1s ease-out" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-stats font-extrabold text-5xl text-foreground tracking-tight">{metrics.score}</span>
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Score</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm shadow-sm ${grade.bg} ${grade.color}`}>
                <CheckCircle2 className="w-4 h-4" /> {grade.label}
              </div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3 w-full bg-white rounded-lg p-4 border border-border/40 shadow-premium">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center">
                    <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  Savings Ratio
                </div>
                <div className={`font-stats font-bold text-base ${metrics.savingsRatio > 15 ? 'text-emerald-600' : 'text-foreground'}`}>
                  {metrics.savingsRatio}%
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center">
                    <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  Debt to Income
                </div>
                <div className={`font-stats font-bold text-base ${metrics.debtToIncome > 40 ? 'text-red-600' : 'text-foreground'}`}>
                  {metrics.debtToIncome}%
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${metrics.balance >= 0 ? "bg-blue-100" : "bg-red-100"}`}>
                    <Wallet className={`w-3.5 h-3.5 ${metrics.balance >= 0 ? "text-blue-600" : "text-red-500"}`} />
                  </div>
                  Net Balance
                </div>
                <div className={`font-stats font-bold text-base ${metrics.balance >= 0 ? 'text-foreground' : 'text-red-600'}`}>
                  {metrics.balance < 0 && "-"}
                  LKR {formatLKR(Math.abs(metrics.balance))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default FinancialHealthWidget;
