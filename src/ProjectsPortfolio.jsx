import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  FileText, 
  Search, 
  Database, 
  Layers, 
  Presentation, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// --- DATA STRUCTURES ---
const CAPABILITIES = [
  { icon: Search, title: "Problem Framing", desc: "Defining the core question before designing solutions." },
  { icon: FileText, title: "Stakeholder Research", desc: "Understanding needs through interviews and personas." },
  { icon: Database, title: "Data Collection", desc: "Gathering qualitative and quantitative evidence." },
  { icon: Layers, title: "Thematic Analysis", desc: "Finding patterns in complex, unstructured data." },
  { icon: CheckCircle2, title: "Process Design", desc: "Building repeatable, scalable operational structures." },
  { icon: Presentation, title: "Prototype Development", desc: "Translating concepts into tangible UI/UX models." },
  { icon: BookOpen, title: "Presentation", desc: "Communicating complex findings to executives." },
  { icon: CheckCircle2, title: "Implementation Awareness", desc: "Planning for real-world constraints and costs." },
  { icon: Layers, title: "Systems Thinking", desc: "Seeing how parts connect within a larger whole." }
];

const METHODOLOGY = [
  "Frame the problem",
  "Understand the people",
  "Collect evidence",
  "Map the system",
  "Build the structure",
  "Present the work",
  "Reflect and improve"
];

const PROJECTS_DATA = [
  {
    id: "reno",
    title: "Project Reno / Willis Library",
    subtitle: "Library Renovation Needs Analysis",
    accent: "#2f4f4f", // Academic Green
    accentLight: "rgba(47, 79, 79, 0.15)",
    mp4Path: "./Project.Context/project_reno.mp4",
    mdPath: "./Project.Context/project_reno_overview.md",
    pdfPath: "/Project.Context/project_reno.pdf",
    fallbackSummary: "A research and design project focused on how UNT could renovate the 4th floor of Willis Library to better meet student and patron needs.",
    drivingQuestion: "How might UNT renovate the 4th floor of Willis Library to better meet the needs of its patrons based on the perspective of students?",
    proofPoints: [
      "Student-centered driving question",
      "Initial surveys & Focus groups",
      "Impromptu interviews & Tabling",
      "Comprehensive data collection & presentation",
      "A-B surveys",
      "Comfort, ambiance, furniture, and psychological safety themes"
    ],
    skills: ["Research Design", "Data Collection", "Thematic Analysis", "User-Centered Design", "Presentation"]
  },
  {
    id: "serve-denton",
    title: "Serve Denton Resilience Hubs",
    subtitle: "Community Service Expansion Strategy",
    accent: "#8c4a23", // Community Rust/Orange
    accentLight: "rgba(140, 74, 35, 0.15)",
    mp4Path: "./Project.Context/serve_denton.mp4",
    mdPath: "./Project.Context/serve_denton_resilience_hubs.md",
    pdfPath: "/Project.Context/serve_denton.pdf",
    fallbackSummary: "A community-focused project supporting Serve Denton’s goal of expanding service access for smaller North Texas communities through the concept of resilience hubs.",
    drivingQuestion: "How might we make a plan for Serve Denton to expand its reach to serve the needs of smaller communities within the North Texas area?",
    proofPoints: [
      "Community needs & Target county research",
      "5 key service pillars (Income, Healthcare, Food, Mental, Childcare)",
      "Space justification & Model floor plan",
      "Cost and budgeting research",
      "Furniture, fixtures, and equipment (FF&E) cost estimates"
    ],
    skills: ["Community Research", "Spatial Planning", "Service Design", "Cost Awareness", "Implementation Thinking"]
  },
  {
    id: "agwinsights",
    title: "AGWInsights x UNT",
    subtitle: "Personalized Career Development Pathway",
    accent: "#2a4365", // Corporate Blue
    accentLight: "rgba(42, 67, 101, 0.15)",
    mp4Path: "./Project.Context/agwinsights.mp4",
    mdPath: "./Project.Context/agwinsights_project.md",
    pdfPath: "/Project.Context/agwinsights.pdf",
    fallbackSummary: "Designing a personalized academic and career development pathway for students from college into early career. Connected behavioral insights, student journey mapping, soft skill development, user research, and prototype development.",
    drivingQuestion: "How might the UNT PDA program design, develop, and build a program that offers college students a customized, hyper-personalized academic and career development path?",
    proofPoints: [
      "Student journey model",
      "Target market & competitor research",
      "Interviewed 160 students",
      "Identified 64 unique themes",
      "Categorized 462 supporting quotes",
      "Clickable Figma prototype (Corelign)",
      "Analytics / KPI summary"
    ],
    skills: ["User Research", "UI Design", "Journey Mapping", "Prototype Development", "Communication"]
  },
  {
    id: "allen-chamber",
    title: "Allen Chamber OS Buildout",
    subtitle: "Repeatable Operational Framework",
    accent: "#1e3a8a", // Deep OS Blue
    accentLight: "rgba(30, 58, 138, 0.15)",
    mp4Path: "./Project.Context/allen_chamber.mp4",
    mdPath: "./Project.Context/allen_chamber_os_buildout.md",
    pdfPath: "/Project.Context/allen_chamber.pdf",
    fallbackSummary: "A capstone project focused on helping the Allen Chamber of Commerce create a repeatable operating structure through process documentation, repository design, SOPs, knowledge transfer, data routines, and implementation planning.",
    drivingQuestion: "How might I create a repeatable, documented operating system for the Allen Chamber that makes day-to-day work trainable, consistent, and retained after the team implements new changes?",
    proofPoints: [
      "Operating system buildout",
      "Documentation infrastructure & Process repository",
      "9 priority workflows / 9 SOPs",
      "Installation Process Framework",
      "Knowledge Transfer System",
      "Final stakeholder handoff"
    ],
    skills: ["Project Management", "Process Design", "SOP Development", "Systems Thinking", "SharePoint Planning"]
  }
];

