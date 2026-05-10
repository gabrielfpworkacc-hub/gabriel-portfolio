import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal for each statement
      const words = sectionRef.current.querySelectorAll('.word-reveal-inner');
      gsap.from(words, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const splitWords = (text, className = '') =>
    text.split(' ').map((word, i) => (
      <span key={i} className="word-reveal">
        <span className={`word-reveal-inner ${className}`}>
          {word}&nbsp;
        </span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden"
      style={{ background: '#2A1A12' }}
    >
      {/* Parallax texture bg */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 to-espresso/80" />
      </div>

      <div className="relative section-pad">
        <div className="max-w-5xl mx-auto">
          {/* Operational DNA */}
          <div className="mb-10 md:mb-14">
            <h3 className="font-heading font-extrabold text-offwhite text-3xl md:text-4xl mb-6 tracking-tighter-custom">
              Operational DNA
            </h3>
            <p className="font-heading text-offwhite/70 text-lg md:text-xl leading-relaxed tracking-tight-custom mb-6">
              Effective operational systems are built on a foundation of endurance, adaptability, and empirical iteration. These traits form the core infrastructure of my professional framework. I operate with high-endurance persistence to push through operational roadblocks, combined with dynamic adaptability to pivot when systems fail.
            </p>
            <p className="font-heading text-offwhite/70 text-lg md:text-xl leading-relaxed tracking-tight-custom mb-6">
              Internal friction points, such as over-commitment and analysis paralysis, are systematically bottlenecked through disciplined forward-planning and rigid scope management. 
            </p>
          </div>

          {/* Power statement */}
          <div>
            <p className="text-2xl md:text-4xl lg:text-5xl leading-tight tracking-tighter-custom">
              {splitWords('The result is transformative leadership: I do not just manage the status quo, I', 'font-heading font-bold text-offwhite')}
              <span className="word-reveal">
                <span className="word-reveal-inner font-drama italic text-gold">
                  architect&nbsp;
                </span>
              </span>
              {splitWords('repeatable systems that', 'font-heading font-bold text-offwhite')}
              <span className="word-reveal">
                <span className="word-reveal-inner font-drama italic text-gold">
                  scale.
                </span>
              </span>
            </p>
          </div>

          {/* Divider accent */}
          <div className="mt-14 md:mt-20 flex items-center gap-4">
            <div className="w-12 h-px bg-walnut" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/30">
              Internal SWOT Analysis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
