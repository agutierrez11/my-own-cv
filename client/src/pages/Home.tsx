import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card3D } from '@/components/Card3D';
import { POSTerminal } from '@/components/POSTerminal';
import { CounterStat } from '@/components/CounterStat';
import { ServiceCard } from '@/components/ServiceCard';
import { ParallaxFintechElements } from '@/components/ParallaxFintechElements';
import { useTheme } from '@/contexts/ThemeContext';
import {
  CreditCard,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  BarChart3,
  Shield,
  ArrowRight,
  Sun,
  Moon,
  Building2,
} from 'lucide-react';

/**
 * DESIGN PHILOSOPHY: Inmersivo Moderno Fintech
 * - Paleta: Azul profundo + Verde cítrico + Naranja cálido
 * - Efectos: Parallax, tarjetas 3D, scroll-triggered animations
 * - Elementos: Tarjetas fintech, terminales de pago, billeteras digitales
 */

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [posStatus, setPosStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [scrollY, setScrollY] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // 1. Visitor count loading (up in production, get in dev/admin)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('exclude') === 'true') {
      localStorage.setItem('portfolio_admin_exclude', 'true');
    }

    const isAdmin = localStorage.getItem('portfolio_admin_exclude') === 'true';
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    const lastVisit = localStorage.getItem('portfolio_last_visit');
    const now = Date.now();
    const cooldownMs = 24 * 60 * 60 * 1000;

    let shouldIncrement = !isDev && !isAdmin;
    if (lastVisit) {
      const timeElapsed = now - parseInt(lastVisit, 10);
      if (timeElapsed < cooldownMs) {
        shouldIncrement = false;
      }
    }

    const apiEndpoint = shouldIncrement
      ? 'https://api.counterapi.dev/v1/antoniogtzjimenez/portfolio_visits/up'
      : 'https://api.counterapi.dev/v1/antoniogtzjimenez/portfolio_visits';

    fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
          if (shouldIncrement) {
            localStorage.setItem('portfolio_last_visit', now.toString());
          }
        }
      })
      .catch(err => console.error("Error loading visitor count:", err));
  }, []);

  // 2. Microsoft Clarity script dynamic integration
  useEffect(() => {
    const clarityId = import.meta.env.VITE_CLARITY_ID || "xgxlzgk1ci"; // Tu ID real de Microsoft Clarity
    if (clarityId && typeof window !== 'undefined') {
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script",clarityId);
    }
  }, []);

  // 3. Custom Tracking: section view duration (IntersectionObserver)
  useEffect(() => {
    const activeSections: Record<string, number> = {};

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section occupies main viewport space
      threshold: 0.15
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const now = Date.now();

        if (entry.isIntersecting) {
          // Section entered viewport
          activeSections[id] = now;
        } else if (activeSections[id]) {
          // Section exited viewport -> calculate duration
          const entryTime = activeSections[id];
          const durationSeconds = Math.round((now - entryTime) / 1000);
          delete activeSections[id];

          // Ignore fast scroll-throughs (under 3 seconds)
          if (durationSeconds >= 3) {
            // Track in Umami Analytics
            if ((window as any).umami) {
              (window as any).umami.track('section_view_duration', {
                section: id,
                seconds: durationSeconds
              });
            }
            // Track in Microsoft Clarity
            if ((window as any).clarity) {
              (window as any).clarity("event", "section_read_duration", {
                section: id,
                seconds: durationSeconds.toString()
              });
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe main layout section elements
    ['trayectoria', 'proyectos', 'certificaciones', 'contacto'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Trigger POS animation on scroll
      const posSection = document.getElementById('pos-section');
      if (posSection) {
        const rect = posSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setPosStatus('processing');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="28" height="20" rx="4" fill="url(#logoGrad)" stroke="#3b82f6" strokeWidth="1.5" />
              <path d="M12 16H20M20 16L17 13M20 16L17 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logoGrad" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0f172a" />
                  <stop offset="1" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-lg text-gradient">Fintech Pro</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#contacto" className="text-sm hover:text-secondary transition-colors">
              Contacto
            </a>
            <a href="#trayectoria" className="text-sm hover:text-secondary transition-colors">
              Trayectoria
            </a>
            <a href="#proyectos" className="text-sm hover:text-secondary transition-colors">
              Proyectos
            </a>
            <a href="#certificaciones" className="text-sm hover:text-secondary transition-colors">
              Certificaciones
            </a>
          </div>
          <div className="flex items-center gap-4">
            {toggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Conectar
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 pb-12 flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

        {/* Animated background elements with aggressive scroll parallax */}
        <div 
          className="absolute top-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * -0.4}px, 0)` }}
        />
        <div 
          className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
          style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0)` }}
        />

        {/* Floating fintech elements with multi-layer parallax */}
        <ParallaxFintechElements scrollY={scrollY} />

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="animate-slide-in-left">
            <div className="label-sm text-secondary mb-4">FINTECH & ACQUIRING • MX / LATAM</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              B2B Sales Executive
              <span className="text-gradient"> Fintech Premium</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Especializado en Merchant Acquiring, integraciones API/ISV y expansión regional en México y LATAM. 
              5+ años transformando pagos digitales en oportunidades de crecimiento.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-gradient">5+</div>
                <div className="text-xs text-muted-foreground label-sm">Años Fintech</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">$10M</div>
                <div className="text-xs text-muted-foreground label-sm">MRR Generado</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-xs text-muted-foreground label-sm">Contactos del Sector</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-white px-8">
                Conectar Ahora <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                Ver Trayectoria
              </Button>
            </div>
          </div>

          {/* Right: 3D Card with Name Overlay */}
          <div className="animate-slide-in-right hidden md:flex justify-center w-full max-w-sm">
            <Card3D className="w-full relative">
              <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-6 flex flex-col justify-between border border-blue-500/30 relative overflow-hidden shadow-2xl">
                {/* Card Glow Effect */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl" />
                <div className="flex justify-between items-start z-10">
                  <div className="text-xs font-mono tracking-widest text-blue-400 font-bold">FINTECH PRO</div>
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AG</span>
                  </div>
                </div>
                <div className="my-6 z-10">
                  <div className="w-12 h-9 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg relative overflow-hidden shadow">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[1px] p-1 opacity-40">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="border border-white/40 rounded-[1px]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="z-10 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">Titular</div>
                    <div className="text-sm font-semibold tracking-wider text-white">Antonio Gutiérrez Jiménez</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">Core</div>
                    <div className="text-xs font-bold text-blue-400">GROWTH</div>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative py-12 bg-background border-t border-b border-border/30 overflow-hidden">
        {/* Parallax blobs */}
        <div
          className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"
          style={{ transform: `translate3d(0, ${scrollY * 0.04}px, 0)` }}
        />
        <div className="container relative z-10">
          <div className="mb-8 text-center">
            {/* Profile photo - bigger */}
            <div className="w-44 h-44 rounded-full border-2 border-secondary/40 overflow-hidden shadow-xl mx-auto mb-4">
              <img src="/foto_informal_jersey_2.png" alt="Antonio Gutiérrez" className="w-full h-full object-cover" />
            </div>
            <div className="label-sm text-secondary mb-2">PANEL DE CONTACTO · MX / LATAM</div>
            <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto">
              Disponibilidad inmediata para incorporarse a nuevos retos profesionales en fintech, partnerships y GTM en México y LATAM
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Disponibilidad actual */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="label-sm text-secondary mb-4">DISPONIBILIDAD ACTUAL</div>
              <div className="flex flex-wrap gap-3">
                {['Roles Comerciales', 'Alianzas Estratégicas', 'Proyectos Especiales'].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-sm font-medium">{item}</span>
                    <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded-full">ABIERTO</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacto directo */}
            <div>
              <div className="label-sm text-secondary mb-3">CONTACTO DIRECTO</div>
              <div className="space-y-2">
                {[
                  { icon: '✉️', label: 'EMAIL', value: 'antoniogtzjimenez@gmail.com', href: 'mailto:antoniogtzjimenez@gmail.com', tag: 'MX' },
                  { icon: '📞', label: 'TELÉFONO', value: '+52 998 119 1903', href: 'tel:+529981191903', tag: 'MX' },
                  { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/agjbusiness/', href: 'https://linkedin.com/in/agjbusiness/', tag: 'LATAM' },
                  { icon: '📍', label: 'UBICACIÓN', value: 'Cancún, Quintana Roo, México', href: null, tag: 'MX' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-secondary/50 transition-colors">
                    <span className="text-xl w-8 text-center shrink-0">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-secondary transition-colors truncate block">
                          {c.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-foreground">{c.value}</span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                      c.tag === 'LATAM' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-secondary/15 text-secondary'
                    }`}>{c.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enfoque de conversación */}
            <div>
              <div className="label-sm text-secondary mb-3">ENFOQUE DE CONVERSACIÓN</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '📊', title: 'Merchant Acquiring', tag: 'LATAM', desc: 'Ciclos outbound, retención de portafolio y expansión B2B en verticales de alto volumen.' },
                  { icon: '🔌', title: 'Integraciones API / ISV', tag: 'LATAM', desc: 'Partnerships técnicos con ERP, POS y plataformas de pagos en México y LATAM.' },
                  { icon: '🤝', title: 'Alianzas Estratégicas & GTM', tag: 'LATAM', desc: 'Estructuración de alianzas comerciales, go-to-market y desarrollo de canales regionales.' },
                  { icon: '⚡', title: 'Sales Ops & Automatización', tag: 'LATAM', desc: 'Diseño de flujos de prospección, CRM, reportería y herramientas SalesTech propias.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-xl hover:border-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-bold">{item.title}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded-full">{item.tag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a href="mailto:antoniogtzjimenez@gmail.com"
                className="flex-1 text-center px-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-colors">
                Iniciar conversación
              </a>
              <a href="https://linkedin.com/in/agjbusiness/" target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-3 border border-border rounded-xl font-bold hover:border-secondary hover:text-secondary transition-colors">
                Ver perfil LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Trayectoria Section */}
      <section id="trayectoria" className="relative py-8 bg-background">
        <div className="container">
          <div className="mb-8 scroll-reveal">
            <div className="label-sm text-secondary mb-2">EXPERIENCIA PROFESIONAL</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trayectoria Clave</h2>
          </div>

          <div className="space-y-6 max-w-4xl">

            {/* ── FISERV ── */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-reveal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 pt-5 pb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">PORTFOLIO OPS · MX · Acquiring · Enterprise</div>
                    <h3 className="text-2xl font-bold text-foreground">Fiserv</h3>
                    <p className="text-sm text-secondary font-semibold">Business Advisor</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground font-mono">📅 02/2025 – 10/2025</div>
                  <div className="text-xs text-muted-foreground mt-0.5">📍 Cancún, MX</div>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-foreground/80">Retención de portafolio, reactivación automatizada y dashboards comerciales para adquirencia a gran escala.</p>
                <div className="flex items-center gap-2 bg-secondary/8 border border-secondary/20 rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-secondary shrink-0" />
                  <span>80+ merchants monitoreados · Power BI + Power Automate · Salesforce dashboards configurados</span>
                </div>
                <div className="flex gap-8 py-2">
                  <div><div className="text-2xl font-bold text-foreground">80+</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Merchants</div></div>
                  <div><div className="text-2xl font-bold text-foreground">+15</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Opp/Mes</div></div>
                  <div><div className="text-2xl font-bold text-foreground">100%</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Data Integrity</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '📈', title: 'POWER BI DIAGNOSTIC', desc: 'Modelo MoM de comportamiento transaccional para 80+ merchants asignados' },
                    { icon: '🗂️', title: 'SALES AUTOMATION', desc: 'Workflow Power Automate + Excel + Outlook para campañas de reactivación' },
                    { icon: '🎯', title: 'SALESFORCE REPORTING', desc: 'Dashboards custom de pipeline health, conversión y KPIs MoM' },
                    { icon: '🤝', title: 'PARTNERSHIP PIPELINE', desc: '+15 oportunidades enterprise mensuales desde alianza bancaria asignada' },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                      <span className="text-lg shrink-0">{f.icon}</span>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{f.title}</div>
                        <div className="text-xs text-foreground/70">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border/40">
                  {['Power BI', 'Power Automate', 'Salesforce', 'Churn Mitigation', 'CRM'].map(t => (
                    <span key={t} className="px-3 py-1 bg-muted text-foreground/70 text-xs rounded-full font-medium border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CLIP ── */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-reveal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 pt-5 pb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow shrink-0">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">ENTERPRISE SALES · MX · eCommerce · Retail</div>
                    <h3 className="text-2xl font-bold text-foreground">Clip</h3>
                    <p className="text-sm text-secondary font-semibold">Asesor Comercial</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground font-mono">📅 07/2021 – 02/2025</div>
                  <div className="text-xs text-muted-foreground mt-0.5">📍 Cancún, MX</div>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-foreground/80">Ventas enterprise, integraciones API/ISV y desarrollo de partnerships comerciales.</p>
                <div className="flex items-center gap-2 bg-secondary/8 border border-secondary/20 rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-secondary shrink-0" />
                  <span>$69M MXN TPV total · 75.3% volumen auto-generado (Outbound Hunter) · 2.8x valor promedio vs Inbound</span>
                </div>
                <div className="flex gap-8 py-2">
                  <div><div className="text-2xl font-bold text-foreground">$69M</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">TPV Procesado</div></div>
                  <div><div className="text-2xl font-bold text-foreground">75.3%</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Outbound Vol</div></div>
                  <div><div className="text-2xl font-bold text-foreground">29</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Deals Activos</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '🎯', title: 'OUTBOUND HUNTER', desc: 'Cerró 15 tratos auto-generados que aportaron $52M MXN (75.3% del volumen total de la cartera de $69M MXN).' },
                    { icon: '🔌', title: 'API & ISV INTEGRATIONS', desc: 'Bistrosoft (restaurantes), Profitroom (hospitalidad), Odoo ERP' },
                    { icon: '⚡', title: 'TECH PROSPECTING', desc: 'Sales Navigator, Apollo, scraping workflows para calificación de decisores' },
                    { icon: '📊', title: 'EFICIENCIA OUTBOUND', desc: 'Cuentas auto-generadas promediaron $3.46M MXN anuales, superando por 2.8x al promedio de inbound/expos ($1.2M MXN).' },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                      <span className="text-lg shrink-0">{f.icon}</span>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{f.title}</div>
                        <div className="text-xs text-foreground/70">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['/oddo+clip.jpg', '/odoo.png'].map((src, i) => (
                    <div
                      key={i}
                      className="h-44 rounded-xl overflow-hidden border border-border/50 shadow-sm shrink-0 cursor-zoom-in group relative"
                      onClick={() => setLightboxImg(src)}
                    >
                      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`Clip foto ${i + 1}`} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded transition-opacity">Ver foto</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border/40">
                  {['Salesforce', 'Apollo', 'Sales Navigator', 'API Integrations', 'ISV Partnerships'].map(t => (
                    <span key={t} className="px-3 py-1 bg-muted text-foreground/70 text-xs rounded-full font-medium border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── JAPAN TOBACCO INTERNATIONAL ── */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-reveal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 pt-5 pb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">TERRITORIAL EXPANSION · MX · HORECA · KAM</div>
                    <h3 className="text-2xl font-bold text-foreground">Japan Tobacco International</h3>
                    <p className="text-sm text-secondary font-semibold">Account Executive · Southeast & Bajío</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground font-mono">📅 07/2018 – 12/2020</div>
                  <div className="text-xs text-muted-foreground mt-0.5">📍 Cancún & Aguascalientes, MX</div>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-foreground/80">Expansión territorial, cuentas clave y crecimiento de share.</p>
                <div className="flex items-center gap-2 bg-secondary/8 border border-secondary/20 rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-secondary shrink-0" />
                  <span>+40% Share of Opportunity · +35% base activa · 100+ hoteles cubiertos en Cancún y Riviera Maya</span>
                </div>
                <div className="flex gap-8 py-2">
                  <div><div className="text-2xl font-bold text-foreground">+40%</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Share Opp</div></div>
                  <div><div className="text-2xl font-bold text-foreground">+35%</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Base Activa</div></div>
                  <div><div className="text-2xl font-bold text-foreground">100+</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Hoteles</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '⭐', title: 'SHARE OF OPPORTUNITY', desc: '+40% SO en Cancún y Riviera Maya vs año anterior' },
                    { icon: '🌐', title: 'EXPANSIÓN DE CARTERA', desc: '+35% clientes activos en boutiques de hotel y grupos turísticos (+100 hoteles)' },
                    { icon: '🤝', title: 'KAM ESTRATÉGICO', desc: 'Grupo Xcaret, Grupo Mera, Fiesta Americana, RIU, Bahía Principe' },
                    { icon: '🎯', title: 'LIDERAZGO DE EQUIPO', desc: 'Coordinación de equipo de 3 personas FSF en región Bajío' },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                      <span className="text-lg shrink-0">{f.icon}</span>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{f.title}</div>
                        <div className="text-xs text-foreground/70">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border/40">
                  {['KAM', 'HORECA', 'Field Sales', 'Team Lead', 'Bajío · Riviera Maya'].map(t => (
                    <span key={t} className="px-3 py-1 bg-muted text-foreground/70 text-xs rounded-full font-medium border border-border/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── LATAM PAYMENTS & eCOMMERCE ── */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-reveal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 pt-5 pb-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4" strokeWidth="2"/><path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">COMUNIDAD ACTIVA · LATAM · Fintech · Acquiring</div>
                    <h3 className="text-2xl font-bold text-foreground">LATAM Payments & eCommerce</h3>
                    <p className="text-sm text-secondary font-semibold">Co-Founder</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground font-mono">📅 05/2024 – Presente</div>
                  <div className="text-xs text-muted-foreground mt-0.5">📍 LATAM · Remote</div>
                </div>
              </div>
              <div className="px-6 py-4 space-y-4">
                <p className="text-sm text-foreground/80">Comunidad, curaduría sectorial y conexión regional en pagos digitales.</p>
                <div className="flex items-center gap-2 bg-secondary/8 border border-secondary/20 rounded-lg px-4 py-2.5 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-secondary shrink-0" />
                  <span>500+ profesionales · LinkedIn & WhatsApp · Acquiring, procesamiento digital y seguridad en eCommerce</span>
                </div>
                <div className="flex gap-8 py-2">
                  <div><div className="text-2xl font-bold text-foreground">500+</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Profesionales</div></div>
                  <div><div className="text-2xl font-bold text-foreground">LATAM</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Cobertura</div></div>
                  <div><div className="text-2xl font-bold text-foreground">Activa</div><div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Comunidad</div></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: '👥', title: 'RED REGIONAL', desc: '500+ profesionales de pagos y eCommerce en LinkedIn y WhatsApp' },
                    { icon: '🌐', title: 'COBERTURA LATAM', desc: 'Miembros de MX, CO, PE, BR y más mercados de la región' },
                    { icon: '⚡', title: 'CURADURÍA SECTORIAL', desc: 'Best practices en acquiring, procesamiento digital y seguridad en eCommerce' },
                    { icon: '🤝', title: 'CONEXIÓN DE ECOSISTEMA', desc: 'Puente entre fintechs, ISOs, PSPs y ejecutivos comerciales de la región' },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
                      <span className="text-lg shrink-0">{f.icon}</span>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">{f.title}</div>
                        <div className="text-xs text-foreground/70">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['/evento.jpg', '/latam.jpeg'].map((src, i) => (
                    <div
                      key={i}
                      className="h-44 rounded-xl overflow-hidden border border-border/50 shadow-sm shrink-0 cursor-zoom-in group relative"
                      onClick={() => setLightboxImg(src)}
                    >
                      <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`LATAM foto ${i + 1}`} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded transition-opacity">Ver foto</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {['Acquiring', 'eCommerce', 'Digital Payments', 'Community', 'LATAM Network'].map(t => (
                      <span key={t} className="px-3 py-1 bg-muted text-foreground/70 text-xs rounded-full font-medium border border-border/50">{t}</span>
                    ))}
                  </div>
                  <a href="https://latamcommerce.com/" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-accent hover:text-accent/80 font-bold flex items-center gap-1 transition-colors">
                    latamcommerce.com <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="relative py-8 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="mb-8 scroll-reveal">
            <div className="label-sm text-secondary mb-2">PROYECTOS & CAPACIDADES</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Proyectos y capacidades que convierten insight comercial en ejecución fintech
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Nerv Project */}
            <Card3D className="bg-card border border-border overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-slate-950 border-b border-border p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                  <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                  <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="flex justify-between items-center z-10 border-b border-slate-900/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-blue-400 font-semibold">NERV ENGINE • ACTIVE</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">LATAM DATABASE</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center z-10 relative">
                    <svg className="w-full h-full max-h-28" viewBox="0 0 400 150">
                      <line x1="100" y1="75" x2="200" y2="40" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="100" y1="75" x2="200" y2="110" stroke="#3b82f6" strokeWidth="1.5" />
                      <line x1="200" y1="40" x2="300" y2="75" stroke="#60a5fa" strokeWidth="1.5" />
                      <line x1="200" y1="110" x2="300" y2="75" stroke="#4f46e5" strokeWidth="1.5" />
                      <circle cx="100" cy="75" r="7" fill="#0f172a" stroke="#4f46e5" strokeWidth="2.5" />
                      <circle cx="200" cy="40" r="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="200" cy="110" r="5" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                      <circle cx="300" cy="75" r="7" fill="#0f172a" stroke="#3b82f6" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between items-end z-10 pt-1.5 border-t border-slate-900/60">
                    <span className="text-[9px] font-mono text-muted-foreground">SCANNING PIPELINE...</span>
                    <span className="text-[9px] font-mono text-blue-400 font-semibold">1,000+ COs LOADED</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="label-sm text-accent">MVP • EN DESARROLLO</span>
                    <span className="label-sm bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">LATAM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gradient">Nerv — Sales Intelligence Tool</h3>
                  <p className="text-[10px] text-muted-foreground/70 mb-2">B2B SaaS · Developer &amp; Designer · 02/2026 – Presente</p>
                  <p className="text-xs text-muted-foreground mb-3">Herramienta propietaria de prospección outbound que mapea y segmenta más de 1,000 fintechs y actores de pagos en LATAM, con IA generativa para battlecards y detección de oportunidades comerciales.</p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { label: '1,000+ fintechs mapeadas', tag: 'LATAM' },
                      { label: 'Battlecards con IA generativa', tag: 'MX' },
                      { label: 'Gemini 2.0 Flash + Search grounding', tag: 'API' },
                      { label: 'RLHF & DPO pipeline (Qwen/Llama)', tag: 'ML' },
                      { label: 'Finnovista Radar MX, CO, PE', tag: 'DATA' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-blue-500/5 border border-blue-500/10 rounded px-2.5 py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 text-[10px]">⚡</span>
                          <span className="text-[10px] text-foreground/80">{item.label}</span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground">{item.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </Card3D>

            {/* Tonos Tool Treasurebox */}
            <Card3D className="bg-card border border-border overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-slate-950 border-b border-border p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                  <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                  <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                  <div className="flex justify-between items-center z-10 border-b border-slate-900/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">TREASUREBOX • ACTIVE</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">SALES TOOLKIT</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center z-10 relative">
                    <div className="relative w-64 h-32 flex gap-2 items-center justify-center">
                      <div className="w-20 h-20 rounded bg-slate-900/90 border border-amber-500/30 p-2 flex flex-col justify-between shadow-lg transform -rotate-3">
                        <div className="text-[6px] font-bold text-amber-400 uppercase">Calculator</div>
                        <div className="text-[9px] font-bold text-white">Call Funnel</div>
                      </div>
                      <div className="w-20 h-20 rounded bg-slate-900/90 border border-orange-500/30 p-2 flex flex-col justify-between shadow-lg transform rotate-3">
                        <div className="text-[6px] font-bold text-orange-400 uppercase">Wizard</div>
                        <div className="text-[9px] font-bold text-white">Sales Script</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end z-10 pt-1.5 border-t border-slate-900/60">
                    <span className="text-[9px] font-mono text-muted-foreground">PRODUCTIVITY HUB</span>
                    <span className="text-[9px] font-mono text-amber-400 font-semibold">8+ TOOLS RUNNING</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="label-sm text-amber-500 mb-1.5">SALES & PRODUCTIVITY</div>
                  <h3 className="text-xl font-bold mb-2 text-gradient">Tonos Tool Treasurebox</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3">Colección curada de herramientas de ventas y marketing. Incluye calculadoras de conversión y Sales Wizard.</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <a href="https://tools-erb.pages.dev" target="_blank" rel="noopener noreferrer" className="w-full block text-center py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 transition-colors">Ver Demo</a>
              </div>
            </Card3D>

            {/* LATAM Payments & eCommerce */}
            <Card3D className="bg-card border border-border overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-slate-950 border-b border-border p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                  <div className="absolute right-1/4 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                  <div className="flex justify-between items-center z-10 border-b border-slate-900/60 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold">COMMUNITY NETWORK</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground">CONNECTED REGION</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center z-10 relative">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-10 rounded-lg shadow-lg border border-indigo-500/20 bg-indigo-950 flex items-center justify-center overflow-hidden">
                        <img
                          src="/latamcommerce-logo.png"
                          alt="LATAMcommerce"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const parent = (e.target as HTMLImageElement).parentElement!;
                            (e.target as HTMLImageElement).style.display = 'none';
                            parent.innerHTML = '<span style="font-size:14px;font-weight:800;color:#818cf8;font-family:sans-serif;letter-spacing:-0.5px">LC</span>';
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-indigo-300 tracking-widest uppercase">latamcommerce.com</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end z-10 pt-1.5 border-t border-slate-900/60">
                    <span className="text-[9px] font-mono text-muted-foreground">LATAMCOMMERCE.COM</span>
                    <span className="text-[9px] font-mono text-indigo-400 font-semibold">ACTIVE STATUS</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="label-sm text-secondary mb-1.5">COMUNIDAD ACTIVA</div>
                  <h3 className="text-xl font-bold mb-2 text-gradient">LATAMcommerce</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-3">Comunidad cofundada de 500+ profesionales en pagos, acquiring y eCommerce. LinkedIn + WhatsApp.</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <a href="https://latamcommerce.com/" target="_blank" rel="noopener noreferrer"
                  className="w-full block text-center py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 transition-colors">
                  Ir al Sitio
                </a>
              </div>
            </Card3D>
          </div>
        </div>
      </section>



      {/* Certificaciones Section */}
      <section id="certificaciones" className="relative py-8 bg-background border-t border-border/30">
        <div className="container">
          <div className="mb-6">
            <div className="label-sm text-secondary mb-2">EDUCACIÓN CONTINUA</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Certificaciones & Especializaciones
            </h2>
            <p className="text-sm text-muted-foreground">
              Programas de desarrollo profesional y especializaciones con validez oficial del sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'McKinsey Forward Program',
                institution: 'McKinsey.org',
                duration: '120 Horas de capacitación intensiva',
                lessons: 'Liderazgo adaptativo, resolución estructurada de problemas complejos, comunicación estructurada y metodologías ágiles.',
                link: 'https://www.credly.com/badges/6e70dbb0-7695-4a46-a19e-6bc684256715/linked_in?t=sz1afc',
                logo: '/mckinsey_badge.png',
                document: '/Mckinseyaccelerate_Cuaderno_de_Aprendizaje_Forward.pdf'
              },
              {
                title: 'Growth 101',
                institution: 'Kurios',
                duration: '30 Horas con expertos globales',
                lessons: 'Curso formativo acerca de Growth, es una metodología y mindset de testeo rápido para identificar cómo crecer eficientemente un negocio a alta velocidad.',
                link: 'https://kurios.la/',
                document: '/Curso_Growth101_Kurios.pdf'
              },
              {
                title: 'Mastering Ventas',
                institution: 'Sales Professional',
                duration: '70 Horas • 150 Lecciones',
                lessons: '150 lecciones y 70 horas de formación para armar tu equipo de ventas desde 0, incluyendo metodologías, stack tecnológico y Masterclass con referentes de la industria.',
                link: 'https://www.salesprofessional.com/',
                document: '/Mastering_Ventas_2024-02-20.pdf'
              },
              {
                title: 'Curso SDR Primera Reunión',
                institution: 'LATAM SDR Leaders',
                duration: '16 Horas',
                lessons: '16 horas de pura genialidad con los líderes de la comunidad de SDR más grande de LATAM.',
                link: '/Curso_SDR_Primera_Reunion.jpg',
                document: '/Curso_SDR_Primera_Reunion.jpg'
              },
            ].map((cert, idx) => (
              <Card3D key={idx} className="bg-card border border-border/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {cert.logo ? (
                        <img src={cert.logo} className="w-8 h-8 object-contain rounded" alt={cert.institution} />
                      ) : (
                        <span className="text-xl">🎓</span>
                      )}
                      <span className="px-3 py-1 bg-secondary/15 text-secondary text-xs font-semibold rounded-full label-sm">
                        {cert.institution}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{cert.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient">{cert.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">Módulos clave:</span> {cert.lessons}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 font-bold transition-colors"
                  >
                    Verificar Credencial <ArrowRight className="w-4 h-4" />
                  </a>
                  {cert.document && (
                    <a
                      href={cert.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-secondary hover:text-secondary/80 font-bold transition-colors"
                    >
                      Ver Documento <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        {/* Main footer row */}
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left: identity */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {['MX', 'FINTECH LATAM', 'B2B SALES', 'MERCHANT ACQUIRING'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 border border-border rounded text-[10px] font-bold text-muted-foreground">{tag}</span>
                ))}
              </div>
              <div className="text-xl font-bold text-foreground">Antonio Gutiérrez Jiménez</div>
              <div className="text-sm text-muted-foreground mt-1">
                B2B Sales Executive · Fintech & Merchant Acquiring · Ciudadanía: <strong>Mexican</strong>
              </div>
            </div>
            {/* Right: contact */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:antoniogtzjimenez@gmail.com" className="hover:text-foreground transition-colors">antoniogtzjimenez@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <span>💼</span>
                <a href="https://linkedin.com/in/agjbusiness/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">linkedin.com/in/agjbusiness</a>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+529981191903" className="hover:text-foreground transition-colors">+52 998 119 1903</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <nav className="flex gap-6 font-semibold tracking-widest uppercase">
              <a href="#trayectoria" className="hover:text-foreground transition-colors">Trayectoria</a>
              <a href="#proyectos" className="hover:text-foreground transition-colors">Proyectos</a>
              <a href="#contacto" className="hover:text-foreground transition-colors">Contacto</a>
            </nav>
            <div className="flex items-center gap-3">
              <span>© 2026 · Antonio Gutiérrez Jiménez</span>
              {visitorCount !== null && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Visitas: {visitorCount.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightboxImg}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              alt="Foto ampliada"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors backdrop-blur-sm"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
