import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 left-0 right-0 py-4 px-6 bg-[#2C2C2E] border-t border-[#3A3A3C] z-50 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-400">
          © 2024 Study Assistant. All Rights Reserved.
        </div>
        <div className="text-sm">
          <a 
            href="/legal" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Terms & Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};