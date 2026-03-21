import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import {
  Send, MapPin, Phone, Mail, Loader2, Clock, CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    main: '123 Agro Business Hub, Connaught Place, New Delhi — 110001',
    sub: 'Open Monday–Saturday, 9 AM to 6 PM',
    action: { label: 'Get Directions', href: 'https://maps.google.com/?q=Connaught+Place+New+Delhi' },
  },
  {
    icon: Phone,
    title: 'Call Us',
    main: '+91 98765 43210',
    sub: 'Toll-free: 1800-XXX-XXXX · Mon–Sat 9AM–7PM',
    action: { label: 'Call Now', href: 'tel:+919876543210' },
  },
  {
    icon: Mail,
    title: 'Email Us',
    main: 'info@agroshield.in',
    sub: 'support@agroshield.in · We reply within 24 hours',
    action: { label: 'Send Email', href: 'mailto:info@agroshield.in' },
  },
];

const interestOptions = [
  'General Inquiry', 'Insecticides', 'Herbicides',
  'Fungicides', 'Fertilizers', 'Bulk Order', 'Other',
];

const initialForm = {
  name: '', email: '', phone: '', subject: '', interest: '', message: '',
};

function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.info-card', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.18,
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
        },
      });
    }, contactInfoRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent! We'll reply within 24 hours.");
      setFormData(initialForm);
      setErrors({});
    }, 1500);
  };

  return (
    <main role="main">
      {/* ═══════ HERO ═══════ */}
      <section className="bg-green-gradient min-h-[220px] flex items-center pt-16">
        <div className="container-custom py-8">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs text-white/50 mb-2">
              <Link to="/" className="hover:text-white/70">Home</Link> &gt; Contact
            </p>
            <h1 className="text-white font-serif text-3xl md:text-4xl font-bold">Get In Touch</h1>
            <div className="mt-3">
              <Badge variant="solid" size="lg">We reply within 24 hours</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <section className="section-padding">
        <div ref={contactInfoRef} className="container-custom grid md:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left — Info Cards */}
          <div className="contact-info">
            {infoCards.map((card) => (
              <motion.div
                key={card.title}
                className="info-card glassmorphism rounded-2xl p-6 flex items-start gap-4 mb-4"
                whileHover={shouldReduceMotion ? {} : { x: 4, boxShadow: 'var(--shadow-md)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center shrink-0">
                  <card.icon className="size-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-1">{card.title}</p>
                  <p className="font-serif text-lg font-semibold">{card.main}</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{card.sub}</p>
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-xs text-[var(--primary)] underline-offset-2 hover:underline mt-1 inline-block font-medium"
                  >
                    {card.action.label} →
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Business Hours */}
            <div className="bg-[var(--accent)] rounded-xl p-5 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="size-4 text-[var(--primary)]" />
                <h4 className="font-semibold text-sm">Business Hours</h4>
              </div>
              <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="font-medium text-[var(--foreground)]">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-[var(--foreground)]">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[var(--destructive)]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-[var(--shadow-sm)]"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-bold mb-1">Send us a message</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Fill out the form below and we'll get back to you promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  aria-required="true"
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  aria-required="true"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Interest Dropdown */}
              <div className="relative group w-full">
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className={cn(
                    'w-full h-14 px-4 pt-5 pb-2 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-[var(--radius)] text-sm font-medium font-sans outline-none ring-0 transition-all duration-200 ease-out focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 appearance-none cursor-pointer',
                    !formData.interest && 'text-[var(--muted-foreground)]'
                  )}
                  aria-label="Product Interest"
                >
                  <option value="" disabled>Product Interest</option>
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <Textarea
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                aria-required="true"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-5" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ═══════ MAP SECTION ═══════ */}
      <section className="container-custom pb-16">
        <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] bg-[var(--accent)] flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="size-8 text-[var(--primary)]" />
            </div>
            <h4 className="font-serif text-xl font-semibold">AgroShield Headquarters</h4>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Connaught Place, New Delhi, India</p>
            <a
              href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
              <Button variant="outline" size="md">
                <MapPin className="size-4" /> Get Directions
              </Button>
            </a>
          </div>
          {/* Decorative grid */}
          <div className="absolute inset-0 grid-background opacity-60 pointer-events-none" />
        </div>
      </section>
    </main>
  );
}

export { Contact };
export default Contact;
