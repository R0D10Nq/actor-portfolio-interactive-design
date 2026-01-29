import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-[#f5f0e8]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="font-display text-3xl font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c45c3e]">A</span>S
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-[#f5f0e8]/30 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            © {currentYear} Андрей Соколов. Все права защищены.
          </motion.p>

          {/* Made with */}
          <motion.p
            className="text-xs text-[#f5f0e8]/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Москва, Россия
          </motion.p>
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c45c3e] to-transparent" />
        </motion.div>
      </div>
    </footer>
  );
}
