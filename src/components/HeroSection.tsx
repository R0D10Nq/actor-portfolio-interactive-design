import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const firstName = "АНДРЕЙ";
  const lastName = "СОКОЛОВ";

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a] z-10" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(ellipse at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, #c45c3e 0%, transparent 50%)`,
            transition: 'background-image 0.3s ease-out'
          }}
        />
        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-20" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4"
        style={{ opacity }}
      >
        {/* Tagline */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="w-12 h-[1px] bg-[#c45c3e]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#f5f0e8]/60 whitespace-nowrap">
            Актёр театра и&nbsp;кино
          </span>
          <span className="w-12 h-[1px] bg-[#c45c3e]" />
        </motion.div>

        {/* Name with staggered animation - каждое слово как отдельный неразрывный блок */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-wider mb-8 overflow-hidden">
          <span className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8">
            {/* Имя - неразрывный блок */}
            <span className="whitespace-nowrap flex">
              {firstName.split("").map((letter, i) => (
                <motion.span
                  key={`first-${i}`}
                  className="inline-block"
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.05,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    transform: `translate(${mousePosition.x * 0.02 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            {/* Фамилия - неразрывный блок */}
            <span className="whitespace-nowrap flex">
              {lastName.split("").map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  className="inline-block"
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + (firstName.length + 1 + i) * 0.05,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    transform: `translate(${mousePosition.x * 0.02 * (i % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.02 * (i % 2 === 0 ? 1 : -1)}px)`
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-[#f5f0e8]/70 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Создаю персонажей, которые остаются в памяти
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <a
            href="#works"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#f5f0e8]/20 hover:border-[#c45c3e] transition-all duration-500 relative overflow-hidden"
            data-hover
          >
            <span className="relative z-10 text-sm tracking-widest uppercase">Смотреть работы</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-[#c45c3e] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-gradient-to-b from-[#c45c3e] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Frame corners */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l border-t border-[#f5f0e8]/20" />
      <div className="absolute top-24 right-8 w-16 h-16 border-r border-t border-[#f5f0e8]/20" />
      <div className="absolute bottom-24 left-8 w-16 h-16 border-l border-b border-[#f5f0e8]/20" />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r border-b border-[#f5f0e8]/20" />
    </section>
  );
}