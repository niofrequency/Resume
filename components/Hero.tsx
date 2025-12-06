import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 backdrop-blur-sm">
            <span className="text-primary font-mono text-sm">Hello, I am</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
            {PERSONAL_INFO.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-mono mb-8 h-8">
            <span className="text-primary">&gt; </span>
            <span className="typing-effect">
                Full-Stack Developer
            </span>
            <span className="animate-pulse">_</span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed text-lg">
            {PERSONAL_INFO.title}. Transforming complex problems into elegant, automated solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-primary text-space-900 font-bold rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,212,255,0.4)]"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Hero Visual / Code Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
            <div className="relative z-10 bg-slate-900 dark:bg-space-800 rounded-xl border border-slate-700 dark:border-white/10 p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-slate-500 font-mono">developer.tsx</span>
                </div>
                <div className="font-mono text-sm leading-6">
                    <div className="text-slate-400">
                        <span className="text-secondary">const</span> <span className="text-primary">developer</span> = <span className="text-yellow-400">{'{'}</span>
                    </div>
                    <div className="pl-6 text-slate-300">
                        name: <span className="text-green-400">"Mark A. Pigome"</span>,
                    </div>
                    <div className="pl-6 text-slate-300">
                        skills: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node"</span>, <span className="text-green-400">"Cloud"</span>],
                    </div>
                    <div className="pl-6 text-slate-300">
                        hardWorker: <span className="text-secondary">true</span>,
                    </div>
                    <div className="pl-6 text-slate-300">
                        problemSolver: <span className="text-secondary">true</span>,
                    </div>
                    <div className="pl-6 text-slate-300">
                        hireable: <span className="text-primary">function</span>() <span className="text-yellow-400">{'{'}</span>
                    </div>
                    <div className="pl-12 text-slate-300">
                        <span className="text-secondary">return</span> <span className="text-green-400">"Let's build the future"</span>;
                    </div>
                    <div className="pl-6 text-slate-300">
                        <span className="text-yellow-400">{'}'}</span>
                    </div>
                    <div className="text-slate-400">
                        <span className="text-yellow-400">{'}'}</span>;
                    </div>
                </div>
            </div>
            {/* Decoration element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl rounded-full" />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <span className="text-sm font-mono tracking-widest uppercase mb-2 block text-center">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;