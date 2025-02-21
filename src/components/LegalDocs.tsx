import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ArrowLeft } from 'lucide-react';

export function LegalDocs({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#1C1C1E] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#2C2C2E] rounded-lg hover:bg-[#3A3A3C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </button>

        {/* Tabs Container */}
        <div className="bg-[#2C2C2E] rounded-lg p-6">
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="text-gray-300 space-y-6">
              <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us when using the Study Assistant platform, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information (username, email, academic details)</li>
                  <li>Study materials and documents you upload</li>
                  <li>Chat conversations and interactions with our AI assistants</li>
                  <li>Exercise solutions and study notes you create</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
                <p>
                  We use the collected information to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our educational services</li>
                  <li>Personalize your learning experience</li>
                  <li>Generate study materials and solutions</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">3. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information and study materials. Your data is encrypted and stored securely.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">4. Data Sharing</h2>
                <p>
                  We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">5. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your study materials</li>
                </ul>
              </section>
            </TabsContent>

            <TabsContent value="terms" className="text-gray-300 space-y-6">
              <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the Study Assistant platform, you agree to be bound by these Terms & Conditions and our Privacy Policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">2. User Accounts</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must not share your account credentials</li>
                  <li>We reserve the right to terminate accounts that violate our terms</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">3. Intellectual Property</h2>
                <p>
                  All content and materials provided through the platform, including AI-generated content, are protected by copyright and other intellectual property laws.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain ownership of your uploaded content</li>
                  <li>You grant us a license to use your content to provide our services</li>
                  <li>You must not misuse or copy our proprietary features</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">4. Acceptable Use</h2>
                <p>
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the platform for any illegal purposes</li>
                  <li>Upload harmful or malicious content</li>
                  <li>Attempt to breach our security measures</li>
                  <li>Interfere with other users' access to the platform</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">5. Disclaimer</h2>
                <p>
                  The platform is provided "as is" without warranties of any kind. We are not responsible for the accuracy of AI-generated content or study materials.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">6. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
                </p>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
