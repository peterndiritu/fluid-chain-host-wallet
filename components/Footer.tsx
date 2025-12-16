import React from 'react';
import { Download } from 'lucide-react';

const Footer: React.FC = () => {
  const handleDownloadLogo = () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="20" fill="none" stroke="url(#grad)" stroke-width="6" />
        <text x="50" y="70" font-family="Arial, sans-serif" font-size="55" font-weight="bold" fill="url(#grad)" text-anchor="middle">F</text>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fluid-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
          
          {/* Downloadable Logo Section */}
          <button 
            onClick={handleDownloadLogo}
            className="group relative flex items-center justify-center mb-8 mx-auto"
            title="Download Brand Asset"
          >
              <div className="w-12 h-12 rounded-xl border-2 border-blue-600 dark:border-cyan-400 flex items-center justify-center mr-2 transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] bg-white dark:bg-slate-900 z-10">
                  <span className="text-blue-600 dark:text-cyan-400 font-bold text-2xl font-sans">F</span>
              </div>
              <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">FLUID</span>
              
              <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1">
                  <Download size={10} /> Click to Download
              </div>
          </button>

          <div className="flex justify-center gap-6 mb-6 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <button onClick={handleDownloadLogo} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Brand Kit</button>
          </div>

          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">© 2024 Fluid Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;