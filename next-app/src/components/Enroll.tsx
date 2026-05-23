"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const faqs = [
  { q: 'Do I need prior experience?', a: 'No coding experience is required. We start completely from scratch — web architecture, HTML, and how browsers work — before writing a single line of JavaScript.' },
  { q: 'Is TypeScript covered?', a: 'Yes. Sessions 16 and 17 are dedicated to TypeScript — from basic types and interfaces to generics, API typing, and full frontend integration with React.' },
  { q: 'Will I learn system design?', a: 'Absolutely. Sessions 27–28 cover the Critical Rendering Path, CAP theorem, horizontal/vertical scaling, load balancing, security (XSS, CORS, CSRF), and deployment.' },
  { q: 'What is the capstone project?', a: 'You will design, build, test, and deploy a full-stack application of your choice — a Food Delivery app, LMS, or Auth System — from database schema to live deployment on Vercel or Render.' },
];

const Enroll: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-base text-primary py-24 border-t border-theme" id="enroll">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Got Questions?</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-theme rounded-2xl overflow-hidden">
                <button type="button" onClick={() => setOpenIndex(prev => prev === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                  <span className="font-bold text-primary">{faq.q}</span>
                  <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                    <Icon icon={['fas', 'chevron-down']} className="text-faint text-sm" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-theme pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-surface border border-theme rounded-2xl p-8 sticky top-24">
            <div className="inline-block bg-gfg-green/20 text-gfg-lime text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
              MERN Stack Program
            </div>
            <h3 className="text-2xl font-extrabold text-primary mb-2">Ready to master MERN?</h3>
            <p className="text-muted text-sm mb-6">Join the program and accelerate your career in Full Stack Development.</p>

            <Link href="https://www.geeksforgeeks.org/courses/mern-stack" target="_blank" rel="noopener noreferrer"
              className="block w-full bg-gfg-green hover:bg-gfg-ocean text-white font-bold py-3.5 px-6 rounded-xl text-center transition-colors mb-6 shadow-lg shadow-gfg-green/20">
              Enroll on GFG
            </Link>

            <div className="space-y-4 text-sm text-muted border-t border-theme pt-6">
              {([
                { icon: ['fas', 'phone'] as IconProp, label: 'Call Us', value: '08069289001' },
                { icon: ['fas', 'envelope'] as IconProp, label: 'Email Us', value: 'courses@geeksforgeeks.org' },
                { icon: ['fas', 'location-dot'] as IconProp, label: 'Geeks Learning Together!', value: 'A-143, 7th Floor, Sovereign Corporate Tower, Noida, UP - 201305' },
              ] as { icon: IconProp; label: string; value: string }[]).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon icon={item.icon} className="text-gfg-lime mt-0.5 w-4 shrink-0" />
                  <div>
                    <p className="font-bold text-primary text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-xs">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;
