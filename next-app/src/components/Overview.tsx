"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const placements = [
  { name: 'Sohini Gujjaru', title: 'Software Engineer I', company: 'F5 Networks', ctc: '20 LPA' },
  { name: 'Nikhil Raman', title: 'Senior Consultant', company: 'Infogain', ctc: '19 LPA' },
  { name: 'Yash Saxena', title: 'SDE Trainee', company: 'SIGMOID', ctc: '16 LPA' },
  { name: 'Anurag K.', title: 'SDE 1', company: 'Gameberry Labs', ctc: '15.3 LPA' },
  { name: 'Abhishek Pathode', title: 'Sr. Engineer', company: 'Synopsys', ctc: '15 LPA' },
  { name: 'Atul Kumar', title: 'Project Coordinator', company: 'Livspace', ctc: '15 LPA' },
  { name: 'Rohith Daruri', title: 'Software Engineer 1', company: 'Smarsh', ctc: '14.3 LPA' },
  { name: 'Ravi Raj', title: 'SE Specialist', company: 'GE', ctc: '14.3 LPA' },
  { name: 'Sourav Mazumdar', title: 'Software Engineer 1', company: 'Smarsh', ctc: '14 LPA' },
];

// ── Tab data ──────────────────────────────────────────────────────────────────

const skillItems = [
  'HTML & Semantic Web', 'CSS & Responsive Design', 'JavaScript (ES6+)',
  'TypeScript', 'React & Redux', 'Node.js & Express',
  'MongoDB & Aggregation', 'REST API Design', 'System Design & Deployment',
  'Git & Version Control',
];

type TechItem = { label: string; bg: string; border: string; iconColor: string } & (
  | { icon: IconProp; avatar?: never }
  | { avatar: string; icon?: never }
);

const techSkills: TechItem[] = [
  { label: 'HTML',        bg: '#FFF7ED', border: '#9A3412', icon: ['fab', 'html5'],       iconColor: '#ea580c' },
  { label: 'CSS',         bg: '#F0F9FF', border: '#075985', icon: ['fab', 'css3-alt'],    iconColor: '#0284c7' },
  { label: 'Node.js',     bg: '#F0FDF4', border: '#166534', icon: ['fab', 'node-js'],     iconColor: '#16a34a' },
  { label: 'MongoDB',     bg: '#F0FDF4', border: '#059669', icon: ['fas', 'leaf'],        iconColor: '#059669' },
  { label: 'Express.js',  bg: '#F4F4F5', border: '#374151', icon: ['fas', 'bolt'],        iconColor: '#374151' },
  { label: 'JavaScript',  bg: '#FEFCE8', border: '#A16207', icon: ['fab', 'js'],          iconColor: '#ca8a04' },
  { label: 'Git',         bg: '#FEF2F2', border: '#991B1B', icon: ['fas', 'code-branch'], iconColor: '#dc2626' },
  { label: 'TypeScript',  bg: '#EFF6FF', border: '#1C4D8E', icon: ['fas', 't'],           iconColor: '#1d4ed8' },
];

const toolItems: TechItem[] = [
  { label: 'VS Code',      bg: '#EFF6FF', border: '#1C4D8E', icon: ['fas', 'code'],        iconColor: '#1d4ed8' },
  { label: 'GitHub',       bg: '#F5F3FF', border: '#5B21B6', icon: ['fas', 'code-branch'], iconColor: '#7c3aed' },
  { label: 'Docker',       bg: '#EFF6FF', border: '#1C4D8E', icon: ['fab', 'docker'],      iconColor: '#2563eb' },
  { label: 'AWS',          bg: '#F0F9FF', border: '#075985', icon: ['fas', 'cloud'],        iconColor: '#0284c7' },
  { label: 'Postman',      bg: '#FFF4EE', border: '#C74E1A', avatar: 'PM',                 iconColor: '#FF6C37' },
  { label: 'Cursor',       bg: '#F0F0FF', border: '#4B4BFF', avatar: 'Cu',                 iconColor: '#4B4BFF' },
  { label: 'Kiro',         bg: '#F0FDF4', border: '#00895e', avatar: 'Ki',                 iconColor: '#00895e' },
  { label: 'Vercel',       bg: '#F9F9F9', border: '#374151', avatar: '▲',                  iconColor: '#111827' },
  { label: 'Render',       bg: '#F0FDF4', border: '#059669', avatar: 'Re',                 iconColor: '#059669' },
  { label: 'Terminal',     bg: '#0d1117', border: '#374151', icon: ['fas', 'gears'],        iconColor: '#9ca3af' },
];

