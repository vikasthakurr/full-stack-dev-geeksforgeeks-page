"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type Mentor = {
  name: string;
  role: string;
  image: string;
  accentColor: string;
  github: string;
  linkedin: string;
  badge1: { icon: IconProp; label: string; sub: string };
  badge2: { icon: IconProp; label: string; sub: string };
  stats: { value: string; label: string }[];
  highlights: { icon: IconProp; label: string; text: string }[];
};

const mentors: Mentor[] = [
  {
    name: 'Vikas Thakur',
    role: 'Software Engineer & Lead Mentor',
    image: '/assets/vikas.jpeg',
    accentColor: '#00895e',
    github: '#',
    linkedin: '#',
    badge1: { icon: ['fab', 'linkedin-in'], label: '3x Top Voice', sub: 'Web Development' },
    badge2: { icon: ['fas', 'cloud'],       label: 'Google Cloud', sub: 'Jury Member' },
    stats: [
      { value: '12,000+', label: 'Students Trained' },
      { value: '26+',     label: 'Batches' },
      { value: '430+',    label: 'Seminars' },
      { value: '38+',     label: 'Hackathons Judged' },
    ],
    highlights: [
      { icon: ['fas', 'code'],   label: 'Full Stack Engineer',    text: '4+ years building scalable, high-performance web applications using robust backend architectures and modern frontend frameworks.' },
      { icon: ['fas', 'robot'],  label: 'AI & Emerging Tech',     text: 'Conducts sessions on Generative AI, RAG systems, and practical AI integration in modern full-stack applications.' },
      { icon: ['fas', 'users'],  label: 'Mentorship & Training',  text: 'Trained 12,000+ students across 26+ batches and 430+ seminars. Alumni placed at Tata 1mg, Salesforce, Wipro, and Celebal Technologies.' },
      { icon: ['fas', 'trophy'], label: 'Industry Leadership',    text: 'Google Cloud Jury Member. Judged 38+ national and college hackathons, evaluating innovative projects and mentoring aspiring developers.' },
    ],
  },
  {
    name: 'Pratyush Mishra',
    role: 'Member of Technical Staff (Web) — GeeksforGeeks',
    image: '/assets/pratyush.jpeg',
    accentColor: '#7D94F9',
    github: '#',
    linkedin: '#',
    badge1: { icon: ['fas', 'flask'],      label: 'Published Researcher', sub: 'Tech & Engineering' },
    badge2: { icon: ['fas', 'gavel'],      label: '27+ Hackathons',       sub: 'Jury Member' },
    stats: [
      { value: '2,300+', label: 'Students Trained' },
      { value: '27+',    label: 'Hackathons Judged' },
      { value: 'MTS',    label: 'Role at GFG' },
      { value: '1',      label: 'Research Publication' },
    ],
    highlights: [
      { icon: ['fas', 'layer-group'], label: 'MERN Stack Developer',      text: 'Hands-on experience building scalable full-stack applications using MongoDB, Express.js, React.js, and Node.js at GeeksforGeeks.' },
      { icon: ['fas', 'plug'],        label: 'API & Auth Specialist',      text: 'Proficient in designing RESTful APIs, implementing secure authentication systems, and optimizing application performance.' },
      { icon: ['fas', 'users'],       label: 'Training & Placement Prep',  text: 'Trained 2,300+ students through college programs focused on placement preparation and building industry-ready technical skills.' },
      { icon: ['fas', 'flask'],       label: 'Research & Community',       text: 'Published researcher and hackathon jury member across 27+ events — evaluating innovative projects and guiding aspiring developers.' },
    ],
  },
];

function MentorCard({ mentor, index }: { mentor: Mentor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-card border border-theme rounded-3xl overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${mentor.accentColor}, transparent)` }} />

      <div className="p-7 flex flex-col gap-7">

        {/* Profile row */}
        <div className="flex gap-5 items-start">
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2"
              style={{ borderColor: mentor.accentColor + '40' }}>
              <img src={mentor.image} alt={mentor.name}
                className="w-full h-full object-cover transition-all duration-500"
                style={{ objectPosition: 'top' }} />
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center"
              style={{ background: mentor.accentColor }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
          </div>

          {/* Name + badges */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-extrabold text-primary leading-tight">{mentor.name}</h3>
            <p className="text-sm mt-0.5 mb-3 leading-snug" style={{ color: mentor.accentColor }}>{mentor.role}</p>
            <div className="flex flex-wrap gap-2">
              {[mentor.badge1, mentor.badge2].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border"
                  style={{ background: mentor.accentColor + '12', borderColor: mentor.accentColor + '30', color: mentor.accentColor }}>
                  <Icon icon={b.icon} className="text-xs" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            {/* Social links */}
            <div className="flex gap-2 mt-3">
              <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:scale-105"
                style={{ background: '#0A66C218', borderColor: '#0A66C230', color: '#0A66C2' }}>
                <Icon icon={['fab', 'linkedin-in']} className="text-xs" />
                LinkedIn
              </a>
              <a href={mentor.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:scale-105"
                style={{ background: mentor.accentColor + '12', borderColor: mentor.accentColor + '30', color: mentor.accentColor }}>
                <Icon icon={['fab', 'github']} className="text-xs" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {mentor.stats.map((s, i) => (
            <div key={i} className="bg-card border border-theme rounded-xl p-3 text-center">
              <div className="text-lg font-extrabold" style={{ color: mentor.accentColor }}>{s.value}</div>
              <div className="text-[10px] text-faint mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights — compact bio paragraph */}
        <p className="text-faint text-sm leading-relaxed">
          {mentor.highlights.map(h => h.text).join(' ')}
        </p>

      </div>
    </motion.div>
  );
}

const Instructor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <section className="bg-surface text-primary py-24 border-t border-theme" id="instructor">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Your Mentors</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">Meet the Instructors</h2>
            <p className="text-muted mt-3 max-w-xl">
              Industry engineers who build, ship, and teach — not just educators. Between them, 14,000+ students trained and 65+ hackathons judged.
            </p>
          </div>
          {/* Combined stat pills */}
          <div className="flex gap-3 shrink-0 flex-wrap">
            {[
              { value: '14,000+', label: 'Students', color: '#00895e' },
              { value: '65+',     label: 'Hackathons', color: '#7D94F9' },
              { value: '92%',     label: 'Placement', color: '#00895e' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-theme rounded-xl px-4 py-2.5 text-center min-w-[80px]">
                <div className="text-lg font-extrabold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-faint uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two mentor cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {mentors.map((mentor, i) => (
            <MentorCard key={i} mentor={mentor} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Instructor;
