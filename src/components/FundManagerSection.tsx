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
                  Vishwesh Kotha
                </h3>
                <p className="text-lg mb-2 text-primary-foreground/90">Founder & Chief Investment Officer</p>
                
                <div className="space-y-4 text-primary-foreground/90 leading-relaxed">
                  <p>
                    <strong>Welcome!</strong><br />
                    I am Vishwesh Kotha, founder and fund manager of Chetna Wealth. With a Master's degree in International Finance and Investments from Northumbria University (UK) and an extensive background in financial modeling, derivatives, and quantitative research, my journey has been deeply rooted in both the practical and analytical fields of modern finance. My career spans hands-on roles in investment analysis, financial advisory, and operational strategy, blending global best practices with an innovative, client-centric approach.
                  </p>
                  <p>
                    At Chetna Wealth, our vision is to deliver transparent, reliable, and technologically advanced solutions for wealth creation and financial growth. My proficiency in Bloomberg, Excel, Python, and quantitative tools enables us to offer clients sophisticated, evidence-driven portfolio management, algorithmic fund strategies, and bespoke advisory services.
                  </p>
                  <p>
                    Our business is built on integrity, professionalism, and a genuine commitment to our clients' success. Whether supporting your personal wealth journey, optimizing business finance, managing risk, or pioneering algorithmic trading avenues, we are dedicated to empowering you with actionable insights and robust financial solutions.
                  </p>
                  <p>
                    Thank you for considering Chetna Wealth as your trusted partner for investment, trading, and financial decision support. Together, let's turn informed decisions into enduring prosperity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">ROC Registered</span>
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">MSC International Finance and Investments</span>
                  <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm">Registered Investment Advisor</span>
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