// --- COMPONENTS ---

const SlideViewer = ({ pdfPath, accentColor }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState('loading');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrentSlide(0);
    setStatus('success');
  }

  function onDocumentLoadError() {
    setStatus('error');
  }

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % (numPages || 1));
  };
  
  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? (numPages || 1) - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full aspect-video bg-[#151110] rounded-lg border border-[#3a302c] overflow-hidden flex flex-col items-center justify-center shadow-xl group">
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="w-full h-full flex items-center justify-center overflow-hidden"
          loading={
            <div className="text-[#b0a89e] flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-[#cba052] border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-mono tracking-widest uppercase">Loading deck...</p>
            </div>
          }
        >
          {numPages && (
            <Page 
              pageNumber={currentSlide + 1} 
              width={800}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="[&>canvas]:!max-w-full [&>canvas]:!h-auto object-contain pointer-events-none"
            />
          )}
        </Document>

        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center h-full bg-[#151110] text-[#e8e3d9] z-20">
            <FileText size={48} className="text-[#3a302c] mb-4" />
            <p className="font-semibold text-lg">PDF preview unavailable</p>
            <p className="text-sm text-[#b0a89e] mt-2">The slide deck could not be loaded directly.</p>
          </div>
        )}

        {/* Controls */}
        {numPages > 1 && (
          <>
            <button 
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#241d1a]/80 text-[#f4f1eb] hover:bg-[#3a302c] transition-colors opacity-0 group-hover:opacity-100 duration-300 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#241d1a]/80 text-[#f4f1eb] hover:bg-[#3a302c] transition-colors opacity-0 group-hover:opacity-100 duration-300 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Slide Counter */}
      {numPages > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex space-x-2 overflow-x-auto pb-1 max-w-[80%] hide-scrollbar">
            {Array.from({ length: numPages }).map((_, i) => (
              <button 
                key={i} 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentSlide(i);
                }}
                className={`h-1.5 flex-shrink-0 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-6' : 'w-2 opacity-30 hover:opacity-80'}`}
                style={{ backgroundColor: i === currentSlide ? accentColor : '#b0a89e' }}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-[#b0a89e] text-sm font-mono flex-shrink-0 ml-4">
            {currentSlide + 1} / {numPages}
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectSection = ({ project, onVisibilityChange }) => {
  const sectionRef = useRef(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [showFullDoc, setShowFullDoc] = useState(false);

  useEffect(() => {
    // Intersection Observer for Cinematic Background Blending
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisibilityChange(project.accentLight);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [project.accentLight, onVisibilityChange]);

  useEffect(() => {
    // Attempt to fetch local Markdown file
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(project.mdPath);
        if (response.ok) {
          const text = await response.text();
          setMarkdownContent(text);
        }
      } catch (error) {
        console.log(`Fallback active for ${project.id}. Could not load ${project.mdPath}`);
      }
    };
    fetchMarkdown();
  }, [project.mdPath]);

  return (
    <div ref={sectionRef} className="py-24 border-b border-[#3a302c]/50 relative z-10 scroll-m-20" id={project.id}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Context & Data */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h4 style={{ color: project.accent }} className="font-mono text-xs uppercase tracking-widest mb-3">
              {project.subtitle}
            </h4>
            <h2 className="font-heading font-extrabold tracking-tighter-custom text-offwhite text-4xl mb-6">{project.title}</h2>
            <p className="font-heading text-offwhite/80 text-lg leading-relaxed">
              {project.fallbackSummary}
            </p>
          </div>

          <div className="bg-[#241d1a]/80 backdrop-blur-sm border border-[#3a302c] p-6 rounded-xl">
            <h5 className="text-gold font-heading font-semibold mb-2 flex items-center">
              <Search size={18} className="mr-2" /> Driving Question
            </h5>
            <p className="font-heading italic text-gold text-xl leading-relaxed">"{project.drivingQuestion}"</p>
          </div>

          <div>
            <h5 className="font-heading font-semibold text-offwhite mb-4 text-lg border-b border-[#3a302c] pb-2">Key Proof Points</h5>
            <ul className="space-y-3 font-heading">
              {project.proofPoints.map((point, i) => (
                <li key={i} className="flex items-start text-offwhite/80">
                  <ArrowRight size={16} style={{ color: project.accent }} className="mt-1 mr-3 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-semibold text-offwhite mb-4 text-lg">Applied Skills</h5>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-offwhite/5 border border-offwhite/10 text-offwhite/70 font-mono tracking-wide rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Conditional Markdown Content */}
          {markdownContent && (
            <div className="pt-4">
              <button 
                onClick={() => setShowFullDoc(!showFullDoc)}
                className="btn-magnetic inline-flex items-center gap-2 bg-walnut text-offwhite px-6 py-3 rounded-full font-heading font-semibold text-xs tracking-wide uppercase transition-colors"
                style={{ backgroundColor: showFullDoc ? '#3a302c' : undefined }}
              >
                <FileText size={16} />
                {showFullDoc ? "Hide Project Documentation" : "Read Full Project Documentation"}
              </button>
              
              {showFullDoc && (
                <div className="mt-6 p-6 bg-[#151110] rounded-xl border border-[#3a302c] text-offwhite/80 text-sm whitespace-pre-wrap font-mono overflow-x-auto">
                  {markdownContent}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Media & Slides */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          
          {/* Visual Moodboard (MP4) */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-[#3a302c] bg-[#151110] relative aspect-video">
            <video 
              src={project.mp4Path}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                // Fallback gradient if video fails to load
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gradient-to-br', 'from-[#241d1a]', 'to-[#151110]');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151110] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 flex items-center text-[#e8e3d9] text-xs font-mono uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: project.accent }} />
              Visual Reference Loop
            </div>
          </div>

          {/* Interactive Slide Viewer */}
          <div className="bg-[#241d1a]/60 backdrop-blur-md p-6 rounded-xl border border-[#3a302c] shadow-lg">
            <h3 className="font-heading font-semibold text-offwhite mb-6 flex items-center justify-between">
              Interactive Deck
              <a 
                href={project.pdfPath} 
                className="btn-magnetic inline-flex items-center gap-2 border border-offwhite/20 text-offwhite/80 px-4 py-2 rounded-full font-heading font-medium text-xs tracking-wide uppercase hover:text-offwhite hover:border-offwhite/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={14} /> Download
              </a>
            </h3>
            <SlideViewer pdfPath={project.pdfPath} accentColor={project.accent} />
          </div>

        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function ProjectsView() {
  const [ambientColor, setAmbientColor] = useState("rgba(26, 21, 20, 1)"); // Default dark walnut

  return (
    <div className="min-h-screen bg-[#1a1514] font-sans selection:bg-[#cba052] selection:text-[#1a1514] relative transition-colors duration-1000">
      
      {/* Cinematic Ambient Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 transition-colors duration-1000 ease-in-out z-0"
        style={{ backgroundColor: ambientColor }}
      />

      <div className="flex relative z-10 max-w-[1440px] mx-auto">
        {/* Secondary Side Navigation */}
        <aside className="sticky top-[72px] h-[calc(100vh-72px)] w-64 hidden lg:flex flex-col border-r border-[#3a302c] bg-[#1a1514]/60 backdrop-blur-md p-6">
          <div className="font-heading font-bold tracking-widest text-offwhite text-sm flex items-center uppercase mb-2 mt-4">
            <div className="w-4 h-4 bg-gold mr-3" />
            PROJECTS ARCHIVE
          </div>
          <div className="font-mono text-offwhite/50 tracking-widest uppercase text-[10px] mb-12 ml-7">
            Project Design & Analysis
          </div>
          
          <div className="flex flex-col space-y-4 ml-7 overflow-y-auto hide-scrollbar">
            {PROJECTS_DATA.map(p => (
              <a 
                key={p.id} 
                href={`#${p.id}`}
                className="font-heading text-xs text-offwhite/60 hover:text-gold transition-colors tracking-wide"
              >
                {p.subtitle}
              </a>
            ))}
            
            <div className="border-t border-[#3a302c] mt-4 pt-4 flex flex-col space-y-4">
              <a 
                href="#methodology"
                className="font-heading text-xs text-offwhite/60 hover:text-gold transition-colors tracking-wide"
              >
                The Working Methodology
              </a>
              <a 
                href="#capabilities"
                className="font-heading text-xs text-offwhite/60 hover:text-gold transition-colors tracking-wide"
              >
                What These Projects Built
              </a>
            </div>
          </div>
        </aside>

      <main className="flex-1 w-full px-6 lg:px-12 pt-24 pb-32">
        
        {/* Hero Section */}
        <header className="max-w-3xl mb-32">
          <h1 className="font-heading font-extrabold tracking-tighter-custom text-offwhite text-5xl md:text-6xl mb-6 leading-tight">
            Project Design <br/>& Analysis Work
          </h1>
          <h2 className="text-gold font-drama italic text-3xl mb-8 font-medium">
            Applied projects focused on systems, research, operations, analytics, and real-world problem solving.
          </h2>
          <p className="font-heading text-offwhite/80 text-lg leading-relaxed mb-8">
            Through UNT’s Project Design & Analysis program, I worked on projects that required moving from unclear problems to research, analysis, design, execution, and presentation. These projects shaped how I approach work: define the problem, understand the people involved, map the system, build structure, and deliver something usable.
          </p>
          <div className="inline-flex items-center px-4 py-2 border border-[#3a302c] rounded-full text-sm font-heading font-medium text-offwhite/80 bg-[#241d1a]/50">
            <span className="w-2 h-2 bg-gold rounded-full mr-3 animate-pulse"></span>
            Shown in chronological progression
          </div>
        </header>

        {/* Projects Timeline Archive */}
        <div className="space-y-12">
          {PROJECTS_DATA.map((project) => (
            <ProjectSection 
              key={project.id} 
              project={project} 
              onVisibilityChange={setAmbientColor} 
            />
          ))}
        </div>

        {/* Methodology Flow */}
        <section id="methodology" className="py-24 border-b border-[#3a302c]/50">
          <h3 className="font-heading font-extrabold tracking-tighter-custom text-offwhite text-4xl mb-12 text-center">The Working Methodology</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {METHODOLOGY.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-[#241d1a] border border-[#3a302c] px-4 py-3 rounded-lg text-center flex-1 w-full md:w-auto shadow-md">
                  <span className="block text-gold font-mono tracking-widest uppercase text-xs mb-1">0{idx + 1}</span>
                  <span className="font-heading text-offwhite/80 text-sm font-medium">{step}</span>
                </div>
                {idx < METHODOLOGY.length - 1 && (
                  <ChevronRight className="text-[#3a302c] hidden md:block" size={24} />
                )}
                {idx < METHODOLOGY.length - 1 && (
                  <ArrowRight className="text-[#3a302c] md:hidden rotate-90 my-2" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" className="py-24">
          <h3 className="font-heading font-extrabold tracking-tighter-custom text-offwhite text-4xl mb-12">What These Projects Built</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="bg-[#241d1a]/50 hover:bg-[#241d1a] transition-colors p-6 rounded-xl border border-[#3a302c]">
                  <Icon className="text-gold mb-4" size={28} />
                  <h4 className="font-heading font-semibold text-offwhite text-lg mb-2">{cap.title}</h4>
                  <p className="font-heading text-offwhite/60 text-sm">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

      </main>
      </div>
    </div>
  );
}
