import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-line-1', { y: 60, opacity: 0, duration: 1, delay: 0.3 })
        .from('.hero-line-2', { y: 60, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-scroll', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '640px' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Mountain_Trip.jpg"
          alt="Mountain Landscape"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Heavy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
      </div>

      {/* Content - bottom-left third */}
      <div className="relative h-full flex flex-col justify-end px-6 pb-16 md:px-12 lg:px-20 xl:px-28 max-w-[1440px] mx-auto">
        <div className="max-w-3xl">
          {/* Hero Line 1 - Bold Sans */}
          <h1 className="hero-line-1 font-heading font-extrabold text-offwhite tracking-tighter-custom leading-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Turning systems into
          </h1>

          {/* Hero Line 2 - Massive Serif Italic */}
          <p className="hero-line-2 font-drama italic text-gold leading-none mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Common Sense.
          </p>

          {/* Sub line */}
          <p className="hero-sub font-heading text-offwhite/60 text-sm md:text-base font-medium tracking-wide mt-8 max-w-lg leading-relaxed">
            Operations systems builder and lead project manager. I conduct rigorous diagnostics on scattered operations, engineering the foundational architecture required for teams to execute predictably and scale without friction.
          </p>

          {/* CTA */}
          <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#proof"
              id="hero-cta-primary"
              className="btn-magnetic inline-flex items-center gap-2 bg-walnut text-offwhite px-8 py-4 rounded-full font-heading font-semibold text-sm tracking-wide uppercase"
            >
              <span className="btn-bg bg-gold"></span>
              <span>View My Work</span>
            </a>
            <a
              href="#contact"
              className="btn-magnetic inline-flex items-center gap-2 border border-offwhite/20 text-offwhite/80 px-8 py-4 rounded-full font-heading font-medium text-sm tracking-wide uppercase hover:text-offwhite hover:border-offwhite/40 transition-colors"
            >
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/50">
            Scroll
          </span>
          <ArrowDown size={14} className="text-offwhite/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
