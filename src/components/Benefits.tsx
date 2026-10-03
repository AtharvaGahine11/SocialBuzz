import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { Layers, ShieldCheck, UserCheck, SearchCheck } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Shared Source of Truth",
      description: "A centralized hub for planned content, eliminating version control issues and lost files.",
      icon: <Layers size={24} className="text-primary" />
    },
    {
      title: "Explicit Client Approval",
      description: "Posts are explicitly approved before publishing, creating a clear record of consent.",
      icon: <ShieldCheck size={24} className="text-green-400" />
    },
    {
      title: "Clear Ownership",
      description: "Everyone knows who is drafting, who is reviewing, and what is waiting on client action.",
      icon: <UserCheck size={24} className="text-secondary" />
    },
    {
      title: "Centralised Audit Visibility",
      description: "Easily track when a post was approved and by whom, alongside unified reporting.",
      icon: <SearchCheck size={24} className="text-accent" />
    }
  ];

  return (
    <section className="py-24 bg-surface border-y border-white/5 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          headline="More clarity. Fewer missed steps." 
          subheadline="Transform how your agency handles content approvals."
        />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mt-20 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="p-4 rounded-2xl bg-surface-light border border-white/5 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
