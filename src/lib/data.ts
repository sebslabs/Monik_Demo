import { Banknote, Briefcase, User, Coins, Car, PiggyBank, Home } from "lucide-react";
import serviceMicrofinance from "@/assets/service-microfinance.jpg";
import serviceBusiness from "@/assets/service-business.jpg";
import servicePersonal from "@/assets/service-personal.jpg";
import serviceGold from "@/assets/service-gold.jpg";
import serviceLeasing from "@/assets/service-leasing.jpg";
import serviceSavings from "@/assets/service-savings-children.jpg";
import serviceMortgage from "@/assets/service-mortgage.jpg";

export const services = [
  {
    id: "microfinance-loans",
    icon: Banknote,
    image: serviceMicrofinance,
    title: "Microfinance Loans",
    description: "Small-scale loans designed for rural entrepreneurs and low-income households to kickstart their ventures.",
    features: [
      "Loan amounts from LKR 25,000 to LKR 500,000",
      "Flexible repayment schedules",
      "Group lending options available",
      "No collateral required for small loans",
      "Weekly or monthly repayment options",
      "Financial literacy training included",
    ],
    eligibility: [
      "Sri Lankan citizen aged 18-60",
      "Resident of the branch service area",
      "Valid NIC and proof of address",
      "Minimum 6 months in current occupation",
    ],
    documents: [
      "National Identity Card (NIC)",
      "Proof of residence (utility bill)",
      "Income verification documents",
      "Two passport-size photographs",
      "Guarantor's NIC copy",
    ],
    faqs: [
      { q: "What is the maximum loan amount?", a: "Microfinance loans range from LKR 25,000 to LKR 500,000 depending on your repayment capacity and credit history." },
      { q: "Do I need collateral?", a: "No collateral is required for loans up to LKR 100,000. Group guarantees may be accepted." },
      { q: "How long does approval take?", a: "Typically 2-3 business days after submitting all required documents." },
      { q: "Can I repay weekly?", a: "Yes, we offer both weekly and monthly repayment schedules to suit your cash flow." },
      { q: "Is there a grace period?", a: "A grace period of up to 2 weeks is available for first-time borrowers." },
    ],
  },
  {
    id: "business-loans",
    icon: Briefcase,
    image: serviceBusiness,
    title: "Business Loans",
    description: "Fuel your SME growth with competitive business financing, working capital loans, and trade finance solutions.",
    features: [
      "Loan amounts up to LKR 50 million",
      "Competitive interest rates from 12% p.a.",
      "Working capital & expansion financing",
      "Trade finance solutions",
      "Flexible tenure up to 60 months",
      "Dedicated relationship manager",
    ],
    eligibility: [
      "Registered business in Sri Lanka",
      "Minimum 1 year of business operations",
      "Valid business registration documents",
      "Satisfactory financial statements",
    ],
    documents: [
      "Business registration certificate",
      "Financial statements (2 years)",
      "Bank statements (6 months)",
      "Tax returns and compliance certificates",
      "Business plan (for new ventures)",
      "Collateral documents if applicable",
    ],
    faqs: [
      { q: "What types of businesses qualify?", a: "All registered Sri Lankan businesses including sole proprietorships, partnerships, and private limited companies." },
      { q: "What is the interest rate?", a: "Rates start from 12% p.a. depending on the loan type, tenure, and collateral provided." },
      { q: "Can I get a loan for a new business?", a: "Yes, but a detailed business plan and additional guarantees may be required." },
      { q: "How quickly can I receive funds?", a: "Approved loans are typically disbursed within 5-7 business days." },
      { q: "Is collateral mandatory?", a: "For loans above LKR 5 million, collateral may be required." },
    ],
  },
  {
    id: "personal-loans",
    icon: User,
    image: servicePersonal,
    title: "Personal / Consumer Loans",
    description: "Flexible personal loans for education, medical expenses, home improvements, and life's important moments.",
    features: [
      "Loan amounts from LKR 50,000 to LKR 5 million",
      "Quick disbursement within 48 hours",
      "No prepayment penalties",
      "Competitive interest rates",
      "Flexible tenure from 6-48 months",
      "Salary-based fast-track approval",
    ],
    eligibility: [
      "Sri Lankan citizen aged 21-55",
      "Minimum monthly income of LKR 30,000",
      "Permanent or contract employment",
      "Good credit history",
    ],
    documents: [
      "National Identity Card",
      "Salary slips (3 months)",
      "Bank statements (3 months)",
      "Employment confirmation letter",
      "Utility bill for address proof",
    ],
    faqs: [
      { q: "What can I use a personal loan for?", a: "Personal loans can be used for education, medical expenses, home renovation, weddings, or any personal need." },
      { q: "How fast is the disbursement?", a: "Salary-verified applicants can receive funds within 48 hours of approval." },
      { q: "Are there prepayment charges?", a: "No, we do not charge any prepayment penalties." },
      { q: "What is the maximum tenure?", a: "Personal loans can be repaid over 6 to 48 months." },
      { q: "Can self-employed individuals apply?", a: "Yes, with additional income documentation and business proof." },
    ],
  },
  {
    id: "gold-loans",
    icon: Coins,
    image: serviceGold,
    title: "Gold Loans",
    description: "Instant cash against your gold jewelry with the highest per-gram rates, safe storage, and flexible repayment.",
    features: [
      "Highest per-gram valuation rates",
      "Instant disbursement within 30 minutes",
      "Secure vault storage with insurance",
      "Interest-only repayment option",
      "No income proof required",
      "Multiple renewal options",
    ],
    eligibility: [
      "Sri Lankan citizen aged 18+",
      "Valid NIC",
      "Ownership of gold jewelry (18K+)",
      "No income documentation needed",
    ],
    documents: [
      "National Identity Card",
      "Gold jewelry for valuation",
      "Proof of address",
    ],
    faqs: [
      { q: "What purity of gold is accepted?", a: "We accept gold jewelry of 18 karats and above." },
      { q: "How is the gold valued?", a: "Our certified valuers assess your gold on-site using industry-standard methods." },
      { q: "Is my gold safe?", a: "All gold is stored in secure, insured vaults with 24/7 surveillance." },
      { q: "Can I repay only the interest?", a: "Yes, interest-only payments are accepted with principal due at maturity." },
      { q: "What happens if I can't repay?", a: "We offer multiple renewal and restructuring options before any recovery action." },
    ],
  },
  {
    id: "leasing",
    icon: Car,
    image: serviceLeasing,
    title: "Leasing",
    description: "Affordable vehicle and equipment leasing with flexible terms, quick approvals, and competitive rates.",
    features: [
      "Cars, vans, motorcycles, and three-wheelers",
      "Equipment and machinery leasing",
      "Up to 80% financing",
      "Flexible tenure from 12-60 months",
      "Quick approval process",
      "Comprehensive insurance options",
    ],
    eligibility: [
      "Sri Lankan citizen or registered business",
      "Valid driving license (for vehicles)",
      "Minimum income requirements met",
      "Down payment of at least 20%",
    ],
    documents: [
      "National Identity Card",
      "Driving license",
      "Income proof / salary slips",
      "Vehicle quotation / invoice",
      "Down payment receipt",
      "Guarantor documents",
    ],
    faqs: [
      { q: "What vehicles can I lease?", a: "Cars, vans, motorcycles, three-wheelers, and commercial vehicles are all eligible." },
      { q: "What is the minimum down payment?", a: "A minimum of 20% of the vehicle value is required as down payment." },
      { q: "Can businesses apply for leasing?", a: "Yes, registered businesses can lease vehicles and equipment." },
      { q: "Is insurance included?", a: "Comprehensive insurance can be bundled into your lease payments." },
      { q: "What happens at the end of the lease?", a: "You gain full ownership of the asset after completing all payments." },
    ],
  },
  {
    id: "sip-sahana",
    icon: PiggyBank,
    image: serviceSavings,
    title: "Sip Sahana (Children's Savings)",
    description: "Secure your child's future with our dedicated savings plan offering attractive interest rates and rewards.",
    features: [
      "Competitive interest rates up to 12% p.a.",
      "Minimum deposit from LKR 500",
      "Birthday and milestone rewards",
      "Education milestone bonuses",
      "Parent-friendly digital tracking",
      "Free savings passbook",
    ],
    eligibility: [
      "Sri Lankan citizen (parent/guardian)",
      "Child aged 0-18 years",
      "Valid NIC of parent/guardian",
      "Birth certificate of child",
    ],
    documents: [
      "Parent/Guardian NIC",
      "Child's birth certificate",
      "Proof of address",
      "Two passport-size photos of child",
    ],
    faqs: [
      { q: "What age can a child start?", a: "Accounts can be opened from birth up to 18 years of age." },
      { q: "What is the minimum deposit?", a: "You can start with as little as LKR 500." },
      { q: "Are there any rewards?", a: "Yes! Children receive birthday gifts and education milestone bonuses." },
      { q: "Can I withdraw money?", a: "Partial withdrawals are allowed for education-related expenses." },
      { q: "What happens when my child turns 18?", a: "The account converts to a regular savings account with accumulated interest." },
    ],
  },
  {
    id: "mortgage-loans",
    icon: Home,
    image: serviceMortgage,
    title: "Mortgage Loans",
    description: "Finance your dream home or property investment with competitive mortgage rates and long-term repayment plans.",
    features: [
      "Loan amounts up to LKR 100 million",
      "Competitive rates from 10% p.a.",
      "Tenure up to 20 years",
      "Up to 70% of property value",
      "Construction financing available",
      "Refinancing options",
    ],
    eligibility: [
      "Sri Lankan citizen aged 21-55",
      "Stable income source",
      "Clear title deed for property",
      "Down payment of at least 30%",
    ],
    documents: [
      "National Identity Card",
      "Income proof / salary slips",
      "Property title deed",
      "Valuation report",
      "Survey plan",
      "Building plan approval",
      "Bank statements (6 months)",
    ],
    faqs: [
      { q: "What is the maximum loan amount?", a: "Mortgage loans are available up to LKR 100 million based on property value and income." },
      { q: "Can I finance a construction?", a: "Yes, construction financing with staged disbursements is available." },
      { q: "What is the interest rate?", a: "Rates start from 10% p.a. depending on tenure and loan amount." },
      { q: "Can I refinance an existing mortgage?", a: "Yes, we offer competitive refinancing options." },
      { q: "How long does approval take?", a: "Mortgage approvals typically take 7-14 business days." },
    ],
  },
];

