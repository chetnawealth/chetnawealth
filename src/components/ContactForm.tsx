import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your wealth journey? Contact us today for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us about your investment goals..."
                  className="w-full min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground">contact@chetnawealth.com</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-accent/10 rounded-lg">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-sm text-primary-foreground/90">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-primary-foreground/90">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-sm text-primary-foreground/90">Sunday: Closed</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
