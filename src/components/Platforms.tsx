import React from 'react';
import { motion } from 'framer-motion';
import { Hash, Globe, MessageCircle, AtSign } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Platforms: React.FC = () => {
  const platforms = [
    { name: 'Instagram', icon: <Hash size={32} />, color: 'hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10' },
    { name: 'Facebook', icon: <Globe size={32} />, color: 'hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10' },
    { name: 'X (Twitter)', icon: <AtSign size={32} />, color: 'hover:text-white hover:border-white/50 hover:bg-white/10' },
    { name: 'LinkedIn', icon: <MessageCircle size={32} />, color: 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10' },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          headline="Designed for a multi-platform workflow." 
          subheadline="Organise and plan content across the networks that matter most to your clients."
        />

        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center p-8 w-40 h-40 rounded-2xl bg-surface border border-white/5 text-text-muted transition-all duration-300 cursor-default ${platform.color}`}
            >
              <div className="mb-4">
                {platform.icon}
              </div>
              <span className="text-sm font-medium">{platform.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-text-muted/60 max-w-lg mx-auto">
            Note: Platform publishing capabilities depend on official API permissions and availability. 
            This demonstration represents the proposed organizational capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Platforms;
