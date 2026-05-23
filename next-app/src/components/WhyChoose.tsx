"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

// ── Support pillars (formerly "Always With You") ──────────────────────────────
const pillars: { icon: IconProp; title: string; desc: string; color: string }[] = [
  { icon: ['fas', 'video'],       title: 'Recorded Access',      desc: 'Every session recorded — rewatch anytime, forever.',                          color: '#00895e' },
  { icon: ['fas', 'robot'],       title: '24×7 AI Support',      desc: 'Custom-trained AI assistant answers doubts at 2 AM.',                         color: '#7D94F9' },
  { icon: ['fas', 'users'],       title: 'Small Batches',        desc: 'Intimate cohort settings — doubt sessions every Tue & Thu.',                  color: '#016ccc' },
  { icon: ['fas', 'user-tie'],    title: '1:1 Mentorship',       desc: 'Dedicated mentor calls for code reviews and career guidance.',                 color: '#FF9843' },
  { icon: ['fas', 'briefcase'],   title: 'Interview Prep',       desc: 'Mock interviews focused on real full-stack and system design patterns.',       color: '#00895e' },
  { icon: ['fas', 'certificate'], title: 'GFG Certificate',      desc: 'Industry-recognised certificate on completion.',                              color: '#00895e' },
];

// ── Why-choose cards ──────────────────────────────────────────────────────────
type Card = {
  label: string;
  labelGradient: string;
  borderColor: string;
  bg: string;
  titleColor: string;
  descColor: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  statDesc: string;
  statColor: string;
  statLabelColor: string;
  icon: IconProp;
  iconBg: string;
  iconColor: string;
  supportBadge?: { icon: IconProp; text: string; color: string };
};

const cards: Card[] = [
  {
    label: 'Learn',
    labelGradient: 'linear-gradient(45deg, #4338CA 10%, #38BDF8 90%)',
    borderColor: '#2F80ED',
    bg: '#EFF6FF',
    titleColor: '#1C4D8E',
    descColor: '#2F80ED',
    title: 'Learn Online with Live Sessions and Recorded Access',
    desc: 'Build job-ready foundations in MERN, TypeScript, system design, and cloud deployment through flexible online learning, mentor support, and hands-on projects.',
    stat: '4.8/5',
    statLabel: 'Average Rating',
    statDesc: 'Top rated, holistic learning experience',
    statColor: '#1C4D8E',
    statLabelColor: '#2F80ED',
    icon: ['fas', 'video'],
    iconBg: '#DBEAFE',
    iconColor: '#1C4D8E',
    supportBadge: { icon: ['fas', 'robot'], text: '24×7 AI doubt support included', color: '#7D94F9' },
  },
  {
    label: 'Get Mentored',
    labelGradient: 'linear-gradient(45deg, #7C3AED 10%, #A855F7 90%)',
    borderColor: '#7C3AED',
    bg: '#F5F3FF',
    titleColor: '#5B21B6',
    descColor: '#7C3AED',
    title: 'Get Mentored by Industry Experts',
    desc: 'Receive 1:1 mentorship and get your doubts resolved instantly in class. Dedicated sessions every Tuesday & Thursday in intimate cohort settings.',
    stat: '4.9/5',
    statLabel: 'Mentor Rating',
    statDesc: 'Master topics by addressing doubts in extensive mentorship sessions',
    statColor: '#5B21B6',
    statLabelColor: '#7C3AED',
    icon: ['fas', 'user-tie'],
    iconBg: '#EDE9FE',
    iconColor: '#5B21B6',
    supportBadge: { icon: ['fas', 'users'], text: 'Small batches — Tue & Thu doubt sessions', color: '#016ccc' },
  },
  {
    label: 'Build',
    labelGradient: 'linear-gradient(45deg, #4D7C0F 10%, #84CC16 90%)',
    borderColor: '#84CC16',
    bg: '#F7FEE7',
    titleColor: '#3F6212',
    descColor: '#65A30D',
    title: 'Practice with Real-World Projects',
    desc: 'Work on industry-level projects to strengthen your skills and portfolio. From travel UIs to full-stack capstone apps deployed with CI/CD.',
    stat: '6+',
    statLabel: 'Projects',
    statDesc: 'Build working projects to learn application, teamwork and hurdles of real production.',
    statColor: '#065F46',
    statLabelColor: '#059669',
    icon: ['fas', 'layer-group'],
    iconBg: '#DCFCE7',
    iconColor: '#3F6212',
    supportBadge: { icon: ['fas', 'video'], text: 'All sessions recorded for revision', color: '#00895e' },
  },
  {
    label: 'Mock Sessions',
    labelGradient: 'linear-gradient(45deg, #BE123C 10%, #F43F5E 90%)',
    borderColor: '#F43F5E',
    bg: '#FFF1F2',
    titleColor: '#9F1239',
    descColor: '#E11D48',
    title: 'Perfect Your Skills with Mock Sessions',
    desc: 'Sharpen your skills through extensive mock interviews and assessments focused on real full-stack interview patterns and system design questions.',
    stat: '12+',
    statLabel: 'Mock Sessions',
    statDesc: 'Simulate actual interviews and ace them with practice',
    statColor: '#991B1B',
    statLabelColor: '#B91C1C',
    icon: ['fas', 'briefcase'],
    iconBg: '#FFE4E6',
    iconColor: '#9F1239',
    supportBadge: { icon: ['fas', 'certificate'], text: 'GFG certificate on completion', color: '#00895e' },
  },
  {
    label: 'Get Placed',
    labelGradient: 'linear-gradient(45deg, #B45309 10%, #F59E0B 90%)',
    borderColor: '#F59E0B',
    bg: '#FFFBEB',
    titleColor: '#92400E',
    descColor: '#D97706',
    title: 'Ace Your Placements & Land Your Dream Tech Job',
    desc: 'Become holistically prepared with resume/LinkedIn optimization, mock interviews, and placement support until you land your first offer.',
    stat: '92%',
    statLabel: 'Placement Rate',
    statDesc: 'Alumni placed at Salesforce, Wipro, TCS, Infosys and 100+ more companies',
    statColor: '#78350F',
    statLabelColor: '#B45309',
    icon: ['fas', 'trophy'],
    iconBg: '#FEF3C7',
    iconColor: '#92400E',
  },
];

