import { ReactElement } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    demo: string;
    repo: string;
  };
  image: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'core' | 'backend' | 'design' | 'tools';
}

export interface Service {
  title: string;
  description: string;
  icon: ReactElement;
}
