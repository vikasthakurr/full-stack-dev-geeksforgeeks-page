"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromoBanner from './PromoBanner';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type Topic = { label: string; sub?: string[] };
type Phase = {
  id: number;
  tag: string;
  title: string;
  color: string;
  icon: IconProp;
  topics: Topic[];
};

const phases: Phase[] = [
  {
    id: 0,
    tag: 'Session 1',
    title: 'Web Architecture + MERN Mental Model',
    color: '#7D94F9',
    icon: ['fas', 'sitemap'],
    topics: [
      { label: 'Client-server architecture' },
      { label: 'End-to-end request lifecycle', sub: ['Browser → Server → DB → Response'] },
      { label: 'What is MERN and why this stack' },
      { label: 'Modern apps vs static websites' },
      { label: 'Full flow walkthrough', sub: ['React → API → DB → UI update'] },
      { label: 'Intro to consistency', sub: ['Ghost messaging problem intuition'] },
    ],
  },
  {
    id: 1,
    tag: 'Sessions 2–3',
    title: 'HTML Core + Forms & Semantics',
    color: '#ea580c',
    icon: ['fab', 'html5'],
    topics: [
      { label: 'Structure, headings & paragraphs' },
      { label: 'Lists, links & images' },
      { label: 'Tables' },
      { label: 'Forms, inputs & validation basics' },
      { label: 'Semantic HTML' },
      { label: 'Web Accessibility (ARIA)' },
    ],
  },
  {
    id: 2,
    tag: 'Sessions 4–7',
    title: 'CSS + Layout Systems + UI Project',
    color: '#0284c7',
    icon: ['fab', 'css3-alt'],
    topics: [
      { label: 'CSS syntax, selectors, colors & fonts' },
      { label: 'Box model' },
      { label: 'Flexbox & Grid' },
      { label: 'Positioning & responsive design', sub: ['Media queries, mobile-first'] },
      { label: 'Animations and transitions' },
      { label: 'Tailwind CSS basics & responsive UI' },
      { label: 'Bootstrap grid & components' },
      { label: 'Rothko exercise + Travel website project' },
    ],
  },
  {
    id: 3,
    tag: 'Sessions 8–11',
    title: 'JavaScript Foundations',
    color: '#ca8a04',
    icon: ['fab', 'js'],
    topics: [
      { label: 'JS engine & execution context', sub: ['GEC, memory model'] },
      { label: 'Variables', sub: ['var, let, const'] },
      { label: 'Data types & operators' },
      { label: 'Conditionals and loops' },
      { label: 'Functions' },
      { label: 'Scope & lexical environment' },
      { label: 'Hoisting' },
      { label: 'Objects, arrays & iteration' },
    ],
  },
  {
    id: 4,
    tag: 'Sessions 12–15',
    title: 'Advanced JavaScript',
    color: '#F7DF1E',
    icon: ['fas', 'gears'],
    topics: [
      { label: 'Closures' },
      { label: 'Higher-order functions', sub: ['map, filter, reduce'] },
      { label: 'Callbacks & callback hell' },
      { label: 'Promises, Async/Await & error handling' },
      { label: 'Fetch API' },
      { label: 'DOM manipulation & event listeners' },
      { label: 'Event delegation' },
      { label: 'Debounce and throttle' },
    ],
  },
  {
    id: 5,
    tag: 'Sessions 16–17',
    title: 'TypeScript',
    color: '#3178C6',
    icon: ['fas', 't'],
    topics: [
      { label: 'Types & interfaces' },
      { label: 'Type inference' },
      { label: 'Functions' },
      { label: 'Generics' },
      { label: 'API typing & frontend integration' },
    ],
  },
  {
    id: 6,
    tag: 'Sessions 18–22',
    title: 'React Ecosystem',
    color: '#61DAFB',
    icon: ['fab', 'react'],
    topics: [
      { label: 'Setup with Vite, JSX & components' },
      { label: 'Props, useState & state lifting' },
      { label: 'useEffect & API calls' },
      { label: 'useRef, Context API' },
      { label: 'Performance hooks', sub: ['useMemo, memo, useCallback'] },
      { label: 'React Router & useNavigate' },
      { label: 'Forms & Redux' },
      { label: 'Code splitting, lazy loading & Suspense' },
      { label: 'Windowing, Skeleton UI & Shell architecture' },
    ],
  },
  {
    id: 7,
    tag: 'Sessions 23–24',
    title: 'Node.js + Backend Architecture',
    color: '#68A063',
    icon: ['fab', 'node-js'],
    topics: [
      { label: 'Node.js basics & event loop' },
      { label: 'HTTP server & request lifecycle' },
      { label: 'Express setup, routing & middleware' },
      { label: 'MVC — controllers & services' },
      { label: 'Environment variables (dotenv)' },
      { label: 'Logging' },
      { label: 'File uploads & email integration' },
    ],
  },
  {
    id: 8,
    tag: 'Sessions 25–26',
    title: 'API Design + MongoDB',
    color: '#4DB33D',
    icon: ['fas', 'database'],
    topics: [
      { label: 'REST principles' },
      { label: 'Validation', sub: ['Joi / Zod'] },
      { label: 'Pagination strategies' },
      { label: 'Throughput vs latency' },
      { label: 'MongoDB CRUD operations' },
      { label: 'Mongoose schemas & models' },
      { label: 'Relationships' },
    ],
  },
  {
    id: 9,
    tag: 'Session 27',
    title: 'System Design (HLD)',
    color: '#FF9843',
    icon: ['fas', 'server'],
    topics: [
      { label: 'Critical Rendering Path', sub: ['Intro & deep dive'] },
      { label: 'Reconciliation intuition' },
      { label: 'Horizontal vs vertical scaling' },
      { label: 'Load balancing' },
      { label: 'CAP theorem' },
      { label: 'Security', sub: ['XSS, CORS, CSRF'] },
    ],
  },
  {
    id: 10,
    tag: 'Session 28',
    title: 'Scaling + Deployment + Capstone',
    color: '#2496ED',
    icon: ['fab', 'docker'],
    topics: [
      { label: 'Indexing & aggregation' },
      { label: 'Sharding', sub: ['Master-slave vs master-master'] },
      { label: 'Deployment', sub: ['Vercel, Render, Docker'] },
      { label: 'Jest testing' },
      { label: 'Capstone kickoff', sub: ['Food delivery / LMS / Auth system'] },
    ],
  },
];

