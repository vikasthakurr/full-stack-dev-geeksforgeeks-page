"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

// ── Data ──────────────────────────────────────────────────────────────────────

type Alumni = { name: string; role: string; ctc?: string; color: string };
type Company = {
  name: string;
  shortName: string;
  color: string;
  bg: string;
  border: string;
  icon: IconProp | null;
  avatar?: string;
  alumni: Alumni[];
};

const companies: Company[] = [
  {
    name: 'Salesforce', shortName: 'SF', color: '#00A1E0', bg: '#EFF9FF', border: '#bae6fd',
    icon: ['fab', 'salesforce'], alumni: [
      { name: 'Arjun Mehta',   role: 'SDE 1',              ctc: '18 LPA', color: '#0ea5e9' },
      { name: 'Priya Sharma',  role: 'Associate Engineer',  ctc: '16 LPA', color: '#38bdf8' },
    ],
  },
  {
    name: 'Wipro', shortName: 'WI', color: '#1d4ed8', bg: '#EFF6FF', border: '#bfdbfe',
    icon: ['fas', 'building'], alumni: [
      { name: 'Rahul Verma',   role: 'Software Engineer',   ctc: '14 LPA', color: '#3b82f6' },
      { name: 'Sneha Nair',    role: 'Full Stack Dev',       ctc: '13 LPA', color: '#60a5fa' },
      { name: 'Karan Joshi',   role: 'Backend Developer',   ctc: '12 LPA', color: '#93c5fd' },
    ],
  },
  {
    name: 'TCS', shortName: 'TC', color: '#1e40af', bg: '#EFF6FF', border: '#bfdbfe',
    icon: ['fas', 'building'], alumni: [
      { name: 'Amit Patel',    role: 'Systems Engineer',    ctc: '11 LPA', color: '#2563eb' },
      { name: 'Divya Rao',     role: 'React Developer',     ctc: '12 LPA', color: '#3b82f6' },
    ],
  },
  {
    name: 'Infosys', shortName: 'IN', color: '#0369a1', bg: '#F0F9FF', border: '#bae6fd',
    icon: ['fas', 'building'], alumni: [
      { name: 'Vikram Singh',  role: 'Technology Analyst',  ctc: '13 LPA', color: '#0284c7' },
      { name: 'Ananya Das',    role: 'Full Stack Engineer',  ctc: '14 LPA', color: '#0ea5e9' },
    ],
  },
  {
    name: 'Accenture', shortName: 'AC', color: '#a855f7', bg: '#FAF5FF', border: '#e9d5ff',
    icon: ['fas', 'building'], alumni: [
      { name: 'Rohan Gupta',   role: 'Associate SDE',       ctc: '13 LPA', color: '#a855f7' },
      { name: 'Meera Iyer',    role: 'Node.js Developer',   ctc: '12 LPA', color: '#c084fc' },
    ],
  },
  {
    name: 'Capgemini', shortName: 'CA', color: '#0891b2', bg: '#ECFEFF', border: '#a5f3fc',
    icon: ['fas', 'building'], alumni: [
      { name: 'Suresh Kumar',  role: 'Software Developer',  ctc: '12 LPA', color: '#06b6d4' },
    ],
  },
  {
    name: 'Tata 1mg', shortName: 'T1', color: '#e11d48', bg: '#FFF1F2', border: '#fecdd3',
    icon: ['fas', 'building'], alumni: [
      { name: 'Atul Kumar',    role: 'Project Coordinator', ctc: '15 LPA', color: '#f43f5e' },
      { name: 'Pooja Mishra',  role: 'Frontend Engineer',   ctc: '14 LPA', color: '#fb7185' },
    ],
  },
  {
    name: 'HashedIn', shortName: 'HI', color: '#ef4444', bg: '#FEF2F2', border: '#fecaca',
    icon: ['fas', 'building'], alumni: [
      { name: 'Nikhil Roy',    role: 'SDE 1',               ctc: '16 LPA', color: '#ef4444' },
    ],
  },
  {
    name: 'Nagarro', shortName: 'NA', color: '#7c3aed', bg: '#F5F3FF', border: '#ddd6fe',
    icon: ['fas', 'building'], alumni: [
      { name: 'Siddharth V.',  role: 'Software Engineer',   ctc: '13 LPA', color: '#8b5cf6' },
      { name: 'Ritu Sharma',   role: 'React Developer',     ctc: '12 LPA', color: '#a78bfa' },
    ],
  },
  {
    name: 'Cloud Maven', shortName: 'CM', color: '#00895e', bg: '#F0FDF4', border: '#bbf7d0',
    icon: ['fas', 'building'], alumni: [
      { name: 'Mridu Chauhan', role: 'Cloud Engineer',      ctc: '17 LPA', color: '#10b981' },
    ],
  },
  {
    name: 'Celebal Tech', shortName: 'CT', color: '#0284c7', bg: '#F0F9FF', border: '#bae6fd',
    icon: ['fas', 'building'], alumni: [
      { name: 'Harsh Agarwal', role: 'Full Stack Dev',       ctc: '13 LPA', color: '#0ea5e9' },
    ],
  },
  {
    name: 'Tech Mahindra', shortName: 'TM', color: '#dc2626', bg: '#FEF2F2', border: '#fecaca',
    icon: ['fas', 'building'], alumni: [
      { name: 'Gaurav Tiwari', role: 'Software Engineer',   ctc: '12 LPA', color: '#ef4444' },
      { name: 'Swati Jain',    role: 'Backend Developer',   ctc: '11 LPA', color: '#f87171' },
    ],
  },
];

