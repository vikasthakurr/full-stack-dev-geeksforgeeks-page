"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type Skill = { icon: IconProp; text: string; color: string };

const row1: Skill[] = [
  { icon: ['fas', 'sitemap'],       text: 'Web Architecture',          color: '#00895e' },
  { icon: ['fab', 'html5'],         text: 'HTML & Semantics',           color: '#ea580c' },
  { icon: ['fab', 'css3-alt'],      text: 'CSS & Layouts',              color: '#0284c7' },
  { icon: ['fas', 'gears'],         text: 'JS Engine & Async',          color: '#ca8a04' },
  { icon: ['fas', 'code-branch'],   text: 'TypeScript',                 color: '#3178C6' },
  { icon: ['fab', 'react'],         text: 'React & State',              color: '#61DAFB' },
  { icon: ['fas', 'wind'],          text: 'Tailwind CSS',               color: '#38BDF8' },
  { icon: ['fas', 'diagram-project'],text: 'Redux',                     color: '#7D94F9' },
  { icon: ['fas', 'plug'],          text: 'REST API Design',            color: '#FF9843' },
  { icon: ['fas', 'shield-halved'], text: 'Security (XSS/CORS/CSRF)',   color: '#7D94F9' },
];

const row2: Skill[] = [
  { icon: ['fab', 'node-js'],       text: 'Node.js & Express',          color: '#68A063' },
  { icon: ['fas', 'database'],      text: 'MongoDB & Aggregation',      color: '#4DB33D' },
  { icon: ['fas', 'server'],        text: 'System Design',              color: '#FF9843' },
  { icon: ['fab', 'docker'],        text: 'Docker & Deployment',        color: '#2496ED' },
  { icon: ['fas', 'earth-americas'],text: 'Web Accessibility',          color: '#00895e' },
  { icon: ['fas', 'rocket'],        text: 'CI/CD & DevOps',             color: '#FF9843' },
  { icon: ['fas', 'gauge-high'],    text: 'Performance Optimization',   color: '#ef4444' },
  { icon: ['fas', 'lock'],          text: 'JWT & Auth Systems',         color: '#7D94F9' },
  { icon: ['fas', 'layer-group'],   text: 'Full Stack Architecture',    color: '#00895e' },
  { icon: ['fas', 'flask'],         text: 'Jest Testing',               color: '#ca8a04' },
];

function MarqueeRow({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee${reverse ? 'Reverse' : ''} 30s linear infinite`,
        }}
      >
        {doubled.map((s, i) => (
          <div key={i}
            className="flex items-center gap-2.5 bg-card border border-theme rounded-full px-4 py-2 shrink-0 hover:border-gfg-green/40 transition-colors duration-200 cursor-default">
            <Icon icon={s.icon} className="text-sm shrink-0" style={{ color: s.color }} />
            <span className="text-secondary text-sm font-semibold whitespace-nowrap">{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Skills: React.FC = () => {
  return (
    <section className="bg-surface border-t border-theme py-10 overflow-hidden" id="skills">

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center justify-between gap-4">
          <div>
            <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">What You'll Master</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mt-1 tracking-tight">
              Skills across the full stack
            </h2>
          </div>
          <span className="text-faint text-xs hidden sm:block">{row1.length + row2.length} skills covered</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

    </section>
  );
};

export default Skills;
