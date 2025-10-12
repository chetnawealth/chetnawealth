import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MousePointer, Eye, FileText, Box, BarChart3, Sprout, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useToast } from "@/hooks/use-toast";
import chetnaLogo from "@/assets/chetna-logo.png";
import portfolioManagementLottie from "@/assets/portfolio-managment-lottie.json";

const PortfolioManagement = () => {
  const [activeCalculator, setActiveCalculator] = useState('compounding');
  const [currency, setCurrency] = useState('INR');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [timeUnitOpen, setTimeUnitOpen] = useState(false);
  const [loanTimeUnitOpen, setLoanTimeUnitOpen] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [investmentAmountOpen, setInvestmentAmountOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsTitleVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Typewriter component for animated text
  const Typewriter = ({
    text,
    speed = 90,
    startDelay = 0,
  }: {
    text: string;
    speed?: number;
    startDelay?: number;
  }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
      let active = true;
      const timeoutId = setTimeout(() => {
        let i = 0;
        const intervalId = setInterval(() => {
          if (!active) return;
          i += 1;
          setDisplayed(text.slice(0, i));
          if (i >= text.length) clearInterval(intervalId);
        }, speed);
      }, startDelay);
      return () => {
        active = false;
        clearTimeout(timeoutId);
      };
    }, [text, speed, startDelay]);

    return <span>{displayed}</span>;
  };

  // Animated title component with typewriter effect
  const AnimatedTitle = () => {
    return (
      <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
        <span className="bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
          <Typewriter text="Advisory-Only." />
        </span>
        <span className="block bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent mt-2">
          <Typewriter text="Client-Controlled." startDelay={500} />
        </span>
      </h1>
    );
  };
  
  // Calculator states
  const [lumpsum, setLumpsum] = useState('');
  const [sip, setSip] = useState('');
  const [rate, setRate] = useState('');
  const [timeYears, setTimeYears] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  
  // EMI Calculator states
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTime, setLoanTime] = useState('');
  const [loanTimeUnit, setLoanTimeUnit] = useState('years');
  const [investmentAmount, setInvestmentAmount] = useState('');
  
  // Contact form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const currencyMap = {
    'INR': { symbol: '₹', locale: 'en-IN' },
    'USD': { symbol: '$', locale: 'en-US' },
    'GBP': { symbol: '£', locale: 'en-GB' },
    'EUR': { symbol: '€', locale: 'de-DE' }
  };

  const formatCurrency = (amount: number) => {
    const currencyData = currencyMap[currency as keyof typeof currencyMap] || currencyMap['INR'];
    return new Intl.NumberFormat(currencyData.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(amount));
  };

  const calculateCompounding = () => {
    const P = parseFloat(lumpsum) || 0;
    const SIP = parseFloat(sip) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const T = parseFloat(timeYears) || 0;

    if ((P === 0 && SIP === 0) || r === 0 || T === 0) {
      return { maturityValue: 0, totalInvested: 0, totalReturns: 0 };
    }

    const R_annual = r;
    const R_monthly = r / 12;
    const N_years = timeUnit === 'months' ? T / 12 : T;
    const N_months = timeUnit === 'months' ? T : T * 12;

    // Lumpsum calculation
    const FV_Lumpsum = P * Math.pow((1 + R_annual), N_years);
    
    // SIP calculation (annuity due - deposits at start of period)
    let FV_SIP = 0;
    if (SIP > 0 && R_monthly > 0) {
      FV_SIP = SIP * (((Math.pow((1 + R_monthly), N_months) - 1) / R_monthly) * (1 + R_monthly));
    } else if (SIP > 0 && R_monthly === 0) {
      FV_SIP = SIP * N_months;
    }

    const totalMaturityValue = FV_Lumpsum + FV_SIP;
    const totalInvested = P + (SIP * N_months);
    const totalReturns = totalMaturityValue - totalInvested;

    return { 
      maturityValue: Math.max(0, totalMaturityValue), 
      totalInvested: Math.max(0, totalInvested), 
      totalReturns: Math.max(0, totalReturns) 
    };
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(loanRate) || 0;
    let T = parseFloat(loanTime) || 0;
    const unit = loanTimeUnit;

    const N = (unit === 'years') ? T * 12 : T;
    const r = (annualRate / 12) / 100;

    if (P === 0 || N === 0) {
      return { emi: 0, totalInterest: 0, totalPayable: 0 };
    }
    
    let EMI = 0;
    let totalPayable = 0;
    let totalInterest = 0;

    if (r === 0 || annualRate === 0) {
      EMI = P / N;
      totalPayable = P;
      totalInterest = 0;
    } else {
      const numerator = P * r * Math.pow((1 + r), N);
      const denominator = Math.pow((1 + r), N) - 1;
      EMI = numerator / denominator;
      totalPayable = EMI * N;
      totalInterest = totalPayable - P;
    }

    return { 
      emi: Math.max(0, EMI), 
      totalInterest: Math.max(0, totalInterest), 
      totalPayable: Math.max(0, totalPayable) 
    };
  };

  const compoundingResults = calculateCompounding();
  const emiResults = calculateEMI();

  // Contact form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/chetnawealth@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Message: formData.message,
            Investment_Amount: investmentAmount,
            _subject: "New Portfolio Management Advisory Interest from Chetna Wealth website",
          }),
        }
      );

      if (!response.ok) throw new Error("Network error");

      toast({
        title: "Message sent",
        description: "Thank you! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setInvestmentAmount("");
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => window.location.href = '/'}
            >
              <img className="h-8 w-auto mr-2" 
                   src={chetnaLogo} 
                   alt="Chetna Wealth Logo"
              />
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
                  Chetna Wealth.
                </span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium text-primary border border-primary hover:bg-accent/10 transition duration-150">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Two Column Layout */}
      <section className="pt-8 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">NON-DISCRETIONARY PORTFOLIO MANAGEMENT</span>
              <AnimatedTitle />
              <p className="mt-6 text-xl text-muted-foreground">
                You receive our top-tier, research-backed investment strategies and advice. <strong>You maintain complete control</strong> and execute every trade. Clarity, control, and performance—all for a single, transparent fee.
              </p>
              <div className="mt-8">
                <p className="text-4xl font-extrabold text-primary">
                  <span className="bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">2.0% P.A.</span>
                  <span className="text-lg font-medium text-muted-foreground">FIXED ADVISORY FEE</span>
                </p>
              </div>
              <a 
                href="#contact-form" 
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact-form');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl inline-block transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
              >
                Start Your Advisory Mandate
              </a>
            </div>

            {/* Right Side - Lottie Animation */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 lg:w-72 lg:h-72">
                <Lottie 
                  animationData={portfolioManagementLottie} 
                  loop={true} 
                  style={{ width: '100%', height: '100%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Why Non-Discretionary Advisory?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <MousePointer className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Full Control</h3>
              <p className="text-muted-foreground text-base">You receive our trade recommendations; you decide when and how to execute. We advise, you act.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Eye className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Absolute Transparency</h3>
              <p className="text-muted-foreground text-base">Your assets remain in your demat account. No third-party holdings, total visibility on costs and portfolio structure.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <FileText className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Simple Fee Structure</h3>
              <p className="text-muted-foreground text-base">One flat 2.0% annual advisory fee. No performance fees, no hidden costs. What you see is what you pay.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Tools & Calculators Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Financial Tools & Calculators</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">Project your wealth growth and manage your commitments with confidence.</p>
          
          <Card className="p-6 sm:p-8 rounded-2xl bg-secondary/50 border border-accent/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-border pb-4">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button 
                  onClick={() => setActiveCalculator('compounding')}
                  className={`py-2 px-4 text-lg font-semibold transition duration-150 ${
                    activeCalculator === 'compounding' 
                      ? 'border-b-2 border-accent text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Compounding & SIP
                </button>
                <button 
                  onClick={() => setActiveCalculator('emi')}
                  className={`py-2 px-4 text-lg font-semibold transition duration-150 ${
                    activeCalculator === 'emi' 
                      ? 'border-b-2 border-accent text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EMI Calculator
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-muted-foreground">Currency:</label>
                <div className="relative">
                  <button
                    onClick={() => setCurrencyOpen(!currencyOpen)}
                    className="flex items-center justify-between w-32 p-3 border border-border rounded-lg bg-background text-foreground hover:border-accent/50 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                  >
                    <span>{currency === 'INR' ? '₹ (INR)' : currency === 'USD' ? '$ (USD)' : currency === 'GBP' ? '£ (GBP)' : '€ (EUR)'}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {currencyOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => { setCurrency('INR'); setCurrencyOpen(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                      >
                        ₹ (INR)
                      </button>
                      <button
                        onClick={() => { setCurrency('USD'); setCurrencyOpen(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                      >
                        $ (USD)
                      </button>
                      <button
                        onClick={() => { setCurrency('GBP'); setCurrencyOpen(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                      >
                        £ (GBP)
                      </button>
                      <button
                        onClick={() => { setCurrency('EUR'); setCurrencyOpen(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                      >
                        € (EUR)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {activeCalculator === 'compounding' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="lumpsum" className="text-sm font-medium mb-1">Initial Lumpsum Investment (P)</label>
                    <input 
                      type="number" 
                      id="lumpsum" 
                      value={lumpsum} 
                      min="0" 
                      step="1000"
                      placeholder="0"
                      onChange={(e) => setLumpsum(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent ios-fix"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="sip" className="text-sm font-medium mb-1">Monthly SIP Amount</label>
                    <input 
                      type="number" 
                      id="sip" 
                      value={sip} 
                      min="0" 
                      step="100"
                      placeholder="0"
                      onChange={(e) => setSip(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent ios-fix"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="rate" className="text-sm font-medium mb-1">Expected Annual Return Rate (r) %</label>
                    <input 
                      type="number" 
                      id="rate" 
                      value={rate} 
                      min="0" 
                      max="100" 
                      step="0.1"
                      placeholder="0"
                      onChange={(e) => setRate(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent ios-fix"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time-years" className="text-sm font-medium mb-1">Investment Period</label>
                    <div className="flex">
                      <input 
                        type="number" 
                        id="time-years" 
                        value={timeYears} 
                        min="1" 
                        max={timeUnit === 'months' ? "600" : "50"}
                        placeholder="0"
                        onChange={(e) => setTimeYears(e.target.value)}
                        className="p-3 border border-border rounded-l-lg w-3/4 bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                      <div className="relative w-1/4">
                        <button
                          onClick={() => setTimeUnitOpen(!timeUnitOpen)}
                          className="w-full p-3 border border-l-0 border-border rounded-r-lg bg-secondary text-foreground hover:border-accent/50 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 flex items-center justify-between"
                        >
                          <span>{timeUnit === 'years' ? 'Years' : 'Months'}</span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {timeUnitOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => { setTimeUnit('years'); setTimeUnitOpen(false); }}
                              className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                            >
                              Years
                            </button>
                            <button
                              onClick={() => { setTimeUnit('months'); setTimeUnitOpen(false); }}
                              className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                            >
                              Months
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground p-6 rounded-2xl flex flex-col justify-center shadow-xl">
                  <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/20 pb-2">Future Wealth Projection</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm opacity-75">Invested Principal (P + SIPs)</p>
                      <p className="text-xl sm:text-2xl font-bold">{formatCurrency(compoundingResults.totalInvested)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Estimated Total Returns (Interest)</p>
                      <p className="text-xl sm:text-2xl font-bold text-accent">{formatCurrency(compoundingResults.totalReturns)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Maturity Value (Future Value)</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-accent">{formatCurrency(compoundingResults.maturityValue)}</p>
                    </div>
                  </div>
                  <p className="text-xs mt-4 opacity-50">*This is a financial estimate. Actual returns may vary.</p>
                </div>
              </div>
            )}

            {activeCalculator === 'emi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="loan-amount" className="text-sm font-medium mb-1">Loan Principal Amount (P)</label>
                    <input 
                      type="number" 
                      id="loan-amount" 
                      value={loanAmount} 
                      min="0" 
                      step="10000"
                      placeholder="0"
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent ios-fix"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="loan-rate" className="text-sm font-medium mb-1">Annual Interest Rate (r) %</label>
                    <input 
                      type="number" 
                      id="loan-rate" 
                      value={loanRate} 
                      min="0" 
                      max="50" 
                      step="0.1"
                      placeholder="0"
                      onChange={(e) => setLoanRate(e.target.value)}
                      className="p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent ios-fix"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="loan-time" className="text-sm font-medium mb-1">Loan Tenure</label>
                    <div className="flex">
                      <input 
                        type="number" 
                        id="loan-time" 
                        value={loanTime} 
                        min="1" 
                        max={loanTimeUnit === 'months' ? "360" : "30"}
                        placeholder="0"
                        onChange={(e) => setLoanTime(e.target.value)}
                        className="p-3 border border-border rounded-l-lg w-3/4 bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                      <div className="relative w-1/4">
                        <button
                          onClick={() => setLoanTimeUnitOpen(!loanTimeUnitOpen)}
                          className="w-full p-3 border border-l-0 border-border rounded-r-lg bg-secondary text-foreground hover:border-accent/50 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 flex items-center justify-between"
                        >
                          <span>{loanTimeUnit === 'years' ? 'Years' : 'Months'}</span>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {loanTimeUnitOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => { setLoanTimeUnit('years'); setLoanTimeUnitOpen(false); }}
                              className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                            >
                              Years
                            </button>
                            <button
                              onClick={() => { setLoanTimeUnit('months'); setLoanTimeUnitOpen(false); }}
                              className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                            >
                              Months
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground p-6 rounded-2xl flex flex-col justify-center shadow-xl">
                  <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/20 pb-2">Loan Commitment Details</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm opacity-75">Equated Monthly Installment (EMI)</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-accent">{formatCurrency(emiResults.emi)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Total Interest Payable</p>
                      <p className="text-xl sm:text-2xl font-bold">{formatCurrency(emiResults.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-75">Total Amount Payable</p>
                      <p className="text-xl sm:text-2xl font-bold">{formatCurrency(emiResults.totalPayable)}</p>
                    </div>
                  </div>
                  <p className="text-xs mt-4 opacity-50">*Calculations are for indicative monthly reducing balance loans.</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Education & Clarity Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">Education & Clarity: Understanding Your Wealth</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">Empowering our trusted clients with the knowledge to make informed, confident decisions for their betterment.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="p-8 rounded-2xl h-full bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Box className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Level 1: The Basic Structure</h3>
              <p className="text-muted-foreground text-base">
                Your portfolio is constructed using a <strong>Core & Satellite</strong> approach. The <strong>Core</strong> consists of low-volatility, large-cap equities for foundational stability and long-term appreciation. The <strong>Satellite</strong> uses high-growth mid/small-cap companies to potentially deliver alpha. We advise on both segments to maintain optimal diversification and risk-adjusted returns.
              </p>
              <ul className="list-disc list-inside mt-4 text-sm text-foreground space-y-1">
                <li><strong>Risk:</strong> Managed via asset allocation models.</li>
                <li><strong>Liquidity:</strong> Focused on highly liquid assets.</li>
              </ul>
            </Card>
            
            <Card className="p-8 rounded-2xl h-full bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Level 2: Execution & Monitoring</h3>
              <p className="text-muted-foreground text-base">
                Our research team sends a <strong>detailed advisory report</strong> (buy/sell/hold) with clear rationale. You review the advice and execute trades through your own demat account. We provide a dedicated <strong>review schedule</strong> (monthly/quarterly) to discuss performance, economic trends, and necessary rebalancing, ensuring the strategy remains aligned with your financial goals.
              </p>
              <ul className="list-disc list-inside mt-4 text-sm text-foreground space-y-1">
                <li><strong>Rebalancing:</strong> Semi-annual or as market volatility requires.</li>
                <li><strong>Reporting:</strong> Consolidated portfolio reports provided digitally.</li>
              </ul>
            </Card>
            
            <Card className="p-8 rounded-2xl h-full bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Sprout className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Level 3: Long-Term Wealth Creation</h3>
              <p className="text-muted-foreground text-base">
                Our advisory is rooted in the philosophy that time in the market beats timing the market. We prioritize businesses with <strong>strong competitive advantages (moats)</strong> and durable earnings growth. This approach minimizes short-term noise and maximizes the power of compounding, allowing us to serve you best as a <strong>client for life</strong> dedicated to your lasting financial betterment.
              </p>
              <ul className="list-disc list-inside mt-4 text-sm text-foreground space-y-1">
                <li><strong>Focus:</strong> Durable Moats and Compounding Returns.</li>
                <li><strong>Fee Benefit:</strong> 2.0% fee ensures all gains stay with you.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Our Commitment vs. The Industry Standard</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">Compare our transparent advisory model with typical Discretionary PMS fees.</p>

          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="py-4 px-4 text-left text-sm font-extrabold uppercase tracking-wider rounded-tl-xl">Feature</th>
                  <th className="py-4 px-4 text-center text-sm font-extrabold uppercase tracking-wider">Chetna Wealth Advisory (2.0% Fixed)</th>
                  <th className="py-4 px-4 text-center text-sm font-extrabold uppercase tracking-wider rounded-tr-xl">Typical Discretionary PMS (2% Hybrid)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-background">
                  <td className="py-4 px-4 font-semibold text-foreground">Investment Control</td>
                  <td className="py-4 px-4 text-center font-bold text-green-600">CLIENT-CONTROLLED (Non-Discretionary)</td>
                  <td className="py-4 px-4 text-center text-red-600">MANAGER-CONTROLLED (Discretionary)</td>
                </tr>
                <tr className="bg-secondary/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Annual Management Fee</td>
                  <td className="py-4 px-4 text-center font-bold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">2.0% Fixed P.A.</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">1.5% - 2.5% P.A.</td>
                </tr>
                <tr className="bg-background">
                  <td className="py-4 px-4 font-semibold text-foreground">Performance Fee</td>
                  <td className="py-4 px-4 text-center font-bold text-green-600">0% (NONE)</td>
                  <td className="py-4 px-4 text-center font-bold text-red-600">10% - 20% of Profits (Above Hurdle Rate)</td>
                </tr>
                <tr className="bg-secondary/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Your Status / Relationship</td>
                  <td className="py-4 px-4 text-center font-bold text-primary">ONCE A CLIENT, A LIFELONG CLIENT</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">Contractual (Term-based relationship)</td>
                </tr>
                <tr className="bg-background">
                  <td className="py-4 px-4 font-semibold text-foreground">Total Potential Cost</td>
                  <td className="py-4 px-4 text-center font-bold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">2.0% P.A. FLAT</td>
                  <td className="py-4 px-4 text-center font-bold text-red-600">Significantly higher (Management + Performance Fee)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Our model ensures that your success is measured solely by the performance of your portfolio, not by complex, profit-sharing fee structures.
          </p>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-background text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready for Advisory Excellence?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Schedule a meeting to discuss how our Non-Discretionary Advisory model can secure your long-term legacy.
          </p>
          <a 
            href="#contact-form" 
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact-form');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-primary text-primary-foreground px-10 py-3 rounded-xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
          >
            Book My Consultation
          </a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Started with Your Advisory Journey</h2>
            <p className="text-xl text-muted-foreground">
              Ready to take control of your investments? Let's discuss how our Non-Discretionary Advisory can help you achieve your financial goals.
            </p>
          </div>
          
          <Card className="p-8 rounded-2xl bg-secondary/50 border border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors ios-fix"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors ios-fix"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors ios-fix"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="investment-amount" className="block text-sm font-medium text-foreground mb-2">
                    Investment Amount (Optional)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setInvestmentAmountOpen(!investmentAmountOpen)}
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground hover:border-accent/50 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200 flex items-center justify-between"
                    >
                      <span>{investmentAmount === '' ? 'Select investment range' : 
                        investmentAmount === 'under-1lakh' ? 'Under ₹1 Lakh' :
                        investmentAmount === '1-5lakh' ? '₹1 Lakh - ₹5 Lakh' :
                        investmentAmount === '5-10lakh' ? '₹5 Lakh - ₹10 Lakh' :
                        investmentAmount === '10-25lakh' ? '₹10 Lakh - ₹25 Lakh' :
                        investmentAmount === '25-50lakh' ? '₹25 Lakh - ₹50 Lakh' :
                        investmentAmount === 'above-50lakh' ? 'Above ₹50 Lakh' : 'Select investment range'}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {investmentAmountOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10">
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount(''); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          Select investment range
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('under-1lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          Under ₹1 Lakh
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('1-5lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          ₹1 Lakh - ₹5 Lakh
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('5-10lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          ₹5 Lakh - ₹10 Lakh
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('10-25lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          ₹10 Lakh - ₹25 Lakh
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('25-50lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          ₹25 Lakh - ₹50 Lakh
                        </button>
                        <button
                          type="button"
                          onClick={() => { setInvestmentAmount('above-50lakh'); setInvestmentAmountOpen(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                        >
                          Above ₹50 Lakh
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell us about your investment goals and requirements
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                  placeholder="Please share your investment objectives, risk tolerance, and any specific requirements..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Your Interest"}
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll get back to you within 24 hours to discuss your advisory requirements.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* SEBI Regulatory Disclaimer */}
      <section className="py-6 bg-secondary/30 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-red-600 font-bold mb-2 uppercase tracking-wider">
            Regulatory Disclaimer (SEBI Mandate)
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Investment in the securities market is subject to <strong>market risks</strong>, and investors must read all the related documents carefully before investing. Past performance is not indicative of future returns. 
            <span className="block mt-1 font-medium">
              This is an advisory-only model; the <strong>final investment decision, execution, and responsibility for losses or gains rests solely with the client</strong>. Chetna Wealth provides non-discretionary advisory services only.
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <div className="mb-2">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
                Chetna Wealth.
              </span>
            </span>
          </div>
          <p>&copy; 2025 Chetna Wealth. All rights reserved. | Securing Every Milestone.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioManagement;