const Curriculum: React.FC = () => {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <section className="bg-base text-primary py-24 border-t border-theme" id="curriculum">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-8">
          <PromoBanner />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Roadmap</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">Curriculum Breakdown</h2>
            <p className="text-muted mt-3 max-w-xl">
              28 sessions across 11 milestones — from web fundamentals to production deployment, with real engineering intuition built in at every step.
            </p>
          </div>
          <button title="Brochure coming soon" onClick={(e) => e.preventDefault()}
            className="shrink-0 inline-flex items-center gap-2 border border-white/20 text-muted font-semibold py-2.5 px-5 rounded-lg text-sm cursor-not-allowed opacity-50">
            <Icon icon={['fas', 'download']} /> Download Brochure
          </button>
        </motion.div>

        <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-6">

          {/* Sidebar — arrow step flow */}
          <div className="flex flex-row lg:flex-col gap-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 lg:max-h-[640px] lg:overflow-y-auto pr-1">
            {phases.map((p, i) => (
              <div key={i} className="flex flex-col items-center lg:items-stretch shrink-0 lg:shrink">
                {/* Step button */}
                <button onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 w-max lg:w-full ${
                    active === i ? 'text-primary' : 'text-muted hover:text-primary'
                  }`}
                  style={active === i ? { background: `${p.color}18` } : {}}>

                  {/* Step number circle */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 transition-all duration-200"
                    style={active === i
                      ? { background: p.color, color: '#fff' }
                      : { background: 'var(--card-bg)', border: '1.5px solid var(--border)', color: '#6b7280' }}>
                    {i + 1}
                  </div>

                  {/* Label */}
                  <div className="hidden lg:block min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest leading-none mb-0.5"
                      style={{ color: active === i ? p.color : '#6b7280' }}>{p.tag}</p>
                    <p className="text-xs font-semibold leading-tight truncate text-primary opacity-80">{p.title}</p>
                  </div>
                </button>

                {/* Arrow connector — hidden after last item */}
                {i < phases.length - 1 && (
                  <div className="flex items-center lg:items-start lg:pl-[13px] mx-2 lg:mx-0">
                    {/* Mobile: horizontal arrow */}
                    <div className="flex lg:hidden items-center text-theme px-1">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path d="M0 5h13M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" />
                      </svg>
                    </div>
                    {/* Desktop: vertical arrow */}
                    <div className="hidden lg:flex flex-col items-center py-0.5">
                      <div className="w-px h-3 bg-theme" />
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M5 0v5M2 3l3 4 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="bg-card border border-theme rounded-2xl overflow-hidden">

              {/* Panel header */}
              <div className="flex items-center gap-5 p-6 border-b border-theme"
                style={{ background: `linear-gradient(135deg, ${phase.color}12, transparent)` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${phase.color}20`, color: phase.color }}>
                  <Icon icon={phase.icon} />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: phase.color }}>{phase.tag}</span>
                  <h3 className="text-xl font-extrabold text-primary mt-0.5">{phase.title}</h3>
                </div>
              </div>

              {/* Topics */}
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-2">
                  {phase.topics.map((topic, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 bg-card border border-theme rounded-xl px-4 py-3 hover:bg-raised transition-colors">
                      <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${phase.color}25` }}>
                        <Icon icon={['fas', 'check']} className="text-[9px]" style={{ color: phase.color }} />
                      </span>
                      <div>
                        <p className="text-secondary text-sm font-semibold leading-snug">{topic.label}</p>
                        {topic.sub && (
                          <p className="text-faint text-xs mt-0.5 leading-relaxed">{topic.sub.join(' · ')}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase dots */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {phases.map((p, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? '2rem' : '1rem',
                background: active === i ? p.color : 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Go to ${p.tag}`} />
          ))}
          <span className="text-faint text-xs ml-2">{active + 1} / {phases.length}</span>
        </div>

      </div>
    </section>
  );
};

export default Curriculum;