function StackCard({ card, index }: { card: Card; index: number }) {
  const TOP_OFFSET = 80; // navbar height
  const STACK_OFFSET = 12; // how much each card peeks below the previous

  return (
    <div
      className="sticky"
      style={{ top: TOP_OFFSET + index * STACK_OFFSET }}
    >
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: card.bg, borderBottom: `5px solid ${card.borderColor}` }}
      >
        <div className="flex flex-col lg:flex-row">

          {/* Left */}
          <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-block text-sm font-extrabold uppercase tracking-widest mb-5 pb-3 border-b w-full"
                style={{ borderColor: card.titleColor + '33' }}>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: card.labelGradient }}>
                  {card.label}
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight mb-4 flex items-start gap-3"
                style={{ color: card.titleColor }}>
                <span className="flex-1">{card.title}</span>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                  strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1 w-6 h-6"
                  style={{ color: card.titleColor }}>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </h3>

              <p className="text-base leading-relaxed mb-6" style={{ color: card.descColor }}>
                {card.desc}
              </p>

              {card.supportBadge && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: card.supportBadge.color + '18', color: card.supportBadge.color, border: `1px solid ${card.supportBadge.color}30` }}>
                  <Icon icon={card.supportBadge.icon} className="text-xs" />
                  {card.supportBadge.text}
                </div>
              )}
            </div>

            <Link href="#enroll"
              className="inline-flex items-center gap-2 bg-gfg-green hover:bg-gfg-ocean text-white font-bold py-3 px-7 rounded-xl transition-colors w-fit shadow-md">
              Enroll Now
              <Icon icon={['fas', 'arrow-right']} className="text-sm" />
            </Link>
          </div>

          {/* Right: stat */}
          <div className="lg:w-80 p-6 lg:p-8 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-7 w-full flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: card.iconBg, color: card.iconColor }}>
                <Icon icon={card.icon} />
              </div>
              <div>
                <div className="text-4xl font-extrabold" style={{ color: card.statColor }}>{card.stat}</div>
                <div className="text-sm font-semibold mt-0.5" style={{ color: card.statLabelColor }}>{card.statLabel}</div>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{card.statDesc}</p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

const WhyChoose: React.FC = () => {
  return (
    <section className="bg-base py-24 border-t border-theme" id="why-choose">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Why Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-3 mb-4 tracking-tight">
            Why Choose This MERN Stack Course
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Live classes, recorded access, 1:1 mentorship, real projects, mock interviews, and placement support — everything in one program.
          </p>
        </motion.div>

        {/* Support pillars grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 bg-card border border-theme rounded-2xl p-4 hover:bg-raised hover:border-white/20 transition-all duration-300 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${p.color}18`, color: p.color }}>
                <Icon icon={p.icon} />
              </div>
              <div>
                <p className="font-bold text-primary text-sm leading-snug">{p.title}</p>
                <p className="text-faint text-xs mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-theme" />
          <span className="text-faint text-xs font-bold uppercase tracking-widest shrink-0">How it all comes together</span>
          <div className="flex-1 h-px bg-theme" />
        </div>

        {/* Stack cards — sticky scroll */}
        <div className="flex flex-col" style={{ paddingBottom: `${cards.length * 12}px` }}>
          {cards.map((card, i) => (
            <StackCard key={i} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
