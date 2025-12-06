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
  about: `I am a versatile Full-Stack Developer with a background that spans continents and industries—from high-stakes logistics in Indonesia to facility operations in the U.S. My journey into tech wasn't linear; it was built on a foundation of solving complex, real-world problems in administration, field operations, and IT.

I don't just write code; I engineer efficiency. With experience managing critical cold chain logistics for over 380 containers and leading cross-functional teams, I understand that software is ultimately about people and process. I translate this operational expertise into robust digital solutions—automating workflows, building intuitive infrastructure, and bridging the gap between technical capability and business goals.

Fluent in English and Bahasa Indonesian, I thrive in dynamic, multicultural environments. Whether I'm architecting a new web platform or optimizing a supply chain algorithm, I bring a leadership mindset, acute attention to detail, and a commitment to aligning technology with human purpose.`
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
    id: "reefer-guru",
    title: "Reefer Guru",
    description: "An AI-powered assistant designed specifically for Reefer Container Technicians. It helps diagnose faults, suggests repair procedures, and interprets error codes in real-time, drastically reducing downtime in cold chain logistics.",
    tags: ["React", "OpenAI API", "Node.js", "PWA"],
    links: {
      demo: "https://reefer-guru.vercel.app/",
      repo: "#"
    },
    // Using a custom generated logo in the component instead
    image: "" 
  },
  {
    id: "site-armor",
    title: "Site Armor",
    description: "A comprehensive real-time website security scanner. Site Armor proactively monitors web assets for vulnerabilities, malware signatures, and SSL expiration, providing instant alerts and detailed remediation reports.",
    tags: ["Python", "Django", "Cybersecurity", "React"],
    links: {
      demo: "https://site-armor.vercel.app/",
      repo: "#"
    },
    // Using a custom generated logo in the component instead
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
