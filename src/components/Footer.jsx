import { ExternalLink, Mail, FileText, ArrowUpRight } from 'lucide-react';

export default function Footer({ isProjectPage = false }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal relative">
      <div
        className="rounded-t-[4rem] overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-5">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-offwhite tracking-tighter-custom">
                Gabriel Pedraza
              </h3>
              <p className="font-heading text-offwhite/40 text-sm mt-3 leading-relaxed max-w-sm">
                Turning operations systems into common sense. Building
                structured, repeatable systems that teams can actually follow.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="mailto:gabrielfp.work.acc@gmail.com"
                  className="btn-magnetic inline-flex items-center gap-2 bg-walnut text-offwhite px-5 py-2.5 rounded-full font-heading text-xs font-semibold tracking-wide uppercase"
                >
                  <span className="btn-bg bg-gold"></span>
                  <Mail size={13} />
                  <span>Contact Me</span>
                </a>
                <a
                  href="/Gabriel_Pedraza_Resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic inline-flex items-center gap-2 border border-offwhite/15 text-offwhite/60 px-5 py-2.5 rounded-full font-heading text-xs font-medium tracking-wide uppercase hover:text-offwhite hover:border-offwhite/30 transition-colors"
                >
                  <FileText size={13} />
                  <span>Resume</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gabriel-f-pedraza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic inline-flex items-center gap-2 border border-offwhite/15 text-offwhite/60 px-5 py-2.5 rounded-full font-heading text-xs font-medium tracking-wide uppercase hover:text-offwhite hover:border-offwhite/30 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className="opacity-50" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-offwhite/30 mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {(isProjectPage ? [
                  { label: 'Project Reno / Willis Library', href: '#reno' },
                  { label: 'Serve Denton Resilience Hubs', href: '#serve-denton' },
                  { label: 'AGWInsights x UNT', href: '#agwinsights' },
                  { label: 'Allen Chamber OS Buildout', href: '#allen-chamber' },
                  { label: 'The Working Methodology', href: '#methodology' },
                  { label: 'What These Projects Built', href: '#capabilities' },
                ] : [
                  { label: 'Capabilities', href: '#capabilities' },
                  { label: 'Philosophy', href: '#philosophy' },
                  { label: 'Process', href: '#process' },
                  { label: 'Proof of Work', href: '#proof' },
                ]).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-heading text-sm text-offwhite/40 hover:text-offwhite hover-lift transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Status */}
            <div className="md:col-span-3">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-offwhite/30 mb-5">
                Status
              </h4>

              {/* System Operational */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
                <span className="font-mono text-[11px] text-offwhite/40">
                  System Operational
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-offwhite/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-offwhite/20 tracking-wider">
              © {year} Gabriel Pedraza. All rights reserved.
            </p>
            <p className="font-mono text-[10px] text-offwhite/15 tracking-wider">
              Built with precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
