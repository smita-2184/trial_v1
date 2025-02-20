import React from 'react';

export function Terms() {
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
        <h1 className="text-xl font-semibold">Terms of Use</h1>
      </div>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using Study Assistant, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Services Description</h2>
          <p className="mb-4">Study Assistant provides the following services:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Document analysis and summarization</li>
            <li>AI-powered chat assistance</li>
            <li>Interactive study tools and note-taking</li>
            <li>Quiz and flashcard generation</li>
            <li>Mathematical visualization and exercises</li>
            <li>Physics and chemistry simulations</li>
            <li>Code editing and programming assistance</li>
            <li>Assignment assistance and presentation generation</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">Users must:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide accurate registration information</li>
            <li>Maintain the security of their account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be responsible for all activities under their account</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>
          <p className="mb-4">All content and features provided through Study Assistant, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Presentation Generation System</li>
            <li>Assignment Assistance Tools</li>
            <li>Code Editor Implementation</li>
            <li>Exercise Solving Algorithms</li>
            <li>AI Integration Methods</li>
            <li>User Interface and Design</li>
          </ul>
          <p className="mb-4">are the exclusive property of Study Assistant and are protected by copyright and intellectual property laws.</p>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
          <p className="mb-4">Users agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Use the service for any illegal purposes</li>
            <li>Attempt to breach or circumvent security measures</li>
            <li>Share account access with unauthorized users</li>
            <li>Upload malicious content or files</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p className="mb-4">Our service may integrate with or use third-party services. Users acknowledge that:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use of third-party services is subject to their respective terms</li>
            <li>We are not responsible for third-party service performance</li>
            <li>Third-party integrations may be modified or discontinued</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">Study Assistant provides services "as is" without warranties of any kind. We are not liable for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Interruptions in service availability</li>
            <li>Data loss or corruption</li>
            <li>Accuracy of AI-generated content</li>
            <li>Results obtained from using our services</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Modifications to Service</h2>
          <p className="mb-4">We reserve the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modify or discontinue any feature or service</li>
            <li>Update these terms at any time</li>
            <li>Change subscription fees with notice</li>
          </ul>
        </section>
      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="mb-4">These terms are governed by the laws of the Federal Republic of Germany and the European Union.</p>
        </section>
      
        <footer className="text-sm text-gray-400 mt-12">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
}

