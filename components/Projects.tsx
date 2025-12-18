
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaSnowflake } from 'react-icons/fa';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Helper function to render the correct logo based on ID
  const renderProjectLogo = () => {
    switch (project.id) {
      case 'carrier-extract':
        return (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00D4FF_1px,transparent_1px)] [background-size:20px_20px]" />
            <span className="text-primary text-8xl font-black tracking-tighter relative z-10 drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">CE</span>
          </div>
        );
      case 'mil-tiga-delapan':
        return (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center border-b-4 border-orange-500">
            <span className="text-white text-7xl font-bold tracking-tighter flex flex-col items-center">
              <span className="text-orange-500 text-2xl mb-1 font-mono tracking-widest uppercase">Mining & Ind.</span>
              M38
            </span>
          </div>
        );
      case 'daily-bread':
        return (
          <div className="w-full h-full bg-[#fdf6e3] flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-[#859900] flex items-center justify-center bg-white shadow-xl">
              <span className="text-[#859900] text-6xl font-serif italic font-bold">DB</span>
            </div>
          </div>
        );
      case 'reefer-guru':
        return (
          <div className="w-full h-full bg-[#0047AB] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-pulse" />
            </div>
            <div className="flex flex-col items-center relative z-10">
                <FaSnowflake className="text-sky-300 text-4xl mb-2 animate-spin-slow opacity-60" style={{ animationDuration: '8s' }} />
                <span className="text-white text-8xl font-black tracking-tighter drop-shadow-lg">RG</span>
            </div>
          </div>
        );
      case 'site-armor':
        return (
          <div className="w-full h-full bg-[#064E3B] flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(16,185,129,1)_3px)]" />
            <div className="w-40 h-40 border-2 border-emerald-500/30 rounded-2xl rotate-45 flex items-center justify-center relative">
                <div className="rotate-[-45deg] flex flex-col items-center">
                    <FaShieldAlt className="text-emerald-400 text-3xl mb-1" />
                    <span className="text-emerald-50 text-7xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">SA</span>
                </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-white p-4 flex items-center justify-center">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="text-slate-300 text-8xl font-bold">{project.title.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-60 transition-opacity duration-500" 
        style={{ transform: "translateZ(-10px)" }}
      />
      
      <div className="bg-white dark:bg-space-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 h-full flex flex-col relative z-10 shadow-2xl transition-colors duration-300">
        {/* Image / Logo Container */}
        <div className="relative h-56 overflow-hidden">
          {renderProjectLogo()}
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-4 flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-slate-100 dark:bg-white/5 text-primary border border-primary/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a 
              href={project.links.demo} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-space-900 font-bold rounded-lg hover:bg-cyan-300 transition-colors"
            >
              <FaExternalLinkAlt /> View Live
            </a>
            <a 
              href={project.links.repo} 
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            >
              <FaGithub /> Source
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-space-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              Real-world solutions engineered for performance, scalability, and user experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 perspective-1000">
          {PROJECTS.map((project) => (
            <div key={project.id} className="h-[650px] w-full">
                <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
