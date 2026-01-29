import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

type WorkCategory = 'all' | 'film' | 'theater' | 'series';

interface Work {
  id: number;
  title: string;
  role: string;
  year: string;
  category: 'film' | 'theater' | 'series';
  director?: string;
  description: string;
}

const works: Work[] = [
  {
    id: 1,
    title: 'Тени прошлого',
    role: 'Главная роль\u00A0— Алексей',
    year: '2024',
    category: 'film',
    director: 'Андрей Смирнов',
    description: 'Психологическая драма о\u00A0человеке, который пытается разобраться в\u00A0событиях своего прошлого.'
  },
  {
    id: 2,
    title: 'Чайка',
    role: 'Треплев',
    year: '2023',
    category: 'theater',
    director: 'Мария Иванова',
    description: 'Классическая постановка пьесы А.\u00A0П.\u00A0Чехова в\u00A0современной интерпретации.'
  },
  {
    id: 3,
    title: 'Город на\u00A0краю',
    role: 'Детектив Марков',
    year: '2024',
    category: 'series',
    director: 'Павел Костомаров',
    description: 'Детективный сериал о\u00A0расследовании серии загадочных преступлений.'
  },
  {
    id: 4,
    title: 'Последний рейс',
    role: 'Пилот Дмитрий',
    year: '2023',
    category: 'film',
    director: 'Игорь Волков',
    description: 'Остросюжетная драма о\u00A0последнем полёте легендарного пилота.'
  },
  {
    id: 5,
    title: 'Гамлет',
    role: 'Горацио',
    year: '2022',
    category: 'theater',
    director: 'Константин Богомолов',
    description: 'Экспериментальная постановка шекспировской трагедии.'
  },
  {
    id: 6,
    title: 'Новая жизнь',
    role: 'Артём',
    year: '2023',
    category: 'series',
    director: 'Анна Меликян',
    description: 'Драматический сериал о\u00A0молодых людях, ищущих своё место в\u00A0жизни.'
  },
];

const categories: { value: WorkCategory; label: string }[] = [
  { value: 'all', label: 'Все работы' },
  { value: 'film', label: 'Кино' },
  { value: 'theater', label: 'Театр' },
  { value: 'series', label: 'Сериалы' },
];

export function WorksSection() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('all');
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredWorks = activeCategory === 'all'
    ? works
    : works.filter(w => w.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-32 md:py-48 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#1a1a1a]"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#c45c3e] mb-4 block">
              Портфолио
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium">
              <span className="whitespace-nowrap">Избранные</span>{' '}
              <span className="text-[#c45c3e]">работы</span>
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 relative ${activeCategory === cat.value
                    ? 'text-[#f5f0e8]'
                    : 'text-[#f5f0e8]/40 hover:text-[#f5f0e8]/70'
                  }`}
                data-hover
              >
                {cat.label}
                {activeCategory === cat.value && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c45c3e]"
                    layoutId="categoryUnderline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Works grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.article
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredWork(work.id)}
                onMouseLeave={() => setHoveredWork(null)}
                data-hover
              >
                {/* Card */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#f5f0e8]/5 overflow-hidden">
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-[#c45c3e]/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredWork === work.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#1a1a1a]/80 text-[10px] uppercase tracking-widest text-[#c45c3e]">
                      {work.category === 'film' ? 'Кино' : work.category === 'theater' ? 'Театр' : 'Сериал'}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4 z-10 font-display text-5xl font-bold text-[#f5f0e8]/5 group-hover:text-[#c45c3e]/20 transition-colors duration-500">
                    {work.year}
                  </div>

                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 text-[#f5f0e8]/5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent">
                    <h3 className="font-display text-2xl md:text-3xl font-medium mb-2 group-hover:text-[#c45c3e] transition-colors duration-300">
                      {work.title}
                    </h3>
                    <p className="text-sm text-[#f5f0e8]/60 mb-3">{work.role}</p>

                    {/* Expandable description */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredWork === work.id ? 'auto' : 0,
                        opacity: hoveredWork === work.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-[#f5f0e8]/40 mb-2">{work.description}</p>
                      {work.director && (
                        <p className="text-xs text-[#c45c3e]">Реж. {work.director}</p>
                      )}
                    </motion.div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#c45c3e]/0 group-hover:border-[#c45c3e] transition-colors duration-500" />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Decorative marquee */}
      <div className="mt-24 overflow-hidden border-y border-[#f5f0e8]/5 py-4">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center">
              {['КИНО', 'ТЕАТР', 'СЕРИАЛЫ', 'ДРАМА', 'КОМЕДИЯ', 'ТРИЛЛЕР'].map((text, j) => (
                <span key={j} className="mx-8 font-display text-3xl md:text-4xl text-[#f5f0e8]/10 flex items-center">
                  {text}
                  <span className="ml-8 w-2 h-2 rounded-full bg-[#c45c3e]/30" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}