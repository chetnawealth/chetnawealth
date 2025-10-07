import { Card } from "@/components/ui/card";

const FundManagerSection = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Fund Manager Details
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team is committed to providing personalized investment strategies tailored to your financial goals.
          </p>
        </div>

        <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Meet Our Team
            </h3>
            <p className="text-primary-foreground/90 mb-6 leading-relaxed">
              As a growing startup, we bring fresh perspectives and innovative approaches to wealth management. 
              Our team is dedicated to understanding your unique financial situation and crafting 
              strategies that align with your goals. We believe in transparent communication, 
              rigorous analysis, and personalized service.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">SEBI Registered</span>
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">Professional Team</span>
              <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">Client Focused</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FundManagerSection;
