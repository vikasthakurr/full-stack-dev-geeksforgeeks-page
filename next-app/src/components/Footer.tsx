"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type SocialLink = { icon: IconProp; color: string; href: string; label: string };

const Footer: React.FC = () => {
  return (
    <footer className="bg-base border-t border-theme py-10 text-primary">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <motion.img
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
            alt="GeeksforGeeks"
            className="w-8 h-8 object-contain"
          />
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { name: 'Overview', href: '#overview' },
            { name: 'Curriculum', href: '#curriculum' },
            { name: 'Projects', href: '#projects' },
            { name: 'Reviews', href: '#reviews' },
            { name: 'Careers', href: '#careers' },
            { name: 'Enroll', href: '#enroll' },
          ].map((link) => (
            <Link key={link.name} href={link.href} className="text-faint hover:text-primary text-sm transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <p className="text-faint text-sm font-body text-center">
          © 2026 GeeksforGeeks. Built for the future of MERN development.
        </p>

        <div className="flex gap-5 text-faint">
          {([
            { icon: ['fab', 'linkedin'],  color: 'hover:text-blue-400',  href: 'https://www.linkedin.com/company/geeksforgeeks',  label: 'LinkedIn' },
            { icon: ['fab', 'youtube'],   color: 'hover:text-red-500',   href: 'https://www.youtube.com/geeksforgeeksvideos',     label: 'YouTube' },
            { icon: ['fab', 'instagram'], color: 'hover:text-pink-500',  href: 'https://www.instagram.com/geeks_for_geeks',       label: 'Instagram' },
            { icon: ['fab', 'x-twitter'],color: 'hover:text-primary',   href: 'https://twitter.com/geeksforgeeks',               label: 'X (Twitter)' },
          ] as SocialLink[]).map((social, index) => (
            <motion.a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
              whileHover={{ y: -3, scale: 1.2 }} className={`${social.color} transition-colors`}>
              <Icon icon={social.icon} className="text-xl" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
