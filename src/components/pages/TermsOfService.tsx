import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../sections/Footer';

export const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              By accessing or using BlockFraud's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              BlockFraud provides AI-powered fraud detection services for blockchain transactions. Our service includes real-time monitoring, analysis, and reporting of potentially fraudulent activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p className="text-[#ffffff99] leading-relaxed mb-4">
              As a user of our service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-[#ffffff99] space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not misuse or attempt to manipulate our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              All content, features, and functionality of our service are owned by BlockFraud and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              BlockFraud shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
            <p className="text-[#ffffff99] leading-relaxed">
              For any questions about these Terms of Service, please contact us at legal@blockfraud.ai
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};