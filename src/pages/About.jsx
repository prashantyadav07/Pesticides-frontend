import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target, Lightbulb, Heart, Handshake, Leaf, Linkedin,
  Calendar, Award, Globe, Users, FlaskConical, Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, staggerContainerVariants, fadeUpVariants } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Heart, title: 'Integrity', desc: 'Honest practices, transparent pricing, and genuine care for every farmer we serve.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuous R&D investment to develop next-generation crop protection technologies.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Eco-friendly formulations that protect crops without harming the environment.' },
  { icon: Handshake, title: 'Partnership', desc: 'Building long-term relationships with farmers, dealers, and agricultural communities.' },
];

const milestones = [
  { year: '2009', title: 'Founded', desc: 'Started in a small lab in Delhi with 3 passionate agricultural scientists and a vision to empower Indian farmers.' },
  { year: '2012', title: 'First 100 Products', desc: 'Expanded our product line to serve diverse crop protection needs across cereals, pulses, and vegetables.' },
  { year: '2015', title: 'ISO Certification', desc: 'Achieved ISO 9001:2015 certification, establishing rigorous quality management across all operations.' },
  { year: '2018', title: 'Pan-India Reach', desc: 'Established distribution network spanning 28 states with temperature-controlled logistics.' },
  { year: '2020', title: 'Digital Launch', desc: 'Launched our online platform enabling farmers to access products, expertise, and support directly.' },
  { year: '2024', title: '10,000 Farmers', desc: 'Crossed the milestone of 10,000 active farmers trusting AgroShield for their crop protection needs.' },
];

const team = [
  { name: 'Dr. Vikram Sharma', role: 'Founder & CEO', initials: 'VS' },
  { name: 'Priya Agarwal', role: 'Head of R&D', initials: 'PA' },
  { name: 'Rajesh Mehta', role: 'VP Operations', initials: 'RM' },
  { name: 'Dr. Sunita Rao', role: 'Chief Scientist', initials: 'SR' },
];

const certifications = [
  'ISO 9001:2015', 'ISO 14001:2015', 'CIB Registered',
  'GMP Certified', 'NABL Accredited', 'BIS Certified',
];

function About() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
        gsap.from(entry, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 0.8,
          scrollTrigger: {
            trigger: entry,
            start: 'top 78%',
          },
        });
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <main role="main">
      {/* ═══════ HERO ═══════ */}
      <section className="min-h-[60vh] flex items-center pt-16 bg-green-gradient relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="0" y1={`${20 + i * 6}%`}
                x2="100%" y2={`${25 + i * 5}%`}
                stroke="white" strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="container-custom text-center relative z-10 py-16">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-sm font-medium border border-white/10">
              <Calendar className="size-4" /> Est. 2009
            </span>
          </motion.div>
          <motion.h1
            className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-6"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Growing Together Since 2009
          </motion.h1>
          <motion.p
            className="text-white/70 text-lg md:text-xl mt-4 max-w-lg mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            India&apos;s most trusted crop protection partner
          </motion.p>
        </div>
      </section>

      {/* ═══════ MISSION + VISION ═══════ */}
      <section className="section-padding">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-green-gradient text-white rounded-3xl p-8 md:p-10 relative overflow-hidden"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-serif text-8xl text-white/10 absolute top-4 right-6 leading-none">&ldquo;</span>
            <Target className="size-10 text-white/40 mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To empower every Indian farmer with affordable, effective, and sustainable crop protection solutions that increase yields, improve livelihoods, and contribute to food security across the nation.
            </p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10">
              <Leaf className="w-full h-full" />
            </div>
          </motion.div>

          <motion.div
            className="bg-teal-gradient text-white rounded-3xl p-8 md:p-10 relative overflow-hidden"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-serif text-8xl text-white/10 absolute top-4 right-6 leading-none">&ldquo;</span>
            <Lightbulb className="size-10 text-white/40 mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-white/80 leading-relaxed">
              A hunger-free, prosperous India where technology and nature work in harmony — where every farmer has access to world-class crop protection and every harvest fulfills its maximum potential.
            </p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10">
              <Globe className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ VALUES ═══════ */}
      <ValuesSection shouldReduceMotion={shouldReduceMotion} />

      {/* ═══════ TIMELINE ═══════ */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">Our Journey</h2>
          </div>

          <div ref={timelineRef} className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] -translate-x-1/2 hidden md:block" />
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] md:hidden" />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={cn(
                  'timeline-entry relative flex items-start gap-8 mb-12',
                  'md:flex-row',
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Content */}
                <div className={cn('flex-1 pl-12 md:pl-0', i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12')}>
                  <div className={cn('glassmorphism rounded-2xl p-6 inline-block text-left')}>
                    <span className="inline-block bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                      {m.year}
                    </span>
                    <h4 className="font-serif font-semibold text-lg">{m.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--background-alt)] -translate-x-1/2 z-10" />

                {/* Spacer for other side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TEAM ═══════ */}
      <TeamSection shouldReduceMotion={shouldReduceMotion} />

      {/* ═══════ CERTIFICATIONS ═══════ */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary">Quality Assurance</Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">Our Certifications</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                className="flex items-center gap-3 px-6 py-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 group"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <Award className="size-5 text-[var(--primary)] grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="font-semibold text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function ValuesSection({ shouldReduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="secondary">What We Stand For</Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">Our Core Values</h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] transition-all duration-350"
              variants={fadeUpVariants}
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
                <v.icon className="size-7 text-[var(--primary)]" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection({ shouldReduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="secondary">Leadership</Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4">Meet Our Team</h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {team.map((person) => (
            <motion.div
              key={person.name}
              className="text-center group cursor-default"
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <div className="w-24 h-24 rounded-full bg-[var(--accent)] border-4 border-[var(--primary)]/20 flex items-center justify-center mx-auto relative">
                <span className="font-serif text-3xl text-[var(--primary)] font-bold">{person.initials}</span>
                <motion.a
                  href="#"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  whileHover={{ scale: 1.1 }}
                  aria-label={`${person.name} LinkedIn`}
                >
                  <Linkedin className="size-4" />
                </motion.a>
              </div>
              <h4 className="font-serif font-semibold mt-4">{person.name}</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{person.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { About };
export default About;
