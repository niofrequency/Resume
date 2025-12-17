import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { FaUserAstronaut } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-space-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative watermark */}
          <FaUserAstronaut className="absolute -top-6 -right-6 text-[150px] text-slate-200 dark:text-white/5 rotate-12" />

          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-4">
            <span className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
            About Me
          </h2>

          <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {PERSONAL_INFO.about.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-slate-200 dark:border-white/10">
            <div>
              <span className="block text-4xl font-bold text-slate-900 dark:text-white mb-2">6+</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Years Exp.</span>
            </div>
            <div>
              <span className="block text-4xl font-bold text-slate-900 dark:text-white mb-2">15+</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Projects</span>
            </div>
             <div>
              <span className="block text-4xl font-bold text-slate-900 dark:text-white mb-2">100%</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Commitment</span>
            </div>
            <div>
              <span className="block text-4xl font-bold text-slate-900 dark:text-white mb-2">24/7</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
