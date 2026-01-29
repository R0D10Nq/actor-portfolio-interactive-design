import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Работы', href: '#works' },
  { label: 'Медиа', href: '#media' },
  { label: 'Связь', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed nav button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] w-14 h-14 flex items-center justify-center"
        data-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="relative w-8 h-6">
          <motion.span
            className="absolute left-0 w-full h-[2px] bg-[#f5f0e8]"
            animate={{
              top: isOpen ? '50%' : '0%',
              rotate: isOpen ? 45 : 0,
              translateY: isOpen ? '-50%' : '0%',
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute top-1/2 left-0 w-full h-[2px] bg-[#f5f0e8] -translate-y-1/2"
            animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute left-0 w-full h-[2px] bg-[#f5f0e8]"
            animate={{
              bottom: isOpen ? '50%' : '0%',
              rotate: isOpen ? -45 : 0,
              translateY: isOpen ? '50%' : '0%',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Logo */}
      <motion.a
        href="#"
        className="fixed top-6 left-6 z-[100] font-display text-2xl font-semibold tracking-wider"
        data-hover
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[#c45c3e]">A</span>S
      </motion.a>

      {/* Scroll indicator */}
      <AnimatePresence>
        {scrolled && !isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[90]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <a
              href="#"
              className="w-12 h-12 rounded-full border border-[#f5f0e8]/30 flex items-center justify-center hover:border-[#c45c3e] transition-colors"
              data-hover
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-[#1a1a1a] flex items-center justify-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col items-center gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-5xl md:text-7xl font-medium text-[#f5f0e8] hover:text-[#c45c3e] transition-colors relative group"
                  data-hover
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-[#c45c3e] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm font-sans text-[#c45c3e] opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Menu footer */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-end text-sm text-[#f5f0e8]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#c45c3e] transition-colors" data-hover>Instagram</a>
                <a href="#" className="hover:text-[#c45c3e] transition-colors" data-hover>YouTube</a>
                <a href="#" className="hover:text-[#c45c3e] transition-colors" data-hover>Telegram</a>
              </div>
              <div>
                Москва, Россия
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
