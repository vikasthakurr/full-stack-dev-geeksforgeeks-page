"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const projects: { icon: IconProp; title: string; desc: string; tech: string[]; phase: string }[] = [
  { icon: ['fas', 'plane-departure'], title: 'Travel Website UI', desc: 'Design a fully responsive, multi-section travel landing page with animations and accessibility.', tech: ['HTML', 'CSS', 'Tailwind'], phase: 'Phase 1' },
  { icon: ['fab', 'js'], title: 'Async Data Dashboard', desc: 'Real-time data dashboard with debounced search, charts, and performant rendering.', tech: ['JavaScript', 'Fetch', 'Charts'], phase: 'Phase 2' },
  { icon: ['fab', 'react'], title: 'E-Commerce React App', desc: 'Fully typed React frontend with state management, product flows, and optimizations.', tech: ['React', 'Redux', 'TypeScript'], phase: 'Phase 3' },
  { icon: ['fas', 'server'], title: 'RESTful API with Auth', desc: 'Complete Express API with JWT auth, validation, file uploads and CI tests.', tech: ['Express', 'JWT', 'MongoDB'], phase: 'Phase 4' },
  { icon: ['fas', 'leaf'], title: 'MongoDB Analytics Engine', desc: 'Aggregation pipelines, indexing strategies and performance tuning.', tech: ['MongoDB', 'Aggregation', 'Indexes'], phase: 'Phase 4' },
  { icon: ['fas', 'layer-group'], title: 'Capstone: Full-Stack App', desc: 'A production-ready app (Food Delivery / LMS) deployed with CI/CD and monitoring.', tech: ['React', 'Node', 'Docker'], phase: 'Capstone' },
];

const Projects: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const update = () => setSlidesToShow(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % projects.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-base text-primary py-24 border-t border-theme" id="projects">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Hands-On Learning</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">Projects Throughout the Course</h2>
          <p className="text-muted mt-3 max-w-xl">Stop doing toy problems. Build the applications companies are hiring for today.</p>
        </motion.div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={`${active}-${slidesToShow}`}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}
              className="grid gap-5" style={{ gridTemplateColumns: `repeat(${slidesToShow}, 1fr)` }}>
              {Array.from({ length: slidesToShow }).map((_, idx) => {
                const p = projects[(active + idx) % projects.length];
                return (
                  <article key={idx} className="bg-card border border-theme rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-gfg-green/10 to-gfg-blue/5 flex items-center justify-center relative">
                      <Icon icon={p.icon} className="text-5xl text-gfg-green/60" />
                      <span className="absolute top-3 right-3 text-xs font-bold bg-gfg-green/20 text-gfg-lime px-2.5 py-1 rounded-full">{p.phase}</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-primary text-lg mb-2">{p.title}</h3>
                      <p className="text-muted text-sm leading-relaxed flex-1">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.tech.map((t, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-card border border-theme text-secondary">{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-gfg-green' : 'w-4 bg-white/20'}`}
                aria-label={`Show project ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
