import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Mail, Clock, BarChart3 } from 'lucide-react';
import SectionHeading from './SectionHeading';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Spreadsheet Planning",
      description: "Content is scattered across endless tabs, making it hard to visualize the overall strategy.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: <Mail size={24} />,
      title: "Scattered Approvals",
      description: "Feedback gets lost in long email threads, leading to confusion and delayed publishing.",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      icon: <Clock size={24} />,
      title: "Manual Publishing",
      description: "Copy-pasting content at the exact right time leads to human error and missed deadlines.",
      color: "text-red-400",
      bg: "bg-red-400/10"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Fragmented Reporting",
      description: "Pulling analytics from native platforms takes hours and lacks unified context.",
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          headline="Your workflow deserves better." 
          subheadline="Managing 60 clients manually isn't just stressful—it's risky."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${problem.bg} ${problem.color} group-hover:scale-110 transition-transform`}>
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent">
            <div className="px-6 py-2 rounded-full bg-surface-light text-sm font-medium text-text-muted">
              SocialBuzz replaces this chaos with <span className="text-white">one connected workflow</span>.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
