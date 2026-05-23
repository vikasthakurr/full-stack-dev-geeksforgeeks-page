"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';

// ── Config — update these when a new batch is announced ──────────────────────
const BATCH_START = new Date('2025-08-04T09:00:00+05:30'); // IST
const BATCH_END   = new Date('2025-11-30T18:00:00+05:30');
const SEATS_TOTAL = 60;
const SEATS_LEFT  = 14;

const batches = [
  {
    label: 'Upcoming',
    tag: 'Filling Fast',
    tagColor: '#FF9843',
    date: 'Aug 4, 2025',
    time: '9:00 AM IST',
    days: 'Mon · Wed · Fri',
    duration: '4 Months',
    mode: 'Live Online',
    seats: SEATS_LEFT,
    seatsTotal: SEATS_TOTAL,
    highlight: true,
  },
  {
    label: 'Next Batch',
    tag: 'Coming Soon',
    tagColor: '#7D94F9',
    date: 'Sep 15, 2025',
    time: '7:00 PM IST',
    days: 'Tue · Thu · Sat',
    duration: '4 Months',
    mode: 'Live Online',
    seats: 60,
    seatsTotal: 60,
    highlight: false,
  },
];

// ── Countdown ─────────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-surface border border-theme rounded-xl w-14 h-14 flex items-center justify-center">
        <span className="text-2xl font-extrabold text-primary tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-faint text-[10px] uppercase tracking-wider mt-1">{label}</span>
    </div>
  );
}

// ── Seat bar ──────────────────────────────────────────────────────────────────
function SeatBar({ left, total }: { left: number; total: number }) {
  const pct = Math.round(((total - left) / total) * 100);
  const color = left <= 10 ? '#ef4444' : left <= 20 ? '#FF9843' : '#00895e';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-faint">{total - left} enrolled</span>
        <span className="font-bold" style={{ color }}>{left} seats left</span>
      </div>
      <div className="h-2 bg-raised rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const UpcomingBatch: React.FC = () => {
  const countdown = useCountdown(BATCH_START);

  return (
    <section className="bg-base py-24 border-t border-theme" id="batch">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="text-gfg-green text-xs font-bold uppercase tracking-widest">Limited Seats</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-3 mb-4 tracking-tight">
            Upcoming Batches
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Small cohorts. Live sessions. Real mentorship. Pick your batch before it fills up.
          </p>
        </motion.div>

        {/* Countdown strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gfg-green/10 border border-gfg-green/25 rounded-2xl px-6 py-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-gfg-green uppercase tracking-widest mb-0.5">Next batch starts in</p>
            <p className="text-primary font-bold text-sm">Aug 4, 2025 · 9:00 AM IST</p>
          </div>
          <div className="flex items-center gap-3">
            <CountdownUnit value={countdown.days}    label="Days" />
            <span className="text-2xl font-bold text-muted mb-4">:</span>
            <CountdownUnit value={countdown.hours}   label="Hrs" />
            <span className="text-2xl font-bold text-muted mb-4">:</span>
            <CountdownUnit value={countdown.minutes} label="Min" />
            <span className="text-2xl font-bold text-muted mb-4">:</span>
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
          <Link href="#enroll"
            className="shrink-0 bg-gfg-green hover:bg-gfg-ocean text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-gfg-green/20">
            Reserve My Seat
          </Link>
        </motion.div>

        {/* Batch cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {batches.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border overflow-hidden flex flex-col ${
                b.highlight
                  ? 'border-gfg-green/40 bg-gfg-green/5'
                  : 'border-theme bg-card'
              }`}>

              {b.highlight && (
                <div className="h-1 w-full bg-gradient-to-r from-gfg-green to-gfg-ocean" />
              )}

              <div className="p-6 flex flex-col gap-5 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-muted uppercase tracking-wider">{b.label}</p>
                    <p className="text-xl font-extrabold text-primary mt-0.5">{b.date}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: b.tagColor + '20', color: b.tagColor }}>
                    {b.tag}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: ['fas', 'clock']      as const, label: 'Time',     value: b.time },
                    { icon: ['fas', 'calendar']   as const, label: 'Schedule', value: b.days },
                    { icon: ['fas', 'hourglass-half'] as const, label: 'Duration', value: b.duration },
                    { icon: ['fas', 'video']      as const, label: 'Mode',     value: b.mode },
                  ].map((d, j) => (
                    <div key={j} className="flex items-center gap-2.5 bg-surface border border-theme rounded-xl px-3 py-2.5">
                      <Icon icon={d.icon} className="text-gfg-green text-xs shrink-0" />
                      <div>
                        <p className="text-[10px] text-faint uppercase tracking-wider">{d.label}</p>
                        <p className="text-xs font-bold text-primary">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat bar */}
                <SeatBar left={b.seats} total={b.seatsTotal} />

                {/* CTA */}
                <Link href="#enroll"
                  className={`w-full text-center font-bold py-3 rounded-xl text-sm transition-colors mt-auto ${
                    b.highlight
                      ? 'bg-gfg-green hover:bg-gfg-ocean text-white shadow-md shadow-gfg-green/20'
                      : 'bg-card border border-theme text-primary hover:bg-raised'
                  }`}>
                  {b.highlight ? 'Enroll Now — Seats Filling Fast' : 'Get Notified'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center text-faint text-xs mt-8 flex items-center justify-center gap-2">
          <Icon icon={['fas', 'shield-halved']} className="text-gfg-green" />
          Batch size capped at {SEATS_TOTAL} students for quality mentorship. No exceptions.
        </motion.p>

      </div>
    </section>
  );
};

export default UpcomingBatch;
