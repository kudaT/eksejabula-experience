
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Privacy Policy | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: March 31, 2025
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <h2>1. Introduction</h2>
              <p>
                At Eksejabula, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access our website or use our services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We collect several types of information from and about users of our website, including:
              </p>
              <ul>
                <li>
                  <strong>Personal Data:</strong> This includes information that can be used to identify you, such as your name, email address, postal address, phone number, payment information, and account login details.
                </li>
                <li>
                  <strong>Non-Personal Data:</strong> This includes information that does not directly identify you, such as browser type, IP address, device information, and cookies.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, products, and services.
                </li>
              </ul>
              
              <h2>3. How We Collect Your Information</h2>
              <p>
                We collect information in the following ways:
              </p>
              <ul>
                <li>
                  <strong>Direct Interactions:</strong> When you create an account, place an order, subscribe to our newsletter, or contact us.
                </li>
                <li>
                  <strong>Automated Technologies:</strong> As you navigate through our website, we may use cookies, server logs, and similar technologies to collect data about your browsing actions and patterns.
                </li>
                <li>
                  <strong>Third Parties:</strong> We may receive information about you from third parties such as business partners, analytics providers, and social media platforms.
                </li>
              </ul>
              
              <h2>4. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>To process and deliver your order</li>
                <li>To manage your account and provide customer support</li>
                <li>To personalize your experience and deliver content relevant to your interests</li>
                <li>To improve our website, products, and services</li>
                <li>To communicate with you about products, services, offers, and promotions</li>
                <li>To protect our rights and property and the rights and property of our customers</li>
                <li>To comply with legal obligations</li>
              </ul>
              
              <h2>5. Disclosure of Your Information</h2>
              <p>
                We may disclose your personal information to:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Third parties that perform services on our behalf, such as payment processing, order fulfillment, and customer service.
                </li>
                <li>
                  <strong>Business Partners:</strong> Companies with whom we collaborate to offer joint promotions or products.
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to respond to legal processes.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.
                </li>
              </ul>
              
              <h2>6. Data Security</h2>
              <p>
                We have implemented appropriate security measures to protect your personal information from accidental loss, unauthorized access, use, alteration, and disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2>7. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate or incomplete information</li>
                <li>The right to request the deletion of your personal information</li>
                <li>The right to restrict or object to the processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
              
              <h2>8. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities and to personalize your experience on our website. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, but this may affect your ability to use some features of our website.
              </p>
              
              <h2>9. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information.
              </p>
              
              <h2>10. Changes to Our Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. If we make material changes, we will notify you by posting the new privacy policy on this page and updating the "Last Updated" date at the top.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions or concerns about our privacy policy, please contact us at:
              </p>
              <p>
                Eksejabula<br />
                123 Fashion Street<br />
                Johannesburg, South Africa<br />
                Email: privacy@eksejabula.co.za
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
