
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaSnowflake, FaRocket, FaDatabase, FaCogs, FaBookOpen } from 'react-icons/fa';
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

  // Shared Dark Navy Carbon Fiber Logo Wrapper
  const CarbonLogo = ({ icon: Icon, acronym }: { icon?: any, acronym: string }) => (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Carbon Fiber Pattern in Dark Navy */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(-45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #0f172a 75%), 
            linear-gradient(-45deg, transparent 75%, #0f172a 75%)
          `,
          backgroundSize: '8px 8px',
          backgroundColor: '#020617'
        }} 
      />
      
      {/* Techy Blue Glow & Scanlines */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,212,255,0.05),rgba(0,212,255,0.02),rgba(0,212,255,0.05))] bg-[length:100%_2px,3px_100%]" />
      
      <div className="relative z-10 flex flex-col items-center">
        {Icon && <Icon className="text-white/90 text-4xl mb-3 drop-shadow-[0_0_12px_rgba(0,212,255,0.4)]" />}
        <span className="text-white text-7xl font-black tracking-tighter font-mono flex items-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          {acronym}
          <span className="w-2 h-10 bg-primary ml-2 animate-pulse" />
        </span>
      </div>

      {/* Frame accents in Cyan */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-primary/30" />
      
      {/* Secondary tech accents */}
      <div className="absolute top-8 left-4 w-1 h-8 bg-primary/10" />
      <div className="absolute bottom-8 right-4 w-1 h-8 bg-primary/10" />
    </div>
  );

  const renderProjectLogo = () => {
    switch (project.id) {
      case 'rank-rocket':
        return <CarbonLogo acronym="RR" icon={FaRocket} />;
      case 'carrier-extract':
        return <CarbonLogo acronym="CE" icon={FaDatabase} />;
      case 'mil-tiga-delapan':
        return <CarbonLogo acronym="M38" icon={FaCogs} />;
      case 'daily-bread':
        return <CarbonLogo acronym="DB" icon={FaBookOpen} />;
      case 'reefer-guru':
        return <CarbonLogo acronym="RG" icon={FaSnowflake} />;
      case 'site-armor':
        return <CarbonLogo acronym="SA" icon={FaShieldAlt} />;
      default:
        return (
          <div className="w-full h-full bg-[#020617] flex items-center justify-center">
             <span className="text-white text-8xl font-black tracking-tighter">
                {project.title.substring(0, 2).toUpperCase()}
             </span>
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

