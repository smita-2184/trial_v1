import React from 'react';

export function Copyright() {
  return (
    <div className="min-h-screen bg-[#1C1C1E] text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Copyright Notice</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Copyright Protection</h2>
        <p className="mb-4">© {new Date().getFullYear()} Study Assistant. All Rights Reserved.</p>
        <p className="mb-4">This software and its content are protected by international copyright laws. All rights are reserved by Study Assistant, including but not limited to reproduction, modification, distribution, and display of this software and its content.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Protected Features</h2>
        <p className="mb-4">The following features are proprietary and protected:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Presentation Generation System</li>
          <li>Assignment Assistance Tools</li>
          <li>Code Editor Implementation</li>
          <li>Exercise Solving Algorithms</li>
          <li>AI Integration Methods</li>
          <li>Study Material Generation Systems</li>
          <li>Interactive Learning Tools</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Usage Restrictions</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>No part of this software may be reproduced, distributed, or transmitted in any form without explicit written permission</li>
          <li>The software is provided "as is" without warranty of any kind</li>
          <li>Any modifications to the source code must maintain all copyright notices</li>
          <li>Commercial use or redistribution is strictly prohibited without authorization</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Components</h2>
        <p className="mb-4">This project includes third-party software components with their own licenses:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>React - MIT License</li>
          <li>Vite - MIT License</li>
          <li>TailwindCSS - MIT License</li>
          <li>Monaco Editor - MIT License</li>
          <li>PDF.js - Apache License 2.0</li>
          <li>KaTeX - MIT License</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
        <p className="mb-4">Study Assistant provides this software and its contents on an "as is" basis. We make no warranties:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Express or implied, regarding the operation or content accuracy</li>
          <li>About the reliability or availability of the service</li>
          <li>Regarding the accuracy of AI-generated content</li>
          <li>About the suitability for any particular purpose</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. DMCA Protection</h2>
        <p className="mb-4">Our content is protected under DMCA. Unauthorized use or copying of our content may result in:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Immediate takedown notices</li>
          <li>Legal action for copyright infringement</li>
          <li>Termination of service access</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
        <p className="mb-4">For copyright inquiries or permissions, please contact our copyright office at:</p>
        <p className="mb-4">copyright@studyassistant.com</p>
      </section>

      <footer className="text-sm text-gray-400 mt-12">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}
