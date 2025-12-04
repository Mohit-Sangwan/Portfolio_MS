import React, { useState, useEffect } from 'react';
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
  CheckCircle
} from 'lucide-react';

// --- Types & Interfaces ---

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  metrics?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
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
    category: "Healthcare / Enterprise",
    description: "A scalable Hospital Information System serving 100+ facilities. Features include strict tenant isolation, automated workflows, and RBAC-based access control.",
    tech: [".NET Core", "SQL Server", "Web API", "Azure"],
    metrics: "Deployed across 5+ countries"
  },
  {
    title: "Club 360 Management System",
    category: "SaaS / Management",
    description: "A comprehensive management solution for fitness centers including member tracking, package management, and attendance systems.",
    tech: [".NET Framework", "Crystal Reports", "SQL"],
    metrics: "Full lifecycle ownership"
  },
  {
    title: "Clinical API Orchestration Layer",
    category: "Backend / Integration",
    description: "Middleware solution to unify clinical, billing, inventory, and claims integrations into a single manageable orchestration layer.",
    tech: ["C#", "Restful Services", "HL7", "Mirth Connect"],
    metrics: "Unified 4+ disparate systems"
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Core Languages",
    icon: <Code size={20} />,
    skills: ["C#", "Core Java", "C++", "TypeScript", "SQL"]
  },
  {
    title: "Frameworks & Arch",
    icon: <Layers size={20} />,
    skills: ["ASP.NET MVC", ".NET Core", "Web API", "Entity Framework", "Microservices"]
  },
  {
    title: "Frontend",
    icon: <Globe size={20} />,
    skills: ["React", "Angular", "JavaScript", "HTML5/CSS3", "Bootstrap"]
  },
  {
    title: "Tools & DevOps",
    icon: <Terminal size={20} />,
    skills: ["Azure DevOps", "Git/GitHub", "CI/CD", "Postman", "SSRS", "Mirth Connect"]
  }
];

const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Uttar Pradesh Technical University",
    year: "2015"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Chaudhary Charan Singh University",
    year: "2011"
  }
];

