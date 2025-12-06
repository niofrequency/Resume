import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-space-900 py-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built from scratch with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;