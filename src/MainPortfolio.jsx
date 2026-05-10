import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Proof from './components/Proof';

export default function HomeView() {
  return (
    <div className="bg-[#0D0D0D] text-[#F5F1EA] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Proof />
    </div>
  );
}
