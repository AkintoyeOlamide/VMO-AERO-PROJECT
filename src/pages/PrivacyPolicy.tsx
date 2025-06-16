import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 mt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-light text-navy-dark mb-8" style={{ fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            VMO Aero Privacy Policy
          </h1>
          
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              At VMO Aero, we are committed to safeguarding the privacy of our website visitors. This policy outlines how we collect, use, disclose, and protect your personal information.
            </p>

            <ol className="space-y-6 list-decimal pl-6">
              <li>
                <strong className="text-navy-dark">Information Collection:</strong> We may collect personal information such as your name, email address, and contact details when you voluntarily provide them to us on our website.
              </li>
              
              <li>
                <strong className="text-navy-dark">Use of Information:</strong> Your personal information may be used to provide you with the services and information you request, improve our website's content and functionality, communicate with you about our products and services, and comply with legal obligations.
              </li>
              
              <li>
                <strong className="text-navy-dark">Information Sharing:</strong> We may share your personal information with trusted third parties who assist us in operating our website, conducting our business, or providing services to you, provided that they agree to keep this information confidential.
              </li>
              
              <li>
                <strong className="text-navy-dark">Data Security:</strong> We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
              </li>
              
              <li>
                <strong className="text-navy-dark">Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to analyze trends, administer the website, track users' movements around the site, and gather demographic information about our user base.
              </li>
              
              <li>
                <strong className="text-navy-dark">Third-Party Links:</strong> Our website may contain links to third-party websites, and we are not responsible for the privacy practices or the content of such websites. We encourage you to review the privacy policies of these websites.
              </li>
              
              <li>
                <strong className="text-navy-dark">Changes to this Policy:</strong> We reserve the right to update or modify this privacy policy at any time. Any changes will be effective immediately upon posting the revised policy on this page.
              </li>
            </ol>

            <p className="mt-8">
              By using our website, you consent to the terms of this privacy policy. If you have any questions or concerns about our privacy practices, please contact us at{' '}
              <a href="mailto:info@vmoaeros.com" className="text-navy-dark hover:text-gold transition-colors duration-300">
                info@vmoaeros.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 