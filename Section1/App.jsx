import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
  Github, Linkedin, Code2, Database, Cpu, Terminal, 
  Briefcase, Award, Send, ExternalLink, ChevronDown, CheckCircle, XCircle
} from 'lucide-react';

export default function Portfolio() {
  // --- STATE & HOOKS ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Form State
  const [formStatus, setFormStatus] = useState(null); // 'submitting', 'success', 'error'

  // 3D Tilt Effect State (Hero Image)
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-200, 200], [15, -15]);
  const rotateY = useTransform(cardX, [-200, 200], [-15, 15]);

  // Custom Cursor tracking
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // --- EMAIL SUBMIT HANDLER ---
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(event.target);
    
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL WEB3FORMS ACCESS KEY
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        event.target.reset(); // clear the form
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
    
    // Reset status message after 5 seconds
    setTimeout(() => setFormStatus(null), 5000);
  };

  // --- ANIMATION VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative cursor-none">
      
      {/* --- CUSTOM CURSOR --- */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-500 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-500 pointer-events-none z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />

      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-[101] origin-left"
        style={{ scaleX }}
      />

      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 90, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-64 -left-64 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1], x: [0, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-64 w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            href="#" className="text-2xl font-black tracking-tighter text-slate-900"
          >
            PK<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">.</span>
          </motion.a>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="hidden md:flex gap-8 text-sm font-semibold text-slate-600"
          >
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-screen">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex-1 text-center md:text-left z-10">
          <motion.p variants={textReveal} className="text-blue-600 font-bold tracking-wider uppercase mb-4 text-sm flex items-center justify-center md:justify-start gap-2">
            <span className="w-8 h-[2px] bg-blue-600 inline-block"></span> Welcome to my portfolio
          </motion.p>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            <motion.span variants={staggerContainer} initial="hidden" animate="visible" className="block">
              {['Hi,', 'I\'m'].map((word, i) => (
                <motion.span key={i} variants={textReveal} className="inline-block mr-4">{word}</motion.span>
              ))}
            </motion.span>
            <motion.span variants={textReveal} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 block mt-2">
              Pravin Katkade
            </motion.span>
          </h1>
          
          <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto md:mx-0">
            AI Engineer <span className="text-slate-300 mx-2">|</span> Data Scientist <span className="text-slate-300 mx-2">|</span> Software Developer
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="relative group overflow-hidden rounded-full p-[2px]">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="relative bg-white px-8 py-3 rounded-full flex items-center gap-2 font-semibold text-slate-800 transition-all group-hover:bg-transparent group-hover:text-white">
                View Projects <ChevronDown size={18} className="group-hover:animate-bounce" />
              </div>
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" download="Pravin_Katkade_Resume.pdf" className="px-8 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* 3D Interactive Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
          className="flex-1 relative flex justify-center"
          style={{ perspective: 1000 }}
        >
          <motion.div 
            className="relative w-72 h-72 md:w-96 md:h-96"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              cardX.set(e.clientX - rect.left - rect.width / 2);
              cardY.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => { cardX.set(0); cardY.set(0); }}
          >
            <motion.div 
              style={{ transform: "translateZ(-50px)" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-300 blur-2xl opacity-50"
            />
            <motion.img 
              src="profile.jpg" alt="Pravin Katkade" 
              style={{ transform: "translateZ(50px)" }}
              className="relative w-full h-full object-cover rounded-[2.5rem] border-[6px] border-white shadow-2xl z-10"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-slate-50/50 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Projects Completed", value: "20+", icon: <Code2 className="text-blue-500" /> },
              { label: "Technologies", value: "15+", icon: <Cpu className="text-purple-500" /> },
              { label: "Certifications", value: "5+", icon: <Award className="text-emerald-500" /> },
              { label: "Experience", value: "1+ Years", icon: <Briefcase className="text-pink-500" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">{stat.icon}</div>
                <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Arsenal</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              "Python", "Machine Learning", "Artificial Intelligence", "Data Science", 
              "Pandas", "NumPy", "Matplotlib", "SQL", "C++", "Java", "HTML", "CSS", "React.js"
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                whileHover={{ scale: 1.1, y: -5, rotate: Math.random() * 4 - 2 }} whileTap={{ scale: 0.95 }}
                className="bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Terminal size={16} className="text-blue-500" />
                <span className="font-semibold text-slate-700">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 bg-slate-50/50 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Netflix Data Visualization", tech: ["Python", "Pandas", "Matplotlib"], desc: "Executed EDA on 8,000+ records to extract streaming trends and genre distributions." },
              { title: "Employee Data Cleaning", tech: ["Python", "Pandas", "SQL"], desc: "Applied statistical profiling to detect anomalies and automated duplicate removal logic." },
              { title: "Weather Dataset Analysis", tech: ["Machine Learning", "NumPy"], desc: "Engineered an end-to-end cleaning pipeline accelerating downstream query speeds by 40%." },
              { title: "Fake News Detection", tech: ["NLP", "Python", "AI"], desc: "Built a dynamic text synthesis engine using algorithmic logic and parameter handling." },
              { title: "AI Personal Assistant", tech: ["Python", "APIs", "Speech Rec"], desc: "Developed a voice-activated intelligent assistant for workflow automation." },
              { title: "Eco-Fy Mobile App", tech: ["Java", "Android Studio", "XML"], desc: "Interactive Android application for environmental sustainability and habit tracking." }
            ].map((project, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-1 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-300 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-md scale-[0.98] group-hover:scale-105"></div>
                <div className="bg-white rounded-[1.4rem] p-6 h-full flex flex-col relative z-10">
                  <div className="w-full h-48 bg-slate-50 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center border border-slate-100">
                     <Database className="text-slate-300 w-16 h-16 group-hover:text-blue-500 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, index) => (
                      <span key={index} className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                      <Github size={16} /> Code
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-blue-600 transition-colors">
                      <ExternalLink size={16} /> Live
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-0 md:pl-8 space-y-12">
            {[
              { role: "Salesforce Administrator Intern", company: "Salesforce", date: "Recent", type: "Internship", desc: "Configured custom objects, managed user access controls, and generated analytics dashboards." },
              { role: "Bachelor of Engineering", company: "SRTTC (SPPU)", date: "Graduation", type: "Education", desc: "Major in Computer Engineering. Solidified foundations in OOP, DSA, and databases." },
              { role: "Diploma in Computer Engineering", company: "Dr. D. Y. Patil Polytechnic", date: "Previous", type: "Education", desc: "Core technical learning and initial programming logic establishment." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-0">
                <div className="absolute -left-[41px] md:-left-[41px] top-1 w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-sm"></div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">{item.type}</span>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                    <span className="text-slate-400 text-sm font-medium">{item.date}</span>
                  </div>
                  <h4 className="text-blue-600 font-semibold mb-4">{item.company}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (With Working Form) --- */}
      <section id="contact" className="py-24 bg-slate-50/50 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Connect</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="md:col-span-2 flex flex-col justify-center space-y-8 border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-slate-900">Get in touch</h3>
              <p className="text-slate-500">I'm currently open to new opportunities. Send me a message and I'll receive an email directly!</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Linkedin size={20} /></a>
                <a href="#" className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Github size={20} /></a>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="md:col-span-3 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Name</label>
                  <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea name="message" required rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none" placeholder="How can I help you?"></textarea>
              </div>
              
              <button type="submit" disabled={formStatus === 'submitting'} className="w-full relative group overflow-hidden rounded-xl p-[2px] disabled:opacity-70 disabled:cursor-not-allowed">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                <div className="relative flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold transition-all group-hover:bg-transparent">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </div>
              </button>

              {formStatus === 'success' && (
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg text-sm font-semibold">
                  <CheckCircle size={18} /> Message sent successfully!
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-semibold">
                  <XCircle size={18} /> Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-8 border-t border-slate-100 text-center relative z-10">
        <p className="text-slate-500 font-medium text-sm">
          © 2026 Pravin Katkade. Designed with pure white aesthetics & rich accents.
        </p>
      </footer>
    </div>
  );
}