const roles = [
  { icon: ['fas', 'layer-group'] as IconProp, text: 'Full Stack Developer',  color: '#00895e', count: '45%' },
  { icon: ['fab', 'react']       as IconProp, text: 'Frontend Engineer',      color: '#61DAFB', count: '28%' },
  { icon: ['fab', 'node-js']     as IconProp, text: 'Backend Developer',      color: '#68A063', count: '18%' },
  { icon: ['fas', 'code']        as IconProp, text: 'Software Engineer',       color: '#7D94F9', count: '9%'  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function AlumniAvatar({ name, color, size = 'md' }: { name: string; color: string; size?: 'sm' | 'md' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const cls = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
  return (
    <div className={`${cls} rounded-full flex items-center justify-center font-extrabold text-white shrink-0`}
      style={{ background: color }}>
      {initials}
    </div>
  );
}

function CompanyCard({ company, index }: { company: Company; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? company.alumni : company.alumni.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-card border border-theme rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
    >
      {/* Company header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-theme"
        style={{ background: `linear-gradient(135deg, ${company.color}10, transparent)` }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold border shrink-0"
          style={{ background: company.bg, borderColor: company.border, color: company.color }}>
          {company.avatar ?? company.shortName}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-primary text-sm leading-tight truncate">{company.name}</p>
          <p className="text-xs mt-0.5" style={{ color: company.color }}>
            {company.alumni.length} alumni placed
          </p>
        </div>
        {/* Stacked avatars preview — ring-[#0a0e0f] kept to match card bg */}
        <div className="flex -space-x-2">
          {company.alumni.slice(0, 3).map((a, i) => (
            <div key={i} className="ring-2 ring-[#0a0e0f] rounded-full">
              <AlumniAvatar name={a.name} color={a.color} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Alumni list */}
      <div className="px-5 py-3 flex flex-col gap-2.5 flex-1">
        <AnimatePresence initial={false}>
          {visible.map((a, i) => (
            <motion.div key={a.name}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3">
              <AlumniAvatar name={a.name} color={a.color} />
              <div className="flex-1 min-w-0">
                <p className="text-primary text-xs font-bold truncate">{a.name}</p>
                <p className="text-faint text-[11px] truncate">{a.role}</p>
              </div>
              {a.ctc && (
                <span className="text-xs font-extrabold shrink-0" style={{ color: company.color }}>{a.ctc}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {company.alumni.length > 2 && (
          <button onClick={() => setExpanded(e => !e)}
            className="text-[11px] font-semibold mt-1 text-left transition-colors"
            style={{ color: company.color }}>
            {expanded ? '↑ Show less' : `+${company.alumni.length - 2} more`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const Careers: React.FC = () => {
  const totalAlumni = companies.reduce((s, c) => s + c.alumni.length, 0);

  return (
    <section className="bg-base text-primary py-24 border-t border-theme" id="careers">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Career Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">From Classes to Careers</h2>
            <p className="text-muted mt-3 max-w-xl">
              Real people. Real companies. Real salaries. Here's where our alumni are building their careers.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            {[
              { value: `${totalAlumni}+`, label: 'Alumni Placed', color: '#00895e' },
              { value: '100+',            label: 'Companies',      color: '#7D94F9' },
              { value: '14 LPA',          label: 'Avg CTC',        color: '#FF9843' },
              { value: '92%',             label: 'Placement Rate', color: '#61DAFB' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-theme rounded-xl px-4 py-2.5 text-center min-w-[80px]">
                <div className="text-lg font-extrabold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-faint uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Role distribution */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-card border border-theme rounded-2xl p-6 mb-10">
          <p className="text-xs font-bold text-faint uppercase tracking-widest mb-5">Alumni Role Distribution</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: r.color + '18', color: r.color }}>
                  <Icon icon={r.icon} className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-secondary truncate">{r.text}</p>
                    <span className="text-xs font-extrabold ml-2 shrink-0" style={{ color: r.color }}>{r.count}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: r.count }}
                      viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full" style={{ background: r.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Continuous marquee ── */}
        <div className="mb-10 overflow-hidden marquee group">
          <div className="marquee-track">
            {[...companies, ...companies].map((company, i) => (
              <div key={i} className="shrink-0 w-[320px]">
                <CompanyCard company={company} index={0} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-gfg-green/10 to-transparent border border-gfg-green/20 rounded-2xl px-6 py-5">
          <div className="flex items-center gap-3">
            <Icon icon={['fas', 'briefcase']} className="text-gfg-lime text-lg" />
            <div>
              <p className="font-bold text-primary text-sm">Placement support until you're hired</p>
              <p className="text-faint text-xs mt-0.5">Resume & LinkedIn optimization · Mock interviews · Referral network</p>
            </div>
          </div>
          <Link href="#enroll"
            className="shrink-0 bg-gfg-green hover:bg-gfg-ocean text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
            Start Your Journey
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Careers;
