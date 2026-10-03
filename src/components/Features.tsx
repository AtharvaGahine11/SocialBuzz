import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { CalendarDays, CheckSquare, Send, LineChart } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Smart Content Calendar",
      description: "Organise upcoming content in a shared calendar. Visualise your strategy across all channels.",
      icon: <CalendarDays className="text-primary" size={24} />,
      visual: (
        <div className="h-full w-full bg-surface-light rounded-lg border border-white/5 p-4 flex flex-col gap-2 overflow-hidden">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex-1 h-6 bg-white/5 rounded-md flex items-center justify-center text-[10px] text-white/30">{i + 10}</div>
            ))}
          </div>
          <div className="w-full h-12 bg-primary/20 border border-primary/30 rounded-md p-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <div className="w-24 h-2 bg-white/20 rounded-full" />
          </div>
          <div className="w-3/4 h-12 bg-secondary/20 border border-secondary/30 rounded-md p-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-secondary" />
            <div className="w-20 h-2 bg-white/20 rounded-full" />
          </div>
        </div>
      )
    },
    {
      title: "Client Approval Portal",
      description: "Keep client feedback and approval decisions associated with each post. No more messy email threads.",
      icon: <CheckSquare className="text-green-400" size={24} />,
      visual: (
        <div className="h-full w-full bg-surface-light rounded-lg border border-white/5 p-4 flex flex-col justify-between">
          <div>
            <div className="w-16 h-4 bg-white/10 rounded mb-4" />
            <div className="w-full h-24 bg-white/5 rounded-md mb-4" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 py-2 bg-green-500/20 text-green-400 text-xs text-center rounded border border-green-500/30">Approve</div>
            <div className="flex-1 py-2 bg-white/5 text-white/50 text-xs text-center rounded border border-white/10">Request Changes</div>
          </div>
        </div>
      )
    },
    {
      title: "Scheduled Publishing",
      description: "Prepare approved content for its planned publishing time. (Actual platform publishing depends on authorised integrations).",
      icon: <Send className="text-secondary" size={24} />,
      visual: (
        <div className="h-full w-full bg-surface-light rounded-lg border border-white/5 p-4 relative overflow-hidden flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="flex-1 h-3 bg-white/10 rounded" />
            <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Published</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="flex-1 h-3 bg-white/10 rounded" />
            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">Scheduled</span>
          </div>
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="flex-1 h-3 bg-white/10 rounded" />
            <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Failed</span>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      description: "Present performance and publishing reports in a unified workspace. (All displayed figures are illustrative sample data).",
      icon: <LineChart className="text-accent" size={24} />,
      visual: (
        <div className="h-full w-full bg-surface-light rounded-lg border border-white/5 p-4 flex items-end justify-between gap-2">
          {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
            <motion.div 
              key={i} 
              className="w-full bg-gradient-to-t from-primary/40 to-accent/40 rounded-t-sm"
              style={{ height: `${h}%` }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-surface relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          headline="Everything in sync. Finally." 
          subheadline="A suite of tools designed specifically for the agency-client relationship."
        />

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-background rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all hover:shadow-[0_0_30px_rgba(84,123,255,0.05)] flex flex-col"
            >
              <div className="p-8 pb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-8 min-h-[60px]">
                  {feature.description}
                </p>
              </div>
              <div className="mt-auto p-6 pt-0">
                <div className="h-48 w-full bg-surface/50 rounded-xl p-2 border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  {feature.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
