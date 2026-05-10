import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Terminal, CalendarDays } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────── Card 1 - Diagnostic Shuffler ───────────────────────────── */
function DiagnosticShuffler() {
  const labels = [
    { text: 'Workflow Mapping', accent: 'bg-walnut' },
    { text: 'Process Audit', accent: 'bg-gold' },
    { text: 'System Architecture', accent: 'bg-espresso' },
  ];
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    { top: 0, left: 0, scale: 1, zIndex: 30, opacity: 1 },
    { top: 24, left: 12, scale: 0.96, zIndex: 20, opacity: 0.7 },
    { top: 48, left: 24, scale: 0.92, zIndex: 10, opacity: 0.45 },
  ];

  return (
    <div className="card-surface p-6 md:p-8 text-charcoal flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <Activity size={16} className="text-walnut" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
          Diagnostics
        </span>
      </div>
      <h3 className="font-heading font-bold text-lg md:text-xl tracking-tight-custom mb-1">
        Operations Systems Architecture
      </h3>
      <p className="font-heading text-xs text-charcoal/50 mb-6 leading-relaxed">
        Building repeatable workflows from operational chaos: mapping,
        auditing, and designing systems that hold.
      </p>

      {/* Shuffler Stack */}
      <div className="relative flex-1 min-h-[180px]">
        {order.map((cardIdx, posIdx) => {
          const pos = positions[posIdx];
          const label = labels[cardIdx];
          return (
            <div
              key={cardIdx}
              className={`absolute w-[85%] rounded-xl border border-charcoal/8 shadow-md px-5 py-4 transition-all duration-700`}
              style={{
                top: pos.top,
                left: pos.left,
                transform: `scale(${pos.scale})`,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                background: '#F5F1EA',
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${label.accent}`} />
                <span className="font-heading font-semibold text-sm text-charcoal">
                  {label.text}
                </span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 rounded-full bg-charcoal/8 w-full" />
                <div className="h-1.5 rounded-full bg-charcoal/8 w-3/4" />
                <div className="h-1.5 rounded-full bg-charcoal/8 w-1/2" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────── Card 2 - Telemetry Typewriter ───────────────────────────── */
function TelemetryTypewriter() {
  const messages = [
    '> Managed 5 multi-industry projects concurrently',
    '> Supervised 2 project management interns; tracked productivity',
    '> Created detailed project plans, timelines, and resource allocations',
    '> Executed client onboarding and system training protocols',
    '> Coordinated internal teams for end-to-end project delivery',
  ];
  const [lines, setLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const msgIdx = useRef(0);
  const charIdx = useRef(0);

  useEffect(() => {
    const type = () => {
      const msg = messages[msgIdx.current];
      if (charIdx.current <= msg.length) {
        setCurrentText(msg.slice(0, charIdx.current));
        charIdx.current++;
      } else {
        setLines((prev) => [...prev.slice(-4), msg]);
        setCurrentText('');
        charIdx.current = 0;
        msgIdx.current = (msgIdx.current + 1) % messages.length;
      }
    };
    const interval = setInterval(type, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-surface p-6 md:p-8 text-charcoal flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-green-600">
            Live Feed
          </span>
        </div>
      </div>
      <h3 className="font-heading font-bold text-lg md:text-xl tracking-tight-custom mb-1">
        Project Execution & Delivery
      </h3>
      <p className="font-heading text-xs text-charcoal/50 mb-6 leading-relaxed">
        Structured project management across real stakeholder environments.
        Milestones hit, blockers cleared, teams aligned.
      </p>

      {/* Terminal Feed */}
      <div className="card-inner flex-1 p-4 font-mono text-xs overflow-hidden min-h-[210px]">
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-charcoal/40 leading-relaxed truncate"
          >
            {line}
          </div>
        ))}
        <div className="text-charcoal leading-relaxed flex items-center">
          <span>{currentText}</span>
          <span className="inline-block w-[7px] h-[14px] bg-walnut ml-0.5 cursor-blink" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Card 3 - Cursor Protocol Scheduler ───────────────────────────── */
function CursorScheduler() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: -30, y: -30 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [saved, setSaved] = useState(false);
  const gridRef = useRef(null);
  const animating = useRef(false);

  const runAnimation = useCallback(() => {
    if (animating.current) return;
    animating.current = true;

    const targetDay = Math.floor(Math.random() * 7);

    // Phase 1: Cursor enters
    setCursorVisible(true);
    setCursorPos({ x: -20, y: 40 });

    setTimeout(() => {
      // Phase 2: Move to target day cell
      const cellX = 8 + targetDay * 36;
      setCursorPos({ x: cellX, y: 40 });

      setTimeout(() => {
        // Phase 3: Click
        setPressing(true);
        setTimeout(() => {
          setPressing(false);
          setActiveDay(targetDay);

          setTimeout(() => {
            // Phase 4: Move to Save button
            setCursorPos({ x: 100, y: 90 });

            setTimeout(() => {
              setPressing(true);
              setTimeout(() => {
                setPressing(false);
                setSaved(true);

                setTimeout(() => {
                  // Phase 5: Fade out
                  setCursorVisible(false);
                  setTimeout(() => {
                    setSaved(false);
                    setActiveDay(-1);
                    animating.current = false;
                  }, 800);
                }, 400);
              }, 150);
            }, 500);
          }, 600);
        }, 150);
      }, 700);
    }, 400);
  }, []);

  useEffect(() => {
    runAnimation();
    const interval = setInterval(runAnimation, 5500);
    return () => clearInterval(interval);
  }, [runAnimation]);

  return (
    <div className="card-surface p-6 md:p-8 text-charcoal flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={16} className="text-walnut" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
          Automation
        </span>
      </div>
      <h3 className="font-heading font-bold text-lg md:text-xl tracking-tight-custom mb-1">
        Scalable Process Automation
      </h3>
      <p className="font-heading text-xs text-charcoal/50 mb-6 leading-relaxed">
        Integrating automated documentation, reporting routines, and workflow
        routing to eliminate human friction and single points of failure.
      </p>

      {/* Scheduler Grid */}
      <div ref={gridRef} className="card-inner flex-1 p-4 relative min-h-[140px] overflow-hidden">
        {/* Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((d, i) => (
            <div
              key={i}
              className="font-mono text-[10px] text-center text-charcoal/40 font-medium"
            >
              {d}
            </div>
          ))}
        </div>
        {/* Day Cells */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center font-mono text-[10px] transition-all duration-300 ${
                i === activeDay
                  ? 'bg-walnut text-offwhite scale-95'
                  : 'bg-charcoal/5 text-charcoal/30'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        {/* Save Button */}
        <div className="flex justify-center mt-3">
          <div
            className={`px-6 py-1.5 rounded-full font-mono text-[10px] font-medium transition-all duration-300 ${
              saved
                ? 'bg-walnut text-offwhite'
                : 'bg-charcoal/8 text-charcoal/40'
            }`}
          >
            {saved ? '✓ Saved' : 'Save'}
          </div>
        </div>

        {/* Animated Cursor */}
        <svg
          className="absolute pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            opacity: cursorVisible ? 1 : 0,
            transform: pressing ? 'scale(0.85)' : 'scale(1)',
            width: 20,
            height: 24,
          }}
          viewBox="0 0 20 24"
          fill="none"
        >
          <path
            d="M4 1L4 17L8.5 13L13.5 20L16 18.5L11 11.5L16.5 10L4 1Z"
            fill="#8B5E3C"
            stroke="#2A1A12"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────────── Features Section ───────────────────────────── */
export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="section-pad bg-charcoal"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-walnut">
            Core Capabilities
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-offwhite tracking-tighter-custom mt-3">
            What I Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <DiagnosticShuffler />
          </div>
          <div className="feature-card">
            <TelemetryTypewriter />
          </div>
          <div className="feature-card">
            <CursorScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}
