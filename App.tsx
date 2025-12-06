import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  
  // Easter Egg
  useEffect(() => {
    console.log(
      "%c Hey recruiter! Yes, I built this from scratch 🚀",
      "background: #0B1120; color: #00D4FF; font-size: 20px; padding: 10px; border-radius: 5px; border: 1px solid #00D4FF;"
    );
    console.log("Looking for the source code? Check my GitHub or ask me directly!");
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-space-900 min-h-screen text-slate-900 dark:text-slate-200 selection:bg-primary selection:text-space-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;