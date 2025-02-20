import React from 'react';

export function Privacy() {
  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white">
      <div className="flex items-center gap-4 bg-[#2C2C2E] border-b border-[#3A3A3C] p-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#3A3A3C] rounded-lg hover:bg-[#4A4A4C] transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to App
        </button>
        <h1 className="text-xl font-semibold">Privacy Policy</h1>
      </div>
      <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Account information (email, name, password)</li>
          <li>Uploaded documents and study materials</li>
          <li>Chat conversations and queries</li>
          <li>Generated content (notes, summaries, presentations)</li>
          <li>Usage data and analytics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">Your information is used to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide and improve our services</li>
          <li>Generate personalized study materials</li>
          <li>Process and analyze documents</li>
          <li>Enhance AI model performance</li>
          <li>Maintain account security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
        <p className="mb-4">We implement various security measures to protect your data:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Encryption of sensitive information</li>
          <li>Secure data storage and transmission</li>
          <li>Regular security audits</li>
          <li>Access controls and authentication</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. AI Processing</h2>
        <p className="mb-4">Our AI features process your data to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Generate summaries and study materials</li>
          <li>Provide chat assistance</li>
          <li>Create quizzes and flashcards</li>
          <li>Assist with assignments and presentations</li>
        </ul>
        <p className="mb-4">All AI processing complies with relevant data protection regulations.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Service providers and partners</li>
          <li>AI processing services</li>
          <li>Legal authorities when required</li>
        </ul>
        <p className="mb-4">We do not sell your personal information to third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Object to data processing</li>
          <li>Export your data</li>
          <li>Withdraw consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
        <p className="mb-4">We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Maintain user sessions</li>
          <li>Analyze usage patterns</li>
          <li>Improve user experience</li>
          <li>Remember preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
        <p className="mb-4">Our service is not intended for users under 13 years of age. We do not knowingly collect personal information from children.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
        <p className="mb-4">We may update this policy periodically. Users will be notified of significant changes.</p>
      </section>

      <footer className="text-sm text-gray-400 mt-12">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
      </div>
    </div>
  );
}
