import React from 'react';
import { METRICS } from '../data/demoData';
import { motion } from 'framer-motion';

const Metrics: React.FC = () => {
  const metricsData = [
    { label: "Clients Managed", value: METRICS.clients, prefix: "", suffix: "+" },
    { label: "Unapproved Posts (Last Month)", value: METRICS.unapprovedPosts, prefix: "", suffix: "" },
    { label: "Penalty per Incident", value: METRICS.penalty, prefix: "₹", suffix: "" },
    { label: "Target Platforms", value: METRICS.platforms, prefix: "", suffix: "" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider">
            Case Study #119 Snapshot
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {metricsData.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
                {metric.prefix}{metric.value.toLocaleString('en-IN')}{metric.suffix}
              </h3>
              <p className="text-sm text-text-muted">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
