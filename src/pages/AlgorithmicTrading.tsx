import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Shield, Clock, Target, BarChart3, Zap, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useToast } from "@/hooks/use-toast";
import chetnaLogo from "@/assets/chetna-logo.png";
import algorithmicTradingLottie from "@/assets/algorithmic-trading-lottie.json";

const AlgorithmicTrading = () => {
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
          <Typewriter text="Algorithmic Trading" />
        </span>
        <span className="block bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent mt-2">
          <Typewriter text="Services" startDelay={500} />
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
            _subject: "New Algorithmic Trading Interest from Chetna Wealth website",
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
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">ALGORITHMIC TRADING SERVICES</span>
              <AnimatedTitle />
              <p className="mt-6 text-xl text-muted-foreground">
                Fully automated trading fund targeting superior returns by exploiting short-term market inefficiencies using proprietary algorithms.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">22% APR</p>
                  <p className="text-sm text-muted-foreground">Target Returns</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">₹1,00,000</p>
                  <p className="text-sm text-muted-foreground">Min. Investment</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">6 Months</p>
                  <p className="text-sm text-muted-foreground">Lock-in Period</p>
                </div>
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
                Start Trading
              </a>
            </div>

            {/* Right Side - Lottie Animation */}
            <div className="flex justify-center">
              <div className="w-64 h-64 lg:w-72 lg:h-72">
                <Lottie 
                  animationData={algorithmicTradingLottie} 
                  loop={true} 
                  style={{ width: '100%', height: '100%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">How Our Algorithmic Trading Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automated Execution</h3>
              <p className="text-muted-foreground text-base">24/7 automated trading without human intervention, capturing opportunities around the clock.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Inefficiencies</h3>
              <p className="text-muted-foreground text-base">Exploiting short-term market inefficiencies using proprietary algorithms and data analysis.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-muted-foreground text-base">Advanced risk management protocols to protect your capital while maximizing returns.</p>
            </Card>
            
            <Card className="p-6 rounded-xl bg-secondary/50 border border-accent/20 hover:shadow-lg transition-all duration-300">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-muted-foreground text-base">Continuous monitoring and optimization of trading strategies for optimal performance.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Performance Highlights</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">Proven track record of delivering superior returns through algorithmic trading.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">22% APR</h3>
              <p className="text-muted-foreground">Target Annual Returns</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">4-8% Kicker</h3>
              <p className="text-muted-foreground">Additional Performance Bonus</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">6 Months</h3>
              <p className="text-muted-foreground">Minimum Lock-in Period</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Algorithmic Trading Journey</h2>
            <p className="text-xl text-muted-foreground">
              Ready to leverage automated trading for superior returns? Let's discuss your investment goals and get you started.
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
                  <select
                    id="investment-amount"
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors ios-fix"
                  >
                    <option value="">Select investment range</option>
                    <option value="1-2lakh">₹1 Lakh - ₹2 Lakh</option>
                    <option value="2-5lakh">₹2 Lakh - ₹5 Lakh</option>
                    <option value="5-10lakh">₹5 Lakh - ₹10 Lakh</option>
                    <option value="10-25lakh">₹10 Lakh - ₹25 Lakh</option>
                    <option value="25-50lakh">₹25 Lakh - ₹50 Lakh</option>
                    <option value="above-50lakh">Above ₹50 Lakh</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell us about your trading goals and risk tolerance
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none ios-fix"
                  placeholder="Please share your trading objectives, risk tolerance, and any specific requirements..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Start Trading"}
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  We'll get back to you within 24 hours to discuss your algorithmic trading requirements.
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
          <p>&copy; 2025 Chetna Wealth. All rights reserved. | Automated Trading Excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default AlgorithmicTrading;