export const branches = [
  { name: "Colombo Main Branch", address: "No. 42, Galle Road, Colombo 03", phone: "+94 11 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM", district: "Colombo", province: "Western", lat: 6.9271, lng: 79.8612 },
  { name: "Kandy Branch", address: "No. 15, Dalada Veediya, Kandy", phone: "+94 81 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Kandy", province: "Central", lat: 7.2906, lng: 80.6337 },
  { name: "Galle Branch", address: "No. 78, Main Street, Galle", phone: "+94 91 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Galle", province: "Southern", lat: 6.0535, lng: 80.2210 },
  { name: "Negombo Branch", address: "No. 23, Lewis Place, Negombo", phone: "+94 31 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Gampaha", province: "Western", lat: 7.2008, lng: 79.8358 },
  { name: "Kurunegala Branch", address: "No. 56, Colombo Road, Kurunegala", phone: "+94 37 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Kurunegala", province: "North Western", lat: 7.4863, lng: 80.3623 },
  { name: "Jaffna Branch", address: "No. 12, Hospital Road, Jaffna", phone: "+94 21 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Jaffna", province: "Northern", lat: 9.6615, lng: 80.0255 },
  { name: "Matara Branch", address: "No. 34, Anagarika Dharmapala Mw, Matara", phone: "+94 41 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Matara", province: "Southern", lat: 5.9549, lng: 80.5550 },
  { name: "Batticaloa Branch", address: "No. 8, Bar Road, Batticaloa", phone: "+94 65 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Batticaloa", province: "Eastern", lat: 7.7310, lng: 81.6747 },
  { name: "Anuradhapura Branch", address: "No. 67, Main Street, Anuradhapura", phone: "+94 25 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Anuradhapura", province: "North Central", lat: 8.3114, lng: 80.4037 },
  { name: "Ratnapura Branch", address: "No. 21, Main Street, Ratnapura", phone: "+94 45 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Ratnapura", province: "Sabaragamuwa", lat: 6.6828, lng: 80.3992 },
  { name: "Badulla Branch", address: "No. 5, Passara Road, Badulla", phone: "+94 55 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Badulla", province: "Uva", lat: 6.9934, lng: 81.0550 },
  { name: "Trincomalee Branch", address: "No. 14, Dockyard Road, Trincomalee", phone: "+94 26 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Trincomalee", province: "Eastern", lat: 8.5874, lng: 81.2152 },
  { name: "Nuwara Eliya Branch", address: "No. 3, Badulla Road, Nuwara Eliya", phone: "+94 52 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Nuwara Eliya", province: "Central", lat: 6.9497, lng: 80.7891 },
  { name: "Chilaw Branch", address: "No. 29, Colombo Road, Chilaw", phone: "+94 32 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Puttalam", province: "North Western", lat: 7.5758, lng: 79.7953 },
  { name: "Hambantota Branch", address: "No. 11, Main Street, Hambantota", phone: "+94 47 234 5678", hours: "Mon-Fri: 8:30 AM - 5:00 PM", district: "Hambantota", province: "Southern", lat: 6.1429, lng: 81.1212 },
];

