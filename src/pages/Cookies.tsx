
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Cookie Policy | Eksejabula</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-medium mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: March 31, 2025
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <h2>1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p>
                Cookies allow a website to recognize your device and remember your preferences, providing you with a more personalized browsing experience.
              </p>
              
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies for various purposes, including:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies allow our website to remember your preferences, such as your language preference or login information, for a better user experience.
                </li>
                <li>
                  <strong>Analytical Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve our website based on visitor behavior.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers deliver more relevant advertising or to limit the number of times you see an advertisement.
                </li>
              </ul>
              
              <h2>3. Types of Cookies We Use</h2>
              <p>
                We use both session cookies and persistent cookies:
              </p>
              <ul>
                <li>
                  <strong>Session Cookies:</strong> These are temporary cookies that are erased when you close your browser. They are used to ensure the proper functioning of the website during your visit.
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These cookies remain on your device for a specified period or until you delete them manually. They help us remember your preferences and provide a personalized experience.
                </li>
              </ul>
              
              <h2>4. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use third-party cookies to:
              </p>
              <ul>
                <li>Analyze website traffic and user behavior (e.g., Google Analytics)</li>
                <li>Enable social media features (e.g., Facebook, Twitter)</li>
                <li>Provide personalized advertisements</li>
                <li>Process payments securely</li>
              </ul>
              <p>
                These third parties may use cookies, web beacons, and similar technologies to collect or receive information from our website. This information may be used to provide measurement services and targeted advertisements.
              </p>
              
              <h2>5. Cookie Control</h2>
              <p>
                You can control and manage cookies in various ways. Most web browsers allow you to:
              </p>
              <ul>
                <li>View, delete, or block cookies through your browser settings</li>
                <li>Configure your browser to reject all cookies or only third-party cookies</li>
                <li>Accept cookies from specific websites</li>
              </ul>
              <p>
                Please note that disabling certain cookies may affect the functionality of our website and your user experience.
              </p>
              
              <h2>6. How to Manage Cookies</h2>
              <p>
                To manage cookies through your browser settings:
              </p>
              <ul>
                <li>
                  <strong>Chrome:</strong> Click the three dots in the top right corner → Settings → Privacy and security → Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Click the menu button → Options → Privacy & Security → Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </li>
                <li>
                  <strong>Edge:</strong> Settings and more → Settings → Cookies and site permissions → Cookies and site data
                </li>
              </ul>
              <p>
                For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
              
              <h2>7. Changes to Our Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions or concerns about our Cookie Policy, please contact us at:
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

export default Cookies;
