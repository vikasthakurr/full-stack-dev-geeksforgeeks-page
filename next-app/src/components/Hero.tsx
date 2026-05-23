"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

// ── Animated background canvas ────────────────────────────────────────────────
const CODE_SYMBOLS = [
  'const', 'async', '=>', 'await', 'fetch()', '.then()', 'useState',
  'useEffect', 'export', 'import', 'return', 'function', 'class',
  'interface', 'type', '<div>', '</div>', 'req', 'res', 'next()',
  'Schema', 'model', 'find()', 'POST', 'GET', '200', '404',
  'JWT', 'bcrypt', 'mongoose', 'express()', 'React', 'Node',
  '{}', '[]', '=>', '...', 'null', 'undefined', 'Promise',
];

function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      text: string; alpha: number; size: number; color: string; life: number; maxLife: number;
    };

    const COLORS = ['#00895e', '#3178C6', '#61DAFB', '#68A063', '#7D94F9', '#FF9843'];
    const particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      text: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      alpha: 0,
      size: Math.random() * 4 + 9,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const count = W < 768 ? 25 : 55; // fewer particles on mobile
      if (particles.length === 0) {
        for (let i = 0; i < count; i++) {
          const p = spawn();
          p.life = Math.random() * p.maxLife;
          particles.push(p);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // draw faint connection lines between nearby particles (desktop only)
      if (W >= 768) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const lineAlpha = (1 - dist / 120) * 0.06;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0,137,94,${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // draw & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // fade in / fade out
        const half = p.maxLife / 2;
        p.alpha = p.life < half
          ? (p.life / half) * 0.35
          : ((p.maxLife - p.life) / half) * 0.35;

        ctx.font = `${p.size}px 'Source Code Pro', monospace`;
        ctx.fillStyle = p.color.replace(')', `,${p.alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(').replace('rgba(', 'rgba(');

        // simpler hex → rgba
        const hex = p.color.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fillText(p.text, p.x, p.y);

        if (p.life >= p.maxLife || p.y < -20 || p.x < -100 || p.x > W + 100) {
          particles[i] = spawn();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// ── Tech orbit items ──────────────────────────────────────────────────────────
type OrbitItem = { icon: IconProp; label: string; color: string; bg: string; angle: number; radius: number; duration: number };

const orbitItems: OrbitItem[] = [
  { icon: ['fab', 'react'],    label: 'React',      color: '#61DAFB', bg: '#0e2a33', angle: 0,   radius: 130, duration: 12 },
  { icon: ['fab', 'node-js'],  label: 'Node.js',    color: '#68A063', bg: '#0e2010', angle: 60,  radius: 130, duration: 12 },
  { icon: ['fas', 'database'], label: 'MongoDB',    color: '#4DB33D', bg: '#0e2010', angle: 120, radius: 130, duration: 12 },
  { icon: ['fas', 'bolt'],     label: 'Express',    color: '#9ca3af', bg: '#1a1a2e', angle: 180, radius: 130, duration: 12 },
  { icon: ['fas', 't'],        label: 'TypeScript', color: '#3178C6', bg: '#0e1a2e', angle: 240, radius: 130, duration: 12 },
  { icon: ['fab', 'docker'],   label: 'Docker',     color: '#2496ED', bg: '#0e1a2e', angle: 300, radius: 130, duration: 12 },
];

const floatingCards = [
  { icon: ['fas', 'check-circle'] as IconProp, text: 'Build deployed', sub: 'vercel.app', color: '#00895e', delay: 0 },
  { icon: ['fas', 'code-branch']  as IconProp, text: 'PR merged',      sub: 'main ← feat/auth', color: '#7D94F9', delay: 1.5 },
  { icon: ['fas', 'bolt']         as IconProp, text: 'API response',   sub: '200 OK · 42ms', color: '#FF9843', delay: 3 },
];

function OrbitRing({ items }: { items: OrbitItem[] }) {
  return (
    <div className="absolute inset-0">
      {items.map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        const x = 50 + (item.radius / 4.2) * Math.cos(rad);
        const y = 50 + (item.radius / 4.2) * Math.sin(rad);
        return (
          <motion.div key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: item.duration, repeat: Infinity, ease: 'linear', delay: -(i * item.duration / items.length) }}
            style={{ position: 'absolute', left: '50%', top: '50%', width: item.radius * 2, height: item.radius * 2, marginLeft: -item.radius, marginTop: -item.radius, borderRadius: '50%' }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: item.duration, repeat: Infinity, ease: 'linear', delay: -(i * item.duration / items.length) }}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              whileHover={{ scale: 1.2 }}
              className="flex flex-col items-center gap-1 cursor-default"
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/10"
                style={{ background: item.bg, color: item.color }}>
                <Icon icon={item.icon} />
              </div>
              <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{item.label}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function WebDevAnimation() {
  return (
    <div className="relative w-[420px] h-[420px] select-none">

      {/* Orbit ring SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420">
        <circle cx="210" cy="210" r="130" fill="none" stroke="rgba(0,137,94,0.12)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="210" cy="210" r="80"  fill="none" stroke="rgba(0,137,94,0.07)" strokeWidth="1" />
      </svg>

      {/* Orbiting tech icons */}
      <OrbitRing items={orbitItems} />

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-3xl bg-gfg-green/20 border-2 border-gfg-green/40 flex flex-col items-center justify-center shadow-2xl shadow-gfg-green/20 backdrop-blur-sm"
        >
          <span className="text-2xl font-extrabold text-gfg-green leading-none">M</span>
          <span className="text-[10px] font-bold text-gfg-green/70 tracking-widest mt-0.5">MERN</span>
        </motion.div>
      </div>

      {/* Floating notification cards */}
      {floatingCards.map((card, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: card.delay + 0.5, duration: 0.4 },
            x:       { delay: card.delay + 0.5, duration: 0.4 },
            y:       { delay: card.delay + 0.5, duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute flex items-center gap-2.5 bg-[#0d1117]/90 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 shadow-xl"
          style={{
            right: i === 1 ? 'auto' : '-8px',
            left:  i === 1 ? '-8px' : 'auto',
            top:   i === 0 ? '30px' : i === 1 ? '160px' : '300px',
            minWidth: '170px',
          }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: card.color + '25', color: card.color }}>
            <Icon icon={card.icon} className="text-xs" />
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">{card.text}</p>
            <p className="text-gray-500 text-[10px] font-mono">{card.sub}</p>
          </div>
          <span className="relative flex h-1.5 w-1.5 ml-auto shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: card.color }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: card.color }} />
          </span>
        </motion.div>
      ))}

    </div>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, delay = 400) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return val;
}

// ── Animated stat ─────────────────────────────────────────────────────────────
function AnimatedStat({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const val = useCountUp(target, 1800, delay);
  return (
    <div>
      <div className="text-3xl font-extrabold text-gfg-lime tabular-nums">
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-faint text-sm mt-1">{label}</div>
    </div>
  );
}

const Hero: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 450000;
    const duration = 2000;
    let start: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const formatCount = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)}k+` : `${n}`);

  const badges = [
    { icon: ['fas', 'star'] as const, text: '4.8 Rating', color: '#00895e' },
    { icon: ['fas', 'user-tie'] as const, text: '1:1 Mentorship', color: '#7D94F9' },
    { icon: ['fas', 'headset'] as const, text: '24/7 AI Support', color: '#FF9843' },
    { icon: ['fas', 'comments'] as const, text: 'Doubt Clearing', color: '#FF9843' },
    { icon: ['fas', 'layer-group'] as const, text: '28 Sessions', color: '#00895e' },
  ];

  return (
    <header className="bg-surface text-primary pt-28 pb-0 relative overflow-hidden">
      <HeroBg />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gfg-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <span className="bg-gfg-green/20 border border-gfg-green/40 text-gfg-lime text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Full Stack Web Development Program
          </span>
          <span className="text-muted text-xs flex items-center gap-1">
            <Icon icon={['fas', 'user-check']} className="text-gfg-green text-xs" />
            <span aria-live="polite">{formatCount(count)} Interested Geeks</span>
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Become an industry-ready{' '}
              <span className="text-gfg-lime">Full Stack Developer</span>{' '}
              from the ground up.
            </h1>
            <p className="text-muted text-lg mb-8 max-w-2xl leading-relaxed">
              Learn to engineer production-ready web applications using the MERN stack,
              modern TypeScript workflows, and scalable system design practices used in the industry.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {badges.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2 bg-card border border-theme px-4 py-2 rounded-full text-sm font-semibold">
                  <Icon icon={b.icon} style={{ color: b.color }} className="text-sm" />
                  <span className="text-secondary">{b.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center mb-12">
              <Link href="#enroll" className="bg-gfg-green hover:bg-gfg-ocean text-white font-bold py-3 px-8 rounded-lg transition-colors text-base shadow-lg shadow-gfg-green/20">
                Enroll Now — Free Trial
              </Link>
              <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-primary font-semibold py-3 px-8 rounded-lg transition-colors text-base">
                View Curriculum
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-theme pt-8 gap-6">
              <AnimatedStat target={450}  suffix="k+" label="Interested Learners" delay={600} />
              <AnimatedStat target={92}   suffix="%"  label="Placement Rate"      delay={750} />
              <AnimatedStat target={14}   suffix=" LPA" label="Avg CTC"           delay={900} />
              <AnimatedStat target={100}  suffix="+"  label="Hiring Partners"     delay={1050} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block w-[420px] shrink-0">
            <WebDevAnimation />
          </motion.div>        </div>
      </div>

      <div className="mt-16 h-16 bg-gradient-to-b from-transparent to-base" />
    </header>
  );
};

export default Hero;
