
import React from 'react';
import { Project, Experience, Skill, Service } from './types';
import { FaLaptopCode, FaMobileAlt, FaShieldAlt, FaCogs } from 'react-icons/fa';

export const PERSONAL_INFO = {
  name: "Mark Antonio Pigome",
  title: "Full-Stack Developer & Automation Specialist",
  email: "mpigome44@gmail.com",
  phone: "+62 852 1812 5850", // Fixed format for wa.me link functionality
  location: "Papua, Indonesia",
  availability: "Available for freelance",
  about: `Versatile Full-Stack Developer and autodidact coder with a non-linear journey into tech—self-taught through online tutorials and hobby projects that grew into professional solutions. Spent 15 years growing up in the USA, where I first picked up coding as a hobby, before returning to Indonesia and channeling hands-on operational experience into practical digital tools.

I don't just write code; I engineer efficiency—automating workflows, building intuitive infrastructure, and aligning technology with real-world business and human needs. Skilled in integrating third-party APIs (such as OpenAI/Gemini for AI features, Google grounding for real-time data, and PDF processing libraries) to enhance functionality, while leveraging open-source code and libraries (e.g., React ecosystems, TypeScript tools, Vite for builds) to accelerate development and ensure robust, maintainable projects.

Proudest achievement: developing Reefer Guru (reefer-guru.vercel.app) to my current employer, PT. Panjasa Intradin (panjasa-intradin.com)—an AI diagnostic assistant that translates English Carrier / Daikin Transicold handbooks into Bahasa (any language) for refrigerated container technicians.

Fluent in English and Bahasa Indonesian, I thrive in dynamic, multicultural environments with strong leadership, acute attention to detail, and a commitment to purposeful technology.`
};