// --- Components ---

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 text-center">
    <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-slate-900 dark:text-slate-100'} relative inline-block pb-4`}>
      {title}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-blue-600 rounded-full"></span>
    </h2>
    {subtitle && <p className={`mt-4 text-lg ${light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'} max-w-2xl mx-auto`}>{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
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

  useEffect(() => {
    let ticking = false;
    const performScrollUpdates = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
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

  const NavLink = ({ to, label }: { to: string, label: string }) => (
    <button
      onClick={() => scrollToSection(to)}
      className={`text-sm font-semibold tracking-wide transition-colors duration-200 uppercase ${
        activeSection === to 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      
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

          <button className="md:hidden text-slate-700 dark:text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl py-6 px-6 flex flex-col space-y-6">
            <NavLink to="home" label="Home" />
            <NavLink to="about" label="About" />
            <NavLink to="experience" label="Experience" />
            <NavLink to="projects" label="Work" />
            <NavLink to="skills" label="Skills" />
            <NavLink to="contact" label="Contact" />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900 text-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-50 dark:to-slate-900"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Principal Software Developer
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Designing Scalable <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Healthcare Solutions
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 font-light max-w-xl leading-relaxed">
              I architect high-performance .NET applications and enterprise systems that power 100+ facilities across 5 countries.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => scrollToSection('projects')} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 transform hover:-translate-y-1">
                View My Work
                <ChevronDown size={18} className="-rotate-90" />
              </button>
              <a href="/CV_Mohit_Sangwan_2026.pdf" download className="px-8 py-4 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-200 hover:text-white font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer">
                <Download size={18} />
                Download CV
              </a>
            </div>
            
            <div className="pt-8 flex gap-6 text-slate-400">
              <a href={personalInfo.linkedin} className="hover:text-blue-400 transition-transform hover:scale-110"><Linkedin size={28} /></a>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-400 transition-transform hover:scale-110"><Mail size={28} /></a>
              <a href="https://github.com" className="hover:text-blue-400 transition-transform hover:scale-110"><Github size={28} /></a>
            </div>
          </div>

          <div className="hidden lg:block relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 animate-pulse"></div>
             <div className="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl">
               <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                 <h3 className="text-xl font-bold text-slate-100">Impact at a Glance</h3>
                 <Server className="text-blue-400" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 {keyMetrics.map((metric, idx) => (
                   <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                     <div className="text-blue-400 mb-2">{metric.icon}</div>
                     <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                     <div className="text-sm text-slate-400">{metric.label}</div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle title="About Me" subtitle="Bridging the gap between complex business requirements and scalable technical solutions." />
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl transform -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1974&auto=format&fit=crop" 
                alt="Working" 
                className="relative rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                10+ Years of Engineering Excellence
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                As a Principal Software Developer, I don't just write code; I design systems that last. My journey has taken me from building local management systems to architecting international healthcare platforms that process thousands of transactions daily.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I specialize in the <strong>Microsoft .NET ecosystem</strong>, but my true skill lies in problem-solving—optimizing SQL queries for 40% faster reports, integrating fragmented APIs into a unified orchestration layer, and mentoring teams to adopt CI/CD best practices.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Users size={20} /></div>
                  <span className="font-medium">Team Leadership</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Database size={20} /></div>
                  <span className="font-medium">SQL Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Globe size={20} /></div>
                  <span className="font-medium">Global Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Layers size={20} /></div>
                  <span className="font-medium">System Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section (New) */}
      <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <SectionTitle title="Featured Projects" subtitle="Key initiatives that delivered measurable business value." />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((proj, idx) => (
              <Card key={idx} className="flex flex-col h-full overflow-hidden group">
                <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
                  {/* Placeholder patterns since we don't have real screenshots */}
                  <div className={`absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat`}></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">{proj.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{proj.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1 text-sm leading-relaxed">
                    {proj.description}
                  </p>
                  
                  {proj.metrics && (
                    <div className="mb-4 py-2 px-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-lg flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300">{proj.metrics}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle title="Experience Timeline" subtitle="A progressive track record of increasing responsibility." />
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative pl-8 sm:pl-32 py-6 group">
                {/* Date for Desktop */}
                <div className="hidden sm:flex flex-col items-end absolute left-0 top-6 w-24 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">{exp.period.split('-')[0]}</span>
                  <span className="text-xs text-slate-500">{exp.period.split('-')[1] || 'Present'}</span>
                </div>

                {/* Vertical Line */}
                <div className="absolute left-0 sm:left-24 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 group-last:bottom-auto group-last:h-6"></div>
                
                {/* Dot */}
                <div className="absolute left-[-5px] sm:left-[91px] top-8 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 ring-4 ring-blue-50 dark:ring-blue-900/20"></div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <Briefcase size={16} />
                        {exp.company}
                      </div>
                    </div>
                    <span className="sm:hidden mt-2 text-sm text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 self-start">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle size={16} className="mt-0.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Certs */}
      <section id="skills" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle title="Technical Arsenal" subtitle="The tools I use to build world-class software." light={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-blue-400 mb-6 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded border border-slate-600/50 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-10 border-t border-slate-800">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold mb-6 text-blue-400">
                <Award /> Certifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-orange-500 font-bold text-2xl">01</div>
                  <div>
                    <div className="font-semibold text-white">Oracle Workforce Development</div>
                    <div className="text-sm text-slate-400">2020</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-blue-500 font-bold text-2xl">02</div>
                  <div>
                    <div className="font-semibold text-white">Diploma in .NET Technologies</div>
                    <div className="text-sm text-slate-400">2012</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold mb-6 text-green-400">
                <GraduationCap /> Education
              </h3>
               {education.map((edu, idx) => (
                 <div key={idx} className="mb-6 last:mb-0">
                   <div className="text-lg font-semibold text-white">{edu.degree}</div>
                   <div className="text-slate-400">{edu.institution}</div>
                   <div className="text-sm text-slate-500 mt-1">{edu.year}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Let's build something scalable.</h3>
                <p className="text-blue-100 mb-8">
                  I'm currently available for consulting engagements and senior leadership roles.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200 uppercase font-semibold">Email</div>
                      <div className="font-medium">{personalInfo.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200 uppercase font-semibold">Phone</div>
                      <div className="font-medium">{personalInfo.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-blue-200 uppercase font-semibold">LinkedIn</div>
                      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="font-medium hover:underline">Connect Profile</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 relative z-10">
                 <div className="text-sm text-blue-200">Based in</div>
                 <div className="text-xl font-bold">{personalInfo.location}</div>
              </div>
            </div>

            <div className="md:w-1/2 p-12 bg-white dark:bg-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Details</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="Tell me about your project needs..."></textarea>
                </div>
                <button className="w-full py-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
                  Send Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-white tracking-tight">MS.</span>
            <p className="text-sm mt-2 max-w-xs">Building the digital future of healthcare and enterprise systems.</p>
          </div>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white transition-colors">Github</a>
             <a href={personalInfo.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
          &copy; {new Date().getFullYear()} Mohit Sangwan. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
