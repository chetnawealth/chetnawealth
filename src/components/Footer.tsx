import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Chetna Wealth</h3>
            <p className="text-primary-foreground/80 text-sm">
              Professional financial services designed to help you achieve your investment goals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/portfolio-management" className="hover:text-accent transition-colors">
                  Portfolio Management
                </Link>
              </li>
              <li>
                <Link to="/algorithmic-trading" className="hover:text-accent transition-colors">
                  Algorithmic Trading
                </Link>
              </li>
              <li>
                <Link to="/investment-advisory" className="hover:text-accent transition-colors">
                  Investment Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>© {currentYear} Chetna Wealth. All rights reserved.</p>
          <p className="mt-4 text-xs leading-relaxed max-w-4xl mx-auto">
            SEBI Registered Investment Advisor | Registration No: [IA Number]
          </p>
          <p className="mt-2 text-xs leading-relaxed max-w-4xl mx-auto">
            <strong>Risk Disclosure:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing. 
            Past performance is not indicative of future returns. Please consider your specific investment requirements before choosing a fund, or designing a portfolio that suits your needs.
          </p>
          <p className="mt-2 text-xs leading-relaxed max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> The information provided is for general information purposes only and does not constitute professional financial advice. 
            Chetna Wealth does not guarantee the accuracy, reliability, or completeness of any information. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
