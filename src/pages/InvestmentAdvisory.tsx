import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, TrendingUp, Shield, Users, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useToast } from "@/hooks/use-toast";
import chetnaLogo from "@/assets/chetna-logo.png";
import investmentAdvisoryLottie from "@/assets/investment-advisory-lottie.json";

const InvestmentAdvisory = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
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
          <Typewriter text="Strategic Investment" />
        </span>
        <span className="block bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent mt-2">
          <Typewriter text="Advisory Services" startDelay={500} />
        </span>
      </h1>
    );
  };

  // Contact form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
            _subject: "New Investment Advisory Interest from Chetna Wealth website",
          }),
        }
      );

      if (!response.ok) throw new Error("Network error");

      toast({
        title: "Message sent",
        description: "Thank you! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
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
              <AnimatedTitle />
              <p className="mt-6 text-xl text-muted-foreground">
                Strategic guidance from experienced advisors to help you make informed investment decisions. We provide personalized advice tailored to your financial goals and risk tolerance.
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
                className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl inline-block transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
              >
                Get Expert Advice
              </a>
            </div>

            {/* Right Side - Lottie Animation */}
            <div className="flex justify-center">
              <div className="w-64 h-64 lg:w-72 lg:h-72">
                <Lottie 
                  animationData={investmentAdvisoryLottie} 
                  loop={true} 
                  style={{ width: '100%', height: '100%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Our Advisory Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customized Financial Planning</h3>
              <p className="text-muted-foreground text-base">Personalized financial roadmaps tailored to your unique goals, timeline, and risk profile.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Target className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Retirement Planning</h3>
              <p className="text-muted-foreground text-base">Comprehensive strategies to secure your financial future and achieve retirement goals.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Loan and Capital Management</h3>
              <p className="text-muted-foreground text-base">Strategic debt management and capital allocation for optimal financial health.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crypto Currency Advisory</h3>
              <p className="text-muted-foreground text-base">Expert guidance on digital assets and cryptocurrency investments with risk management.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">International Investing</h3>
              <p className="text-muted-foreground text-base">Global investment strategies and forex advisory for diversified portfolios.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
              <p className="text-muted-foreground text-base">Comprehensive risk analysis and mitigation strategies for your investment portfolio.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Why Choose Our Advisory Services?</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">Experience the difference of expert guidance tailored to your financial success.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
              <p className="text-muted-foreground text-sm">Years of successful investment guidance and client satisfaction.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
              <p className="text-muted-foreground text-sm">Comprehensive risk assessment and mitigation strategies.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Approach</h3>
              <p className="text-muted-foreground text-sm">Tailored strategies based on your unique financial situation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Goal-Oriented</h3>
              <p className="text-muted-foreground text-sm">Clear roadmap to achieve your financial objectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Your Personalized Investment Advice</h2>
            <p className="text-xl text-muted-foreground">
              Ready to make informed investment decisions? Let's discuss your financial goals and create a strategy that works for you.
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
                  <label htmlFor="investment-goals" className="block text-sm font-medium text-foreground mb-2">
                    Investment Goals (Optional)
                  </label>
                  <select
                    id="investment-goals"
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors ios-fix"
                  >
                    <option value="">Select your primary goal</option>
                    <option value="retirement">Retirement Planning</option>
                    <option value="wealth-building">Wealth Building</option>
                    <option value="education">Education Fund</option>
                    <option value="home-purchase">Home Purchase</option>
                    <option value="debt-management">Debt Management</option>
                    <option value="other">Other</option>
                  </select>
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
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none ios-fix"
                  placeholder="Please share your investment objectives, risk tolerance, and any specific requirements..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Get Expert Advice"}
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll get back to you within 24 hours to discuss your advisory requirements.
                </p>
              </div>
            </form>
          </Card>
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
          <p>&copy; 2025 Chetna Wealth. All rights reserved. | Strategic Investment Guidance.</p>
        </div>
      </footer>
    </div>
  );
};

export default InvestmentAdvisory;
