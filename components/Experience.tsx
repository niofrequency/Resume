import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE } from '../constants';
import { FaChevronDown, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(EXPERIENCE[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-space-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Professional Journey</h2>
          <div className="w-20 h-1 bg-secondary rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {EXPERIENCE.map((job) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleExpand(job.id)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 border ${
                  expandedId === job.id 
                    ? 'bg-white dark:bg-space-800 border-primary/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
                    : 'bg-white/60 dark:bg-space-800/50 border-slate-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-white/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${expandedId === job.id ? 'bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{job.period}</span>
                    </div>
                    <FaChevronDown className={`transition-transform duration-300 ${expandedId === job.id ? 'rotate-180 text-primary' : ''}`} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-l-2 border-primary/20 ml-8 md:ml-12 mt-4 space-y-3">
                      {job.description.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;