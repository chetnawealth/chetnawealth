import { Helmet } from 'react-helmet-async';

const SEO = () => {
  return (
    <Helmet>
      <title>Chetna Wealth - Professional Financial Services | Investment Advisory</title>
      <meta name="description" content="Professional financial services including portfolio management, algorithmic trading, and investment advisory. Expert guidance for your wealth creation journey." />
      <meta name="keywords" content="financial services, investment advisory, portfolio management, algorithmic trading, wealth management, SEBI registered" />
      <meta name="author" content="Chetna Wealth" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://chetnawealth.com/" />
      <meta property="og:title" content="Chetna Wealth - Professional Financial Services" />
      <meta property="og:description" content="Professional financial services including portfolio management, algorithmic trading, and investment advisory." />
      <meta property="og:image" content="/chetna-logo.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://chetnawealth.com/" />
      <meta property="twitter:title" content="Chetna Wealth - Professional Financial Services" />
      <meta property="twitter:description" content="Professional financial services including portfolio management, algorithmic trading, and investment advisory." />
      <meta property="twitter:image" content="/chetna-logo.png" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href="https://chetnawealth.com/" />
    </Helmet>
  );
};

export default SEO;
