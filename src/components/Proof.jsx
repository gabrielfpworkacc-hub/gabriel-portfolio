import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Rocket, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const proofCards = [
  {
    icon: Layers,
    label: 'Operating Systems',
    title: 'Organizational Infrastructure',
    description:
      'I build the internal operating systems that most companies skip: the SOPs, workflow maps, role clarity docs, and reporting cadences that make an organization run without relying on institutional memory.',
    detail:
      'Every system I build is designed to be handed off, scaled, or audited without me in the room.',
  },
  {
    icon: Rocket,
    label: 'Project Execution',
    title: 'Structured Delivery',
    description:
      'From stakeholder alignment to final handoff, I manage projects through clear milestones, documented decision logs, and proactive risk management, not status meetings that waste time.',
    detail:
      'My project delivery framework is built around accountability, visibility, and velocity, in that order.',
  },
  {
    icon: Cpu,
    label: 'Scalable Workflow',
    title: 'Intelligent Automation',
    description:
      'I integrate automated systems into real workflows, not as novelty features, but as embedded infrastructure for documentation, data processing, reporting, and SOP generation that compounds team output.',
    detail:
      'Automation is the accelerant. The system architecture is the engine. I build both.',
  },
];

export default function Proof() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proof-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proof" className="section-pad bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-walnut">
            Proof of Work
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-offwhite tracking-tighter-custom mt-3">
            What I Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofCards.map((card) => (
            <div
              key={card.label}
              className="proof-card group card-surface p-6 md:p-8 text-charcoal flex flex-col hover:shadow-xl hover:shadow-walnut/5 transition-shadow duration-500"
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-charcoal/5 flex items-center justify-center group-hover:bg-walnut/10 transition-colors duration-300">
                  <card.icon size={16} className="text-walnut" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40">
                  {card.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-xl tracking-tight-custom mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-heading text-sm text-charcoal/60 leading-relaxed mb-4 flex-1">
                {card.description}
              </p>

              {/* Proof Detail */}
              <div className="card-inner p-4">
                <p className="font-mono text-[11px] text-charcoal/50 leading-relaxed">
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
