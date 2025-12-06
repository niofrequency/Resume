import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
    if (project.id === 'reefer-guru') {
      return (
        <div className="w-full h-full bg-[#0055B8] flex items-center justify-center">
          <span className="text-white text-8xl font-bold tracking-tighter">RG</span>
        </div>
      );
    }
    
    if (project.id === 'site-armor') {
      return (
        <div className="w-full h-full bg-[#059669] flex items-center justify-center">
          <span className="text-white text-8xl font-bold tracking-tighter">SA</span>
        </div>
      );
    }

    // Default for future projects
    return (
      <div className="w-full h-full bg-white p-4 flex items-center justify-center">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
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
        {/* Image / Logo Container - Removed p-4 and bg-white to allow full bleed */}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 perspective-1000">
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