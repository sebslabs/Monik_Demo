import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Mail, Briefcase, DollarSign, FileText } from "lucide-react";

interface LoanApplicationFormProps {
  serviceName: string;
}

const LoanApplicationForm = ({ serviceName }: LoanApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    phone: "",
    email: "",
    address: "",
    employment: "",
    monthlyIncome: "",
    loanAmount: "",
    loanPurpose: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2)
      newErrors.fullName = "Full name is required";
    if (!formData.nic.trim() || formData.nic.trim().length < 9)
      newErrors.nic = "Valid NIC number is required";
    if (!formData.phone.trim() || !/^0\d{9}$/.test(formData.phone.trim()))
      newErrors.phone = "Valid phone number required (e.g. 0771234567)";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = "Invalid email address";
    if (!formData.address.trim())
      newErrors.address = "Address is required";
    if (!formData.employment)
      newErrors.employment = "Please select employment type";
    if (!formData.monthlyIncome.trim() || isNaN(Number(formData.monthlyIncome)))
      newErrors.monthlyIncome = "Valid monthly income is required";
    if (!formData.loanAmount.trim() || isNaN(Number(formData.loanAmount)))
      newErrors.loanAmount = "Valid loan amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Application Submitted!",
      description: `Your ${serviceName} application has been received. Our team will contact you within 24 hours.`,
    });

    setFormData({
      fullName: "",
      nic: "",
      phone: "",
      email: "",
      address: "",
      employment: "",
      monthlyIncome: "",
      loanAmount: "",
      loanPurpose: "",
      notes: "",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border/40 p-6 md:p-10 shadow-premium">
      <div className="mb-8">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-2">
          Apply for {serviceName}
        </h2>
        <p className="text-muted-foreground text-sm">
          Fill in your details below and our team will get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Personal Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="e.g. Kamal Perera"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                maxLength={100}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nic">NIC Number *</Label>
              <Input
                id="nic"
                placeholder="e.g. 199012345678"
                value={formData.nic}
                onChange={(e) => handleChange("nic", e.target.value)}
                maxLength={12}
                className={errors.nic ? "border-destructive" : ""}
              />
              {errors.nic && <p className="text-destructive text-xs">{errors.nic}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="e.g. 0771234567"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                maxLength={10}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. kamal@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="address">Residential Address *</Label>
              <Input
                id="address"
                placeholder="e.g. No. 45, Galle Road, Colombo 03"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                maxLength={200}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-destructive text-xs">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Employment & Income */}
        <div>
          <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Employment & Income
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="employment">Employment Type *</Label>
              <Select value={formData.employment} onValueChange={(v) => handleChange("employment", v)}>
                <SelectTrigger className={errors.employment ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="business-owner">Business Owner</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.employment && <p className="text-destructive text-xs">{errors.employment}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="monthlyIncome">Monthly Income (LKR) *</Label>
              <Input
                id="monthlyIncome"
                placeholder="e.g. 75000"
                value={formData.monthlyIncome}
                onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                maxLength={10}
                className={errors.monthlyIncome ? "border-destructive" : ""}
              />
              {errors.monthlyIncome && <p className="text-destructive text-xs">{errors.monthlyIncome}</p>}
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div>
          <h3 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Loan Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="loanAmount">Requested Amount (LKR) *</Label>
              <Input
                id="loanAmount"
                placeholder="e.g. 500000"
                value={formData.loanAmount}
                onChange={(e) => handleChange("loanAmount", e.target.value)}
                maxLength={10}
                className={errors.loanAmount ? "border-destructive" : ""}
              />
              {errors.loanAmount && <p className="text-destructive text-xs">{errors.loanAmount}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="loanPurpose">Purpose of Loan</Label>
              <Input
                id="loanPurpose"
                placeholder="e.g. Home renovation"
                value={formData.loanPurpose}
                onChange={(e) => handleChange("loanPurpose", e.target.value)}
                maxLength={150}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information you'd like to share..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                maxLength={500}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full sm:w-auto shadow-premium font-bold uppercase tracking-wider" disabled={isSubmitting}>
            <FileText className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
          <p className="text-muted-foreground text-xs mt-3">
            By submitting this form, you agree to our terms and conditions. Your information will be kept confidential.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