export const testimonials = [
  { name: "Kamal Perera", location: "Colombo", rating: 5, quote: "Monik International helped me start my small grocery business with a microfinance loan. The process was simple and the staff were very supportive.", avatar: "KP" },
  { name: "Selvi Rajaratnam", location: "Jaffna", rating: 5, quote: "I got my gold loan within 30 minutes! The rates were better than anywhere else, and I felt my jewelry was safe.", avatar: "SR" },
  { name: "Nimal Bandara", location: "Kandy", rating: 5, quote: "The Sip Sahana account for my daughter has been wonderful. She loves getting her birthday rewards every year.", avatar: "NB" },
  { name: "Fatima Nawaz", location: "Batticaloa", rating: 4, quote: "Their business loan helped me expand my textile shop. The dedicated manager made everything easy to understand.", avatar: "FN" },
  { name: "Ruwan Silva", location: "Galle", rating: 5, quote: "I leased my three-wheeler through Monik and the monthly payments are very manageable. Great service!", avatar: "RS" },
];

export const newsItems = [
  { id: 1, title: "Monik International Opens 30th Branch in Hambantota", excerpt: "Expanding our reach to serve more communities in the Southern Province with accessible financial services.", date: "2024-01-15", category: "Company News", image: "/src/assets/news-thumb-1.jpg" },
  { id: 2, title: "New Digital Gold Loan Application Now Available", excerpt: "Apply for gold loans from the comfort of your home with our new digital application process.", date: "2024-01-10", category: "Announcements", image: "/src/assets/news-thumb-2.jpg" },
  { id: 3, title: "5 Tips to Manage Your Small Business Finances", excerpt: "Expert advice on cash flow management, budgeting, and growth planning for Sri Lankan SMEs.", date: "2024-01-05", category: "Financial Tips", image: "/src/assets/news-thumb-3.jpg" },
  { id: 4, title: "Sip Sahana Scholarship Awards Ceremony 2024", excerpt: "Celebrating 50 young students who excelled academically with our Sip Sahana scholarship program.", date: "2023-12-20", category: "Company News", image: "/src/assets/news-thumb-1.jpg" },
  { id: 5, title: "Understanding Leasing vs. Loan: What's Right for You?", excerpt: "A comprehensive guide to help you choose between leasing and a traditional vehicle loan.", date: "2023-12-15", category: "Financial Tips", image: "/src/assets/news-thumb-2.jpg" },
  { id: 6, title: "Year-End Special: Reduced Interest Rates on Personal Loans", excerpt: "Take advantage of our limited-time offer with reduced rates on all personal loan products.", date: "2023-12-01", category: "Announcements", image: "/src/assets/news-thumb-3.jpg" },
];

