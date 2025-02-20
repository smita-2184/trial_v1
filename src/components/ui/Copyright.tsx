import React from 'react';

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2C2E] text-gray-400 text-sm py-4 px-6 mt-auto border-t border-[#3A3A3C]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © {currentYear} Study Assistant. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="/terms" 
            className="hover:text-white transition-colors"
          >
            Terms of Use
          </a>
          <a 
            href="/privacy" 
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a 
            href="/copyright" 
            className="hover:text-white transition-colors"
          >
            Copyright Notice
          </a>
        </div>
      </div>
    </footer>
  );
}