const projectItems = [
  { title: 'Travel Website UI',         tags: ['HTML', 'CSS', 'Tailwind'],          desc: 'Fully responsive multi-section landing page with animations and accessibility.' },
  { title: 'Async Data Dashboard',      tags: ['JavaScript', 'Fetch', 'Charts'],    desc: 'Real-time dashboard with debounced search and performant rendering.' },
  { title: 'E-Commerce React App',      tags: ['React', 'Redux', 'TypeScript'],     desc: 'Fully typed React frontend with state management and product flows.' },
  { title: 'RESTful API with Auth',     tags: ['Express', 'JWT', 'MongoDB'],        desc: 'Complete Express API with JWT auth, validation, and file uploads.' },
  { title: 'Capstone: Full-Stack App',  tags: ['React', 'Node', 'Docker'],          desc: 'Production-ready app deployed with CI/CD and monitoring.' },
];

const careerRoles = [
  { label: 'Full Stack Developer',  color: '#00895e', bg: '#1a2e1a', icon: ['fas', 'layer-group'] as IconProp },
  { label: 'Frontend Engineer',     color: '#61DAFB', bg: '#0e1e2a', icon: ['fab', 'react']       as IconProp },
  { label: 'Backend Developer',     color: '#68A063', bg: '#0e1e14', icon: ['fab', 'node-js']     as IconProp },
  { label: 'Software Engineer',     color: '#7D94F9', bg: '#131828', icon: ['fas', 'code']        as IconProp },
  { label: 'Mobile App Developer',  color: '#FF9843', bg: '#1e1408', icon: ['fas', 'mobile-screen-button'] as IconProp },
];

// ── Sub-panels ────────────────────────────────────────────────────────────────

function TechGrid({ items }: { items: TechItem[] }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((t, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border font-bold"
            style={{ backgroundColor: t.bg, borderColor: t.border, color: t.iconColor }}
          >
            {t.avatar ? (
              <span className="text-sm font-extrabold tracking-tight">{t.avatar}</span>
            ) : (
              <Icon icon={t.icon!} />
            )}
          </div>
          <p className="text-xs text-muted font-medium text-center">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {skillItems.map((s, i) => (
        <div key={i} className="flex items-center gap-3 bg-card border border-theme rounded-xl px-4 py-3">
          <Icon icon={['fas', 'check']} className="text-gfg-green text-xs shrink-0" />
          <span className="text-secondary text-sm">{s}</span>
        </div>
      ))}
    </div>
  );
}

function ToolsPanel() {
  return <TechGrid items={toolItems} />;
}

function ProjectsPanel() {
  const [active, setActive] = useState(0);
  const p = projectItems[active];
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card border border-theme rounded-2xl overflow-hidden">
        <div className="h-36 bg-gradient-to-br from-gfg-green/10 to-gfg-blue/5 flex items-center justify-center">
          <Icon icon={['fas', 'layer-group']} className="text-5xl text-gfg-green/40" />
        </div>
        <div className="p-5">
          <h4 className="font-bold text-primary mb-1">{p.title}</h4>
          <p className="text-muted text-sm mb-3">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-card border border-theme text-secondary">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {projectItems.map((proj, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${i === active ? 'bg-gfg-green text-white' : 'bg-card text-muted hover:text-primary'}`}>
            {proj.title.replace('Capstone: ', '')}
          </button>
        ))}
      </div>
    </div>
  );
}

