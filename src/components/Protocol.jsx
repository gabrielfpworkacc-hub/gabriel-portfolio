import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───── SVG Animation 1: Rotating Concentric Circles ───── */
function RotatingMotif() {
  const svgRef = useRef(null);
  useEffect(() => {
    const circles = svgRef.current?.querySelectorAll('.ring');
    if (!circles) return;
    const anims = Array.from(circles).map((c, i) =>
      gsap.to(c, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 20 + i * 5,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    );
    return () => anims.forEach((a) => a.kill());
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 opacity-20">
      <circle className="ring" cx="100" cy="100" r="90" fill="none" stroke="#8B5E3C" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle className="ring" cx="100" cy="100" r="70" fill="none" stroke="#B88A44" strokeWidth="0.5" strokeDasharray="2 6" />
      <circle className="ring" cx="100" cy="100" r="50" fill="none" stroke="#8B5E3C" strokeWidth="0.5" strokeDasharray="6 4" />
      <circle className="ring" cx="100" cy="100" r="30" fill="none" stroke="#B88A44" strokeWidth="1" strokeDasharray="1 3" />
      <circle cx="100" cy="100" r="3" fill="#8B5E3C" />
    </svg>
  );
}

/* ───── SVG Animation 2: Scanning Laser Line ───── */
function ScanningLaser() {
  const lineRef = useRef(null);
  useEffect(() => {
    if (!lineRef.current) return;
    const anim = gsap.to(lineRef.current, {
      attr: { y1: 200, y2: 200 },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
    return () => anim.kill();
  }, []);

  const dots = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={20 + col * 18}
          cy={20 + row * 22}
          r="1.5"
          fill="#8B5E3C"
          opacity="0.2"
        />
      );
    }
  }

  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 opacity-25">
      {dots}
      <line ref={lineRef} x1="0" y1="0" x2="200" y2="0" stroke="#B88A44" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

/* ───── SVG Animation 3: EKG Waveform ───── */
function PulsingWaveform() {
  const pathRef = useRef(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    const anim = gsap.to(pathRef.current, {
      strokeDashoffset: -length,
      duration: 4,
      repeat: -1,
      ease: 'none',
    });
    return () => anim.kill();
  }, []);

  return (
    <svg viewBox="0 0 240 100" className="w-40 h-20 md:w-56 md:h-24 opacity-25">
      <path
        ref={pathRef}
        d="M0,50 L30,50 L40,50 L50,20 L55,80 L60,10 L65,70 L70,50 L90,50 L100,50 L110,50 L120,30 L125,70 L130,15 L135,75 L140,50 L160,50 L180,50 L190,50 L200,35 L205,65 L210,25 L215,60 L220,50 L240,50"
        fill="none"
        stroke="#B88A44"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    description:
      'Map the operational landscape. Identify friction points, duplicated effort, and undocumented tribal knowledge. Understand what is actually happening, not what the org chart says.',
    Visual: RotatingMotif,
  },
  {
    number: '02',
    title: 'Architect',
    description:
      'Design structured workflows, SOPs, and repeatable systems. Every process gets a clear owner, a documented path, and measurable checkpoints that any team member can follow.',
    Visual: ScanningLaser,
  },
  {
    number: '03',
    title: 'Integrate',
    description:
      'Wire automated reporting routines and handoff protocols into the system. Automate what should be automated, then train the team so the system runs without you.',
    Visual: PulsingWaveform,
  },
];

export default function Protocol() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            endTrigger: cards[i + 1],
            end: 'top top',
          });

          gsap.to(card.querySelector('.card-content'), {
            scale: 0.92,
            filter: 'blur(8px)',
            opacity: 0.4,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-walnut">
          The Process
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-offwhite tracking-tighter-custom mt-3">
          How I Work
        </h2>
      </div>

      {steps.map((step, i) => (
        <div
          key={step.number}
          ref={(el) => (cardsRef.current[i] = el)}
          className="h-screen flex items-center justify-center px-4 md:px-8"
        >
          <div
            className="card-content w-full max-w-5xl rounded-3xl border border-walnut/10 overflow-hidden"
            style={{ background: i === 0 ? '#1a1410' : i === 1 ? '#161210' : '#12100e' }}
          >
            <div className="p-8 md:p-14 lg:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 min-h-[400px]">
              {/* Visual */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <step.Visual />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="font-mono text-gold text-sm tracking-widest">
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-offwhite tracking-tighter-custom mt-2">
                  {step.title}
                </h3>
                <p className="font-heading text-offwhite/50 text-sm md:text-base mt-4 leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
