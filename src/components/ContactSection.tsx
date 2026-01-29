import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E1306C' },
  { icon: Youtube, label: 'YouTube', href: '#', color: '#FF0000' },
  { icon: Send, label: 'Telegram', href: '#', color: '#0088cc' },
  { icon: MessageCircle, label: 'VK', href: '#', color: '#4C75A3' },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', subject: '', message: '' });
    alert('Сообщение отправлено!');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c45c3e]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#c45c3e] mb-4 block">
              Контакты
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              <span className="whitespace-nowrap">Давайте</span>{' '}
              <span className="text-[#c45c3e] whitespace-nowrap">поработаем вместе</span>
            </h2>
            <p className="text-[#f5f0e8]/60 leading-relaxed mb-10 max-w-md">
              Открыт для интересных проектов в&nbsp;кино, театре и&nbsp;рекламе.
              Свяжитесь со&nbsp;мной напрямую или через моего агента.
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-12">
              <motion.a
                href="mailto:contact@andreysokolov.ru"
                className="flex items-center gap-4 group"
                data-hover
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 border border-[#f5f0e8]/10 flex items-center justify-center group-hover:border-[#c45c3e] transition-colors">
                  <Mail className="w-5 h-5 text-[#c45c3e]" />
                </div>
                <div>
                  <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-[#f5f0e8] group-hover:text-[#c45c3e] transition-colors whitespace-nowrap">contact@andreysokolov.ru</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+79001234567"
                className="flex items-center gap-4 group"
                data-hover
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 border border-[#f5f0e8]/10 flex items-center justify-center group-hover:border-[#c45c3e] transition-colors">
                  <Phone className="w-5 h-5 text-[#c45c3e]" />
                </div>
                <div>
                  <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-wider mb-1">Телефон (агент)</p>
                  <p className="text-[#f5f0e8] group-hover:text-[#c45c3e] transition-colors">+7 (900) 123-45-67</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 border border-[#f5f0e8]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#c45c3e]" />
                </div>
                <div>
                  <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-wider mb-1">Локация</p>
                  <p className="text-[#f5f0e8]">Москва, Россия</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-[#f5f0e8]/40 uppercase tracking-wider mb-4">Социальные сети</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 border border-[#f5f0e8]/10 flex items-center justify-center hover:border-[#c45c3e] transition-all duration-300 group"
                    data-hover
                    title={social.label}
                  >
                    <social.icon
                      className="w-5 h-5 text-[#f5f0e8]/50 group-hover:text-[#c45c3e] transition-colors"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-[#f5f0e8]/20 py-4 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c45c3e] transition-colors peer"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-4 text-[#f5f0e8]/50 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#c45c3e] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Имя
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-[#f5f0e8]/20 py-4 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c45c3e] transition-colors peer"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-4 text-[#f5f0e8]/50 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#c45c3e] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                    Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <select
                  value={formState.subject}
                  onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                  required
                  className="w-full bg-transparent border-b border-[#f5f0e8]/20 py-4 text-[#f5f0e8] focus:outline-none focus:border-[#c45c3e] transition-colors appearance-none"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="" disabled className="bg-[#1a1a1a]">Тема обращения</option>
                  <option value="film" className="bg-[#1a1a1a]">Съёмки в кино</option>
                  <option value="theater" className="bg-[#1a1a1a]">Театральный проект</option>
                  <option value="commercial" className="bg-[#1a1a1a]">Рекламный проект</option>
                  <option value="collaboration" className="bg-[#1a1a1a]">Коллаборация</option>
                  <option value="other" className="bg-[#1a1a1a]">Другое</option>
                </select>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f5f0e8]/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="relative">
                <textarea
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[#f5f0e8]/20 py-4 text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c45c3e] transition-colors resize-none peer"
                  placeholder=" "
                />
                <label className="absolute left-0 top-4 text-[#f5f0e8]/50 text-sm transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#c45c3e] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
                  Сообщение
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 border border-[#c45c3e] overflow-hidden"
                data-hover
              >
                <span className="relative z-10 text-sm uppercase tracking-widest text-[#c45c3e] group-hover:text-[#f5f0e8] transition-colors duration-300">
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#c45c3e]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </form>

            {/* Decoration */}
            <div className="mt-12 flex items-center gap-4 text-xs text-[#f5f0e8]/30">
              <span className="w-12 h-[1px] bg-[#f5f0e8]/10" />
              <span className="whitespace-nowrap">Обычно отвечаю в&nbsp;течение 24&nbsp;часов</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}