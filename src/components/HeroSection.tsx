import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Bot, LineChart } from "lucide-react";

const services = [
  {
    icon: LineChart,
    title: "Portfolio Management Services",
    description: "Personalized investment strategies tailored to your financial goals with expert oversight and risk management.",
  },
  {
    icon: Bot,
    title: "Algorithmic Trading Services",
    description: "Advanced automated trading solutions leveraging cutting-edge technology for optimal market execution.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Strategic guidance from experienced advisors to help you make informed investment decisions.",
  },
];

const HeroSection = () => {
  return (
    <section id="services" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Grow Your Wealth with
            <span className="block text-accent mt-2">Expert Financial Guidance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional financial services designed to help you achieve your investment goals with confidence and clarity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/20 border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-block p-3 bg-accent/10 rounded-lg">
                <service.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Explore More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
