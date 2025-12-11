import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  Server, 
  Database, 
  Code, 
  Layers, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Award,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Globe,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Heart,
  Activity,
  ShoppingCart,
  Package,
  Copy,
  Check
} from 'lucide-react';

// --- Toast Notification Component ---
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<{ toast: Toast; onClose: (id: string) => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[toast.type];

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in-right`}>
      {toast.type === 'success' && <Check size={18} />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};

// --- Animated Counter Hook ---
const useAnimatedCounter = (finalValue: number | string, duration: number = 2000) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    const parseValue = () => {
      if (typeof finalValue === 'string') {
        return parseInt(finalValue.replace(/[^0-9]/g, '')) || 0;
      }
      return finalValue;
    };

    const target = parseValue();
    let current = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, finalValue, duration]);

  return { displayValue, elementRef };
};

// --- Prefers Reduced Motion Hook ---
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
};

// --- Types & Interfaces ---

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  techStack?: string[];
  roleType?: string[];
  achievements: string[];
}

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  metrics?: string;
  image?: string | null;
  demoLink?: string;
  githubLink?: string;
  customIcon?: React.ReactNode;
  startDate?: string;
  endDate?: string;
  teamSize?: string;
  difficulty?: 'Easy' | 'Medium' | 'Complex';
  testimonial?: {
    text: string;
    author?: string;
  };
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    years: number;
    featured?: boolean;
    icon?: string;
    relatedSkills?: string[];
  }>;
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  cgpa?: string;
  coursework?: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon?: string;
}

// --- Data Extracted from CV ---

const personalInfo = {
  name: "Mohit Sangwan",
  title: "Principal Software Developer",
  subtitle: "Dot Net Technology Expert | 10+ Years Experience",
  email: "sangwan.mohit6@gmail.com",
  phone: "+91 9808001891",
  linkedin: "https://www.linkedin.com/in/mohit-s-87594186", 
  location: "India",
  summary: "Principal Software Developer with 10+ years of experience in designing scalable web applications, APIs, and enterprise Healthcare IT solutions. specialized in architecting multi-tenant systems, optimizing SQL performance, and leading cross-functional teams to deliver projects across 5+ countries."
};

const keyMetrics = [
  { label: "Performance Boost", value: "40%", icon: <TrendingUp size={20} /> },
  { label: "Facilities Managed", value: "100+", icon: <Server size={20} /> },
  { label: "Manual Error Reduction", value: "35%", icon: <CheckCircle size={20} /> },
  { label: "Delivery Speedup", value: "30%", icon: <Clock size={20} /> },
];

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Principal Software Developer",
    company: "Akhil Systems Private Ltd",
    period: "March 2017 - Present",
    description: "Leading design and development of enterprise Healthcare IT solutions and scalable database systems. Responsible for architectural decisions, team mentorship, and client delivery across multiple geographies.",
    techStack: ["C#", "ASP.NET", "SQL Server", "Azure DevOps", ".NET Core", "Web API", "HL7", "Mirth Connect", "RESTful Services","SSRS","Integration APIs"],
    roleType: ["Leadership", "Architecture", "Full-Stack"],
    achievements: [
      "Architected multi-tenant HIS and EMR systems for 100+ facilities across India, UAE, Qatar, Oman, Nigeria, and Bangladesh.",
      "Integrated critical third-party systems (DHA, QLM, PayStack) reducing transaction processing times by 40%.",
      "Mentored 4+ developers in agile practices and CI/CD, improving project delivery speed by 30%.",
      "Automated patient registration, EMR, billing, and lab workflows, directly reducing manual operational errors by 35%."
    ]
  },
  {
    id: 2,
    role: "Software Developer",
    company: "Adros Systems Private Ltd",
    period: "February 2016 - March 2017",
    description: "Full-stack development of web and desktop applications in .NET, focusing on e-commerce and management systems.",
    techStack: [".NET Framework", "C#", "SQL Server", "JavaScript", "Bootstrap", "Crystal Reports"],
    roleType: ["Full-Stack", "Backend"],
    achievements: [
      "Developed 'Club 360' Gym Management System for comprehensive member tracking and attendance.",
      "Built e-commerce platforms (StationeryRus, MapleCraft) with robust PayPal payment gateway integration.",
      "Implemented SEO optimization strategies and biometric API integrations."
    ]
  }
];

const projects: ProjectItem[] = [
  {
    title: "Multi-Tenant HIS/EMR System",
    category: "Healthcare",
    description: "A scalable Hospital Information System serving 100+ facilities. Features include strict tenant isolation, automated workflows, and RBAC-based access control.",
    tech: [".NET Core",".NET Framework", "SQL Server", "Web API",  "Azure DevOps"],
    metrics: "Deployed across 5+ countries",
    image: null,
    customIcon: <Heart className="text-red-500" />,
    startDate: "Mar 2017",
    endDate: "Present",
    teamSize: "8-10 developers",
    difficulty: "Complex",
    demoLink: "#",
    githubLink: "#",
    testimonial: {
      text: "Transformed our healthcare operations with a robust, scalable platform.",
      author: "Akhil Systems"
    }
  },
  
  {
    title: "Clinical API Orchestration Layer",
    category: "Backend",
    description: "Middleware solution to unify clinical, billing, inventory, and claims integrations into a single manageable orchestration layer.",
    tech: ["C#", "Restful Services", "HL7", "Mirth Connect", "Insurance / Payment Gateway / Third Party APIs"],
    metrics: "Unified 3+ disparate systems",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0&q=40&w=800&auto=format&fit=crop",
    startDate: "2017",
    endDate: "Present",
    teamSize: "1-3 developers",
    difficulty: "Complex",
    demoLink: "#",
    githubLink: "#",
    testimonial: {
      text: "Seamlessly integrated multiple systems without any downtime.",
      author: "Akhil Systems"
    }
  },
  {
    title: "Club 360 Management System",
    category: "SaaS",
    description: "A comprehensive management solution for fitness centers including member tracking, package management, and attendance systems.",
    tech: [".NET Framework", "Crystal Reports", "SQL Server"],
    metrics: "Full lifecycle ownership",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0&q=40&w=800&auto=format&fit=crop",
    startDate: "Feb 2016",
    endDate: "Mar 2017",
    teamSize: "2 developers",
    difficulty: "Medium",
    demoLink: "#",
    githubLink: "#",
    testimonial: {
      text: "Streamlined our gym operations significantly with intuitive features.",
      author: "Adros Systems Private Ltd"
    }
  },
  {
    title: "Stationery R Us",
    category: "SaaS",
    description: "A one-stop shop e-commerce platform for stationery, office supplies, furniture, and warehouse needs. Serves businesses of all sizes across Australia with thousands of available items.",
    tech: ["ASP.NET", "SQL Server", "JavaScript", "Bootstrap",  "E-commerce","Inventory Management"],
    metrics: "Extensive inventory management",
    image: null,
    customIcon: <ShoppingCart className="text-blue-600" />,
    startDate: "2016",
    endDate: "2017",
    teamSize: "2 developers",
    difficulty: "Medium",
    demoLink: "https://www.stationeryrus.com.au",
    githubLink: "#",
    testimonial: {
      text: "Professional e-commerce platform that increased our online sales significantly.",
      author: "Adros Systems Private Ltd"
    }
  },
  {
    title: "Maple Craft Inc.",
    category: "SaaS",
    description: "Leading distributor e-commerce platform for smoking accessories throughout Canada. Established in 2007, recognized as a prominent company in their sector.",
    tech: ["ASP.NET", "SQL Server", "JavaScript", "Bootstrap",  "E-commerce","Inventory Management"],
    metrics: "Multi-vendor support",
    image: null,
    customIcon: <Package className="text-green-600" />,
    startDate: "2016",
    endDate: "2017",
    teamSize: "2 developers",
    difficulty: "Medium",
    demoLink: "https://www.maplecraft.ca",
    githubLink: "#",
    testimonial: {
      text: "Robust e-commerce solution that streamlined our distribution operations.",
      author: "Adros Systems Private Ltd"
    }
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Core Languages",
    icon: <Code size={20} />,
    skills: [
      { name: "C#", level: "Expert", years: 10, featured: true, icon: "#", relatedSkills: ["ASP.NET MVC", ".NET Core", "Web API"] },
      { name: "SQL Server", level: "Expert", years: 10, featured: true, icon: "📊", relatedSkills: ["PostgreSQL", "Entity Framework"] },
      { name: "Core Java", level: "Advanced", years: 5, icon: "☕", relatedSkills: ["JavaScript"] },
      { name: "C++", level: "Advanced", years: 4, icon: "⚙️" },
      { name: "TypeScript", level: "Intermediate", years: 2, icon: "📘", relatedSkills: ["JavaScript", "React"] },
      { name: "PostgreSQL", level: "Advanced", years: 4, icon: "🐘" }
    ]
  },
  {
    title: "Frameworks & Arch",
    icon: <Layers size={20} />,
    skills: [
      { name: "ASP.NET MVC", level: "Expert", years: 9, featured: true, icon: ".NET", relatedSkills: ["C#", "Entity Framework", "Web API"] },
      { name: ".NET Core", level: "Expert", years: 8, featured: true, icon: ".NET", relatedSkills: ["C#", "Web API", "Azure"] },
      { name: "Web API", level: "Expert", years: 8, featured: true, icon: "🔗", relatedSkills: ["REST", "C#", ".NET Core"] },
      { name: "Entity Framework", level: "Advanced", years: 7, icon: "📦", relatedSkills: ["SQL Server", "C#", ".NET Core"] },
      { name: "ASP.NET WEBFORMS", level: "Advanced", years: 6, icon: ".NET" },
      { name: "Windows Services", level: "Advanced", years: 5, icon: "⚙️" },
      { name: "WPF", level: "Intermediate", years: 3, icon: "🖥️" }
    ]
  },
  {
    title: "Frontend",
    icon: <Globe size={20} />,
    skills: [
      { name: "JavaScript", level: "Advanced", years: 6, featured: true, icon: "JS", relatedSkills: ["HTML5/CSS3", "React", "Bootstrap"] },
      { name: "HTML5/CSS3", level: "Advanced", years: 6, featured: true, icon: "🎨", relatedSkills: ["JavaScript", "Bootstrap", "Tailwind CSS"] },
      { name: "Bootstrap", level: "Advanced", years: 5, icon: "📱", relatedSkills: ["HTML5/CSS3", "JavaScript"] },
      { name: "Tailwind CSS", level: "Advanced", years: 3, icon: "🎨", relatedSkills: ["HTML5/CSS3", "React"] },
      { name: "React", level: "Intermediate", years: 2, featured: true, icon: "⚛️", relatedSkills: ["JavaScript", "HTML5/CSS3", "TypeScript"] },
      { name: "Angular", level: "Intermediate", years: 1, icon: "🔴" }
    ]
  },
  {
    title: "Tools & DevOps",
    icon: <Terminal size={20} />,
    skills: [
      { name: "Azure DevOps", level: "Expert", years: 8, featured: true, icon: "☁️", relatedSkills: ["Git/GitHub", "CI/CD"] },
      { name: "Git/GitHub", level: "Expert", years: 7, featured: true, icon: "🐙", relatedSkills: ["CI/CD", "Azure DevOps"] },
      { name: "CI/CD", level: "Advanced", years: 6, icon: "🔄", relatedSkills: ["Azure DevOps", "Git/GitHub"] },
      { name: "Postman", level: "Advanced", years: 4, icon: "📮" },
      { name: "SSRS", level: "Advanced", years: 5, icon: "📊" },
      { name: "Crystal Reports", level: "Advanced", years: 6, icon: "📄" },
      { name: "Mirth Connect", level: "Advanced", years: 4, icon: "🔗" },
      { name: "Fiddler", level: "Intermediate", years: 2, icon: "🔍" }
    ]
  }
];

const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Uttar Pradesh Technical University",
    year: "2015",
    cgpa: "7.5",
    coursework: ["Advanced Database Management", "Web Technologies", "Software Architecture", "Networking"]
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Chaudhary Charan Singh University",
    year: "2011",
    cgpa: "7.8",
    coursework: ["Data Structures", "Database Design", "Web Development", "Operating Systems"]
  }
];

const certifications: CertificationItem[] = [
  {
    title: "Oracle Workforce Development",
    issuer: "Oracle",
    date: "2020",
    icon: "📋",
    credentialUrl: "#"
  },
  {
    title: "Diploma in .NET Technologies",
    issuer: "Professional Development Institute",
    date: "2012",
    icon: ".NET",
    credentialUrl: "#"
  }
];

// --- Components ---

// Optimized Image Component with Lazy Loading
const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  placeholderClassName = "bg-gradient-to-br from-slate-600 to-slate-700"
}: { 
  src: string | null; 
  alt: string; 
  className: string;
  placeholderClassName?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  if (hasError || !src) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton Loader */}
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholderClassName} animate-pulse z-0`}></div>
      )}
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 relative z-10`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
};

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 text-center">
    <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-slate-900 dark:text-slate-100'} relative inline-block pb-4`}>
      {title}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-blue-600 rounded-full"></span>
    </h2>
    {subtitle && <p className={`mt-4 text-lg ${light ? 'text-slate-600' : 'text-slate-600 dark:text-slate-400'} max-w-2xl mx-auto`}>{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-800">
    {children}
  </span>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [skillLevelFilter, setSkillLevelFilter] = useState<'All' | 'Expert' | 'Advanced' | 'Intermediate'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast(`${label} copied to clipboard!`, 'success');
      setCopiedId(label);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      addToast('Failed to copy', 'error');
    });
  };

  useEffect(() => {
    let ticking = false;
    const performScrollUpdates = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setShowBackToTop(scrollY > 400);
      
      const sections = ['home', 'about',  'projects', 'experience','skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= window.innerHeight * 0.4) {
            setActiveSection(section);
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(performScrollUpdates);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLink = ({ to, label }: { to: string, label: string }) => {
    const isActive = activeSection === to;
    return (
      <button
        onClick={() => scrollToSection(to)}
        className={`relative text-sm font-semibold tracking-wide transition-all duration-300 uppercase group py-2 ${
          isActive 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        {label}
        {isActive && (
          <span className="nav-active absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 rounded-full"></span>
        )}
        {!isActive && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full group-hover:w-full transition-all duration-300"></span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      
      {/* Toast Container */}
      <div className="fixed top-8 right-8 z-[9999] space-y-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={removeToast} />
          </div>
        ))}
      </div>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg">M</span>
            <span>Sangwan</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink to="home" label="Home" />
            <NavLink to="about" label="About" />
            <NavLink to="experience" label="Experience" />
            <NavLink to="projects" label="Work" />
            <NavLink to="skills" label="Skills" />
            <NavLink to="contact" label="Contact" />
          </div>

          <button 
            className="md:hidden text-slate-900 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-6">
              {isMenuOpen ? (
                <X size={28} className="hamburger-icon hamburger-open" />
              ) : (
                <Menu size={28} className="hamburger-icon" />
              )}
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-700 shadow-2xl mobile-menu">
            <div className="px-6 py-8 flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'home'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'about'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'experience'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'projects'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'skills'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold uppercase ${
                  activeSection === 'contact'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 pb-16 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:bg-slate-900 dark:text-white text-slate-900">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        
        {/* Decorative Circles - Smaller */}
        <div className="absolute top-32 right-32 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl animate-float dark:bg-blue-500/10"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-cyan-200/30 rounded-full blur-3xl dark:bg-cyan-500/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full backdrop-blur-sm animate-stagger-1">
                <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
                Principal Software Developer
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-stagger-2 text-slate-900 dark:text-white">
                Designing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-cyan-300">
                  Scalable Solutions
                </span>
              </h1>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed animate-stagger-3">
                I architect high-performance .NET applications and enterprise systems that power 100+ facilities across 5 countries.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 animate-stagger-4">
                <button 
                  onClick={() => scrollToSection('projects')} 
                  aria-label="View my featured projects"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2 transform hover:-translate-y-1 shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  View My Work
                  <ChevronDown size={18} className="-rotate-90" />
                </button>
                <a 
                  href="/CV_Mohit_Sangwan_2026.pdf" 
                  download 
                  aria-label="Download my CV"
                  className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-900 dark:text-slate-200 font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </div>
              
              <div className="pt-2 flex gap-4 animate-stagger-1" style={{ animationDelay: '0.5s' }}>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit my LinkedIn profile"
                  className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-blue-600/30 border border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all transform hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <Linkedin size={20} className="text-slate-700 dark:text-slate-300" />
                </a>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  aria-label="Send me an email"
                  className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-blue-600/30 border border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all transform hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <Mail size={20} className="text-slate-700 dark:text-slate-300" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit my GitHub profile"
                  className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-blue-200 dark:hover:bg-blue-600/30 border border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all transform hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <Github size={20} className="text-slate-700 dark:text-slate-300" />
                </a>
              </div>
            </div>

            {/* Right Side - Profile & Stats */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 items-center">
              {/* Profile Image - 50% Smaller */}
              <div className="relative w-full max-w-[200px] animate-slide-in-right">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                  <OptimizedImage 
                    src="/profile-image.jpg" 
                    alt="Mohit Sangwan" 
                    className="w-full h-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>

              {/* Mini Stats - Cards Below Profile */}
              <div className="w-full max-w-sm animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 gap-2">
                  {keyMetrics.map((metric, idx) => {
                    const AnimatedMetric = () => {
                      const { displayValue, elementRef } = useAnimatedCounter(metric.value, 1500);
                      const getDisplayText = () => {
                        if (typeof metric.value === 'string') {
                          return metric.value.includes('%') ? `${displayValue}%` : `${displayValue}+`;
                        }
                        return displayValue;
                      };
                      return (
                        <div ref={elementRef} className="text-sm font-bold text-slate-900 dark:text-white">
                          {getDisplayText()}
                        </div>
                      );
                    };

                    return (
                      <div 
                        key={idx} 
                        className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/20 p-3 rounded-lg border border-blue-200 dark:border-slate-700 shadow-md hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                      >
                        {/* Background accent */}
                        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-lg -mr-4 -mt-4 group-hover:scale-125 transition-transform duration-300"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{metric.icon}</div>
                          <AnimatedMetric />
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-2">{metric.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div> 
      </section>

      {/* About Section */}
      <section id="about" className="py-14 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle title="About Me" subtitle="Bridging the gap between complex business requirements and scalable technical solutions." />
          
          {/* Top Section - Key Stats with Animated Counters */}
          <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800 text-center hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800 text-center hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">100+</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Facilities Managed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800 text-center hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">40%</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Performance Boost</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-900/10 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800 text-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
              <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">5+</div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Countries Served</div>
            </div>
          </div>

          {/* Main Content - 2 Columns */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-12">
            {/* Left: Career Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">My Journey</h3>
              
              {/* Timeline */}
              <div className="space-y-6">
                {[
                  { year: '2014-2018', title: 'Developer', desc: 'Started career building management systems' },
                  { year: '2018-2021', title: 'Senior Developer', desc: 'Led team initiatives, mentored juniors' },
                  { year: '2021-2024', title: 'Lead Developer', desc: 'Architected healthcare solutions for 100+ facilities' },
                  { year: '2024-Now', title: 'Principal Developer', desc: 'Strategic solutions & team leadership' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 animate-slide-in-right" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {idx + 1}
                      </div>
                      {idx < 3 && <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>}
                    </div>
                    <div className="pb-6 pt-2">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.year}</div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Story & Skills */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Who I Am</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-7 mb-4">
                  As a <span className="font-bold text-blue-600 dark:text-blue-400">Principal Software Developer</span>, I transform complex business challenges into elegant, scalable solutions. My career spans from building local systems to architecting <span className="font-bold text-blue-600 dark:text-blue-400">enterprise healthcare platforms</span> trusted by 100+ facilities globally.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-7">
                  I'm passionate about <span className="font-bold text-emerald-600 dark:text-emerald-400">SQL optimization</span>, <span className="font-bold text-emerald-600 dark:text-emerald-400">system architecture</span>, and <span className="font-bold text-emerald-600 dark:text-emerald-400">team leadership</span>. I don't just code—I mentor, strategize, and deliver measurable impact.
                </p>
              </div>

              {/* Expandable Skills Sections */}
              <div className="space-y-3">
                <details className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Code size={18} className="text-blue-600 dark:text-blue-400" />
                      Core Technologies
                    </span>
                    <span className="transform group-open:rotate-180 transition-transform">➤</span>
                  </summary>
                  <div className="mt-4 text-slate-700 dark:text-slate-400 text-sm grid grid-cols-2 gap-2">
                    <div>• C# & .NET</div>
                    <div>• SQL Server</div>
                    <div>• Azure & Cloud</div>
                    <div>• React & TypeScript</div>
                    <div>• API Design</div>
                    <div>• Docker & Kubernetes</div>
                  </div>
                </details>

                <details className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Users size={18} className="text-emerald-600 dark:text-emerald-400" />
                      Leadership & Soft Skills
                    </span>
                    <span className="transform group-open:rotate-180 transition-transform">➤</span>
                  </summary>
                  <div className="mt-4 text-slate-700 dark:text-slate-400 text-sm grid grid-cols-2 gap-2">
                    <div>• Team Leadership</div>
                    <div>• Mentoring</div>
                    <div>• Strategic Planning</div>
                    <div>• Agile/Scrum</div>
                    <div>• Problem Solving</div>
                    <div>• Cross-functional Collaboration</div>
                  </div>
                </details>

                <details className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <TrendingUp size={18} className="text-purple-600 dark:text-purple-400" />
                      Achievements & Impact
                    </span>
                    <span className="transform group-open:rotate-180 transition-transform">➤</span>
                  </summary>
                  <div className="mt-4 text-slate-700 dark:text-slate-400 text-sm space-y-2">
                    <div>✓ Optimized SQL queries achieving 40% performance improvement</div>
                    <div>✓ Architected multi-tenant healthcare platform for 100+ facilities</div>
                    <div>✓ Reduced deployment cycle by 30% through CI/CD implementation</div>
                    <div>✓ Mentored 4+ developers into senior roles</div>
                    <div>✓ Led global team delivering solutions to 5+ countries</div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600/10 to-cyan-600/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to work together?</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">Let's discuss how I can help solve your challenges.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/CV_Mohit_Sangwan_2026.pdf" download className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                <Download size={18} />
                Download Resume
              </a>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 hover:border-blue-700 dark:hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold rounded-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                <Mail size={18} />
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section (New) */}
      <section id="projects" className="py-14 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <SectionTitle title="Featured Projects" subtitle="Key initiatives that delivered measurable business value." />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                All Projects
              </button>
              {['Healthcare', 'SaaS', 'Backend'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Project Counter */}
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-400 bg-white dark:bg-slate-700 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600">
              {projects.filter(p => !selectedCategory || p.category === selectedCategory).length} of {projects.length} projects
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects
              .filter(proj => !selectedCategory || proj.category === selectedCategory)
              .map((proj, idx) => (
              <Card key={idx} className="flex flex-col h-full overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 transition-all duration-300 animate-card-entrance" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="h-48 bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 relative overflow-hidden group-hover:from-blue-300 group-hover:to-cyan-300 dark:group-hover:from-blue-600 dark:group-hover:to-cyan-600 transition-colors duration-300">
                  {proj.image ? (
                    <OptimizedImage 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : proj.customIcon ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {proj.customIcon}
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{proj.category}</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Database className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                  <div className="absolute top-4 right-4 z-20">
                    {proj.difficulty && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        proj.difficulty === 'Complex' ? 'bg-red-500/90 text-white' :
                        proj.difficulty === 'Medium' ? 'bg-yellow-500/90 text-white' :
                        'bg-green-500/90 text-white'
                      }`}>
                        {proj.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">{proj.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{proj.title}</h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-slate-700 dark:text-slate-300 mb-3 flex-1 text-xs leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                  
                  {/* Project Details - Compact */}
                  <div className="mb-3 space-y-1 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap gap-3">
                    {proj.startDate && (
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-blue-500" />
                        <span>{proj.startDate}</span>
                      </div>
                    )}
                    {proj.teamSize && (
                      <div className="flex items-center gap-1">
                        <Users size={12} className="text-blue-500" />
                        <span>{proj.teamSize}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Metrics - Compact */}
                  {proj.metrics && (
                    <div className="mb-2 py-1 px-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded text-xs font-semibold text-green-700 dark:text-green-300 inline-flex items-center gap-1 w-fit">
                      <TrendingUp size={12} className="text-green-600 dark:text-green-400" />
                      {proj.metrics}
                    </div>
                  )}
                  
                  {/* Enhanced Tech Badges - Compact */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs font-bold px-2 py-0.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 text-blue-900 dark:text-blue-300 rounded-full border border-blue-300 dark:border-blue-700 inline-block">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">+{proj.tech.length - 3}</span>
                    )}
                  </div>
                  
                  {/* Project Links - Compact */}
                  <div className="flex gap-2 mt-auto pt-2 border-t border-slate-200 dark:border-slate-700">
                    {proj.demoLink && proj.demoLink !== '#' && (
                      <a 
                        href={proj.demoLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-all flex items-center justify-center gap-1 transform hover:scale-105"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                    {proj.githubLink && proj.githubLink !== '#' && (
                      <a 
                        href={proj.githubLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 px-3 py-1.5 border border-slate-400 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-400 text-slate-900 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 text-xs font-semibold rounded transition-all flex items-center justify-center gap-1 transform hover:scale-105"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-14 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle title="Experience Timeline" subtitle="A progressive track record of increasing responsibility." />
          
          {/* Desktop Timeline View */}
          <div className="hidden md:block max-w-5xl mx-auto relative">
            <div className="absolute left-24 top-8 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-blue-400 to-transparent rounded-full"></div>
            
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative pl-8 sm:pl-32 py-6 group timeline-item-enter" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="hidden sm:flex flex-col items-end absolute left-0 top-4 w-28 text-right pr-4">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block pr-4">{exp.period.split('-')[0]}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-500">{exp.period.split('-')[1] || 'Present'}</span>
                </div>

                <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 group-last:bottom-auto group-last:h-6"></div>
                <div className="absolute left-[-5px] sm:left-[91px] top-6 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 ring-4 ring-blue-50 dark:ring-blue-900/20 transition-all hover:ring-blue-100 dark:hover:ring-blue-800/40"></div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                        {exp.roleType && exp.roleType.length > 0 && (
                          <div className="flex items-center gap-1">
                            {exp.roleType.slice(0, 1).map((role, i) => (
                              <span key={i} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                role === 'Leadership' 
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                                  : role === 'Architecture'
                                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}>
                                {role}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium text-sm">
                        <Briefcase size={14} />
                        {exp.company}
                      </div>
                    </div>
                  </div>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="text-xs bg-slate-200 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-snug mb-3">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-1.5">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 achievement-item-enter" style={{ animationDelay: `${(idx * 0.15) + (i * 0.1)}s` }}>
                        <CheckCircle size={14} className="mt-0.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll View */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-6 px-6 snap-x">
            <div className="flex gap-4 min-w-min">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="flex-shrink-0 w-80 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-lg border border-slate-200 dark:border-slate-700 snap-start timeline-item-enter" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                      <Briefcase size={14} />
                      {exp.company}
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-500 mt-1 block">{exp.period}</span>
                  </div>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="text-xs bg-slate-200 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-snug mb-2">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle size={12} className="mt-0.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Certs */}
      <section id="skills" className="py-14 bg-gradient-to-b from-slate-50 to-white dark:bg-slate-900 dark:text-white text-slate-900 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10" role="region" aria-labelledby="skills-heading">
          <h2 id="skills-heading" >Technical Arsenal - Skills and Expertise</h2>
          <SectionTitle title="Technical Arsenal" subtitle="The tools I use to build world-class software." light={false} />
          
          {/* Skills Stats & Featured Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto" role="region" aria-label="Skills overview and statistics">
            {/* Top Skills Highlight */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-100 to-cyan-100 backdrop-blur-sm p-6 rounded-xl border border-blue-300 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20" role="region" aria-label="Top 5 most proficient skills">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700" id="top-skills">
                <TrendingUp size={20} aria-hidden="true" /> Top 5 Skills
              </h3>
              <div className="space-y-3" role="list">
                {skillCategories
                  .flatMap(cat => cat.skills.filter(s => s.featured))
                  .sort((a, b) => b.years - a.years)
                  .slice(0, 5)
                  .map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3 animate-slide-in-right group/topskill" style={{ animationDelay: `${idx * 0.1}s` }} role="listitem">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true"></div>
                      <span className="text-sm text-slate-800" title={`${skill.name}: ${skill.years}+ years of experience`}>{skill.name}</span>
                      <span className="text-xs text-blue-700 ml-auto font-semibold" aria-label={`${skill.years} or more years of experience`}>{skill.years}+ yrs</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Skill Stats */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 backdrop-blur-sm p-6 rounded-xl border border-slate-300 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10" role="region" aria-label="Skills distribution by proficiency level">
              <h3 className="text-lg font-bold mb-4 text-slate-800" id="skill-distribution">Distribution</h3>
              <div className="space-y-3" role="list" aria-describedby="skill-distribution">
                {(() => {
                  const allSkills = skillCategories.flatMap(cat => cat.skills);
                  const expertCount = allSkills.filter(s => s.level === 'Expert').length;
                  const advancedCount = allSkills.filter(s => s.level === 'Advanced').length;
                  const intermediateCount = allSkills.filter(s => s.level === 'Intermediate').length;
                  const total = allSkills.length;
                  
                  return (
                    <>
                      <div className="text-sm" role="listitem" aria-label={`Expert level: ${((expertCount/total)*100).toFixed(0)}% of skills`}>
                        <div className="flex justify-between mb-1">
                          <span className="text-red-700 font-semibold">Expert</span>
                          <span className="text-red-700 font-bold" aria-live="polite">{((expertCount/total)*100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round((expertCount/total)*100)} aria-valuemin={0} aria-valuemax={100} aria-label="Expert skills percentage">
                          <div className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full" style={{ width: `${(expertCount/total)*100}%` }}></div>
                        </div>
                      </div>
                      <div className="text-sm" role="listitem" aria-label={`Advanced level: ${((advancedCount/total)*100).toFixed(0)}% of skills`}>
                        <div className="flex justify-between mb-1">
                          <span className="text-yellow-700 font-semibold">Advanced</span>
                          <span className="text-yellow-700 font-bold" aria-live="polite">{((advancedCount/total)*100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round((advancedCount/total)*100)} aria-valuemin={0} aria-valuemax={100} aria-label="Advanced skills percentage">
                          <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full" style={{ width: `${(advancedCount/total)*100}%` }}></div>
                        </div>
                      </div>
                      <div className="text-sm" role="listitem" aria-label={`Intermediate level: ${((intermediateCount/total)*100).toFixed(0)}% of skills`}>
                        <div className="flex justify-between mb-1">
                          <span className="text-green-700 font-semibold">Intermediate</span>
                          <span className="text-green-700 font-bold" aria-live="polite">{((intermediateCount/total)*100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round((intermediateCount/total)*100)} aria-valuemin={0} aria-valuemax={100} aria-label="Intermediate skills percentage">
                          <div className="h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full" style={{ width: `${(intermediateCount/total)*100}%` }}></div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Skill Search & Filter */}
          <div className="max-w-2xl mx-auto mb-12 space-y-4" role="search" aria-label="Skills search and filter controls">
            <div className="relative">
              <input
                type="text"
                placeholder="Search skills... (e.g., 'C#', 'React', 'Azure')"
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value.toLowerCase())}
                className="w-full px-6 py-3 bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-500 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                aria-label="Search skills by name or technology (e.g., 'C#', 'React', 'Azure')"
                aria-describedby="skill-search-hint"
              />
              <Code className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
              <div id="skill-search-hint" className="sr-only">Type to search for skills by name or related technologies. Results update dynamically as you type.</div>
            </div>

            {/* Skill Level Filter */}
            <div className="flex flex-wrap gap-2 justify-center" role="group" aria-labelledby="filter-label">
              <label id="filter-label" className="sr-only">Filter skills by proficiency level</label>
              {(['All', 'Expert', 'Advanced', 'Intermediate'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSkillLevelFilter(level)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    skillLevelFilter === level
                      ? level === 'Expert'
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                        : level === 'Advanced'
                        ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
                        : level === 'Intermediate'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}
                  aria-pressed={skillLevelFilter === level}
                  aria-label={`Filter skills by ${level} level`}
                >
                  {level}
                </button>
              ))}
            </div>

            {skillSearchQuery && (
              <div className="text-center mt-4 text-sm text-slate-700 font-medium">
                Found {
                  skillCategories
                    .flatMap(cat => cat.skills.filter(s => 
                      (skillLevelFilter === 'All' || s.level === skillLevelFilter) &&
                      (s.name.toLowerCase().includes(skillSearchQuery) ||
                      s.relatedSkills?.some(rs => rs.toLowerCase().includes(skillSearchQuery)))
                    )).length
                } matching skills
              </div>
            )}
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {skillCategories.map((cat, idx) => {
              const filteredSkills = cat.skills.filter(skill =>
                (skillLevelFilter === 'All' || skill.level === skillLevelFilter) &&
                (!skillSearchQuery ||
                skill.name.toLowerCase().includes(skillSearchQuery) ||
                skill.relatedSkills?.some(rs => rs.toLowerCase().includes(skillSearchQuery)))
              );

              if (skillSearchQuery && filteredSkills.length === 0) return null;

              return (
                <div key={idx} className="bg-gradient-to-br from-slate-100 to-slate-50 backdrop-blur-sm p-6 rounded-xl border border-slate-300 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 group animate-fade-in" role="region" aria-label={`${cat.title} skills`}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-slate-900">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill, sIdx) => {
                      const levelColors = {
                        Expert: "bg-gradient-to-r from-red-500 to-red-400",
                        Advanced: "bg-gradient-to-r from-amber-500 to-amber-400",
                        Intermediate: "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      };
                      const levelTextColors = {
                        Expert: "text-white",
                        Advanced: "text-slate-900",
                        Intermediate: "text-white"
                      };
                      const levelPercent = {
                        Expert: 100,
                        Advanced: 65,
                        Intermediate: 40
                      };
                      const progressBarBg = {
                        Expert: "bg-red-200 dark:bg-red-900/40",
                        Advanced: "bg-amber-200 dark:bg-amber-900/40",
                        Intermediate: "bg-emerald-200 dark:bg-emerald-900/40"
                      };

                      return (
                        <div
                          key={sIdx}
                          className="animate-skill-pop group/skill flex flex-col w-full"
                          style={{ animationDelay: `${sIdx * 0.05}s` }}
                        >
                          <div className={`${levelColors[skill.level]} ${levelTextColors[skill.level]} text-xs font-bold rounded-lg border border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-current hover:scale-110 cursor-default px-3 py-2 flex items-center justify-between gap-2`}>
                            <span className="flex items-center gap-1.5">
                              {skill.icon && <span className="text-sm">{skill.icon}</span>}
                              {skill.name}
                            </span>
                            {skill.featured && <span className="text-yellow-300">⭐</span>}
                          </div>
                          {/* Proficiency Progress Bar */}
                          <div className={`mt-1.5 w-full hidden group-hover/skill:block ${progressBarBg[skill.level]} rounded-full h-1.5 overflow-hidden`}>
                            <div 
                              className={`h-full ${levelColors[skill.level]} transition-all duration-300`}
                              style={{ width: `${levelPercent[skill.level]}%` }}
                            ></div>
                          </div>
                          {/* Skill Details Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 border border-slate-700 pointer-events-none">
                            <div className="font-semibold">{skill.level}</div>
                            <div className="text-slate-300">{skill.years}+ years experience</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Related Skills Network */}
          <div className="max-w-5xl mx-auto mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/30 p-6 rounded-2xl border border-blue-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-6 text-center text-slate-900 dark:text-white">Skill Relationships</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from(new Set(
                skillCategories
                  .flatMap(cat => cat.skills)
                  .filter(s => s.relatedSkills && s.relatedSkills.length > 0)
                  .flatMap(s => s.name)
              )).slice(0, 4).map((skillName, idx) => {
                const skill = skillCategories
                  .flatMap(cat => cat.skills)
                  .find(s => s.name === skillName);
                
                return skill && skill.relatedSkills ? (
                  <div key={idx} className="group bg-white dark:bg-slate-800/60 p-5 rounded-lg border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      {skill.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.relatedSkills.map((related, rIdx) => (
                        <span key={rIdx} className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-slate-800 dark:text-blue-200 text-xs px-3 py-1.5 rounded-full border border-blue-300 dark:border-blue-700 font-medium hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
                          → {related}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <h3 className="flex items-center gap-2 text-xl font-bold mb-8 text-slate-900 dark:text-white">
              <GraduationCap size={24} className="text-blue-600 dark:text-blue-400" /> Education
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {education.map((edu, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/20 p-5 rounded-xl border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 animate-card-entrance overflow-hidden"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Year badge */}
                    <div className="inline-block mb-3 px-3 py-1 bg-blue-600 dark:bg-blue-500/30 text-white dark:text-blue-300 rounded-full text-xs font-bold">
                      {edu.year}
                    </div>
                    
                    {/* Degree */}
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                      {edu.degree}
                    </h4>
                    
                    {/* Institution */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-3 flex items-center gap-2">
                      <span className="text-sm">🏫</span>
                      {edu.institution}
                    </p>
                    
                    {/* CGPA */}
                    {edu.cgpa && (
                      <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">CGPA: {edu.cgpa}</span>
                        <span className="text-sm">⭐</span>
                      </div>
                    )}
                    
                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-blue-200 dark:border-slate-700">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 uppercase tracking-wider">Coursework</p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map((course, i) => (
                            <span 
                              key={i} 
                              className="text-xs px-2 py-1 bg-white dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-full border border-blue-200 dark:border-slate-600 font-medium hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <SectionTitle title="Certifications" subtitle="Professional certifications and industry-recognized credentials." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {certifications.map((cert, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/20 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 animate-card-entrance" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{cert.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{cert.date}</span>
                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-14 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how I can help elevate your next project or bring your vision to life with scalable solutions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Main Contact Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-700">
              {/* Left Side - Info & Contact Details */}
              <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold mb-4">Let's Create Something Great</h3>
                  <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                    I'm available for consulting engagements, senior leadership roles, and innovative technical challenges. Let's discuss how we can transform your vision.
                  </p>
                  
                  <div className="space-y-5">
                    {/* Email - Copy to Clipboard */}
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(personalInfo.email);
                        addToast('Email copied to clipboard!', 'success');
                      }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-blue-100 uppercase font-semibold tracking-wider">Email</div>
                        <div className="font-bold text-lg group-hover:text-blue-200 transition-colors">{personalInfo.email}</div>
                      </div>
                      <Copy size={18} className="text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Phone - Copy to Clipboard */}
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(personalInfo.phone);
                        addToast('Phone copied to clipboard!', 'success');
                      }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-blue-100 uppercase font-semibold tracking-wider">Phone</div>
                        <div className="font-bold text-lg group-hover:text-blue-200 transition-colors">{personalInfo.phone}</div>
                      </div>
                      <Copy size={18} className="text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Globe size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-100 uppercase font-semibold tracking-wider">Location</div>
                        <div className="font-bold text-lg">{personalInfo.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="relative z-10 mt-12 flex gap-3">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title="Send Email"
                  >
                    <Mail size={22} className="text-white" />
                  </a>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title="Call"
                  >
                    <Phone size={22} className="text-white" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin size={22} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Right Side - Quick Actions & Benefits */}
              <div className="md:w-1/2 p-12 bg-white dark:bg-slate-800 flex flex-col">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">How We'll Connect</h3>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
                    <Mail size={24} className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Quick Email</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Most reliable way to reach me. I respond within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900">
                    <Phone size={24} className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Direct Call</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">For urgent matters or quick discussions, feel free to call.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
                    <Linkedin size={24} className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">LinkedIn</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Connect with me for professional networking and updates.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href={`mailto:${personalInfo.email}?subject=Let's%20Discuss%20Your%20Project`}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <Mail size={18} />
                    Email Me
                  </a>
                  
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <Phone size={18} />
                    Call Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand & Description */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg">M</span>
                  <span className="text-2xl font-bold text-white tracking-tight">Sangwan</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Principal Software Developer specializing in scalable enterprise solutions and healthcare IT systems.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-blue-500"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-blue-500"
                  title="Email"
                  aria-label="Send Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-cyan-500"
                  title="Phone"
                  aria-label="Call"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code size={20} className="text-blue-400" />
                Navigation
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('home')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('experience')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Experience
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Projects
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={20} className="text-cyan-400" />
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('skills')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <a
                    href="/CV_Mohit_Sangwan_2026.pdf"
                    download
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium inline-flex items-center gap-1"
                  >
                    Download CV
                    <Download size={14} />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-green-400" />
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Email</p>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                    className="text-slate-300 hover:text-blue-400 transition-all text-sm font-medium break-all flex items-center gap-2 group p-2 -ml-2 rounded hover:bg-slate-800/50"
                    title="Click to copy email"
                    aria-label={`Copy email: ${personalInfo.email}`}
                  >
                    {copiedId === 'Email' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-500 group-hover:text-blue-400" />}
                    {personalInfo.email}
                  </button>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Phone</p>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'Phone')}
                    className="text-slate-300 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group p-2 -ml-2 rounded hover:bg-slate-800/50"
                    title="Click to copy phone"
                    aria-label={`Copy phone: ${personalInfo.phone}`}
                  >
                    {copiedId === 'Phone' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-500 group-hover:text-cyan-400" />}
                    {personalInfo.phone}
                  </button>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-slate-300 text-sm font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-slate-500">
                  &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Mohit Sangwan</span>. All rights reserved.
                </p>
              </div>

              {/* Footer Links */}
              <div className="text-center md:text-right flex justify-center md:justify-end gap-6 text-sm">
                <button
                  onClick={scrollToTop}
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-200 font-medium inline-flex items-center gap-2 group"
                >
                  Back to Top
                  <ChevronDown size={16} className="transform rotate-180 group-hover:-translate-y-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div className="bg-gradient-to-r from-blue-600/5 to-cyan-600/5 border border-slate-800/50 rounded-xl p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-white mb-1">10+</p>
                <p className="text-sm text-slate-400">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">100+</p>
                <p className="text-sm text-slate-400">Facilities Managed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">5+</p>
                <p className="text-sm text-slate-400">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg shadow-blue-600/40 flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 animate-slide-in-right group border-2 border-blue-500/50 hover:border-blue-400"
          title="Back to top"
          aria-label="Back to top"
        >
          <ChevronDown size={24} className="transform rotate-180 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}
