import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

// Lazy load everything below the fold
const Overview     = dynamic(() => import('@/components/Overview'));
const WhyChoose    = dynamic(() => import('@/components/WhyChoose'));
const Skills       = dynamic(() => import('@/components/Skills'));
const Curriculum   = dynamic(() => import('@/components/Curriculum'));
const Instructor   = dynamic(() => import('@/components/Instructor'));
const Reviews      = dynamic(() => import('@/components/Reviews'));
const UpcomingBatch = dynamic(() => import('@/components/UpcomingBatch'));
const Enroll       = dynamic(() => import('@/components/Enroll'));

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <WhyChoose />
      <Skills />
      <Curriculum />
      <Instructor />
      <Reviews />
      <UpcomingBatch />
      <Enroll />
    </>
  );
}
