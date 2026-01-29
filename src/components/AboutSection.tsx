import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const stats = [
  { value: '24', label: 'года' },
  { value: '15+', label: 'ролей' },
  { value: '7', label: 'лет на сцене' },
];

const organizations = [
  'Союз Театральных Деятелей',
  'Гильдия Актёров Кино',
  'Московская Школа Нового Кино',
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background number */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20rem] md:text-[35rem] font-bold text-[#f5f0e8]/[0.02] leading-none pointer-events-none select-none"
        style={{ x: textX }}
      >
        О
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
            style={{ y: imageY }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c45c3e]/20 to-transparent z-10" />
            <div className="absolute inset-0 border border-[#f5f0e8]/10" />

            {/* Placeholder photo frame */}
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-dashed border-[#f5f0e8]/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#f5f0e8]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs text-[#f5f0e8]/30 uppercase tracking-widest">Фото</p>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c45c3e]/30 -z-10" />
            <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-[#c45c3e]" />
          </motion.div>

          {/* Text content */}
          <div ref={textRef} className="relative">
            <motion.span
              className="text-xs tracking-[0.3em] uppercase text-[#c45c3e] mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Обо мне
            </motion.span>

            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="whitespace-nowrap">Жизнь на&nbsp;сцене&nbsp;—</span>{' '}
              <span className="text-[#c45c3e] whitespace-nowrap">это моя история</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-[#f5f0e8]/70 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                С детства я знал, что моё место — перед камерой и на сцене. Каждая роль —
                это возможность про��ить чужую жизнь и рассказать историю, которая найдёт
                отклик в сердцах зрителей.
              </p>
              <p>
                За плечами — обучение в ведущих театральных школах Москвы, участие в
                независимых кинопроектах и работа в репертуарных театрах. Сейчас активно
                снимаюсь в сериалах и полнометражных фильмах.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 md:gap-12 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-4xl md:text-5xl font-semibold text-[#c45c3e]">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#f5f0e8]/50 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Organizations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-xs tracking-widest uppercase text-[#f5f0e8]/40 mb-3 block">
                Членство в организациях
              </span>
              <div className="flex flex-wrap gap-2">
                {organizations.map((org, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-[#f5f0e8]/10 text-sm text-[#f5f0e8]/60 hover:border-[#c45c3e] hover:text-[#c45c3e] transition-colors"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}