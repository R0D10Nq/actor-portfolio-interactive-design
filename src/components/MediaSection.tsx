import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Youtube, Instagram, Send, Play } from 'lucide-react';

// Типы для будущих интеграций с API
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
}

export interface TelegramPost {
  id: number;
  text: string;
  date: string;
  views?: number;
}

// Моковые данные (легко заменить на реальные API вызовы)
const mockYouTubeVideos: YouTubeVideo[] = [
  { id: '1', title: 'Как я готовился к роли в "Тени прошлого"', thumbnail: '', publishedAt: '2024-01-15' },
  { id: '2', title: 'Закулисье театральной постановки', thumbnail: '', publishedAt: '2024-01-10' },
  { id: '3', title: 'Q&A: Отвечаю на вопросы подписчиков', thumbnail: '', publishedAt: '2024-01-05' },
];

const mockTelegramPosts: TelegramPost[] = [
  { id: 1, text: 'Сегодня закончили съёмки второго сезона! Спасибо всей команде за невероятную работу 🎬', date: '2024-01-20', views: 15420 },
  { id: 2, text: 'Премьера спектакля "Чайка" состоится 15 февраля. Билеты уже в продаже!', date: '2024-01-18', views: 12300 },
  { id: 3, text: 'Новый год — новые проекты. Готов к новым вызовам! 🎭', date: '2024-01-01', views: 18900 },
];

// Компонент для YouTube видео
function YouTubeCard({ video, index }: { video: YouTubeVideo; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
    >
      <div className="aspect-video bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#f5f0e8]/5 relative overflow-hidden">
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#c45c3e]/20 flex items-center justify-center group-hover:bg-[#c45c3e] transition-all duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-[#f5f0e8] ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        />
        
        {/* Duration placeholder */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs">
          12:34
        </div>
      </div>
      
      <div className="mt-3">
        <h4 className="text-sm font-medium text-[#f5f0e8] group-hover:text-[#c45c3e] transition-colors line-clamp-2">
          {video.title}
        </h4>
        <p className="text-xs text-[#f5f0e8]/40 mt-1">
          {new Date(video.publishedAt).toLocaleDateString('ru-RU')}
        </p>
      </div>
    </motion.div>
  );
}

// Компонент для Telegram постов
function TelegramCard({ post, index }: { post: TelegramPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-5 border border-[#f5f0e8]/10 hover:border-[#c45c3e]/50 transition-colors group"
      data-hover
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0088cc] to-[#00a2e8] flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#f5f0e8]/80 leading-relaxed mb-3">
            {post.text}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#f5f0e8]/40">
            <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
            {post.views && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {(post.views / 1000).toFixed(1)}K
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Компонент-плейсхолдер для Instagram
function InstagramPlaceholder() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#f5f0e8]/5 flex items-center justify-center group hover:border-[#c45c3e]/50 transition-colors"
          data-hover
        >
          <Instagram className="w-6 h-6 text-[#f5f0e8]/10 group-hover:text-[#c45c3e]/50 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}

export function MediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="media"
      className="relative py-32 md:py-48"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#c45c3e] mb-4 block">
            Медиа
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-4">
            Следите за <span className="text-[#c45c3e]">обновлениями</span>
          </h2>
          <p className="text-[#f5f0e8]/50 max-w-xl mx-auto">
            Последние видео, публикации и новости из социальных сетей
          </p>
        </motion.div>

        {/* Media grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* YouTube Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-[#FF0000]" />
              </div>
              <div>
                <h3 className="font-medium text-[#f5f0e8]">YouTube</h3>
                <p className="text-xs text-[#f5f0e8]/40">Последние видео</p>
              </div>
              <a 
                href="#" 
                className="ml-auto text-xs text-[#c45c3e] hover:underline"
                data-hover
              >
                Смотреть все →
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockYouTubeVideos.map((video, i) => (
                <YouTubeCard key={video.id} video={video} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Instagram Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-[#E1306C]" />
              </div>
              <div>
                <h3 className="font-medium text-[#f5f0e8]">Instagram</h3>
                <p className="text-xs text-[#f5f0e8]/40">@daniil.volkov</p>
              </div>
            </div>
            
            <InstagramPlaceholder />
            
            <a 
              href="#" 
              className="mt-4 flex items-center justify-center gap-2 py-3 border border-[#f5f0e8]/10 hover:border-[#c45c3e] text-sm text-[#f5f0e8]/60 hover:text-[#c45c3e] transition-colors"
              data-hover
            >
              <Instagram className="w-4 h-4" />
              Подписаться
            </a>
          </motion.div>
        </div>

        {/* Telegram Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-[#0088cc]" />
            </div>
            <div>
              <h3 className="font-medium text-[#f5f0e8]">Telegram канал</h3>
              <p className="text-xs text-[#f5f0e8]/40">@volkov_actor</p>
            </div>
            <a 
              href="#" 
              className="ml-auto px-4 py-2 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] text-sm transition-colors"
              data-hover
            >
              Подписаться
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTelegramPosts.map((post, i) => (
              <TelegramCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Integration note */}
        <motion.div
          className="mt-16 p-6 border border-dashed border-[#f5f0e8]/10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xs text-[#f5f0e8]/30 uppercase tracking-widest mb-2">
            🔧 Готово к интеграции
          </p>
          <p className="text-sm text-[#f5f0e8]/50">
            Секция готова к подключению реальных API: YouTube Data API, Instagram Basic Display, Telegram Bot API, VK API
          </p>
        </motion.div>
      </div>
    </section>
  );
}
