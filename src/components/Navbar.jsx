import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Process', href: '#process' },
    { label: 'Proof', href: '#proof' },
  ];

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between px-6 py-3 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-offwhite/60 backdrop-blur-xl border border-walnut/15 shadow-lg shadow-black/10 text-charcoal rounded-full'
          : 'bg-transparent text-offwhite rounded-full'
      }`}
      style={{ width: 'min(92vw, 860px)' }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-heading font-bold text-sm tracking-tight-custom hover-lift whitespace-nowrap"
      >
        Gabriel Pedraza
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 ml-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-heading text-xs font-medium tracking-wide uppercase opacity-70 hover:opacity-100 hover-lift transition-opacity duration-300"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className={`hidden md:inline-flex btn-magnetic items-center gap-2 px-5 py-2 rounded-full text-xs font-heading font-semibold tracking-wide uppercase ml-6 ${
          scrolled
            ? 'bg-charcoal text-offwhite'
            : 'bg-walnut text-offwhite'
        }`}
      >
        <span className="btn-bg bg-gold"></span>
        <span>Let's Connect</span>
      </a>

      {/* Mobile Toggle */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 hover-lift"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-offwhite/95 backdrop-blur-xl rounded-2xl border border-walnut/10 shadow-2xl p-6 flex flex-col gap-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-charcoal text-sm font-medium tracking-wide uppercase opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-magnetic bg-charcoal text-offwhite text-center px-5 py-3 rounded-full text-xs font-heading font-semibold tracking-wide uppercase"
          >
            <span className="btn-bg bg-walnut"></span>
            <span>Let's Connect</span>
          </a>
        </div>
      )}
    </nav>
  );
}
