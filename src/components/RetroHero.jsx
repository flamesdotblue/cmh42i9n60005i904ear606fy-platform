import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function RetroHero() {
  return (
    <header className="relative w-full">
      <div className="relative h-[520px] sm:h-[560px] md:h-[600px] w-full">
        <Spline scene="https://prod.spline.design/fA4LwfT7IUUelEGO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#11081a]/30 via-transparent to-[#11081a]" />
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Tasks, but make it Retro
          </h1>
          <p className="mt-2 text-zinc-200/90 max-w-xl mx-auto text-sm sm:text-base">
            A cozy, neon-lit workspace to plan, prioritize, and check things off with style.
          </p>
        </motion.div>
      </div>
    </header>
  );
}
