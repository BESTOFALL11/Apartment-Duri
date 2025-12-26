import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-slate-800 text-xl font-bold tracking-tight">{APP_NAME}</span>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Apartment Duri. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;