function CareersPanel() {
  return (
    <div className="flex flex-col gap-3">
      {careerRoles.map((r, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-3.5 border border-theme"
          style={{ backgroundColor: r.bg }}>
          <Icon icon={r.icon} className="text-xl shrink-0" style={{ color: r.color }} />
          <span className="font-bold text-white text-sm">{r.label}</span>
          <Icon icon={['fas', 'arrow-right']} className="ml-auto text-xs" style={{ color: r.color }} />
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const tabs = [
  { label: 'Skills',   panel: <SkillsPanel /> },
  { label: 'Tools',    panel: <ToolsPanel /> },
  { label: 'Projects', panel: <ProjectsPanel /> },
  { label: 'Careers',  panel: <CareersPanel /> },
];

const Overview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-base text-primary py-24" id="overview">
      <div className="max-w-7xl mx-auto px-6">

        {/* Course Overview block */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-card border border-theme rounded-3xl overflow-hidden mb-16">
          <div className="grid lg:grid-cols-[1fr_480px]">

            {/* Left */}
            <div className="p-8 lg:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-theme">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                  <span className="text-[#2f80ed]">Online Full Stack Developer </span>
                  <span className="text-primary">Course Overview</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed mt-3 max-w-lg">
                  Live online classes, recorded access, MERN, DSA, and GenAI workflows — built for job readiness from day one.
                </p>
              </div>

              {/* Tab nav */}
              <div className="flex gap-2 flex-wrap">
                {tabs.map((t, i) => (
                  <button key={i} onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                      activeTab === i
                        ? 'bg-gfg-green text-white'
                        : 'bg-card text-muted hover:bg-raised hover:text-primary'
                    }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      activeTab === i ? 'bg-white/20 text-white' : 'bg-card text-faint'
                    }`}>{i + 1}</span>
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                title="Brochure coming soon"
                onClick={(e) => e.preventDefault()}
                className="self-start inline-flex items-center gap-2 border border-white/20 text-muted font-semibold py-2 px-5 rounded-lg text-sm cursor-not-allowed opacity-50"
              >
                <Icon icon={['fas', 'download']} /> Download Brochure
              </button>
            </div>

            {/* Right — animated panel */}
            <div className="p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}>
                  {tabs[activeTab].panel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* IBM Certification */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-[#0f1b2d] to-[#0a0e0f] border border-[#1a3a5c] rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-0">

            {/* Left */}
            <div className="flex-1 p-8 lg:p-10">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0f62fe] mb-1">Exclusive Add-On</p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">IBM Certification Exams</h3>
                <p className="text-gray-400 text-sm mt-2">Add More Value To Your Course</p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: 'IBM-Certified Exams',  desc: 'Put your skills to the test with exclusive IBM exams.' },
                  { title: 'Global Recognition',   desc: 'Gain recognition from top employers worldwide.' },
                  { title: 'Boost Your Career',    desc: 'A certification that sets you apart from the competition.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0f62fe]/20 border border-[#0f62fe]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon icon={['fas', 'check']} className="text-[9px] text-[#0f62fe]" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — certificate image */}
            <div className="lg:w-[420px] shrink-0 p-6 lg:p-8 flex items-center justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[#1a3a5c]">
                <img
                  src="https://media.geeksforgeeks.org/img-practice/prod/batches/78574/Web/Header/Generative%20AI%20Skills%20for%20Software%20Developers_1768892474.png"
                  alt="IBM Certificate"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Alumni placements marquee */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Icon icon={['fas', 'trophy']} className="text-gfg-lime text-base" /> Alumni Placements
          </h3>
          <div className="relative overflow-hidden marquee">
            <div className="marquee-track flex items-stretch gap-4">
              {placements.concat(placements).map((p, idx) => (
                <div key={`${p.name}-${idx}`} className="min-w-[240px] bg-card border border-theme p-4 rounded-xl flex items-center gap-4 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gfg-green/20 text-gfg-lime flex items-center justify-center font-bold text-sm shrink-0">
                    {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-primary truncate">{p.name}</p>
                    <p className="text-xs text-faint truncate">{p.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-extrabold text-gfg-lime text-sm">{p.ctc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA banners */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative bg-gradient-to-br from-[#0e201b] to-[#0a0e0f] border border-gfg-lime/20 rounded-2xl p-7 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gfg-lime/10 rounded-full blur-2xl pointer-events-none" />
            <span className="inline-block bg-gfg-lime/20 text-gfg-lime text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Limited Time Offer</span>
            <h3 className="text-xl font-bold text-white mb-1">Become AI Ready with GfG!</h3>
            <p className="text-gray-400 text-sm mb-5">Get AI Toolkit worth <span className="text-gfg-lime font-bold">INR 5,999</span> and GfG Connect Vouchers by Enrolling Today.</p>
            <Link href="#enroll" className="inline-block bg-gfg-lime text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
              Enroll Now
            </Link>
          </div>

          <div className="relative bg-gradient-to-br from-gfg-green/20 to-[#0a0e0f] border border-gfg-green/30 rounded-2xl p-7 overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gfg-green/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-1">Ready to start your career?</h3>
            <p className="text-gray-400 text-sm mb-5">Join 450k+ learners and get placement support, projects, and mentorship.</p>
            <div className="flex gap-3">
              <Link href="#enroll" className="inline-block bg-gfg-green hover:bg-gfg-ocean text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Enroll Now
              </Link>
              <Link href="#reviews" className="inline-block border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Read Reviews
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Overview;