export const SKILLS: Skill[] = [
  { name: "Web Development", level: 95, category: 'core' },
  { name: "Server Management", level: 95, category: 'backend' },
  { name: "App Development & Design", level: 90, category: 'design' },
  { name: "Automation & Cloud Solutions", level: 85, category: 'tools' },
  { name: "React / TypeScript", level: 92, category: 'core' },
  { name: "Node.js / Python", level: 88, category: 'backend' },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "job1",
    role: "Administration",
    company: "PT. PANJASA - INTRADIN",
    period: "1 April 2024 - PRESENT",
    description: [
      "Manage critical cold chain logistics and maintenance operations for 383 Carrier reefer containers (341 for PT. Pangansari Utama and 42 for PRIMO) supporting food distribution across Papua.",
      "Analyze daily data via the LYNX Fleet system to identify issues such as critical alarms or ice blockages, coordinating immediate repairs with technicians in Surabaya, Jakarta, and Papua.",
      "Oversee spare parts inventory, maintaining minimum stock thresholds and managing replenishment requests.",
      "Supervise manual temperature readings for 150+ units, verify logs against system data, and compile detailed daily activity and monthly operational reports for SCM Freeport.",
      "Currently developing a new company website to enhance Panjasa-Intradin’s digital capabilities."
    ]
  },
  {
    id: "job2",
    role: "IT & Marketing",
    company: "PT. PENGEMBANGAN JAYA PAPUA",
    period: "5 June 2023 - 1 April 2024",
    description: [
      "Administered and created the company website and server, managing C-Panel operations for security and stability.",
      "Developed a digital system to organize maintenance technician work orders, streamlining task delegation and reporting.",
      "Managed social media marketing and brand development, designing promotional materials using Adobe Photoshop for corporate events.",
      "Served as in-house photographer and content author, producing high-resolution imagery and engaging articles to strengthen digital presence."
    ]
  },
  {
    id: "job3",
    role: "A/C Installation",
    company: "ACU HEATING & COOLING",
    period: "November 2021 - August 2022",
    description: [
      "Installed HVAC systems with precision, managing air conditioning unit installations and intricate wiring tasks.",
      "Performed manual copper bending and advanced soldering for secure, leak-free pipe connections.",
      "Physically handled units weighing over 100 pounds and contributed to eco-friendly practices by recycling metal scraps."
    ]
  },
  {
    id: "job4",
    role: "Student Warehouse Worker",
    company: "ARIZONA STATE UNIVERSITY - BIO DESIGN LABORATORY",
    period: "September 2019 - May 2021",
    description: [
      "Managed facility logistics, operating autoclaves and handling heavy -80°C and -20°C freezers with precision.",
      "Transported equipment between labs, ensuring careful handling to maintain functionality and integrity.",
      "Contributed to overall lab efficiency through meticulous organization and coordination of equipment placement."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "rank-rocket",
    title: "Rank Rocket",
    description: "A professional SEO keyword research tool powered by advanced AI, featuring live search grounding for accurate, real-time metrics and insights.",
    tags: ["AI", "SEO", "Search Grounding", "Next.js"],
    links: {
      demo: "https://rankrocket.vercel.app/",
      repo: "https://github.com/niofrequency/Rank-Rocket"
    },
    image: ""
  },
  {
    id: "carrier-extract",
    title: "CarrierExtract",
    description: "An AI-powered tool to extract structured TypeScript data from any PDF files. Engineered for developers who need to turn unstructured logistics or technical documents into actionable code objects.",
    tags: ["AI", "PDF Parser", "TypeScript", "Next.js"],
    links: {
      demo: "https://carrier-extract.vercel.app/",
      repo: "https://github.com/niofrequency/Carrier-Extract"
    },
    image: ""
  },
  {
    id: "mil-tiga-delapan",
    title: "MIL TIGA DELAPAN",
    description: "Official platform for a trusted Indonesian company specializing in integrated services for mining and industrial sectors. Designed to showcase reliable, high-quality solutions for operations in challenging environments.",
    tags: ["Industrial", "Mining", "Corporate", "Logistics"],
    links: {
      demo: "https://mil-tiga-delapan.vercel.app/",
      repo: "https://github.com/niofrequency/MIL-TIGA-DELAPAN"
    },
    image: ""
  },
  {
    id: "daily-bread",
    title: "DailyBread",
    description: "A peaceful, journal-centric Bible study app featuring daily verses, multi-version support, and AI-powered original language word studies for deeper spiritual growth.",
    tags: ["React", "AI", "PWA", "UI/UX"],
    links: {
      demo: "https://dailybreadjournal.vercel.app/",
      repo: "https://github.com/niofrequency/Daily-Bread"
    },
    image: ""
  },
  {
    id: "reefer-guru",
    title: "Reefer Guru",
    description: "An AI-powered assistant designed specifically for Reefer Container Technicians. It helps diagnose faults, suggests repair procedures, and interprets error codes in real-time, drastically reducing downtime in cold chain logistics.",
    tags: ["React", "OpenAI API", "Node.js", "PWA"],
    links: {
      demo: "https://reefer-guru.vercel.app/",
      repo: "https://github.com/niofrequency/ReeferGuru"
    },
    image: "" 
  },
  {
    id: "site-armor",
    title: "Site Armor",
    description: "A comprehensive real-time website security scanner. Site Armor proactively monitors web assets for vulnerabilities, malware signatures, and SSL expiration, providing instant alerts and detailed remediation reports.",
    tags: ["Python", "Django", "Cybersecurity", "React"],
    links: {
      demo: "https://site-armor.vercel.app/",
      repo: "https://github.com/niofrequency/Site-Armor"
    },
    image: ""
  }
];

export const SERVICES: Service[] = [
  {
    title: "Web Design",
    description: "Modern, responsive, and user-centric designs that convert visitors into customers.",
    icon: <FaLaptopCode className="text-4xl text-primary" />
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile applications built with React Native for seamless performance.",
    icon: <FaMobileAlt className="text-4xl text-secondary" />
  },
  {
    title: "SEO & Security",
    description: "Boosting visibility while hardening your digital infrastructure against threats.",
    icon: <FaShieldAlt className="text-4xl text-accent-success" />
  },
  {
    title: "Automation",
    description: "Custom scripts and bots to automate repetitive tasks and optimize workflows.",
    icon: <FaCogs className="text-4xl text-accent-warning" />
  }
];
