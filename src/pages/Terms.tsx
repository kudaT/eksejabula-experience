
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Terms of Service | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: March 31, 2025
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Eksejabula. These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services"), so please read them carefully before using the Services.
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
              
              <h2>2. Definitions</h2>
              <p>"Company", "We", "Us", or "Our" refers to Eksejabula.</p>
              <p>"Customer", "You", or "Your" refers to the individual accessing or using the Services.</p>
              <p>"Content" refers to any text, images, graphics, videos, music, or other materials that may be viewed on or accessed through the Services.</p>
              <p>"Products" refers to the physical or digital goods offered for sale through our Services.</p>
              
              <h2>3. Account Registration</h2>
              <p>
                To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself and to update this information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2>4. Orders and Payments</h2>
              <p>
                By placing an order through our Services, you are making an offer to purchase the Products. All orders are subject to acceptance by us.
              </p>
              <p>
                Prices for Products are as listed on our website and are subject to change without notice. Prices are inclusive of VAT where applicable.
              </p>
              <p>
                Payment must be made in full before an order is processed. We accept various payment methods as indicated during the checkout process.
              </p>
              
              <h2>5. Shipping and Delivery</h2>
              <p>
                We will make reasonable efforts to deliver Products within the estimated delivery time, but we cannot guarantee specific delivery dates.
              </p>
              <p>
                You are responsible for providing accurate shipping information. We are not liable for delivery delays or failures due to incorrect information.
              </p>
              <p>
                Risk of loss and title for Products pass to you upon delivery to the carrier.
              </p>
              
              <h2>6. Returns and Refunds</h2>
              <p>
                Our return and refund policy is outlined separately and forms part of these Terms. By purchasing Products, you agree to abide by our return and refund policy.
              </p>
              
              <h2>7. Intellectual Property</h2>
              <p>
                All Content included in or made available through our Services, including the design, selection, and arrangement of the Content, is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any Content obtained from our Services without our prior written consent.
              </p>
              
              <h2>8. User Conduct</h2>
              <p>
                You agree not to use our Services:
              </p>
              <ul>
                <li>In any way that violates any applicable law or regulation</li>
                <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
                <li>To impersonate any person, or misrepresent your identity or affiliation with any person or organization</li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Services</li>
                <li>To attempt to gain unauthorized access to our Services, computer systems, or networks</li>
              </ul>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul>
                <li>Your use of or inability to use our Services</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from our Services</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services</li>
              </ul>
              
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. If we make changes, we will provide notice of such changes by updating the "Last Updated" date at the top of these Terms. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
              </p>
              
              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.
              </p>
              
              <h2>12. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <p>
                Eksejabula<br />
                123 Fashion Street<br />
                Johannesburg, South Africa<br />
                Email: legal@eksejabula.co.za
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
