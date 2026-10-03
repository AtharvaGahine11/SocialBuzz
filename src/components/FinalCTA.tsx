import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface z-0" />
      
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Make every approval count.</h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
            A clearer way to plan, review and manage social content.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/app')}
              className="px-8 py-4 rounded-full bg-white text-surface font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Launch Prototype
            </button>
            <a
              href="#top"
              onClick={scrollToTop}
              className="px-8 py-4 rounded-full bg-surface-light border border-white/10 text-white font-medium hover:bg-surface transition-colors w-full sm:w-auto"
            >
              Back to Top
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
