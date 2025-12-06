import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-space-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My proficiency across the full development stack, honed through years of building robust solutions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-8">
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className="relative">
              <div className="flex justify-between mb-2">
                <span className="text-slate-800 dark:text-white font-medium">{skill.name}</span>
                <span className="text-primary font-mono">{skill.level}%</span>
              </div>
              <div className="h-3 w-full bg-slate-200 dark:bg-space-800 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary relative"
                >
                  {/* Glowing tip */}
                  <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[2px]" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;