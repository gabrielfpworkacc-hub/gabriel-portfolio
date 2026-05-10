import React, { useState } from 'react';
import HomeView from './MainPortfolio';
import ProjectsView from './ProjectsPortfolio';

const GlobalNavbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-[100] bg-charcoal/95 backdrop-blur-xl border-b border-offwhite/10 flex items-center px-6">
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
        <button 
          onClick={() => setActivePage('home')}
          className="font-heading font-bold text-lg tracking-tight-custom text-offwhite hover:text-gold transition-colors"
        >
          Gabriel Pedraza
        </button>
        
        <div className="flex items-center gap-2 bg-offwhite/5 rounded-full p-1 border border-offwhite/10">
          <button 
            onClick={() => setActivePage('home')}
            className={`px-6 py-2 rounded-full font-heading text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
              activePage === 'home' 
                ? 'bg-offwhite text-charcoal shadow-md' 
                : 'text-offwhite/60 hover:text-offwhite hover:bg-offwhite/10'
            }`}
          >
            Executive Summary
          </button>
          <button 
            onClick={() => setActivePage('projects')}
            className={`px-6 py-2 rounded-full font-heading text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
              activePage === 'projects' 
                ? 'bg-gold text-charcoal shadow-md' 
                : 'text-offwhite/60 hover:text-offwhite hover:bg-offwhite/10'
            }`}
          >
            UNT Featured Work
          </button>
          <a 
            href="/Gabriel_Pedraza_Resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full font-heading text-xs font-semibold tracking-wide uppercase transition-all duration-300 text-offwhite/60 hover:text-offwhite hover:bg-offwhite/10 flex items-center"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

import Footer from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal relative flex flex-col">
      <GlobalNavbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="w-full flex-grow">
        {activePage === 'home' ? <HomeView /> : <ProjectsView />}
      </main>

      <Footer isProjectPage={activePage === 'projects'} />
    </div>
  );
}
