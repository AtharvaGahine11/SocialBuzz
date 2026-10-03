import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { PenTool, CheckCircle, ThumbsUp, CalendarClock, Globe } from 'lucide-react';

const Workflow: React.FC = () => {
  const steps = [
    { id: '01', title: 'Create Post', icon: <PenTool size={20} />, desc: 'Draft content & upload assets' },
    { id: '02', title: 'Submit for Approval', icon: <CheckCircle size={20} />, desc: 'Send to client portal' },
    { id: '03', title: 'Client Approves', icon: <ThumbsUp size={20} />, desc: 'Feedback or approval given', highlight: true },
    { id: '04', title: 'Schedule Post', icon: <CalendarClock size={20} />, desc: 'Set time and date' },
    { id: '05', title: 'Publish & Report', icon: <Globe size={20} />, desc: 'Goes live automatically' },
  ];

  return (
    <section id="workflow" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          headline="From idea to published. One clear flow." 
          subheadline="A standardised process ensures nothing slips through the cracks."
        />

        <div className="mt-20 relative max-w-5xl mx-auto">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-white/10 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-row md:flex-col items-center gap-6 md:gap-4 md:w-48 text-left md:text-center group"
              >
                {/* Mobile connecting line part */}
                <div className="md:hidden absolute left-[31px] top-0 bottom-0 w-px bg-white/10 -z-10" />

                <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 bg-background transition-colors duration-300 ${
                  step.highlight 
                    ? 'border-green-400 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
                    : 'border-surface-light text-text-muted group-hover:border-primary group-hover:text-primary'
                }`}>
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-surface text-[10px] flex items-center justify-center border border-white/10 font-mono text-white/50">
                    {step.id}
                  </div>
                </div>

                <div>
                  <h4 className={`font-semibold mb-1 ${step.highlight ? 'text-green-400' : 'text-white'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {step.id === '03' && (
                  <div className="hidden md:block absolute top-[110%] left-1/2 -translate-x-1/2 w-px h-12 bg-white/10">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-max text-[10px] text-text-muted border border-white/5 bg-surface px-2 py-1 rounded whitespace-nowrap">
                      Reject → Edit → Resubmit
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 md:mt-32 max-w-2xl mx-auto"
        >
          <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              !
            </div>
            <div>
              <h5 className="text-red-400 font-medium mb-1">Strict Safety Rule</h5>
              <p className="text-sm text-text-muted">
                Publishing is permitted only when approval is valid and the scheduled time has arrived. The system prevents unapproved posts from entering the final queue.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
