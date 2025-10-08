import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Bot, LineChart } from "lucide-react";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import lottieAnimation from "@/assets/portfolio-managment-lottie.json";
import algorithmicTradingLottie from "@/assets/algorithmic-trading-lottie.json";
import investmentAdvisoryLottie from "@/assets/investment-advisory-lottie.json";

const services = [
  {
    icon: () => <Lottie animationData={lottieAnimation} loop={true} style={{ width: '100%', height: '100%' }} />,
    title: "Portfolio Management Services",
    description: (
      <>
        Customized investment baskets across asset classes (Equity, Debt, Gold). Designed for long-term capital appreciation and stability.
        <br />
        <br />
        <span className="font-semibold">Management Fee: <span className="text-accent">2.0%</span></span>
        <br />
        <span className="font-semibold">Focus: <span className="text-accent">Long-Term Growth</span></span>
      </>
    ),
  },
  {
    icon: () => <Lottie animationData={algorithmicTradingLottie} loop={true} style={{ width: '100%', height: '100%' }} />,
    title: "Algorithmic Trading Services",
    description: (
      <>
        Fully automated trading fund targeting superior returns by exploiting short-term market inefficiencies using proprietary algorithms.<br /><br />
        <span className="font-semibold">Target APR: <span className="text-accent">22% APR + 4-8% Additional Kicker</span></span> <br />
        <span className="font-semibold">Min. Investment: <span className="text-accent">₹1,00,000</span></span><br />
        <span className="font-semibold">Lock-in Period: <span className="text-accent">6 Months</span></span><br />
        *Kicker subject to terms and conditions.
      </>
    ),
  },
  {
    icon: () => <Lottie animationData={investmentAdvisoryLottie} loop={true} style={{ width: 270, height: 270 }} />,
    title: "Investment Advisory Services",
    description: "Strategic guidance from experienced advisors to help you make informed investment decisions.",
  },
];

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

const HeroSection = () => {
  return (
    <section id="services" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Beyond <Typewriter text="Returns" />
            <span className="block text-accent mt-2">
              <Typewriter text="Building Lasting Value" startDelay={500} />
            </span>
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
              className="p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-secondary/20 border-border animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-block p-3 bg-accent/10 rounded-lg shrink-0 w-fit">
                <service.icon className="h-8 w-8 text-accent shrink-0" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors mt-auto"
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
