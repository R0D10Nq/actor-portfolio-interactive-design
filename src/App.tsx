import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorksSection } from './components/WorksSection';
import { MediaSection } from './components/MediaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Прелоадер
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#1a1a1a] flex flex-col items-center justify-center"
      exit={{ 
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="font-display text-6xl md:text-8xl font-semibold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#c45c3e]">A</span>S
      </motion.div>

      <div className="w-48 h-[1px] bg-[#f5f0e8]/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#c45c3e]"
          initial={{ width: '0%' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.span
        className="mt-4 text-xs text-[#f5f0e8]/30 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Math.min(Math.round(progress), 100)}%
      </motion.span>
    </motion.div>
  );
}

// Кинематографические "шторки" между секциями
function CinematicDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c45c3e]/20 to-transparent" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border border-[#c45c3e]/30" />
    </div>
  );
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Кастомный курсор */}
      {isMounted && <CustomCursor />}

      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Прелоадер */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Основной контент */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
            
            <main>
              <HeroSection />
              <CinematicDivider />
              <AboutSection />
              <CinematicDivider />
              <WorksSection />
              <CinematicDivider />
              <MediaSection />
              <CinematicDivider />
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Боковые декоративные линии */}
      {!isLoading && (
        <>
          <div className="fixed left-4 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#f5f0e8]/10 to-transparent pointer-events-none hidden lg:block" />
          <div className="fixed right-4 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#f5f0e8]/10 to-transparent pointer-events-none hidden lg:block" />
        </>
      )}
    </>
  );
}
