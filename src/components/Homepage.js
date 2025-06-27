import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Database, Zap, ChevronRight, Globe, Cpu, Terminal } from 'lucide-react';

const BiyteLumHomepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const words = ['SOVEREIGNTY', 'PRIVACY', 'SECURITY', 'FREEDOM'];
  const fullText = 'Your Data. Your Rules. Reclaim Your Digital Identity.';

  useEffect(() => {
    const word = words[currentWordIndex];
    let i = 0;
    const timer = setInterval(() => {
      if (i <= word.length) {
        setTypedText(word.substring(0, i));
        i++;
      } else {
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [currentWordIndex]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingParticle = ({ delay, duration, size }) => (
    <div
      className="absolute rounded-full opacity-20"
      style={{
        backgroundColor: '#A7FF9E',
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s ease-in-out infinite ${delay}s`,
        boxShadow: '0 0 10px #A7FF9E',
      }}
    />
  );

  return (
    <div className="min-h-screen overflow-hidden relative" style={{ 
      backgroundColor: '#0a0a0a',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #121212 100%)
      `
    }}>
      {/* Animated Background Grid */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167, 255, 158, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167, 255, 158, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${scrollY * 0.5}px, ${scrollY * 0.3}px)`
        }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle 
            key={i}
            delay={i * 0.5}
            duration={3 + i * 0.2}
            size={`${2 + Math.random() * 4}px`}
          />
        ))}
      </div>

      {/* Mouse Glow Effect */}
      <div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(167, 255, 158, 0.1) 0%, transparent 70%)',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b border-green-400/20" 
           style={{ backgroundColor: 'rgba(10, 10, 10, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="font-mono text-sm text-green-400">BiyteLüm.sys</span>
            </div>
            
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-green-400/30 hover:border-green-400/60 transition-all"
            >
              <div className="space-y-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-5 h-0.5 bg-green-400 transition-all duration-300" />
                ))}
              </div>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'HOME', href: 'index.html', icon: Globe },
                { name: 'SERVICES', href: 'services.html', icon: Shield },
                { name: 'CONSULTATION', href: 'consultation.html', icon: Cpu },
                { name: 'PRICING', href: 'pricing.html', icon: Database },
                { name: 'DATA_REMOVAL', href: 'data-removal.html', icon: Lock },
                { name: 'RESOURCES', href: 'resources.html', icon: Terminal },
                { name: 'CONTACT', href: 'contact.html', icon: Zap },
                { name: 'PRIVACY', href: 'privacy.html', icon: Eye },
                { name: 'TERMS', href: 'terms.html', icon: Shield },
                { name: 'BLOG', href: 'blog.html', icon: Globe }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  
                    key={item.name}
                    href={item.href}
                    className="group flex items-center space-x-2 text-green-400/70 hover:text-green-400 transition-all duration-300 font-mono text-xs"
                  >
                    <Icon className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    <span className="group-hover:tracking-wider transition-all">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
          <div className="p-4 space-y-4">
            {[
              'HOME', 'SERVICES', 'CONSULTATION', 'PRICING', 'DATA_REMOVAL', 
              'RESOURCES', 'CONTACT', 'PRIVACY', 'TERMS', 'BLOG'
            ].map((item, index) => (
              <a key={item} href={`${item.toLowerCase().replace('_', '-')}.html`} 
                 className="block text-green-400 font-mono text-sm hover:text-green-300 transition-colors">
                <span className="text-green-600">{String(index + 1).padStart(2, '0')}.</span> {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-2 text-center" 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#A7FF9E',
                  textShadow: '0 0 20px #A7FF9E, 0 0 40px #00FF99, 0 0 60px #A7FF9E'
                }}>
              BIYTELÜM
            </h1>
          </div>

          <div className="mb-6 h-12 md:h-16">
            <div className="text-lg md:text-2xl lg:text-4xl font-light mb-2" 
                 style={{ 
                   fontFamily: "'Share Tech Mono', monospace",
                   color: '#A7FF9E',
                   textShadow: '0 0 10px #A7FF9E'
                 }}>
              DIGITAL_{typedText}
              <span className="animate-pulse">|</span>
            </div>
            <div className="text-sm md:text-lg lg:text-xl text-green-300/80 font-light">
              {fullText}
            </div>
          </div>

          <div className="mb-6">
            <button className="group relative px-6 md:px-8 py-3 md:py-4 border-2 border-green-400 bg-transparent text-green-400 font-mono font-bold text-sm md:text-lg overflow-hidden transition-all duration-500 hover:text-black">
              <span className="relative z-10 flex items-center justify-center">
                INITIATE_PROTOCOL
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-green-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute inset-0 border border-green-400 animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="relative py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'WHO_WE_ARE',
                subtitle: 'Privacy-First Consultancy',
                description: 'BiyteLüm is a privacy-first consultancy dedicated to helping individuals and businesses regain control over their digital footprint. In an era of mass surveillance and data exploitation, we believe in protecting your online presence, preserving your sovereignty, and restoring your digital autonomy.',
                color: '#A7FF9E'
              },
              {
                icon: Database,
                title: 'INDUSTRY_CERTIFIED',
                subtitle: 'CIPP/E & CIPM Certified',
                description: 'Our team holds CIPP/E & CIPM certifications, ensuring compliance with GDPR and international data protection laws. With experience in homeland security, national intelligence, and cybersecurity, we provide expert guidance on data privacy.',
                color: '#00FFFF'
              },
              {
                icon: Eye,
                title: 'ERASE_YOUR_DATA_NOW',
                subtitle: 'Data Removal Services',
                description: 'We specialize in data removal services that help erase your personal information from databases and people search sites. Take back control of your digital identity today.',
                color: '#FF00FF',
                hasButton: true
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 border border-green-400/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-500 hover:border-green-400/60 hover:transform hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(167, 255, 158, 0.03) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    boxShadow: '0 4px 20px rgba(167, 255, 158, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: '-100%',
                          right: '-100%',
                          animation: `slide-right 2s ease-in-out infinite ${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-lg border border-green-400/30 group-hover:border-green-400/60 transition-all">
                        <Icon className="w-6 h-6 text-green-400 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div>
                        <h3 className="font-mono font-bold text-green-400 text-sm">{feature.title}</h3>
                        <p className="text-green-300/60 text-xs">{feature.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-green-100/70 text-sm leading-relaxed font-light mb-4">
                      {feature.description}
                    </p>
                    
                    {feature.hasButton && (
                      <div className="mt-6">
                        
                          href="data-removal.html"
                          className="group inline-flex items-center px-6 py-3 border border-green-400/60 bg-transparent text-green-400 font-mono text-sm font-bold rounded-lg transition-all duration-300 hover:bg-green-400/10 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20"
                        >
                          <span>GET_STARTED</span>
                          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${feature.color}20 0%, transparent 70%)`
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Terminal Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-400/30 p-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-4 text-green-400/70">
            <span className="flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              STATUS: ONLINE
            </span>
            <span>ENCRYPTION: ACTIVE</span>
            <span>PROTOCOLS: SECURE</span>
          </div>
          <div className="text-green-400/50">
            © 2025 BiyteLüm.sys | All Rights Reserved
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default BiyteLumHomepage;
