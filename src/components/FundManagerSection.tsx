import { Card } from "@/components/ui/card";
import fundManagerImage from "@/assets/fund-manager.jpg";

const FundManagerSection = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Fund Manager Details
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the professional driving Chetna Wealth's investment strategies and client success.
          </p>
        </div>

        <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Rajesh Kumar Sharma
                </h3>
                <p className="text-lg mb-2 text-primary-foreground/90">Founder & Chief Investment Officer</p>
                
                <div className="space-y-4 text-primary-foreground/90 leading-relaxed">
                  <p>
                    With over 8 years of experience in financial markets and wealth management, 
                    Rajesh brings a unique blend of analytical expertise and client-focused approach to Chetna Wealth.
                  </p>
                  <p>
                    He holds an MBA in Finance from [University Name] and is a SEBI Registered Investment Advisor. 
                    His investment philosophy focuses on risk-adjusted returns and long-term wealth creation 
                    through disciplined portfolio management.
                  </p>
                  <p>
                    Prior to founding Chetna Wealth, he worked with leading financial institutions where 
                    he managed diverse portfolios and developed expertise in algorithmic trading strategies.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">SEBI Registered</span>
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">MBA Finance</span>
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">8+ Years Experience</span>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <img 
                  src={fundManagerImage} 
                  alt="Rajesh Kumar Sharma - Fund Manager" 
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FundManagerSection;