export const jobListings = [
  { id: 1, title: "Branch Manager", department: "Operations", location: "Colombo", type: "Full-time", description: "Lead branch operations, manage staff, and drive business growth in the Colombo region.", requirements: ["5+ years in financial services", "Strong leadership skills", "Bachelor's degree in Business/Finance", "Fluent in Sinhala and English"] },
  { id: 2, title: "Loan Officer", department: "Credit", location: "Kandy", type: "Full-time", description: "Assess loan applications, conduct field visits, and manage client relationships.", requirements: ["2+ years lending experience", "Knowledge of credit assessment", "Valid driving license", "Local language proficiency"] },
  { id: 3, title: "IT Systems Administrator", department: "Technology", location: "Colombo", type: "Full-time", description: "Maintain and improve our core banking systems and IT infrastructure.", requirements: ["3+ years in IT administration", "Experience with banking software", "Network and security certifications", "Bachelor's degree in IT/CS"] },
  { id: 4, title: "Customer Service Executive", department: "Customer Service", location: "Multiple Locations", type: "Full-time", description: "Provide excellent customer service, handle inquiries, and support branch operations.", requirements: ["1+ year in customer service", "Excellent communication skills", "Computer literacy", "Trilingual preferred"] },
  { id: 5, title: "Marketing Coordinator", department: "Marketing", location: "Colombo", type: "Contract", description: "Plan and execute marketing campaigns, manage social media, and coordinate events.", requirements: ["2+ years in marketing", "Digital marketing skills", "Creative mindset", "Bachelor's degree in Marketing"] },
];

export const sriLankanDistricts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
  "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
];

export const provinces = [
  "Western", "Central", "Southern", "Northern", "Eastern",
  "North Western", "North Central", "Uva", "Sabaragamuwa",
];
