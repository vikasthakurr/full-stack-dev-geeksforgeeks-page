"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

const reviews = [
  { initials: 'NR', name: 'Nikhil Roy', color: '#00895e', text: 'The content is highly relevant and closely aligned with current industry standards, demonstrating a strong understanding of modern practices, expectations, and professional requirements.' },
  { initials: 'MC', name: 'Mridu Chauhan', company: 'Cloud Maven Inc.', color: '#016ccc', text: 'The course was an amazing learning experience. Complex topics were broken down into simple explanations. This strong foundation played a key role in helping me secure my placement at Cloud Maven Inc.' },
  { initials: 'MB', name: 'Mohit Bhatia', color: '#FF9843', text: 'It was a really great learning experience. Everything was explained in a clear and simple way, which made understanding much easier. Support was provided at every step whenever needed.' },
  { initials: 'SN', name: 'Sneha Nair', company: 'Node.js Developer, Hyderabad', color: '#105d95', text: 'The system design sessions at the end tied everything together. I walked into interviews confident about CAP theorem, scaling, and security. Highly recommended!' },
];

const Reviews: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const update = () => setSlidesToShow(window.innerWidth >= 1024 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="bg-surface text-primary py-24 border-t border-theme" id="reviews">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Social Proof</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">What Our Students Say</h2>
        </motion.div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={`${active}-${slidesToShow}`}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
              className="grid gap-5" style={{ gridTemplateColumns: `repeat(${slidesToShow}, 1fr)` }}>
              {Array.from({ length: slidesToShow }).map((_, idx) => {
                const r = reviews[(active + idx) % reviews.length];
                return (
                  <div key={idx} className="bg-card border border-theme rounded-2xl p-8 flex flex-col gap-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} icon={['fas', 'star']} className="text-gfg-lime text-xs" />
                      ))}
                    </div>
                    <p className="text-secondary leading-relaxed text-sm flex-1">"{r.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-theme">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: r.color }}>
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">{r.name}</p>
                        {r.company && <p className="text-xs text-faint">{r.company}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-8">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-gfg-green' : 'w-4 bg-white/20'}`}
                aria-label={`Show review ${i + 1}`} />
            ))}
          </div>
        </div>

        <p className="text-gfg-lime font-bold text-center mt-12 text-lg">You can be next in our Success Story!</p>
      </div>
    </section>
  );
};

export default Reviews;
