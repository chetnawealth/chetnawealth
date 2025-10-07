import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FundManagerSection from "@/components/FundManagerSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FundManagerSection />
        <ContactForm />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
