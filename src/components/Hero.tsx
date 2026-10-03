import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroScene from './HeroScene';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/3 -right-1/4 w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              SOCIAL MEDIA MANAGEMENT, REIMAGINED
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Every post. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Perfectly planned.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted mb-8 max-w-xl leading-relaxed"
          >
            From content planning to client approval and publishing, SocialBuzz brings your agency’s social workflow together in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate('/app')}
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-hover text-white text-center font-medium transition-all shadow-[0_0_20px_rgba(84,123,255,0.4)] hover:shadow-[0_0_30px_rgba(84,123,255,0.6)]"
            >
              Launch Prototype
            </button>
            <a
              href="#workflow"
              className="px-8 py-4 rounded-full bg-surface-light hover:bg-surface border border-white/10 text-white text-center font-medium transition-all"
            >
              See How It Works
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 flex items-center gap-2 text-sm text-text-muted"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            A smarter workflow for modern agencies
          </motion.div>
        </div>

        {/* 3D Visual & Floating Cards */}
        <div className="relative h-[500px] lg:h-[600px] w-full mt-12 lg:mt-0 hidden md:block">
          {/* Floating Dashboard Cards */}
          <motion.div 
            className="absolute top-10 right-10 z-20 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
            style={{ animationDelay: '0s' }}
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Client Approved</p>
              <p className="text-text-muted text-xs">Product Teaser Post</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-20 left-10 z-20 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
            style={{ animationDelay: '-2s' }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Scheduled</p>
              <p className="text-text-muted text-xs">Tomorrow, 10:00 AM</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute top-1/2 -right-4 z-20 bg-surface/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
            style={{ animationDelay: '-4s' }}
          >
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
              <Send size={20} />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Publishing Queue</p>
              <p className="text-text-muted text-xs">3 items ready</p>
            </div>
          </motion.div>

          {/* 3D Canvas */}
          {mounted && (
            <div className="absolute inset-0 z-10">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                  <HeroScene />
                </Suspense>
              </Canvas>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
