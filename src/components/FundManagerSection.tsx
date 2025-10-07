import { Card } from "@/components/ui/card";
import { Award, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: TrendingUp, value: "₹1000Cr+", label: "Assets Under Management" },
];

const FundManagerSection = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Expert Fund Management
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our experienced team combines deep market knowledge with innovative strategies to deliver consistent results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Meet Our Leadership
            </h3>
            <p className="text-primary-foreground/90 mb-6 leading-relaxed">
              Led by seasoned professionals with decades of combined experience in wealth management, 
              our team is dedicated to understanding your unique financial situation and crafting 
              strategies that align with your goals. We believe in transparent communication, 
              rigorous analysis, and personalized service.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">SEBI Registered</span>
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">ISO Certified</span>
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">Award Winning</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FundManagerSection;
