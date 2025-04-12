import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../sections/Footer';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-bg">
      <div className="container-custom py-8">
        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center text-[#ffffff99] hover:text-[#99E39E] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              At BlockFraud, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blockchain fraud detection service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="text-[#ffffff99] leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-[#ffffff99] space-y-2">
              <li>Account information (email, password, profile details)</li>
              <li>Transaction data for fraud analysis</li>
              <li>Communication preferences</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-[#ffffff99] leading-relaxed mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 text-[#ffffff99] space-y-2">
              <li>Providing and improving our fraud detection service</li>
              <li>Analyzing transaction patterns</li>
              <li>Communicating with you about our services</li>
              <li>Ensuring platform security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              We implement appropriate technical and organizational measures to maintain the security of your personal information, including encryption, access controls, and regular security assessments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@blockfraud.ai
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};